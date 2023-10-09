import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen, SignInScreen } from 'src/screens/auth';

const Stack = createNativeStackNavigator();
function AuthNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true
      }}
    >
      <Stack.Screen name='Login' component={LoginScreen} />
      <Stack.Screen name='SignIn' component={SignInScreen} />
    </Stack.Navigator>
  );
}

export default AuthNavigation;
