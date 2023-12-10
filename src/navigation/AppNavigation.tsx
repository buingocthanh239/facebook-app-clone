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
import ChangeInfoAfterSignUpScreen from 'src/screens/pending-sigup/ChangeInfoAfterSignUp';
import NotFoundScreen from 'src/screens/notfound/NotFoundScreen';

import Header from 'src/screens/tab-bar/components/Header';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
import { AppNaviagtionName } from 'src/common/constants/nameScreen';

const Stack = createNativeStackNavigator();

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
        auth.user?.active === '0' ? (
          <Stack.Screen
            name={AppNaviagtionName.VerifyOTPAfterLogin}
            component={VerifyOTPAfterLogin}
            options={{ headerShown: false }}
          />
        ) : auth.user?.active === '-1' ? (
          <Stack.Screen
            name={AppNaviagtionName.ChangeProfileAfterSign}
            options={{ headerShown: false }}
            component={ChangeInfoAfterSignUpScreen}
          />
        ) : (
          <>
            <Stack.Screen
              name={AppNaviagtionName.ChangeProfileAfterSign}
              options={{ headerShown: true, header: () => <Header /> }}
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
