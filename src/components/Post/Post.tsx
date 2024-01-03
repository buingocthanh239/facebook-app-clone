import { View, TouchableHighlight, StyleSheet } from 'react-native';
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

  const [isShowFullContent, setIsShowFullContent] = useState(true);
  const [displayContent, setDisplayContent] = useState('');
  const { described, name, image, video, id, status } = props;
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

  const isInteract: boolean =
    props.feel !== '0' || props.comment_mark !== '0' || !!props.numberShares;
  return (
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
          <Text variant='titleMedium' style={{ fontSize: 16 }}>
            {props.author?.name}
            <Text variant='bodyMedium'>{' ' + status}</Text>
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
          <View style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify, styles.padding]}>
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
          </View>
          <Divider />
        </>
      )}

      <View style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify]}>
        <TouchableHighlight
          style={[globalStyles.flexRow, styles.padding, styles.gap]}
          underlayColor={color.borderColor}
          onPress={() => {}}
        >
          <>
            <AntdIcon name='like2' size={20} />
            <Text>Thích</Text>
          </>
        </TouchableHighlight>
        <TouchableHighlight
          style={[globalStyles.flexRow, styles.padding, styles.gap]}
          underlayColor={color.borderColor}
          onPress={() => {}}
        >
          <>
            <FontAwesomeICon name='comment-o' size={20} />
            <Text>Bình luận</Text>
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
      <ReportModal isVisible={modalVisible} onBackdropPress={hideModal} id={id} />
    </View>
  );
}

const styles = StyleSheet.create({
  postContainer: { backgroundColor: color.sureface, marginTop: 8 },
  userComments: { marginLeft: 10, paddingTop: 5 },
  userCommentsContent: { marginBottom: 5, gap: 5 },
  padding: { padding: 10 },
  gap: { gap: 10 },
  marginVertical: { marginVertical: 10 }
});

export default Post;
