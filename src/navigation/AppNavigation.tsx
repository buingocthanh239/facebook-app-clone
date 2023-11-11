import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false
      }}
      // initialRouteName='AuthNavigation'
    >
      <Stack.Screen name='TabNavigation' component={TabNavigation} />
      <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
