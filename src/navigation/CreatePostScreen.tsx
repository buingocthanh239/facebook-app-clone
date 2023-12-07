// Import các thành phần cần thiết từ react-navigation
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreatePostScreen from 'src/screens/post/CreatePostScreen';

const Stack = createNativeStackNavigator();

const CreatePostNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='CreatePostScreen'
        component={CreatePostScreen as React.ComponentType<CreatePostScreenProps>}
      />
    </Stack.Navigator>
  );
};

export default CreatePostNavigation;
