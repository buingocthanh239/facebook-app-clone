import { TouchableOpacity } from 'react-native';
import { Avatar, Card, CardTitleProps, Text, TouchableRipple } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { unBlockApi } from 'src/services/block.service';
import { getAvatarUri } from 'src/utils/helper';
export type BlockFirendItemProps = CardTitleProps & {
  avatar?: string;
  id: string;
  onPress?: () => void;
  onPressNonBlock?: () => any;
};
function BlockFriendItem(props: BlockFirendItemProps) {
  const { title, avatar, onPress, id, ...remainProps } = props;
  const onPressNonBlock = async () => {
    try {
      await unBlockApi({ user_id: id });
    } catch (e) {
      return;
    }
  };
  return (
    <TouchableRipple underlayColor={color.borderColor} onPress={onPress ?? (() => {})}>
      <Card.Title
        {...remainProps}
        title={title}
        left={() => (
          <Avatar.Image
            source={getAvatarUri(avatar as string)}
            size={40}
            style={{ opacity: 0.8 }}
          />
        )}
        right={() => (
          <TouchableOpacity activeOpacity={0.6} onPress={onPressNonBlock ?? (() => {})}>
            <Text
              style={{
                paddingHorizontal: 20,
                fontWeight: '600',
                fontSize: 16,
                color: color.activeOutlineColor
              }}
            >
              Bỏ chặn
            </Text>
          </TouchableOpacity>
        )}
      />
    </TouchableRipple>
  );
}

export default BlockFriendItem;
