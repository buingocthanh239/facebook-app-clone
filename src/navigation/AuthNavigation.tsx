import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseHeader from '../components/BaseHeader';
import LoginScreen from 'src/screens/auth/Login';
import HomeAuth from 'src/screens/auth/HomeAuth';
import CameraScreen from 'src/screens/profile/Camera/CameraScreen';
import ProfileScreen from 'src/screens/profile/Profile/ProfileScreen';
import {
  ConfirmPolicyScreen,
  FirstScreen,
  GenderScreen,
  NameScreen,
  EmailScreen,
  PasswordScreen,
  VerifyOTPScreen,
  SaveInfoAccountScreen,
  BirthDayScreen
} from 'src/screens/auth/SignIn';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <BaseHeader />
      }}
    >
      <Stack.Screen name='Profile' options={{ headerShown: false }} component={ProfileScreen} />
      <Stack.Screen name='Camera' options={{ headerShown: false }} component={CameraScreen} />
      <Stack.Screen name='HomeAuth' options={{ headerShown: false }} component={HomeAuth} />
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Group>
        <Stack.Screen name='FirstScreen' component={FirstScreen} />
        <Stack.Screen name='NameScreen' component={NameScreen} />
        <Stack.Screen name='BirthdayScreen' component={BirthDayScreen} />
        <Stack.Screen name='GenderScreen' component={GenderScreen} />
        <Stack.Screen name='EmailScreen' component={EmailScreen} />
        <Stack.Screen name='PasswordScreen' component={PasswordScreen} />
        <Stack.Screen name='ConfirmPolicyScreen' component={ConfirmPolicyScreen} />
        <Stack.Screen name='VerifyOTPScreen' component={VerifyOTPScreen} />
        <Stack.Screen name='SaveInfoAccountScreen' component={SaveInfoAccountScreen} />
      </Stack.Group>
    </Stack.Navigator>
  );
}

export default AuthNavigation;
