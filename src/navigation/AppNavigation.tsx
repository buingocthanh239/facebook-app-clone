import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import Header from 'src/screens/tab-bar/components/Header';
const Stack = createNativeStackNavigator();
function AppNavigation() {
  return (
    <Stack.Navigator
    // screenOptions={{
    //   headerShown: false
    // }}
    // initialRouteName='AuthNavigation'
    >
      <Stack.Screen
        name='TabNavigation'
        options={{ header: () => <Header /> }}
        component={TabNavigation}
      />
      <Stack.Screen name='AuthNavigation' component={AuthNavigation} />
    </Stack.Navigator>
  );
}

export default AppNavigation;
