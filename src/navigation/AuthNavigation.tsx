import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseHeader from '../components/BaseHeader';
import LoginScreen from 'src/screens/auth/Login';
import HomeAuth from 'src/screens/auth/HomeAuth';
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
import CreatePostScreen from 'src/screens/post/CreatePostScreen';
import AllFriendScreen from 'src/screens/tab-bar/FriendTab/AllFriendScreen';
import SuggestionsScreen from 'src/screens/tab-bar/FriendTab/SuggestionsScreen/SuggestionsScreen';
import ProfileScreen from 'src/screens/profile/Profile/ProfileScreen';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <BaseHeader />
      }}
    >
      <Stack.Screen
        name='EditProfile'
        options={{ headerShown: false }}
        component={SuggestionsScreen}
      />

      <Stack.Screen
        name='AllFriendScreen'
        options={{ headerShown: false }}
        component={AllFriendScreen}
      />
      <Stack.Screen name='Profile' options={{ headerShown: false }} component={ProfileScreen} />
      <Stack.Screen
        name='CreatePostScreen'
        options={{ headerShown: false }}
        component={CreatePostScreen}
      />
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
