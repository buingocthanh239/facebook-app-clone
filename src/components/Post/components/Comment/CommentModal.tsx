import { View, Text, TouchableHighlight } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import { color } from 'src/common/constants/color';
import { ScrollView } from 'react-native';
import BaseFlatList from 'src/components/BaseFlatList';
import { ActivityIndicator, Avatar } from 'react-native-paper';
import { getAvatarUri } from 'src/utils/helper';
import { useEffect, useState } from 'react';
import { IGetListFeels, IGetMarkComment, IListFeels } from 'src/interfaces/comments.interface';
import { getListFeelsApi, getMarkCommentApi } from 'src/services/comment.service';
import { IListCommentPost } from 'src/interfaces/comments.interface';
import { coverTimeToNow } from 'src/utils/dayjs';
import AntdIcon from 'react-native-vector-icons/AntDesign';
interface CommentTabProps {
  id: string;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommentTab = (props: CommentTabProps) => {
  const { id, openModal, setOpenModal } = props;
  const [listMarkComment, setListMarkComment] = useState<IListCommentPost[]>([]);
  const [skip, setSkip] = useState<number>(0);
  const [isNext, setIsNext] = useState<boolean>(false);
  const [isNextFetch, setIsNextFetch] = useState<boolean>(true);
  const [isLoadingFirstApi, setIsLoadingFirstAPi] = useState<boolean>(false);
  const [listFeels, setListFeels] = useState<IListFeels[]>([]);
  const [totalFeel, setTotalFeel] = useState(0);
  const COUNT_ITEM = 10;
  useEffect(() => {
    const data: IGetMarkComment = {
      id: id,
      index: 0,
      count: 10
    };
    const fetchData = async (data: IGetMarkComment) => {
      setIsLoadingFirstAPi(true);
      try {
        const result = await getMarkCommentApi(data);
        if (result.success) {
          if (!result.data.length) {
            setIsNextFetch(false);
            return;
          }
          setListMarkComment(result.data);
          setIsNextFetch(true);
          setSkip(COUNT_ITEM);
          // console.log('result',result)
        }
        setTimeout(() => {
          setIsLoadingFirstAPi(false);
        }, 200);
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };
    fetchData(data).catch(console.error);
  }, [id]);

  useEffect(() => {
    const data: IGetListFeels = {
      id: id,
      index: 0,
      count: 100
    };
    const fetchData = async (data: IGetListFeels) => {
      try {
        const result = await getListFeelsApi(data);
        if (result.success) {
          if (!result.data.length) {
            return;
          } else setTotalFeel(result.data.length);
          setListFeels(result.data);
        }
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };
    fetchData(data).catch(console.error);
  }, [id]);
  // const Emotions = [
  //   {
  //     id: 1,
  //     name: 'Like',
  //     icon: 'like2',
  //     library: 'AntDesign',
  //     number: 100,
  //     color: `${color.likeIcon}`
  //   },
  //   {
  //     id: 2,
  //     name: 'Love',
  //     icon: 'heart',
  //     library: 'FontAwesome6',
  //     number: 80,
  //     color: `${color.heartIcon}`
  //   },
  //   {
  //     id: 3,
  //     name: 'Haha',
  //     icon: 'laugh',
  //     library: 'Ionicons',
  //     number: 60,
  //     color: `${color.laughtIcon}`
  //   },
  //   {
  //     id: 4,
  //     name: 'Sad',
  //     icon: 'face-sad-cry',
  //     library: 'FontAwesome6',
  //     number: 120,
  //     color: `${color.likeIcon}`
  //   },
  //   {
  //     id: 5,
  //     name: 'Angry',
  //     icon: 'face-angry',
  //     library: 'FontAwesome6',
  //     number: 20,
  //     color: `${color.likeIcon}`
  //   }
  // ];

  // const listComments = [
  //   {
  //     "id": "261",
  //     "mark_content": "so good",
  //     "type_of_mark": "0",
  //     "created": "2023-12-24T18:10:58.228Z",
  //     "poster": {
  //       "id": "529",
  //       "name": "username",
  //       "avatar": "https://it4788.catan.io.vn/files/avatar-1702202794904-871163289.png"
  //     },
  //     "comments": []
  //   },
  //   {
  //     "id": "133",
  //     "mark_content": "so good",
  //     "type_of_mark": "1",
  //     "created": "2023-12-19T12:33:34.999Z",
  //     "poster": {
  //       "id": "841",
  //       "name": "Ajin",
  //       "avatar": "https://it4788.catan.io.vn/files/avatar-1702563442430-19905748.jpg"
  //     },
  //     "comments": [
  //       {
  //         "content": "so good",
  //         "created": "2023-12-21T03:20:41.668Z",
  //         "poster": {
  //           "id": "1",
  //           "name": "username",
  //           "avatar": "https://it4788.catan.io.vn/files/avatar-1703485156307-847663699.jpg"
  //         }
  //       },
  //       {
  //         "content": "so good",
  //         "created": "2023-12-21T03:24:19.000Z",
  //         "poster": {
  //           "id": "1",
  //           "name": "username",
  //           "avatar": "https://it4788.catan.io.vn/files/avatar-1703485156307-847663699.jpg"
  //         }
  //       }
  //     ]
  //   },
  //   // ...Thêm các comment khác vào đây
  // ];

  async function onEndReadable() {
    if (isNextFetch) {
      try {
        setIsNext(true);
        setSkip(skip => skip + COUNT_ITEM);
        const res = await getMarkCommentApi({
          id: id,
          index: skip,
          count: COUNT_ITEM
        });
        if (res.success) {
          if (!res.data.length) {
            setIsNextFetch(false);
            return;
          }
          console.log(skip, res.data);
          const response = res.data;
          if (res.data.length) {
            //console.log('searchResult', searchResult);
            setListMarkComment(listMarkComments => [...listMarkComments, ...response]);
          }
        }
      } catch (e) {
        setSkip(skip => skip - COUNT_ITEM);
        return;
      } finally {
        setIsNext(false);
      }
    }
  }
  // const navigateEditProfileScreen = () => navigation.navigate('EditProfile');
  const handleCancel = () => {
    setOpenModal(false);
  };
  // console.log('id', id)
  return (
    <ScrollView>
      <Modal
        isVisible={openModal}
        style={styles.container}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={handleCancel}
      >
        {isLoadingFirstApi ? (
          <ActivityIndicator color={color.activeOutlineColor} style={{ marginTop: '50%' }} />
        ) : (
          <>
            <TouchableHighlight style={styles.header}>
              {/* <Text>đây là header comment</Text> */}
              <View style={styles.icon}>
                <View style={styles.left}>
                  <View style={styles.listIcon}>
                    <AntdIcon
                      name='like1'
                      size={18}
                      color={color.likeIcon}
                      style={styles.rightIcon}
                    />
                    <AntdIcon
                      name='dislike1'
                      size={18}
                      color={color.iconButtonColor}
                      style={styles.rightIcon}
                    />
                    {listFeels.length && (
                      <Text style={{ color: color.iconButtonColor }}>
                        {listFeels[0].feel.user.name} và {totalFeel - 1} người khác
                      </Text>
                    )}
                    <AntdIcon
                      name='right'
                      size={18}
                      color={color.iconButtonColor}
                      style={styles.rightIcon}
                    />
                  </View>
                </View>
              </View>
            </TouchableHighlight>
            <View>
              <BaseFlatList
                ListHeaderComponent={() => (
                  <TouchableHighlight style={{ padding: 10 }} underlayColor={color.Comment}>
                    <Text
                      // style={{ fontSize: 14, fontWeight: '700', marginBottom: 4 }}
                      style={styles.viewBeForeComment}
                    >
                      Tất cả bình luận
                    </Text>
                  </TouchableHighlight>
                )}
                data={listMarkComment}
                renderItem={({ item }) => (
                  <>
                    <View>
                      <View style={styles.CommentItem}>
                        <View style={styles.top}>
                          <TouchableHighlight
                            // activeOpacity={0.8}
                            // underlayColor={color.borderColor}
                            onPress={() => {}}
                            style={styles.touchableHighlight}
                            underlayColor={color.Comment}
                          >
                            <View>
                              <Avatar.Image
                                source={getAvatarUri(item.poster.avatar)}
                                size={40}
                                style={styles.avatarImage}
                              />
                            </View>
                          </TouchableHighlight>
                          <View style={styles.Content}>
                            <Text style={styles.TextName}>{item.poster.name}</Text>
                            <Text style={styles.TextCommment}>{item.mark_content}</Text>
                          </View>
                        </View>
                        <View style={styles.Function}>
                          <Text style={styles.TextTime}>{coverTimeToNow(item.created)}</Text>
                          <TouchableHighlight
                            onPress={() => {}}
                            style={styles.highlightText}
                            underlayColor={color.Comment}
                          >
                            <Text style={styles.TextLike}> Thích</Text>
                          </TouchableHighlight>
                          <TouchableHighlight
                            onPress={() => {}}
                            style={styles.highlightConment}
                            underlayColor={color.Comment}
                          >
                            <Text style={styles.TextResponse}> Phản hồi</Text>
                          </TouchableHighlight>
                        </View>
                        {item.comments.length > 0
                          ? item.comments.map((repItem: any) => (
                              <>
                                <View style={styles.topRep}>
                                  <TouchableHighlight
                                    onPress={() => {}}
                                    style={styles.touchableHighlight}
                                    underlayColor={color.Comment}
                                  >
                                    <View>
                                      <Avatar.Image
                                        source={getAvatarUri(repItem.poster.avatar)}
                                        size={25}
                                        style={styles.avatarImage}
                                      />
                                    </View>
                                  </TouchableHighlight>
                                  <View style={styles.ContentRep}>
                                    <Text style={styles.TextNameRep}>{repItem.poster.name}</Text>
                                    <Text style={styles.TextCommmentRep}>{repItem.content}</Text>
                                  </View>
                                </View>
                                <View style={styles.FunctionRep}>
                                  <Text style={styles.TextTime}>
                                    {coverTimeToNow(repItem.created)}
                                  </Text>
                                  <TouchableHighlight
                                    onPress={() => {}}
                                    style={styles.highlightText}
                                    underlayColor={color.Comment}
                                  >
                                    <Text style={styles.TextLike}> Thích</Text>
                                  </TouchableHighlight>
                                  <TouchableHighlight
                                    onPress={() => {}}
                                    style={styles.highlightConment}
                                    underlayColor={color.Comment}
                                  >
                                    <Text style={styles.TextResponse}> Phản hồi</Text>
                                  </TouchableHighlight>
                                </View>
                              </>
                            ))
                          : null}
                      </View>
                    </View>
                  </>
                )}
                keyExtractor={item => item.id}
                isFootterLoading={isNext}
                onEndReached={onEndReadable}
                onEndReachedThreshold={0.001}
              />
            </View>
          </>
        )}
      </Modal>
    </ScrollView>
  );
};

export default CommentTab;
