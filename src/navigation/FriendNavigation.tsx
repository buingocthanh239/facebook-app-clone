// Import các thành phần cần thiết từ react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { FriendTab } from 'src/screens/tab-bar';

const Stack = createNativeStackNavigator();

const FriendNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name='FriendTab' component={FriendTab} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default FriendNavigation;
