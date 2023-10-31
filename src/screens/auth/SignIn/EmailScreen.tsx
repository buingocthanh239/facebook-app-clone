import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { NavigationProp, RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseButton from 'src/components/BaseButton';
import BaseInputEmail from 'src/components/BaseInputEmail';
import { color } from 'src/common/constants/color';
import BaseForm from 'src/components/BaseForm';
import { IEmailScreenForm } from 'src/interfaces/auth.interface';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import { emailFormSchema } from 'src/validation/signUp.validate';

function EmailScreen() {
  const methods = useForm({ resolver: yupResolver(emailFormSchema) });
  const { handleSubmit } = methods;
  const navigation: NavigationProp<AuthNavigationType, 'PasswordScreen'> = useNavigation();
  const route: RouteProp<AuthNavigationType, 'EmailScreen'> = useRoute();
  const onPressNextButton = (data: IEmailScreenForm) => {
    navigation.navigate('PasswordScreen', {
      ...route.params,
      ...data
    });
  };
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Email của bạn là gì?
      </Text>
      <Text variant='bodyMedium'>
        Nhập email có thể dùng để liên hệ với bạn. Thông tin này sẽ không hiển thị với ai khác trên
        trang cá nhân của bạn.
      </Text>
      <BaseForm methods={methods}>
        <BaseInputEmail mode='outlined' label='Email' name='email' />
      </BaseForm>
      <Text variant='bodySmall'>
        Bạn cũng sẽ nhận được email của chúng tôi và có thể chọn không nhận bất cứ lúc nào.
      </Text>
      <BaseButton onPress={handleSubmit(onPressNextButton)}>Tiếp</BaseButton>
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
