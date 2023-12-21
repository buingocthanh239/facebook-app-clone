import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import BaseFlatList from 'src/components/BaseFlatList';
import { useState } from 'react';
import Post from 'src/components/Post';
// import FriendCard from './FriendCard';
interface ListSearchResultProps {
  searchText: string;
}
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
const ListSearchResult = (props: ListSearchResultProps) => {
  const Data: ISearchResult[] = [
    {
      id: '385',
      name: '',
      image: [
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg',
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg'
      ],
      video: {
        // url: "https://it4788.catan.io.vn/files/video-1702317454498-420558351.mp4"
      },
      described: 'chơi đàn nào',
      created: '2023-12-11T17:57:34.613Z',
      feel: '0',
      mark_comment: '0',
      is_felt: '0',
      state: '',
      author: {
        id: '608',
        name: 'mai van tien',
        avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
      }
    },
    {
      id: '372',
      name: '',
      video: {
        // url: "https://it4788.catan.io.vn/files/video-1702317454498-420558351.mp4"
      },
      image: [
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg'
      ],
      described: 'thịt lợn và thịt bò?',
      created: '2023-12-11T14:43:00.320Z',
      feel: '1',
      mark_comment: '0',
      is_felt: '0',
      state: 'Hyped',
      author: {
        id: '608',
        name: 'mai van tien',
        avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
      }
    },
    {
      id: '367',
      name: '',
      video: {},
      image: [
        'https://media.baoquangninh.vn/upload/image/202307/medium/2100199_5fc049b4e26927b1f8e9720acdec299c.jpg'
      ],
      described: 'chuối ngon mỗi ngày',
      created: '2023-12-11T07:38:30.774Z',
      feel: '1',
      mark_comment: '0',
      is_felt: '0',
      state: 'tuyệt',
      author: {
        id: '608',
        name: 'mai van tien',
        avatar: 'https://it4788.catan.io.vn/files/avatar-1702280227278-455237500.jpg'
      }
    }
  ];
  const [data, setdata] = useState<any[]>(Data);
  setTimeout(() => {
    setdata(data => [...data]);
  }, 2000);
  const HistorySearch = [
    {
      id: '1',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '2',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '3',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '4',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '5',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '6',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '7',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '8',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '9',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    },
    {
      id: '10',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền'
    }
  ];

  return (
    <View style={styles.container}>
      {props.searchText !== '' ? (
        // Hiển thị data.data khi searchText khác rỗng
        <BaseFlatList
          data={data}
          renderItem={({ item }) => (
            <Post
              id={item.id}
              ownerName={item.author.name}
              createdAt={item.created}
              friendComments={item.friendComments}
              content={item.described}
              imageUrl={item.image}
              ownerAvatar={item.author.avatar}
              video={item.video.url}
              numberComments={item.numberComments}
              numberLikes={item.numberLikes}
              numberShares={item.numberShares}
            />
          )}
          keyExtractor={item => item.id}
          // onRefresh={onRefresh}
          // refreshing={refreshing}
        />
      ) : (
        // Hiển thị HistorySearch khi searchText có giá trị
        HistorySearch.map(item => (
          <TouchableOpacity key={item.id} style={styles.allFriendBtn} activeOpacity={0.7}>
            <View key={item.id} style={styles.ListSearchResult}>
              <View style={styles.ListSearchResultText}>
                <IconButton icon='magnify' size={25} iconColor={color.activeOutlineColor} />
                <Text style={styles.username}>{item.keyword}</Text>
              </View>
              <IconButton
                icon='close'
                mode='contained'
                iconColor='#4b4c4f'
                containerColor='#fff'
                size={26}
              />
            </View>
          </TouchableOpacity>
        ))
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
    // padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  image: {
    height: 40,
    width: 40
  },

  ListSearchResult: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ListSearchResultText: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  username: {
    lineHeight: 55,
    color: color.black
  },
  searchFriend: {
    padding: 8
  },
  allFriendBtn: {
    marginHorizontal: 10
    // backgroundColor: '#E9F1FE',
    // padding: 10,
    // borderRadius: 7
  }
});

export default ListSearchResult;
