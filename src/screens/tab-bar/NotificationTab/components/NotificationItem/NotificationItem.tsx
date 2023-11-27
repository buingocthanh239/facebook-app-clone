import { Card, IconButton, TouchableRipple, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { NotificationType } from 'src/common/enum/commom';
import AvatarNotificationItem from '../AvatarNotificationItem';

export interface NotificationItemProps {
  description: string;
  time: string;
  type: NotificationType;
  isLook: boolean;
  ownerUri?: string;
  onPress?: () => any;
  onLongPress?: () => any;
  onPressRightIcon?: () => any;
}

function NotificationItem(props: NotificationItemProps) {
  const { onPress, description, time, isLook, ownerUri, type, onPressRightIcon, onLongPress } =
    props;
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
