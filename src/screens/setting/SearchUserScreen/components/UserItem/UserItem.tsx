import { Avatar, Card, CardTitleProps, TouchableRipple, Text } from 'react-native-paper';
import { getAvatarUri } from 'src/utils/helper';
export type UserItemProps = CardTitleProps & {
  avatar?: string;
  onPress?: () => void;
};
function UserItem(props: UserItemProps) {
  const { title, avatar, onPress, ...remainProps } = props;
  return (
    <Card.Title
      {...remainProps}
      title={
        <TouchableRipple onPress={onPress ?? (() => {})}>
          <Text variant='titleMedium'>{title}</Text>
        </TouchableRipple>
      }
      left={() => (
        <TouchableRipple onPress={onPress ?? (() => {})}>
          <Avatar.Image
            source={getAvatarUri(avatar as string)}
            size={40}
            style={{ opacity: 0.8 }}
          />
        </TouchableRipple>
      )}
    />
  );
}

export default UserItem;
