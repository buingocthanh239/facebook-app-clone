import BaseButton from 'src/components/BaseButton';
import { View, StyleSheet } from 'react-native';
import BaseInputPassword from 'src/components/BaseInputPassword';
import BaseInputEmail from 'src/components/BaseInputEmail';
import BaseTextTitle from 'src/components/BaseTextTitle';
import { Avatar } from 'react-native-paper';
import BaseMetaLogo from 'src/components/BaseMetaLogo';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import { useNavigation } from '@react-navigation/native';

function LoginScreen() {
  const navigation = useNavigation();
  return (
    <WraperAuthScreen spaceBetween>
      <View style={styles.logo}>
        <Avatar.Image source={require('src/assets/logo.png')} size={55} />
      </View>
      <View style={styles.formGroup}>
        <BaseInputEmail label='Số di động hoặc email' mode='outlined' />
        <BaseInputPassword label='Mật khẩu' mode='outlined' />
        <BaseButton width={350}>Đăng nhập</BaseButton>
        <BaseTextTitle>Bạn quên mật khẩu ư?</BaseTextTitle>
      </View>
      <View style={styles.bottom}>
        <BaseButton
          width={350}
          mode='outlined'
          onPress={() => navigation.navigate('FirstScreen' as never)}
        >
          Tạo tài khoản mới
        </BaseButton>
        <BaseMetaLogo />
      </View>
    </WraperAuthScreen>
  );
}
export default LoginScreen;
const styles = StyleSheet.create({
  logo: {
    alignSelf: 'center',
    flex: 1,
    flexDirection: 'column-reverse'
  },
  formGroup: {
    flex: 3,
    flexDirection: 'column',
    gap: 8,
    justifyContent: 'center'
  },

  bottom: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    gap: 4
  }
});
