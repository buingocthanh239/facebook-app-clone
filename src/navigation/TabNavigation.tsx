import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { HomeTab, VideoTab, NotificationTab, FriendTab, SettingTab } from 'src/screens/tab-bar';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Octicons from 'react-native-vector-icons/Octicons';
import { color } from 'src/common/constants/color';
import WraperScreen from 'src/components/WraperScreen';

const tab = createMaterialTopTabNavigator();

function TabNavigation() {
  return (
    <tab.Navigator
      screenOptions={{
        tabBarShowIcon: true,
        tabBarShowLabel: false,
        tabBarActiveTintColor: color.primary,
        tabBarStyle: { backgroundColor: color.sureface },
        tabBarPressColor: color.borderColor
      }}
    >
      <tab.Screen
        name='Home'
        component={HomeTab}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesomeIcon name='home' size={25} color={color} />
            ) : (
              <AntdIcon name='home' size={25} />
            )
        }}
      />
      <tab.Screen
        name='Video'
        component={VideoTab}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesomeIcon name='youtube-play' size={25} color={color} />
            ) : (
              <MaterialIcons name='ondemand-video' size={25} />
            )
        }}
      />
      <tab.Screen
        name='Friend'
        component={FriendTab}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <FontAwesomeIcon6 name='user-group' size={20} color={color} />
            ) : (
              <Octicons name='people' size={24} />
            )
        }}
      />
      <tab.Screen
        name='Notification'
        component={NotificationTab}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialIcons name='notifications' size={25} color={color} />
            ) : (
              <MaterialIcons name='notifications-none' size={25} />
            )
        }}
      />
      <tab.Screen
        name='Setting'
        component={SettingTab}
        options={{
          tabBarIcon: ({ focused, color }) =>
            focused ? (
              <MaterialIcons name='menu' size={25} color={color} />
            ) : (
              <MaterialIcons name='menu' size={25} />
            )
        }}
      />
    </tab.Navigator>
  );
}

const TabNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <TabNavigation />
  </WraperScreen>
);

export default TabNavigationWrapper;
