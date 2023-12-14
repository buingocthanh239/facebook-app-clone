import { Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import { Avatar, TextInput } from 'react-native-paper';
import { color } from 'src/common/constants/color';
export interface AccountProps {
  name: string;
  imageUrl?: string;
}
function Account(props: AccountProps) {
  return (
    <TouchableOpacity activeOpacity={0.7} style={styles.wrapperAccount}>
      <View style={styles.account}>
        <Avatar.Image
          size={54}
          source={
            props.imageUrl ? { uri: props.imageUrl } : require('src/assets/avatar-default.jpg')
          }
        />
        <Text>{props.name}</Text>
      </View>
      <View style={styles.vertivalIcon}>
        <TextInput.Icon icon='dots-vertical' color={color.activeOutlineColor} />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  wrapperAccount: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: color.white,
    borderRadius: 10
  },
  account: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 20
  },
  vertivalIcon: { alignItems: 'center', marginRight: 10, marginBottom: 25 }
});
export default Account;
