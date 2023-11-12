import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import {
  HomeTab,
  VideoTab,
  NotificationTab,
  FriendTab,
  OtherOptionTab,
  MyTabBar
} from 'src/screens/tab-bar';

const tab = createMaterialTopTabNavigator();

function TabNavigation() {
  return (
    <tab.Navigator
      tabBar={props => <MyTabBar {...props} />}
      screenOptions={{
        tabBarShowIcon: true,
        tabBarShowLabel: false
      }}
    >
      <tab.Screen name='Home' component={HomeTab} />
      <tab.Screen name='Video' component={VideoTab} />
      <tab.Screen name='Friend' component={FriendTab} />
      <tab.Screen name='Notification' component={NotificationTab} />
      <tab.Screen name='OtherOption' component={OtherOptionTab} />
    </tab.Navigator>
  );
}

export default TabNavigation;
