import BaseButton from 'src/components/BaseButton';
import BaseInputText from 'src/components/BaseInputText';
import { KeyboardAvoidingView, Platform } from 'react-native';
import BaseInputPassword from 'src/components/BaseInputPassword';
import BaseInputNumber from 'src/components/BaseInputNumber';
function LoginScreen() {
  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <BaseButton title='Next' />
      <BaseButton title='Next' />
      <BaseInputText label='Email' />
      <BaseInputPassword label='Password' mode='outlined' />
      <BaseInputNumber label='Phone' />
    </KeyboardAvoidingView>
  );
}

export default LoginScreen;
