import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from 'src/screens/Home';

const stack = createNativeStackNavigator();

function TabNavigation() {
  return (
    <stack.Navigator>
      <stack.Screen name='home' component={Home} />
    </stack.Navigator>
  );
}

export default TabNavigation;
