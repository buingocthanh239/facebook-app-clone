import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostScreen from 'src/screens/post/CreatePostScreen';
import EnAScreen from 'src/screens/post/EmojiAndAction/EnAScreen';
import { Text } from 'react-native-paper';
import WraperScreen from 'src/components/WraperScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { PostNavigationName } from 'src/common/constants/nameScreen';
import ListImageScreen from 'src/screens/post/ListImage/ListImageScreen';
import { ListImageDetail } from 'src/screens/post/PostDetail';

const Stack = createNativeStackNavigator();

function PostNavigation() {
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
        name={PostNavigationName.CreatePostScreen}
        component={CreatePostScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={PostNavigationName.EnAScreen}
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
        name={PostNavigationName.ListImageScreen}
        component={ListImageScreen}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name={PostNavigationName.ListImageScreen}
        component={ListImageDetail}
        options={{
          headerShown: false
        }}
      />
    </Stack.Navigator>
  );
}

const PostNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <PostNavigation />
  </WraperScreen>
);

export default PostNavigationWrapper;
