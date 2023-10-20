import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';
import { useNavigation } from '@react-navigation/native';

function ConfirmPolicyScreen() {
  const naviagion = useNavigation();
  const handleSubmit = () => naviagion.navigate('VerifyOTPScreen' as never);
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Đồng ý với điều khoản và chính sách của Fakebook
      </Text>
      <Text variant='bodyMedium'>
        Những người dùng dịch vụ của chúng tôi có thể đã tải thông tin của bạn lên Fakebook.Tìm hiểu
        thêm.
      </Text>
      <Text variant='bodyMedium'>
        Bằng cách nhấn vào Tôi đồng ý. Bạn đã đồng ý tạo tài khoản cũng như chấp thuận Điều khoản,
        Chính sách quyền riêng tư và Chính sách cookie của Fakebook.
      </Text>
      <Text variant='bodyMedium'>
        Chính sách quyền riêng tư mô tả các cách chúng tôi có thể dùng thông tin thu thập được khi
        bạn tạo tài khoản. Chẳng hạn chúng tôi sử dụng thông tin này để cung cấp, cá nhân hóa và cải
        thiện các sản phẩm của mình bao gồm quảng cáo.
      </Text>
      <BaseButton onPress={handleSubmit}>Tôi đồng ý</BaseButton>
    </WraperAuthScreen>
  );
}

export default ConfirmPolicyScreen;
