import { View } from 'react-native';
import { FieldValue, useForm } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';
import { Avatar } from 'react-native-paper';
import { yupResolver } from '@hookform/resolvers/yup';

import BaseButton from 'src/components/BaseButton';
import BaseInputPassword from 'src/components/BaseInputPassword';
import BaseInputEmail from 'src/components/BaseInputEmail';
import BaseTextTitle from 'src/components/BaseTextTitle';
import BaseMetaLogo from 'src/components/BaseMetaLogo';
import WraperAuthScreen from 'src/components/WraperScreen';
import BaseForm from 'src/components/BaseForm';
import styles from './styles';
import { ILoginData } from 'src/interfaces/auth.interface';
import { loginFormSchema } from 'src/validation/login.validate';
function LoginScreen() {
  const navigation = useNavigation();
  const methods = useForm({ resolver: yupResolver(loginFormSchema) });
  const { handleSubmit } = methods;
  const onSubmit = (data: FieldValue<ILoginData>) => {
    console.log(data);
  };
  return (
    <WraperAuthScreen spaceBetween linnerGradient>
      <View style={styles.logo}>
        <Avatar.Image source={require('src/assets/logo.png')} size={55} />
      </View>

      <BaseForm methods={methods}>
        <View style={styles.formGroup}>
          <BaseInputEmail
            label='Số di động hoặc email'
            mode='outlined'
            name='email'
            rules={{ required: 'email is required' }}
          />
          <BaseInputPassword label='Mật khẩu' mode='outlined' name='password' />
          <BaseButton width={350} onPress={handleSubmit(onSubmit)}>
            Đăng nhập
          </BaseButton>
          <BaseTextTitle>Bạn quên mật khẩu ư?</BaseTextTitle>
        </View>
      </BaseForm>

      <View style={styles.bottom}>
        <BaseButton
          width={350}
          mode='outlined'
          onPress={() => navigation.navigate('FirstScreen' as never)}
        >
          Tạo tài khoản mới
        </BaseButton>
        <BaseMetaLogo />
      </View>
    </WraperAuthScreen>
  );
}
export default LoginScreen;
