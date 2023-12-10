import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostScreen from 'src/screens/post/CreatePostScreen';
import EnAScreen from 'src/screens/post/EmojiAndAction/EnAScreen';
import { Button, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import WraperScreen from 'src/components/WraperScreen';
import { TransitionPresets } from '@react-navigation/stack';
import { PostNavigationName } from 'src/common/constants/nameScreen';

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
          headerTitle: () => (
            <Text style={{ fontSize: 18, marginLeft: -15, fontWeight: '500' }}>Tạo bài viết</Text>
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
    </Stack.Navigator>
  );
}

const PostNavigationWrapper = () => (
  <WraperScreen paddingBottom={0} paddingHorizontal={0}>
    <PostNavigation />
  </WraperScreen>
);

export default PostNavigationWrapper;
