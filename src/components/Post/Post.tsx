import { View, TouchableHighlight, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import { Avatar, Card, IconButton, Text, Divider, TouchableRipple } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeICon from 'react-native-vector-icons/FontAwesome';
import { color } from 'src/common/constants/color';
import globalStyles from 'src/common/styles/globalStyles';
import { useEffect, useState } from 'react';
import GridImage from '../GridImages/GridImage';
import BaseVideo from '../BaseVideo';
import ReportModal from './ReportModal';
import { getAvatarUri } from 'src/utils/helper';
import { coverTimeToNow } from 'src/utils/dayjs';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import {
  AppNaviagtionName,
  PostNavigationName,
  ProfileNavigationName
} from 'src/common/constants/nameScreen';
import CommentTab from './components/Comment';
import { setFeelApi } from 'src/services/comment.service';
const MAX_LENGTH_CONTENT = 500;

// define props
export interface PostProps {
  id: string;
  name: string;
  image: [{ id: string; url: string }];
  video: {
    url: string;
    thumb: string;
  };
  described: string;
  created: string;
  feel: string;
  comment_mark: string;
  is_felt: string;
  is_blocked: string;
  can_edit: string;
  banned: string;
  status: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  numberShares?: number;
  isShowCloseIcon?: boolean;
}

function Post(props: PostProps) {
  // Navigation profile
  const navigationProfile: NavigationProp<AppNavigationType, AppNaviagtionName.ProfileNavigation> =
    useNavigation();
  const navigationPostDetail: NavigationProp<AppNavigationType, AppNaviagtionName.PostNavigation> =
    useNavigation();

  const [deleted, setDeleted] = useState(false);
  const onDeletePost = () => {
    setDeleted(true);
  };

  const handleNavigationProfile = () =>
    navigationProfile.navigate(AppNaviagtionName.ProfileNavigation, {
      screen: ProfileNavigationName.Profile,
      params: { user_id: props.author.id }
    });

  const handleNavigationPostDetail = () => {
    navigationPostDetail.navigate(AppNaviagtionName.PostNavigation, {
      screen: PostNavigationName.ListImageDetail,
      params: { data: props }
    });
  };

  const [openCommentModal, setOpenCommentModal] = useState(false);
  const [isShowFullContent, setIsShowFullContent] = useState(true);
  const [displayContent, setDisplayContent] = useState('');
  const { described, name, image, video, id, status } = props;
  const [openModalFeel, setOpenModalFeel] = useState(false);
  const urls = image?.map(imageObj => imageObj.url) ?? [];
  const content = described;
  useEffect(() => {
    if (content) {
      setDisplayContent(content);
      setIsShowFullContent(true);
      if (content.length > MAX_LENGTH_CONTENT) {
        setIsShowFullContent(false);
        setDisplayContent(content?.slice(0, MAX_LENGTH_CONTENT));
      }
    }
  }, [content]);
  const onPressContent = () => {
    if (isShowFullContent && (content?.length as number) > MAX_LENGTH_CONTENT) {
      setIsShowFullContent(displayContent.length === MAX_LENGTH_CONTENT);
      setDisplayContent(content?.slice(0, MAX_LENGTH_CONTENT) as string);
    }
  };
  const handlePressDisplayFullContent = () => {
    setIsShowFullContent(true);
    setDisplayContent(content as string);
  };

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };
  const hideModal = () => {
    setModalVisible(false);
  };
  const handlePressOut = () => {
    setOpenModalFeel(false);
  };
  const handldeOpenLikeModal = () => {
    setOpenModalFeel(!openModalFeel);
  };
  const handleSetLike = async (id: string) => {
    try {
      const res = await setFeelApi({
        id: id,
        type: 1
      });
      if (res.success) {
        if (!res.data.length) {
          // console.log(res.data)
        }
      }
    } catch (e) {
      return;
    }
    setOpenModalFeel(false);
  };

  const handleSetDislike = async (id: string) => {
    try {
      const res = await setFeelApi({
        id: id,
        type: 0
      });
      if (res.success) {
        if (!res.data.length) {
          // console.log(res.data)
        }
        // const response = res.data;
      }
    } catch (e) {
      return;
    }
    setOpenModalFeel(false);
  };

  const isInteract: boolean =
    props.feel !== '0' || props.comment_mark !== '0' || !!props.numberShares;
  return deleted ? (
    <></>
  ) : (
    <View style={styles.postContainer}>
      {name && (
        <View style={styles.userComments}>
          <View
            style={[globalStyles.flexRow, globalStyles.centerAlignItem, styles.userCommentsContent]}
          >
            <Text variant='titleSmall'>{name}</Text>
            <Text>đã bình luận</Text>
          </View>
          <Divider />
        </View>
      )}
      <Card.Title
        title={
          <Text style={{ fontSize: 16, alignItems: 'center', fontWeight: '700' }}>
            {props.author?.name}
            {status ? (
              <Text style={{ fontSize: 15, textAlign: 'center' }}>{' ' + status}</Text>
            ) : null}
          </Text>
        }
        titleVariant='titleMedium'
        titleNumberOfLines={2}
        subtitle={
          <View style={[globalStyles.flexRow, globalStyles.centerAlignItem, styles.gap]}>
            <Text variant='bodySmall'>{coverTimeToNow(props.created)}</Text>
            <MaterialIcon name='public' />
          </View>
        }
        left={Aprops => (
          <TouchableRipple onPress={handleNavigationProfile}>
            <Avatar.Image {...Aprops} source={getAvatarUri(props.author.avatar as string)} />
          </TouchableRipple>
        )}
        right={props => (
          <View style={globalStyles.flexRow}>
            <IconButton {...props} icon='dots-horizontal' onPress={showModal} />
            <IconButton {...props} icon='close-thick' onPress={() => {}} />
          </View>
        )}
      />
      {content && (
        <Card.Content style={{ marginBottom: 10 }}>
          <Text onPress={onPressContent}>
            {displayContent}
            {!isShowFullContent && (
              <Text
                style={{ color: color.activeOutlineColor }}
                onPress={handlePressDisplayFullContent}
              >
                ... Xem thêm
              </Text>
            )}
          </Text>
        </Card.Content>
      )}
      {urls?.length ? (
        <GridImage
          images={urls}
          onPress={handleNavigationPostDetail}
          style={{ width: '100%', height: 300, marginBottom: 10 }}
          isShowCloseIcon={props.isShowCloseIcon}
        />
      ) : null}
      {video ? <BaseVideo video={{ uri: video?.url }} thumbnail={{ uri: video?.thumb }} /> : null}
      <Divider />
      {isInteract && (
        <>
          <TouchableHighlight
            style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify, styles.padding]}
            onPress={() => setOpenCommentModal(true)}
            underlayColor={color.borderColor}
          >
            <>
              {props.feel !== '0' && (
                <View style={[globalStyles.flexRow, globalStyles.centerAlignItem]}>
                  <AntdIcon name='like1' size={15} color={color.primary} />
                  <Text>{props?.feel}</Text>
                </View>
              )}
              {(props.comment_mark !== '0' || props.numberShares) && (
                <View style={[globalStyles.flexRow, styles.gap]}>
                  {props?.comment_mark !== '0' && <Text>{props?.comment_mark} bình luận</Text>}
                  {props?.numberShares && <Text>{props?.numberShares} lượt chia sẻ</Text>}
                </View>
              )}
            </>
          </TouchableHighlight>
          <Divider />
        </>
      )}

      <View style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify]}>
        <TouchableWithoutFeedback onPress={handlePressOut}>
          <TouchableHighlight
            style={[globalStyles.flexRow, styles.padding, styles.gap, styles.position]}
            underlayColor={color.borderColor}
            onPress={() => {
              handldeOpenLikeModal();
            }}
            // onPressOut={handlePressOut}
          >
            <>
              <AntdIcon name='like2' size={20} />
              <Text>Thích</Text>
              {openModalFeel && (
                <View style={styles.modalLike}>
                  <AntdIcon
                    name='like1'
                    size={22}
                    style={styles.likeIcon}
                    onPress={() => {
                      handleSetLike(id);
                    }}
                  />
                  <AntdIcon
                    name='dislike1'
                    size={22}
                    style={styles.dislikeIcon}
                    onPress={() => {
                      handleSetDislike(id);
                    }}
                  />
                </View>
              )}
            </>
          </TouchableHighlight>
        </TouchableWithoutFeedback>

        <TouchableHighlight
          style={[globalStyles.flexRow, styles.padding, styles.gap]}
          underlayColor={color.borderColor}
          onPress={() => {}}
        >
          <>
            <FontAwesomeICon name='comment-o' size={20} />
            <Text onPress={() => setOpenCommentModal(true)}>Bình luận</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          style={[globalStyles.flexRow, styles.padding, styles.gap]}
          underlayColor={color.borderColor}
          onPress={() => {}}
        >
          <>
            <IonIcons name='arrow-redo-outline' size={20} />
            <Text>Chia sẻ</Text>
          </>
        </TouchableHighlight>
      </View>
      <ReportModal
        isVisible={modalVisible}
        onBackdropPress={hideModal}
        authorId={props.author.id}
        postId={props.id}
        authorName={props.author.name}
        post={props}
        onDeletePost={onDeletePost}
      />
      <CommentTab openModal={openCommentModal} setOpenModal={setOpenCommentModal} id={props.id} />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: { backgroundColor: color.sureface, marginTop: 8 },
  userComments: { marginLeft: 10, paddingTop: 5 },
  userCommentsContent: { marginBottom: 5, gap: 5 },
  padding: { padding: 10 },
  gap: { gap: 10 },
  marginVertical: { marginVertical: 10 },
  position: { position: 'relative' },

  modalLike: {
    position: 'absolute',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    top: -56,
    left: 20,
    backgroundColor: color.white,
    padding: 5,
    borderRadius: 20,
    shadowOffset: {
      width: 0,
      height: 0
    },
    shadowOpacity: 0,
    shadowRadius: 0,
    // borderWidth: 1,
    borderStyle: 'solid',
    borderColor: 'var(--media-inner-border)',
    shadowColor: 'var(--shadow-1)',
    elevation: 2
  },
  likeIcon: {
    padding: 7,
    paddingLeft: 8,
    borderWidth: 1, // Border width
    borderColor: '#ccc', // Border color
    borderRadius: 50,
    backgroundColor: '#3578E5',
    color: color.white
  },
  dislikeIcon: {
    padding: 7,
    paddingLeft: 8,
    borderWidth: 1, // Border width
    borderColor: '#ccc', // Border color
    borderRadius: 50,
    backgroundColor: '#ccc',
    color: color.black
  }
});

export default Post;
