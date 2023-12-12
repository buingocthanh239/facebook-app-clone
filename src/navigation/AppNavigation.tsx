import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';

import TabNavigationWrapper from './TabNavigation';
import SettingNavigationWrapper from './SettingNavigation';
import FriendNavigationWrapper from './FriendNavigation';
import ProfileNavigationWrapper from './ProfileNavigation';
import SearchNavigationWrapper from './SearchNavigation';
import PostNavigationWrapper from './PostNavigation';
import AuthNavigation from './AuthNavigation';
import VerifyOTPAfterLogin from 'src/screens/pending-sigup/VerifyOTPAfterLogin';
// import ChangeInfoAfterSignUpScreen from 'src/screens/pending-sigup/ChangeInfoAfterSignUp';
import NotFoundScreen from 'src/screens/notfound/NotFoundScreen';

import Header from 'src/screens/tab-bar/components/Header';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getProfile, selectAuth } from 'src/redux/slices/authSlice';
import { AppNaviagtionName } from 'src/common/constants/nameScreen';
import { useEffect } from 'react';
import { AccountStatus } from 'src/common/enum/commom';
import LoginScreen from 'src/screens/auth/Login/LoginScreen';

const Stack = createNativeStackNavigator();

function AppNavigation() {
  const auth = useAppSelector(selectAuth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (auth.user?.active === AccountStatus.Active) {
      dispatch(getProfile({ user_id: auth.user.id }));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [auth.user?.active, dispatch]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        ...TransitionPresets.SlideFromRightIOS,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }}
    >
      {auth.isAuthenticated ? (
        auth.user?.active === AccountStatus.Inactive ? (
          <Stack.Screen
            name={AppNaviagtionName.VerifyOTPAfterLogin}
            component={VerifyOTPAfterLogin}
            options={{ headerShown: false }}
          />
        ) : auth.user?.active === AccountStatus.Pending ? (
          <Stack.Screen
            name={AppNaviagtionName.ChangeProfileAfterSign}
            options={{ headerShown: false }}
            component={LoginScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name={AppNaviagtionName.TabNavigation}
              options={{ headerShown: false, header: () => <Header /> }}
              component={TabNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.SettingNavigation}
              component={SettingNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.FriendNavigation}
              component={FriendNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.SearchNavigation}
              component={SearchNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.PostNavigation}
              component={PostNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.ProfileNavigation}
              component={ProfileNavigationWrapper}
            />
            <Stack.Screen
              name={AppNaviagtionName.NotFoundScreen}
              component={NotFoundScreen}
              options={{ headerTitle: 'Không tìm thấy nội dung' }}
            />
          </>
        )
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
