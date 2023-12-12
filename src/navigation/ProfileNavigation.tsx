import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HeaderWithSearch } from 'src/components/BaseHeader';
import ProfileScreen from 'src/screens/profile/Profile/ProfileScreen';
import EditProfile from 'src/screens/profile/EditProfile';
import WraperScreen from 'src/components/WraperScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { ProfileNavigationName } from 'src/common/constants/nameScreen';

const Stack = createNativeStackNavigator();

function ProfileNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        ...TransitionPresets.SlideFromRightIOS,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }}
    >
      <Stack.Screen
        name={ProfileNavigationName.Profile}
        options={{
          header: () => <HeaderWithSearch title='Ngô Hải Văn' titleIsCenter={true} />
        }}
        component={ProfileScreen}
      />
      <Stack.Screen
        name={ProfileNavigationName.EditProfile}
        options={{ headerTitle: 'Chỉnh sửa trang cá nhân' }}
        component={EditProfile}
      />
    </Stack.Navigator>
  );
}

const ProfileNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <ProfileNavigation />
  </WraperScreen>
);

export default ProfileNavigationWrapper;
