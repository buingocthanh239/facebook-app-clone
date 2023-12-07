import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthNavigation from './AuthNavigation';
import TabNavigation from './TabNavigation';
import Header from 'src/screens/tab-bar/components/Header';
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
import SuggestionsScreen from 'src/screens/tab-bar/FriendTab/SuggestionsScreen/SuggestionsScreen';
import AllFriendScreen from 'src/screens/tab-bar/FriendTab/AllFriendScreen';
import CreatePostScreen from 'src/screens/post/CreatePostScreen';
import EnAScreen from 'src/screens/post/EmojiAndAction/EnAScreen';
import { Button, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { HeaderWithSearch } from 'src/components/BaseHeader';
import ProfileScreen from 'src/screens/profile/Profile/ProfileScreen';
import EditProfile from 'src/screens/profile/EditProfile';
import { FriendTab } from 'src/screens/tab-bar';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
// import { useEffect } from 'react';
import NotFoundScreen from 'src/screens/notfound/NotFoundScreen';
// import { getTokenFromKeychain } from 'src/utils/kechain';

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
  const auth = useAppSelector(selectAuth);
  // const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const getToken = async () => {
  //     const token = await getTokenFromKeychain();
  //     if (!token) {
  //       dispatch(reset());
  //     }
  //     return token;
  //   };
  //   getToken();
  // }, []);

  return (
    <Stack.Navigator>
      {auth.isAuthenticated ? (
        <>
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
          <Stack.Screen
            name='SuggestionsScreen'
            component={SuggestionsScreen}
            options={{
              headerShown: true,
              header: () => <HeaderWithSearch title='Gợi ý' titleIsCenter={false} />
            }}
          />
          <Stack.Screen
            name='AllFriendScreen'
            component={AllFriendScreen}
            options={{
              headerShown: true,
              header: () => <HeaderWithSearch title='Bạn bè' titleIsCenter={false} />
            }}
          />
          <Stack.Screen name='SettingSecurityLogin' component={SettingSecurityLogin} />
          <Stack.Screen
            name='Profile'
            options={{
              header: () => <HeaderWithSearch title='Ngô Hải Văn' titleIsCenter={true} />
            }}
            component={ProfileScreen}
          />
          <Stack.Screen
            name='EditProfile'
            options={{ headerTitle: 'Chỉnh sửa trang cá nhân' }}
            component={EditProfile}
          />
          <Stack.Screen
            name='CreatePostScreen'
            component={CreatePostScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, marginLeft: -15, fontWeight: '500' }}>
                  Tạo bài viết
                </Text>
              ),
              headerRight: () => (
                <Button
                  onPress={() => {
                    alert('Đăng bài viết!');
                  }}
                  labelStyle={{ color: 'white' }}
                  style={{ borderRadius: 4, backgroundColor: color.primary }}
                >
                  Đăng
                </Button>
              )
            }}
          />
          <Stack.Screen
            name='EnAScreen'
            component={EnAScreen}
            options={{
              headerTitle: () => (
                <Text style={{ fontSize: 18, marginLeft: -15, fontWeight: '500' }}>
                  Bạn đang cảm thấy thế nào?
                </Text>
              )
            }}
          />
          <Stack.Screen
            name='FriendTab'
            component={FriendTab}
            options={{ header: () => <HeaderWithSearch title='Bạn bè' titleIsCenter={true} /> }}
          />
          <Stack.Screen
            name='NotFoundScreen'
            component={NotFoundScreen}
            options={{ headerTitle: 'Không tìm thấy nội dung' }}
          />
        </>
      ) : (
        <Stack.Screen
          name='AuthNavigation'
          options={{ headerShown: false }}
          component={AuthNavigation}
        />
      )}
    </Stack.Navigator>
  );
}

export default AppNavigation;
