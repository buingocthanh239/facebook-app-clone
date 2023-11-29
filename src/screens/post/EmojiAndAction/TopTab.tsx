import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { color } from 'src/common/constants/color';
import EmojiTab from './EmojiTab';
import ActionTab from './ActionTab';

const Tab = createMaterialTopTabNavigator();

function TopTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: color.primary,
        tabBarContentContainerStyle: { backgroundColor: color.white },
        tabBarPressColor: color.borderColor
      }}
    >
      <Tab.Screen name='Cảm xúc' component={EmojiTab} />
      <Tab.Screen name='Hành động' component={ActionTab} />
    </Tab.Navigator>
  );
}

export default TopTab;
