import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import EmojiTab from './EmojiTab';
import ActionTab from './ActionTab';
import { color } from 'src/common/constants/color';

const Tab = createMaterialTopTabNavigator();

function TopTapNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarShowIcon: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: color.primary,
        tabBarContentContainerStyle: { backgroundColor: color.sureface },
        tabBarPressColor: color.borderColor
      }}
    >
      <Tab.Screen name='Emoji' component={EmojiTab} />
      <Tab.Screen name='Action' component={ActionTab} />
    </Tab.Navigator>
  );
}

export default TopTapNavigation;
