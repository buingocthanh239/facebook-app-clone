import { Text } from 'react-native-paper';
import { useForm } from 'react-hook-form';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { yupResolver } from '@hookform/resolvers/yup';

import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseInputNumber from 'src/components/BaseInputNumber';
import BaseButton from 'src/components/BaseButton';
import { color } from 'src/common/constants/color';
import BaseForm from 'src/components/BaseForm';
import { otpFormSchema } from 'src/validation/signUp.validate';
import { IVerifyOtpSceenForm } from 'src/interfaces/auth.interface';

function SignInScreen() {
  const navigation: NavigationProp<AuthNavigationType, 'SaveInfoAccountScreen'> = useNavigation();
  const methods = useForm({ resolver: yupResolver(otpFormSchema) });
  const { handleSubmit } = methods;
  const onPressButton = (data: IVerifyOtpSceenForm) => {
    console.log(data); // call api check valid otp code
    navigation.navigate('SaveInfoAccountScreen');
  };

  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Nhập mã xác nhận
      </Text>
      <Text variant='bodyMedium'>
        Để xác nhận tài khoản, hãy nhập mã số gồm 5 chứ số mà chúng tôi đã gửi đến số
      </Text>
      <BaseForm methods={methods}>
        <BaseInputNumber mode='outlined' label='Mã xác nhận' name='otpCode' />
      </BaseForm>
      <BaseButton onPress={handleSubmit(onPressButton)}>Tiếp</BaseButton>
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
