import { Text, TouchableOpacity } from 'react-native';
import { Avatar } from 'react-native-paper';
import { color } from 'src/common/constants/color';
export interface AccountProps {
  name: string;
  imageUrl?: string;
}
function Account(props: AccountProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 20,
        paddingVertical: 8,
        paddingHorizontal: 16,
        backgroundColor: color.white,
        borderRadius: 10
      }}
    >
      <Avatar.Image
        size={54}
        source={props.imageUrl ? { uri: props.imageUrl } : require('src/assets/avatar-default.png')}
      />
      <Text>{props.name}</Text>
      <Avatar.Icon icon='dots-vertical' color='black' />
    </TouchableOpacity>
  );
}

export default Account;
