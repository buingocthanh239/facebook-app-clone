import { View, Image, TouchableHighlight, StyleSheet } from 'react-native';
import { Avatar, Card, IconButton, Text, Divider } from 'react-native-paper';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import IonIcons from 'react-native-vector-icons/Ionicons';
import FontAwesomeICon from 'react-native-vector-icons/FontAwesome';
import { color } from 'src/common/constants/color';
import globalStyles from 'src/common/styles/globalStyles';
import { useEffect, useState } from 'react';
const MAX_LENGTH_CONTENT = 500;

// define props
export interface PostProps {
  ownerAvatar?: string;
  ownerName: string;
  createdAt: string;
  content?: string;
  imageUrl?: string[];
  videoUrl?: string;
  numberLikes?: number;
  numberComments?: number;
  numberShares?: number;
  friendComments?: string[];
}

function Post(props: PostProps) {
  const [isShowFullContent, setIsShowFullContent] = useState(true);
  const [displayContent, setDisplayContent] = useState('');
  const { friendComments, content, imageUrl } = props;
  const isOneImage = imageUrl?.length === 1;
  const isTwoImage = imageUrl?.length === 2;
  // const isThreeImage = imageUrl?.length === 3;
  // const isFourImage = imageUrl?.length === 4;
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
    if (isShowFullContent) {
      setIsShowFullContent(displayContent.length === MAX_LENGTH_CONTENT);
      setDisplayContent(content?.slice(0, MAX_LENGTH_CONTENT) as string);
    }
  };
  const handlePressDisplayFullContent = () => {
    setIsShowFullContent(true);
    setDisplayContent(content as string);
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
            <IconButton {...props} icon='dots-horizontal' onPress={() => {}} />
            <IconButton {...props} icon='close-thick' onPress={() => {}} />
          </View>
        )}
      />
      {props?.content && (
        <Card.Content>
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
      {imageUrl?.length !== 0 && (
        <View style={[styles.marginVertical, isTwoImage && globalStyles.flexRow]}>
          {isOneImage && (
            <Image
              source={{
                uri: 'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/402085654_844894067320431_7015984115871699296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHR-gONjTsyk8T465DnZfGzvUUHACaazna9RQcAJprOdh9afvGnS8-t4ddaVLHGfQUcJhClWiHXrzso9e4VWuCW&_nc_ohc=Q-EIISuJ4yMAX-eUtsy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfDHJDCLkNi_MBuS2KAaqYELm7IGgkkC0b8Gjx6tq-vznA&oe=655FA3E4'
              }}
              style={{ width: 400, height: 200, objectFit: 'fill' }}
            />
          )}
          {isTwoImage && (
            <>
              <Image
                source={{
                  uri: 'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/402085654_844894067320431_7015984115871699296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHR-gONjTsyk8T465DnZfGzvUUHACaazna9RQcAJprOdh9afvGnS8-t4ddaVLHGfQUcJhClWiHXrzso9e4VWuCW&_nc_ohc=Q-EIISuJ4yMAX-eUtsy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfDHJDCLkNi_MBuS2KAaqYELm7IGgkkC0b8Gjx6tq-vznA&oe=655FA3E4'
                }}
                style={{ width: 200, height: 200, marginRight: 4, objectFit: 'fill' }}
              />
              <Image
                source={{
                  uri: 'https://scontent.fhan5-9.fna.fbcdn.net/v/t39.30808-6/402085654_844894067320431_7015984115871699296_n.jpg?_nc_cat=109&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHR-gONjTsyk8T465DnZfGzvUUHACaazna9RQcAJprOdh9afvGnS8-t4ddaVLHGfQUcJhClWiHXrzso9e4VWuCW&_nc_ohc=Q-EIISuJ4yMAX-eUtsy&_nc_ht=scontent.fhan5-9.fna&oh=00_AfDHJDCLkNi_MBuS2KAaqYELm7IGgkkC0b8Gjx6tq-vznA&oe=655FA3E4'
                }}
                style={{ width: 200, height: 200, objectFit: 'fill' }}
              />
            </>
          )}
        </View>
      )}
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
