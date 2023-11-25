import { createNativeStackNavigator } from '@react-navigation/native-stack';
import BaseHeader from 'src/components/BaseHeader';
import SettingScreen from 'src/screens/setting/SettingScreen';

const Stack = createNativeStackNavigator();
function SettingNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        header: () => <BaseHeader backgroundColor />
      }}
    >
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
    </Stack.Navigator>
  );
}

export default SettingNavigation;
