import { Avatar } from 'react-native-paper';
import { NotificationType } from 'src/common/enum/commom';
import {
  CommentIcon,
  FriendSuggestionIcon,
  PostIcon,
  VideoIcon,
  BirthdayIcon,
  SecurityIcon
} from '../sub-icon';

export type AvatarNotificationItemProps = {
  type: NotificationType;
  ownerUri?: string;
  size?: number;
};
function AvatarNotificationItem(props: AvatarNotificationItemProps) {
  const { type, ownerUri, size } = props;
  let SubIcon = CommentIcon;
  switch (type) {
    case NotificationType.BIRTHDAY:
      SubIcon = BirthdayIcon;
      break;
    case NotificationType.FIREND_SUGGESTION:
      SubIcon = FriendSuggestionIcon;
      break;
    case NotificationType.POST_NOTFICATION:
      SubIcon = PostIcon;
      break;
    case NotificationType.SECURITY_NOTIFICATION:
      SubIcon = SecurityIcon;
      break;
    case NotificationType.VIDEO_AVAILABALE:
      SubIcon = VideoIcon;
      break;
    default:
      SubIcon = CommentIcon;
  }
  return (
    <>
      <Avatar.Image
        source={ownerUri ? { uri: ownerUri } : require('src/assets/logo.png')}
        size={size}
      />
      <SubIcon />
    </>
  );
}

export default AvatarNotificationItem;
