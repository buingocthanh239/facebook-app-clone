import { Avatar } from 'react-native-paper';
import { NotificationType } from 'src/common/enum/commom';
import { CommentIcon, FriendSuggestionIcon, PostIcon, VideoIcon } from '../sub-icon';

export type AvatarNotificationItemProps = {
  type: NotificationType;
  ownerUri?: string;
  size?: number;
};
function AvatarNotificationItem(props: AvatarNotificationItemProps) {
  const { type, ownerUri, size } = props;
  let SubIcon = CommentIcon;
  switch (type) {
    case NotificationType.FriendAccepted:
    case NotificationType.FriendRequest:
      SubIcon = FriendSuggestionIcon;
      break;
    case NotificationType.PostAdded:
    case NotificationType.PostUpdated:
    case NotificationType.PostMarked:
    case NotificationType.PostFelt:
      SubIcon = PostIcon;
      break;
    case NotificationType.MarkCommented:
      SubIcon = CommentIcon;
      break;
    case NotificationType.VideoAdded:
      SubIcon = VideoIcon;
      break;
    default:
      SubIcon = PostIcon;
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
