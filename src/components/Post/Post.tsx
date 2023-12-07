import { View, TouchableHighlight, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Text, Divider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeICon from 'react-native-vector-icons/FontAwesome';
import { color } from 'src/common/constants/color';
import globalStyles from 'src/common/styles/globalStyles';
import { useEffect, useState } from 'react';
import GridImage from '../GridImages/GridImage';
import { IVideo } from 'src/interfaces/common.interface';
import BaseVideo from '../BaseVideo';
import ReportModal from './ReportModal';
const MAX_LENGTH_CONTENT = 500;

// define props
export interface PostProps {
  ownerAvatar?: string;
  ownerName: string;
  createdAt: string;
  content?: string;
  imageUrl?: string[];
  video?: IVideo;
  numberLikes?: number;
  numberComments?: number;
  numberShares?: number;
  friendComments?: string[];
}

function Post(props: PostProps) {
  const [isShowFullContent, setIsShowFullContent] = useState(true);
  const [displayContent, setDisplayContent] = useState('');
  const { friendComments, content, imageUrl, video } = props;
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

  const isInteract: boolean = !!props.numberComments || !!props.numberLikes || !!props.numberShares;
  const AvatarSource = props.ownerAvatar
    ? { url: props.ownerAvatar }
    : require('src/assets/avatar-default.png');
  return (
    <View style={styles.postContainer}>
      {friendComments && friendComments?.length !== 0 && (
        <View style={styles.userComments}>
          <View
            style={[globalStyles.flexRow, globalStyles.centerAlignItem, styles.userCommentsContent]}
          >
            {friendComments?.length === 1 ? (
              <Text variant='titleSmall'>{friendComments[0]}</Text>
            ) : (
              <Text variant='titleSmall'>
                {friendComments[0]}, {friendComments[1]}
              </Text>
            )}
            <Text>đã bình luận</Text>
          </View>
          <Divider />
        </View>
      )}
      <Card.Title
        title={props.ownerName}
        titleVariant='titleMedium'
        subtitle={
          <View style={[globalStyles.flexRow, globalStyles.centerAlignItem, styles.gap]}>
            <Text>{props.createdAt} giờ</Text>
            <MaterialIcon name='public' />
          </View>
        }
        left={props => <Avatar.Image {...props} source={AvatarSource} />}
        right={props => (
          <View style={globalStyles.flexRow}>
            <IconButton {...props} icon='dots-horizontal' onPress={showModal} />
            <IconButton {...props} icon='close-thick' onPress={() => {}} />
          </View>
        )}
      />
      {props?.content && (
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
      {imageUrl?.length !== 0 && imageUrl && (
        <GridImage
          images={imageUrl as string[]}
          onPress={() => console.log('image')}
          style={{ width: '100%', height: 300, marginBottom: 8 }}
        />
      )}
      {video ? (
        <BaseVideo video={{ uri: video.videoUri }} thumbnail={{ uri: video.thumnail }} />
      ) : null}
      <Divider />
      {isInteract && (
        <>
          <View style={[globalStyles.flexRow, globalStyles.spaceBetweenJustify, styles.padding]}>
            {props.numberLikes && (
              <View style={[globalStyles.flexRow, globalStyles.centerAlignItem]}>
                <AntdIcon name='like1' size={15} color={color.primary} />
                <Text>{props?.numberLikes}</Text>
              </View>
            )}
            {(props.numberComments || props.numberShares) && (
              <View style={[globalStyles.flexRow, styles.gap]}>
                {props?.numberComments && <Text>{props?.numberComments} bình luận</Text>}
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
      <ReportModal isVisible={modalVisible} onBackdropPress={hideModal} />
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
