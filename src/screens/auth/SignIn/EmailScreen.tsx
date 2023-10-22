import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';
import BaseInputEmail from 'src/components/BaseInputEmail';
import { color } from 'src/common/constants/color';
import { useNavigation } from '@react-navigation/native';

function EmailScreen() {
  const navigation = useNavigation();
  const handleSubmit = () => navigation.navigate('PasswordScreen' as never);
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Email của bạn là gì?
      </Text>
      <Text variant='bodyMedium'>
        Nhập email có thể dùng để liên hệ với bạn. Thông tin này sẽ không hiển thị với ai khác trên
        trang cá nhân của bạn.
      </Text>
      <BaseInputEmail mode='outlined' label='Email' />
      <Text variant='bodySmall'>
        Bạn cũng sẽ nhận được email của chúng tôi và có thể chọn không nhận bất cứ lúc nào.
      </Text>
      <BaseButton onPress={handleSubmit}>Tiếp</BaseButton>
      <BaseButton
        mode='outlined'
        borderColor={color.outlineColor}
        textColor={color.textColor}
        isUseTextOutlineColor
      >
        Đăng nhập bằng số di động
      </BaseButton>
    </WraperAuthScreen>
  );
}

export default EmailScreen;
