import { Card, IconButton, TouchableRipple, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { FeelType, MarkType, NotificationType } from 'src/common/enum/commom';
import AvatarNotificationItem from '../AvatarNotificationItem';
import { coverTimeToNowAgo } from 'src/utils/dayjs';

export interface NotificationItemProps {
  time: string;
  type: NotificationType;
  isLook: boolean;
  ownerUri?: string;
  user?: {
    id: string;
    avatar: string;
    username: string;
  };
  post?: {
    id: string;
    described: string;
    status: string;
  };
  mark?: {
    mark_id: string;
    type_of_mark: MarkType;
    mark_content: string;
  };
  feel?: {
    feel_id: string;
    type: FeelType;
  };
  onPress?: () => any;
  onLongPress?: () => any;
  onPressRightIcon?: () => any;
}

function NotificationItem(props: NotificationItemProps) {
  const { onPress, isLook, ownerUri, type, onPressRightIcon, onLongPress, user } = props;
  let description: string;
  switch (type) {
    case NotificationType.FriendAccepted:
      description = `${user?.username} đồng ý yêu cầu kết bạn của bạn`;
      break;
    case NotificationType.FriendRequest:
      description = `${user?.username} đã gửi lời yêu cầu kết bạn với bạn`;
      break;
    case NotificationType.PostAdded:
      description = `Bài viết đã được đăng thành công`;
      break;
    case NotificationType.PostUpdated:
      description = `Bài viết đã được chỉnh sửa thành công`;
      break;
    case NotificationType.PostMarked:
      description = `${user?.username} đã đánh giá về bài viết của bạn`;
      break;
    case NotificationType.PostFelt:
      description = `${user?.username} đã bày tỏ cảm xúc về bài viết của bạn`;
      break;
    case NotificationType.MarkCommented:
      description = `${user?.username} đã đánh giá bình luận của bạn`;
      break;
    case NotificationType.VideoAdded:
      description = `Bạn đã đăng video thành công`;
      break;
    default:
      description = `Bạn vừa có một thông báo từ hệ thống`;
  }
  const time = coverTimeToNowAgo(props.time);
  return (
    <TouchableRipple
      onPress={onPress ?? (() => {})}
      onLongPress={onLongPress}
      rippleColor={color.outlineColor}
      underlayColor={color.activeOutlineColor}
    >
      <Card.Title
        title={<Text>{description}</Text>}
        subtitle={
          <Text variant='bodySmall' style={{ color: color.activeOutlineColor }}>
            {time}
          </Text>
        }
        titleNumberOfLines={3}
        left={({ size }) => <AvatarNotificationItem type={type} ownerUri={ownerUri} size={size} />}
        right={props => <IconButton {...props} icon='dots-horizontal' onPress={onPressRightIcon} />}
        style={{ backgroundColor: isLook ? color.backgroundColor : color.isNotLookBg }}
      />
    </TouchableRipple>
  );
}

export default NotificationItem;
