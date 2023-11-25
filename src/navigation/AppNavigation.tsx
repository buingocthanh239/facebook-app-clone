import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import Header from 'src/screens/tab-bar/components/Header';
import EditProfile from 'src/screens/profile/EditProfile';
import ProfileScreen from 'src/screens/profile/Profile';
import WraperScreen from 'src/components/WraperScreen';
// import SettingNavigation from './SettingNavigation';
import {
  SettingScreen,
  BlockFriendScreen,
  SettingInfo,
  SettingInfoName,
  SettingNotification,
  SettingPassword,
  SettingPushNotification,
  SettingSecurityLogin
} from 'src/screens/setting';
const Stack = createNativeStackNavigator();
const TabNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <TabNavigation />
  </WraperScreen>
);
// const SettingNavigationWrapper = () => (
//   <WraperScreen paddingBottom={0} paddingHorizontal={0}>
//     <SettingNavigation />
//   </WraperScreen>
// );

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
        component={TabNavigationWrapper}
      />
      <Stack.Screen name='SettingScreen' component={SettingScreen} />
      <Stack.Screen name='BlockFriendScreen' component={BlockFriendScreen} />
      <Stack.Screen name='SettingInfo' component={SettingInfo} />
      <Stack.Screen name='SettingInfoName' component={SettingInfoName} />
      <Stack.Screen name='SettingNotification' component={SettingNotification} />
      <Stack.Screen name='SettingPassword' component={SettingPassword} />
      <Stack.Screen name='SettingPushNotification' component={SettingPushNotification} />
      <Stack.Screen name='SettingSecurityLogin' component={SettingSecurityLogin} />

      <Stack.Screen name='Profile' options={{ headerShown: false }} component={ProfileScreen} />
      <Stack.Screen name='EditProfile' options={{ headerShown: false }} component={EditProfile} />
      <Stack.Screen
        name='AuthNavigation'
        options={{ headerShown: false }}
        component={AuthNavigation}
      />
    </Stack.Navigator>
  );
}

export default AppNavigation;
