import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';
import BaseMetaLogo from 'src/components/BaseMetaLogo';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import { Avatar } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import Account from './component/Account';

function HomeAuthScreen() {
  const navigation = useNavigation();
  const accounts = [
    { name: 'Bùi Ngọc Thành', imageUrl: '' },
    { name: 'Bùi Ngọc Thành', imageUrl: '' }
  ];
  return (
    <WraperAuthScreen spaceBetween>
      <View style={styles.facebookLogo}>
        <Avatar.Image source={require('src/assets/logo.png')} size={50} />
      </View>
      <View style={styles.accountGroup}>
        {accounts.map((account, index) => (
          <Account name={account.name} imageUrl={account.imageUrl} key={index} />
        ))}
        <TouchableOpacity activeOpacity={0.7}>
          <Text
            style={{
              padding: 16,
              backgroundColor: color.white,
              borderRadius: 8,
              fontSize: 16,
              color: color.primary,
              fontWeight: '500'
            }}
          >
            Tìm tài khoản
          </Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottomButtonGroup}>
        <BaseButton
          onPress={() => navigation.navigate('Login' as never)}
          mode='outlined'
          textColor={color.textColor}
          borderColor={color.outlineColor}
          isUseTextOutlineColor
        >
          Đăng nhập bằng tài khoản khác
        </BaseButton>
        <BaseButton
          mode='text'
          isUseTextOutlineColor
          textColor={color.textColor}
          onPress={() => navigation.navigate('FirstScreen' as never)}
        >
          Tạo tài khoản mới
        </BaseButton>
        <BaseMetaLogo />
      </View>
    </WraperAuthScreen>
  );
}

export default HomeAuthScreen;

const styles = StyleSheet.create({
  facebookLogo: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column-reverse'
  },
  accountGroup: {
    flex: 3,
    marginTop: 64,
    gap: 10
  },
  bottomButtonGroup: {
    flex: 1,
    justifyContent: 'flex-end',
    gap: 4,
    marginBottom: 10
  }
});
