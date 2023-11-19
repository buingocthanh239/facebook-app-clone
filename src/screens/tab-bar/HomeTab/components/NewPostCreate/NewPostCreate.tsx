import { TouchableOpacity, View } from 'react-native';
import { Avatar, IconButton, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import styles from './styles';

function NewPostCreate() {
  return (
    <View style={styles.wrapperCreatePost}>
      <Avatar.Image source={require('src/assets/avatar-default.png')} size={40} />
      <TouchableOpacity style={styles.createPostButton} activeOpacity={0.6}>
        <Text style={{ paddingLeft: 10 }}>Bạn đang nghĩ gì?</Text>
      </TouchableOpacity>
      <IconButton icon='file-image' iconColor={color.green} size={25} />
    </View>
  );
}

export default NewPostCreate;
