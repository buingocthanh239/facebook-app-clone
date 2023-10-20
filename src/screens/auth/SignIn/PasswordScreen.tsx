import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseInputPassword from 'src/components/BaseInputPassword';
import BaseButton from 'src/components/BaseButton';
import { useNavigation } from '@react-navigation/native';

function PasswordScreen() {
  const navigation = useNavigation();
  const handleSubmit = () => navigation.navigate('ConfirmPolicyScreen' as never);
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Tạo mật khẩu
      </Text>
      <Text variant='bodyMedium'>
        Tạo mật khẩu gồm ít nhất 6 chữ cái hoặc chữ số.
        {'\n'}
        Bạn nên chọn mật khẩu thật khó đoán.
      </Text>
      <BaseInputPassword mode='outlined' label='Mật khẩu' />
      <BaseButton onPress={handleSubmit}>Tiếp</BaseButton>
    </WraperAuthScreen>
  );
}

export default PasswordScreen;
