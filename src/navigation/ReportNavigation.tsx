import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { TransitionPresets } from '@react-navigation/stack';
import { ReportNavigationName } from 'src/common/constants/nameScreen';
import WraperScreen from 'src/components/WraperScreen';
import ReportScreen from 'src/screens/report/ReportScreen';

const Stack = createNativeStackNavigator();

function ReportNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        ...TransitionPresets.SlideFromRightIOS,
        animation: 'slide_from_right',
        gestureEnabled: true,
        gestureDirection: 'vertical'
      }}
    >
      <Stack.Screen
        name={ReportNavigationName.ReportScreen}
        component={ReportScreen}
        options={{ title: 'Báo cáo' }}
      />
    </Stack.Navigator>
  );
}

const ReportNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <ReportNavigation />
  </WraperScreen>
);

export default ReportNavigationWrapper;
