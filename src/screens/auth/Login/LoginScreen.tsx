import BaseButton from 'src/components/BaseButton';
import { View } from 'react-native';
import BaseInputPassword from 'src/components/BaseInputPassword';
import BaseInputEmail from 'src/components/BaseInputEmail';
import BaseTextTitle from 'src/components/BaseTextTitle';
import { Avatar } from 'react-native-paper';
import BaseMetaLogo from 'src/components/BaseMetaLogo';
import LinearGradient from 'react-native-linear-gradient';
import { color } from 'src/common/constants/color';

function LoginScreen() {
  return (
    <LinearGradient
      colors={color.linearBackgroundColor}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={{ paddingHorizontal: 20, flex: 1, justifyContent: 'space-between' }}>
        <View style={{ alignSelf: 'center', flex: 1, flexDirection: 'column-reverse' }}>
          <Avatar.Image source={require('src/assets/logo.png')} size={55} />
        </View>
        <View style={{ flex: 3, justifyContent: 'center' }}>
          <BaseInputEmail label='Số di động hoặc email' mode='outlined' />
          <BaseInputPassword
            label='Mật khẩu'
            mode='outlined'
            style={{ marginBottom: 10, marginTop: 8 }}
          />
          <BaseButton width={350}>Đăng nhập</BaseButton>
          <BaseTextTitle style={{ marginTop: 10 }}>Bạn quên mật khẩu ư?</BaseTextTitle>
        </View>
        <View style={{ flex: 1, justifyContent: 'flex-end' }}>
          <BaseButton width={350} mode='outlined'>
            Tạo tài khoản mới
          </BaseButton>
          <BaseMetaLogo />
        </View>
      </View>
    </LinearGradient>
  );
}

export default LoginScreen;
