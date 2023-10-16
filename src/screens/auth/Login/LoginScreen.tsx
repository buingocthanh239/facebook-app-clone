import BaseButton from 'src/components/BaseButton';
import { View } from 'react-native';
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
    <WraperAuthScreen>
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
        <BaseButton
          width={350}
          mode='outlined'
          style={{ marginBottom: 8 }}
          onPress={() => navigation.navigate('SignIn' as never)}
        >
          Tạo tài khoản mới
        </BaseButton>
        <BaseMetaLogo />
      </View>
    </WraperAuthScreen>
  );
}

export default LoginScreen;
