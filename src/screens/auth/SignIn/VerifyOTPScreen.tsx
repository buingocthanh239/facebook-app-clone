import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseInputNumber from 'src/components/BaseInputNumber';
import BaseButton from 'src/components/BaseButton';
import { useNavigation } from '@react-navigation/native';
import { color } from 'src/common/constants/color';

function SignInScreen() {
  const navigation = useNavigation();
  const handleSubmit = () => navigation.navigate('SaveInfoAccountScreen' as never);
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Nhập mã xác nhận
      </Text>
      <Text variant='bodyMedium'>
        Để xác nhận tài khoản, hãy nhập mã số gồm 5 chứ số mà chúng tôi đã gửi đến số
      </Text>
      <BaseInputNumber mode='outlined' label='Mã xác nhận' />
      <BaseButton onPress={handleSubmit}>Tiếp</BaseButton>
      <BaseButton
        mode='outlined'
        isUseTextOutlineColor
        textColor={color.textColor}
        borderColor={color.outlineColor}
      >
        Tôi không nhận được mã
      </BaseButton>
    </WraperAuthScreen>
  );
}

export default SignInScreen;
