import { View, TouchableHighlight, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import {
  Avatar,
  Card,
  IconButton,
  Text,
  Divider,
  TouchableRipple,
  ActivityIndicator
} from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeICon from 'react-native-vector-icons/FontAwesome';
import { color } from 'src/common/constants/color';
import globalStyles from 'src/common/styles/globalStyles';
import { useCallback, useEffect, useState } from 'react';
import GridImage from 'src/components/GridImages/GridImage';
import BaseVideo from 'src/components/BaseVideo';
import ReportModal from 'src/components/Post/ReportModal';
import { getAvatarUri } from 'src/utils/helper';
import { coverTimeToNow } from 'src/utils/dayjs';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute
} from '@react-navigation/native';
import {
  AppNaviagtionName,
  PostNavigationName,
  ProfileNavigationName
} from 'src/common/constants/nameScreen';
import { setFeelApi } from 'src/services/comment.service';
import { IGetPostData, getPost } from 'src/services/post.services';
import { PostProps } from 'src/components/Post/Post';
// define props
const defaultPost = {
  id: '',
  name: '',
  created: '',
  described: '',
  modified: '',
  fake: '',
  trust: '',
  kudos: '',
  disappointed: '',
  is_felt: '',
  is_marked: '',
  author: {
    id: '',
    name: '',
    avatar: '',
    coins: ''
  },
  state: '',
  is_blocked: '',
  can_edit: '',
  banned: '',
  can_mark: '',
  can_rate: '',
  url: '',
  messages: ''
};

function AllPostDetail() {
  const route: RouteProp<PostNavigationType, PostNavigationName.AllPostDetail> = useRoute();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [post, setPost] = useState<IGetPostData>(defaultPost as IGetPostData);
  const [isNotExistPost, setIsNotExistPost] = useState<boolean>(false);
  const { postId } = route.params;
  const isFocused = useIsFocused();

  const getPostCall = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await getPost({ id: postId });
      if (res.success) {
        setPost(res.data);
      } else {
        setIsNotExistPost(true);
      }
    } catch (e) {
      return;
    } finally {
      setIsLoading(false);
    }
  }, [postId]);

  useEffect(() => {
    if (isFocused) {
      getPostCall();
    }
  }, [getPostCall, isFocused]);

  const navigationProfile: NavigationProp<AppNavigationType, AppNaviagtionName.ProfileNavigation> =
    useNavigation();
  const navigationPostDetail: NavigationProp<AppNavigationType, AppNaviagtionName.PostNavigation> =
    useNavigation();

  const handleNavigationProfile = () =>
    navigationProfile.navigate(AppNaviagtionName.ProfileNavigation, {
      screen: ProfileNavigationName.Profile,
      params: { user_id: post?.author.id as string }
    });

  const handleNavigationPostDetail = () => {
    navigationPostDetail.navigate(AppNaviagtionName.PostNavigation, {
      screen: PostNavigationName.ListImageDetail,
      params: { data: post }
    });
  };

  const { described, name, image, video, id, state, disappointed, kudos } = post as IGetPostData;
  const [openModalFeel, setOpenModalFeel] = useState(false);
  const urls = image?.map(imageObj => imageObj.url) ?? [];
  const content = described;

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
  const totalFeel = parseInt(kudos) + parseInt(disappointed);
  const isInteract: boolean = !!totalFeel;
  return isLoading ? (
    <ActivityIndicator color={color.primary} style={{ marginTop: '50%' }} />
  ) : isNotExistPost ? (
    <Text variant='titleMedium' style={{ textAlign: 'center', padding: 20, marginTop: '50%' }}>
      Bài viết không còn tồn tại hoặc đã được hạn chế truy cập
    </Text>
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
            {post?.author?.name}
            {state ? (
              <Text style={{ fontSize: 15, textAlign: 'center' }}>{' ' + state}</Text>
            ) : null}
          </Text>
        }
        titleVariant='titleMedium'
        titleNumberOfLines={2}
        subtitle={
          <View style={[globalStyles.flexRow, globalStyles.centerAlignItem, styles.gap]}>
            <Text variant='bodySmall'>{coverTimeToNow(post?.created as string)}</Text>
            <MaterialIcon name='public' />
          </View>
        }
        left={Aprops => (
          <TouchableRipple onPress={handleNavigationProfile}>
            <Avatar.Image {...Aprops} source={getAvatarUri(post?.author.avatar as string)} />
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
          <Text>{described}</Text>
        </Card.Content>
      )}
      {urls?.length ? (
        <GridImage
          images={urls}
          onPress={handleNavigationPostDetail}
          style={{ width: '100%', height: 300, marginBottom: 10 }}
        />
      ) : null}
      {video ? <BaseVideo video={{ uri: video?.url }} thumbnail={{ uri: video?.thumb }} /> : null}
      <Divider />
      {isInteract && (
        <>
          <TouchableHighlight
            style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify, styles.padding]}
            onPress={() => {}}
            underlayColor={color.borderColor}
          >
            <>
              {!!totalFeel && (
                <View style={[globalStyles.flexRow, globalStyles.centerAlignItem]}>
                  <AntdIcon name='like1' size={15} color={color.primary} />
                  <Text>{totalFeel}</Text>
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
            <Text onPress={() => {}}>Bình luận</Text>
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
        authorId={post?.author.id as string}
        postId={post?.id as string}
        authorName={post?.author.name as string}
        post={post as unknown as PostProps}
        onDeletePost={() => {}}
      />
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

export default AllPostDetail;
