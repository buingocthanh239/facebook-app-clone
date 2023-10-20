import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';
import { useNavigation } from '@react-navigation/native';

function HomeAuthScreen() {
  const navigation = useNavigation();
  return (
    <WraperAuthScreen>
      <BaseButton onPress={() => navigation.navigate('Login' as never)}>
        Đăng nhập bằng tài khoản khác
      </BaseButton>
    </WraperAuthScreen>
  );
}

export default HomeAuthScreen;
