import { TouchableHighlight, TouchableOpacity } from 'react-native';
import { Avatar, Card, CardTitleProps, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { getAvatarUri } from 'src/utils/helper';
export type BlockFirendItemProps = CardTitleProps & {
  avatar?: string;
  onPress?: () => void;
  onPressNonBlock?: () => any;
};
function BlockFriendItem(props: BlockFirendItemProps) {
  const { title, avatar, onPress, onPressNonBlock, ...remainProps } = props;
  return (
    <TouchableHighlight
      activeOpacity={1}
      underlayColor={color.borderColor}
      onPress={onPress ?? (() => {})}
    >
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
    </TouchableHighlight>
  );
}

export default BlockFriendItem;
