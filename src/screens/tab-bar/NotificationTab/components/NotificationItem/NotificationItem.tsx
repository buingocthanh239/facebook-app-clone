import { Avatar, Card, IconButton, TouchableRipple } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { NotificationType } from 'src/common/enum/commom';

export interface NotificationItemProps {
  description: string;
  time: string;
  type: NotificationType;
  isLook: boolean;
  ownerUri?: string;
  onPress?: () => any;
}

function NotificationItem(props: NotificationItemProps) {
  const { onPress } = props;
  return (
    <TouchableRipple onPress={onPress ?? (() => {})} background={color.activeOutlineColor}>
      <Card.Title
        title='Bùi Ngọc thành'
        subtitle='34 phút trước'
        left={props => <Avatar.Image {...props} source={require('src/assets/default-image.png')} />}
        right={props => <IconButton {...props} icon='dots-horizontal' />}
      />
    </TouchableRipple>
  );
}

export default NotificationItem;
