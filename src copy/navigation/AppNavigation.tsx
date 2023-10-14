import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      initialRouteName='AuthNavigation'
    >
      <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
