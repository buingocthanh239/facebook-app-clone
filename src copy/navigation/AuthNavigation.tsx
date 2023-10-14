import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseHeader from 'src/components/BaseHeader';
import { LoginScreen, SignInScreen } from 'src/screens/auth';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        // headerTitle: '',
        // headerLeft: () => <TextInput.Icon icon='keyboard-backspace' />
        header: () => <BaseHeader title='' />
      }}
    >
      <Stack.Screen name='Login' options={{ headerShown: false }} component={LoginScreen} />
      <Stack.Screen name='SignIn' component={SignInScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
