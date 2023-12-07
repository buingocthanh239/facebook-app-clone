import { TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import styles from './styles';
import { NavigationProp, useNavigation } from '@react-navigation/core';

function NewPostCreate() {
  const navigation: NavigationProp<PropfileNavigationType, 'Profile'> = useNavigation();
  const navigation2: NavigationProp<CreatePostNavigationType, 'CreatePostScreen'> = useNavigation();
  const navigaProfileScreen = () => navigation.navigate('Profile');
  const handleNavigateCreatePost = () => navigation2.navigate('CreatePostScreen', {});
  return (
    <View style={styles.wrapperCreatePost}>
      <TouchableOpacity activeOpacity={0.8} onPress={navigaProfileScreen}>
        <Avatar.Image source={require('src/assets/avatar-default.png')} size={40} />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.createPostButton}
        activeOpacity={0.6}
        onPress={handleNavigateCreatePost}
      >
        <Text style={{ paddingLeft: 10 }}>Bạn đang nghĩ gì?</Text>
      </TouchableOpacity>
      <IconButton icon='file-image' iconColor={color.green} size={25} />
    </View>
  );
}

export default NewPostCreate;
