import { View, Text, TouchableHighlight, TextInput } from 'react-native';
import Modal from 'react-native-modal';
import styles from './styles';
import { color } from 'src/common/constants/color';
import BaseFlatList from 'src/components/BaseFlatList';
import { ActivityIndicator, Appbar, Avatar, Divider } from 'react-native-paper';
import { getAvatarUri } from 'src/utils/helper';
import { useEffect, useState } from 'react';
import { IGetListFeels, IGetMarkComment, IListFeels } from 'src/interfaces/comments.interface';
import {
  getListFeelsApi,
  getMarkCommentApi,
  setMarkCommentApi
} from 'src/services/comment.service';
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
  const [commentText, setCommentText] = useState('');
  const [openModalListFeels, setOpenModalListFeel] = useState(false);
  const COUNT_ITEM = 10;
  useEffect(() => {
    const data: IGetMarkComment = {
      id: id,
      index: 0,
      count: 10
    };
    const fetchData = async (data: IGetMarkComment) => {
      // setIsLoadingFirstAPi(true);
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
          console.log('result', result);
        }
        setTimeout(() => {
          setIsLoadingFirstAPi(false);
        }, 500);
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
  const handlePressEnter = async () => {
    try {
      const result = await setMarkCommentApi({
        id: id,
        content: commentText,
        index: 0,
        count: 10,
        mark_id: null,
        type: 0
      });
      if (result.success) {
        if (!result.data.length) {
          return;
        }
        setListMarkComment(result.data);
        // const response = res.data;
      }
    } catch (e) {
      return;
    }
    setCommentText('');
    setSkip(0);
  };

  const handleTextChange = (e: any) => {
    setCommentText(e);
  };
  // console.log('id', id)

  // const ModalComment = ({ visible, onClose, children }: { visible: boolean, onClose: () => void, children: React.ReactNode }) => {
  //   const translateY = useRef(new Animated.Value(0)).current;
  //   const panResponder = useRef(
  //     PanResponder.create({
  //       onStartShouldSetPanResponder: () => true,
  //       onMoveShouldSetPanResponderCapture: (_, gestureState) =>
  //         gestureState.dy > 2 || gestureState.dy < -2,
  //       onPanResponderMove: Animated.event([null, { dy: translateY }], { useNativeDriver: false }),
  //       onPanResponderRelease: (_, gestureState) => {
  //         if (gestureState.dy > 50) {
  //           onClose();
  //         } else {
  //           Animated.spring(translateY, {
  //             toValue: 0,
  //             useNativeDriver: false
  //           }).start();
  //         }
  //       }
  //     })
  //   ).current;

  //   useEffect(() => {
  //     if (visible) {
  //       translateY.setValue(0);
  //     }
  //   }, [visible]);
  //   return (
  //     <Modal transparent visible={visible} animationType='slide' onRequestClose={onClose}>
  //       <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0)', justifyContent: 'flex-end' }}>
  //         <Animated.View
  //           style={{
  //             transform: [{ translateY }]
  //           }}
  //           {...panResponder.panHandlers}
  //         >
  //           <View style={{ height: 50, width: '100%', backgroundColor: color.black }}></View>
  //         </Animated.View>
  //         <View style={{ flex: 1 }}>
  //           {children}
  //         </View>
  //       </View>
  //     </Modal>
  //   );
  // }

  return (
    <Modal
      // visible={openModal}
      // onClose={handleCancel}
      animationIn='slideInUp'
      animationInTiming={500}
      animationOut='slideInDown'
      isVisible={openModal}
      style={styles.container}
      onBackdropPress={handleCancel}
    >
      {isLoadingFirstApi ? (
        <ActivityIndicator
          color={color.activeOutlineColor}
          style={{ marginTop: '50%', backgroundColor: color.white }}
        />
      ) : (
        <View style={{ backgroundColor: color.white }}>
          <TouchableHighlight
            style={styles.header}
            onPress={() => setOpenModalListFeel(true)}
            underlayColor={color.Comment}
          >
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
                  {listFeels.length > 1 ? (
                    <Text style={{ color: color.iconButtonColor }}>
                      {listFeels[0].feel.user.name} và {totalFeel - 1} người khác
                    </Text>
                  ) : listFeels.length === 1 ? (
                    <Text style={{ color: color.iconButtonColor }}>
                      {listFeels[0].feel.user.name}
                    </Text>
                  ) : null}
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
          <View style={{ height: '86%' }}>
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
                        ? item.comments.map((repItem: any, index: number) => (
                            <>
                              <View key={index} style={styles.topRep}>
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
          <Divider />
          <View>
            <TextInput
              placeholder='Viết bình luận'
              clearButtonMode='always'
              onSubmitEditing={handlePressEnter}
              onChangeText={handleTextChange}
              value={commentText}
              style={{
                marginTop: 5,
                marginBottom: 5,
                height: 40,
                width: '90%',
                marginLeft: 15,
                borderRadius: 50,
                backgroundColor: color.backgroundColor,
                paddingLeft: 20
              }}
            />
          </View>
        </View>
      )}
      <Modal
        animationIn='fadeIn'
        animationInTiming={500}
        animationOut='slideInDown'
        isVisible={openModalListFeels}
        style={styles.containerListComment}
        onBackdropPress={() => setOpenModalListFeel(false)}
      >
        <View style={styles.headerListFeel}>
          <Appbar.BackAction onPress={() => setOpenModalListFeel(false)} />
          <Text style={styles.textHeaderListFeel} onPress={() => setOpenModalListFeel(false)}>
            Người đã bày tỏ cảm xúc
          </Text>
        </View>
        <Divider />
        <View style={styles.headerListFeel}>
          <Text> Tất cả {String(totalFeel).length}</Text>
          <View>
            <AntdIcon name='like1' size={12} style={styles.likeIcon} />
          </View>
        </View>
      </Modal>
    </Modal>
  );
};

export default CommentTab;
