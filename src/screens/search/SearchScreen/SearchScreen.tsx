import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useEffect, useState } from 'react';
import styles from './styles';
import CommentTab from '../../../components/Post/components/Comment/CommentModal';
import { Appbar, Divider, IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import HistorySearch from './compoment/HistorySearch';
import { IGetSavedSearch, ISavedSearch, ISearch } from 'src/components/interfaces/search.interface';
import { getSaveSearchApi, deleteSavedSearchApi, searchApi } from 'src/services/search.service';
import BaseFlatList from 'src/components/BaseFlatList';
import Post from 'src/components/Post';
import { coverTimeToNow } from 'src/utils/dayjs';
import NetInfo from '@react-native-community/netinfo';
import { useNavigation } from '@react-navigation/native';
export interface ISearchResult {
  id: string;
  name: string;
  image: any;
  video: any;
  described: any;
  created: any;
  feel: any;
  mark_comment: any;
  is_felt: any;
  state: any;
  author: any;
}
function SearchScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalHistorySearch, setOpenModalHistorySearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [isRefresh, setIsRefresh] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [listSearch, setListSearch] = useState<ISearchResult[]>([]);
  const [isConnected, setIsConnected] = useState<boolean | null>(true);
  const navigation = useNavigation();
  // const [onSearch, setOnSearch] = useState(false)
  // const handleOpenCommentTab = () => {
  //   setOpenModal(true);
  // };
  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener(state => {
      // `state.isConnected` sẽ là `true` nếu có kết nối mạng và `false` nếu không có
      setIsConnected(state.isConnected);
    });

    // Clear event listener khi component bị unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  const _goBack = () => navigation.goBack();

  const handleTextChange = (e: any) => {
    setSearchText(e);
    setCurrentIndex(0);
  };

  const handleSearch = async (index: any, keyword: any) => {
    // if (searchText !== "") {
    setIsSearching(true);
    // }
    const data: ISearch = {
      keyword: keyword,
      user_id: null,
      index: index,
      count: 20
    };
    try {
      const result = await searchApi(data);
      const response = result.data;
      const searchResult: any = [];
      response.forEach(item => {
        const newData = {
          ...item, // Sao chép tất cả các trường từ data cũ
          image: item.image.map((imageObj: any) => imageObj.url) // Thay đổi trường image thành mảng các URL
        };
        searchResult.push(newData);
      });
      console.log('searchResult', searchResult);
      setListSearch(searchResult);
      // setCurrentIndex(0)
    } catch (error) {
      return console.log({ message: 'sever availabilitye' });
    }
  };

  // const onEndReadable = async () => {
  //   try {
  //     const result = await searchApi(
  //       {
  //         keyword: searchText,
  //         user_id: null,
  //         index: currentIndex + 20,
  //         count: 20,

  //       });
  //     if (result.success) {
  //       const response = result.data
  //       let searchResult: any = []
  //       response.forEach(item => {
  //         const newData = {
  //           ...item,  // Sao chép tất cả các trường từ data cũ
  //           image: item.image.map((imageObj: any) => imageObj.url),  // Thay đổi trường image thành mảng các URL
  //         };
  //         searchResult.push(newData)
  //       })
  //       setListSearch([...listSearch, searchResult])
  //       setCurrentIndex(skip => skip + 20);
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }
  // const fetchMoreResult =() =>{
  //   handleSearch(currentIndex+20)
  //   setCurrentIndex(currentIndex+20)
  // }
  // const fetchMorePosts = async () => {
  //   // Gọi API để lấy thêm 20 bài post tiếp theo
  //   const morePosts = await fetchMoreData();

  //   // Cập nhật state để hiển thị toàn bộ danh sách
  //   setPosts([...posts, ...morePosts]);
  //   setCurrentIndex(currentIndex + 20);
  // };

  // const _handleMore = () => console.log('Shown more');
  useEffect(() => {
    if (searchText == '') {
      setIsSearching(false);
    }
  }, [searchText]);

  const handleTextClear = () => {
    setSearchText('');
  };
  const [listSavedSearch, setListSavedSearch] = useState<ISavedSearch[]>([]);
  const [listAllSavedSearch, setListAllSavedSearch] = useState<ISavedSearch[]>([]);
  useEffect(() => {
    const data: IGetSavedSearch = {
      index: 0,
      count: 100
    };
    const fetchData = async (data: IGetSavedSearch) => {
      try {
        const listResult: any[] = [];
        const result = await getSaveSearchApi(data);
        setListAllSavedSearch(result.data);
        for (let i = 0; i < result.data.length; i++) {
          const currentItem = result.data[i];
          const exist = listResult.some(item => item.keyword === currentItem.keyword);
          if (!exist) {
            listResult.push(currentItem);
          }
        }
        console.log('listResult', listResult);
        setListSavedSearch(listResult);
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };

    fetchData(data).catch(console.error);
  }, []);

  // const Data: ISearchResult[] = [
  //   {
  //     id: '385',
  //     name: '',
  //     image: [
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
  //     ],
  //     video: {
  //       // url: "https://it4788.catan.io.vn/files/video-1702317454498-420558351.mp4"
  //     },
  //     described: 'chơi đàn nào',
  //     created: '2023-12-11T17:57:34.613Z',
  //     feel: '0',
  //     mark_comment: '0',
  //     is_felt: '0',
  //     state: '',
  //     author: {
  //       id: '608',
  //       name: 'mai van tien',
  //       avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
  //     }
  //   },
  //   {
  //     id: '372',
  //     name: '',
  //     video: {
  //       videoUri: "https://www.youtube.com/watch?v=HA5D3YwxJIk"
  //     },
  //     image: [
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg'
  //     ],
  //     described: 'thịt lợn và thịt bò?',
  //     created: '2023-12-11T14:43:00.320Z',
  //     feel: '1',
  //     mark_comment: '0',
  //     is_felt: '0',
  //     state: 'Hyped',
  //     author: {
  //       id: '608',
  //       name: 'mai van tien',
  //       avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
  //     }
  //   },
  //   {
  //     id: '367',
  //     name: '',
  //     video: {},
  //     image: [
  //       'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg'
  //     ],
  //     described: 'chuối ngon mỗi ngày',
  //     created: '2023-12-11T07:38:30.774Z',
  //     feel: '1',
  //     mark_comment: '0',
  //     is_felt: '0',
  //     state: 'tuyệt',
  //     author: {
  //       id: '608',
  //       name: 'mai van tien',
  //       avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
  //     }
  //   }
  // ];
  const handleDeleteSearch = async (IdSearch: number, keyword: any) => {
    const duplicateKeywords = listAllSavedSearch.filter(item => item.keyword === keyword);
    const idArray = duplicateKeywords.map(item => item.id);
    // console.log('duplicateKeywords',idArray)
    setIsRefresh(!isRefresh);
    const updatedList = listSavedSearch.filter(item => item.id !== IdSearch);
    setListSavedSearch(updatedList);

    let currentIndex = 0;

    const deleteSearchWithInterval = async () => {
      const id = idArray[currentIndex];

      try {
        // Gọi API để xóa đối tượng từ server
        const result = await deleteSavedSearchApi({ search_id: id, all: 0 });
        console.log(result);
      } catch (error) {
        console.log(error);
      }

      // Chuyển sang phần tử tiếp theo trong mảng
      currentIndex++;

      // Nếu đã xử lý hết mọi phần tử trong mảng, dừng vòng lặp
      if (currentIndex === idArray.length) {
        clearInterval(intervalId);

        // Xóa đối tượng cụ thể từ listSavedSearch
      }
    };

    // Chuyển sang phần tử tiếp theo trong mảng
    const intervalId = setInterval(deleteSearchWithInterval, 100);
    // Nếu đã xử lý hết mọi phần tử trong mảng, dừng vòng lặ
  };

  return (
    <>
      <Appbar.Header style={{ backgroundColor: color.white }}>
        <Appbar.BackAction onPress={_goBack} />
        {/* <Appbar.Content title='Title' /> */}
        <View>
          <TextInput
            placeholder='Tìm kiếm'
            clearButtonMode='always'
            onChangeText={handleTextChange}
            value={searchText}
            style={{
              height: 40,
              width: 250,
              borderRadius: 50,
              backgroundColor: color.backgroundColor,
              paddingLeft: 20
            }}
          />
          {searchText !== '' && (
            <IconButton
              icon='close'
              size={25}
              iconColor={color.black}
              style={styles.clearButton}
              onPress={handleTextClear}
            />
          )}
        </View>
        <Appbar.Action icon='magnify' onPress={() => handleSearch(currentIndex, searchText)} />
        {/* <Appbar.Action icon='dots-vertical' onPress={_handleMore} /> */}
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {isSearching && searchText !== '' ? (
          <View style={styles.headerSearchresult}>
            <Text style={styles.All}>Tất cả</Text>
            <Text style={styles.post}>Bài viết</Text>
            <Text style={styles.All}>Mọi người</Text>
            <Text style={styles.All}>Nhóm</Text>
            <Text style={styles.All}>Reals</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.nearlyall}
              // onPress={navigateEditProfileScreen}
            >
              <Text style={styles.nearly}>Tìm kiếm gần đây</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nearlyall}
              // onPress={navigateEditProfileScreen}
              onPress={() => {
                setOpenModalHistorySearch(true);
              }}
            >
              <Text style={styles.seeall}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        )}
        <Divider style={{ marginTop: 10 }} bold />

        <View style={styles.section}>
          <View style={styles.containers}>
            {isSearching && searchText !== '' ? (
              // Hiển thị data.data khi searchText khác rỗng
              isConnected ? (
                <BaseFlatList
                  data={listSearch}
                  renderItem={({ item }) => (
                    <Post
                      id={item.id}
                      ownerName={item.author?.name}
                      createdAt={coverTimeToNow(item.created)}
                      friendComments={item.friendComments}
                      content={item.described}
                      imageUrl={item?.image}
                      ownerAvatar={item.author?.avatar}
                      // video={item.video.url}
                      numberComments={item.numberComments}
                      numberLikes={item.numberLikes}
                      numberShares={item.numberShares}
                    />
                  )}
                  keyExtractor={item => item.id}
                  // onEndReached={onEndReadable}
                  onEndReachedThreshold={2 / listSearch.length}
                  // onEndReached={fetchMoreResult}
                  // onEndReachedThreshold={0.1}
                  // onRefresh={onRefresh}
                  // refreshing={refreshing}
                />
              ) : (
                // Handle the case when isConnected is false
                <>
                  <Text>Không có kết nối mạng</Text>
                </>
              )
            ) : (
              // Hiển thị HistorySearch khi searchText có giá trị
              <>
                {listSavedSearch.length === 0 ? (
                  // Hiển thị dòng text không có tìm kiếm nào gần đây
                  <Text style={styles.noSearchText}>Không có tìm kiếm nào gần đây</Text>
                ) : (
                  // Hiển thị danh sách lưu trữ tìm kiếm
                  listSavedSearch.map(item => (
                    <TouchableOpacity
                      key={item.id}
                      style={styles.allFriendBtn}
                      activeOpacity={0.5}
                      onPress={() => {
                        setSearchText(item.keyword);
                        setTimeout(() => {
                          handleSearch(currentIndex, item.keyword);
                        }, 300);
                      }}
                    >
                      <View key={item.id} style={styles.ListSearchResult}>
                        <View style={styles.ListSearchResultText}>
                          <IconButton
                            icon='clock-outline'
                            size={25}
                            iconColor={color.activeOutlineColor}
                          />
                          <Text style={styles.username}>{item.keyword}</Text>
                        </View>
                        <IconButton
                          icon='close'
                          mode='contained'
                          iconColor='#4b4c4f'
                          containerColor='#fff'
                          size={26}
                          onPress={() => handleDeleteSearch(item.id, item.keyword)}
                        />
                      </View>
                    </TouchableOpacity>
                  ))
                )}
              </>
            )}
          </View>
        </View>
        <CommentTab openModal={openModal} setOpenModal={setOpenModal} />
        <HistorySearch
          openModal={openModalHistorySearch}
          setOpenModal={setOpenModalHistorySearch}
          isRefresh={isRefresh}
          listSavedSearch={listSavedSearch}
          setListSavedSearch={setListSavedSearch}
        />
      </ScrollView>
    </>
  );
}

export default SearchScreen;
