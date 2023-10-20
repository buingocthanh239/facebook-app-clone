import { Text } from 'react-native-paper';
import BaseButton from 'src/components/BaseButton';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import { color } from 'src/common/constants/color';

function SaveInfoAccountScreen() {
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Lưu thông tin đăng nhập?
      </Text>
      <Text variant='bodyMedium'>
        Chúng tôi sẽ lưu thông tin đăng nhập cho để bạn không cần nhập vào lần sau.
      </Text>
      <BaseButton>Lưu</BaseButton>
      <BaseButton
        mode='outlined'
        borderColor={color.outlineColor}
        textColor={color.textColor}
        isUseTextOutlineColor
      >
        Lúc khác
      </BaseButton>
    </WraperAuthScreen>
  );
}

export default SaveInfoAccountScreen;
