import { Card, IconButton, TouchableRipple, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { FeelType, MarkType, NotificationType } from 'src/common/enum/commom';
import AvatarNotificationItem from '../AvatarNotificationItem';
import { coverTimeToNowAgo } from 'src/utils/dayjs';
import { ReactNode } from 'react';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';

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
  const authStore = useAppSelector(selectAuth);
  let Description: ReactNode;
  switch (type) {
    case NotificationType.FriendAccepted:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> đồng ý yêu cầu kết bạn của bạn
        </Text>
      );
      break;
    case NotificationType.FriendRequest:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> đã gửi lời yêu cầu kết bạn với bạn
        </Text>
      );
      break;
    case NotificationType.PostAdded:
      Description =
        authStore.user?.id === user?.id ? (
          <Text>Bài viết đã được đăng thành công.</Text>
        ) : (
          <Text>
            <Text variant='titleSmall'>{user?.username}</Text> vừa đăng một bài viết mới.
          </Text>
        );
      break;
    case NotificationType.PostUpdated:
      Description =
        authStore.user?.id === user?.id ? (
          <Text>Bài viết đã được chỉnh sửa thành công.</Text>
        ) : (
          <Text>
            <Text variant='titleSmall'>{user?.username}</Text> vừa chỉnh sửa một bài viết.
          </Text>
        );
      break;
    case NotificationType.PostMarked:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> đã đánh giá về bài viết của bạn.
        </Text>
      );
      break;
    case NotificationType.PostFelt:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> đã bày tỏ cảm xúc về bài viết của bạn.
        </Text>
      );
      break;
    case NotificationType.MarkCommented:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> đã đánh giá bình luận của bạn.
        </Text>
      );
      break;
    case NotificationType.VideoAdded:
      Description =
        authStore.user?.id === user?.id ? (
          <Text>Bạn đã đăng video thành công.</Text>
        ) : (
          <Text>
            <Text variant='titleSmall'>{user?.username}</Text> vừa đăng một video mới.
          </Text>
        );
      break;
    case NotificationType.PostCommented:
      Description = (
        <Text>
          <Text variant='titleSmall'>{user?.username}</Text> vừa bình luận bài viết.
        </Text>
      );

      break;
    default:
      Description = <Text>Bạn vừa có một thông báo từ hệ thống.</Text>;
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
        title={Description}
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
