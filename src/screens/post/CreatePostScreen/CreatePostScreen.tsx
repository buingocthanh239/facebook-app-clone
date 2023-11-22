import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Modal,
  Button,
  StyleSheet,
  Image,
  ScrollView
  // Platform,
  // PermissionsAndroid
} from 'react-native';
// import { TextInput } from 'react-native-paper';
// import { MediaType, PhotoQuality, launchImageLibrary } from 'react-native-image-picker';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { color } from 'src/common/constants/color';

const CreatePostScreen = () => {
  const avatar = 'https://placekitten.com/200/200';
  const username = 'Ngô Hải Văn';
  const images = ['https://placekitten.com/300/200', 'https://placekitten.com/300/200'];
  const [listImage, setListImage] = useState(images);

  const [isModalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
    setListImage(images);
  };

  // const openImagePicker = async () => {
  //   if (Platform.OS === 'android') {
  //     try {
  //       const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
  //         title: 'App Camera Permission',
  //         message: 'App needs access to your camera ',
  //         buttonNeutral: 'Ask Me Later',
  //         buttonNegative: 'Cancel',
  //         buttonPositive: 'OK'
  //       });
  //       if (granted === PermissionsAndroid.RESULTS.GRANTED) {
  //         console.log('Camera permission given');
  //       } else {
  //         console.log('Camera permission denied');
  //       }
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   }
  //   const options = {
  //     mediaType: 'photo' as MediaType,
  //     includeBase64: true,
  //     quality: 0.4 as PhotoQuality,
  //     maxWidth: 800,
  //     maxHeight: 800
  //   };
  //   launchImageLibrary(options, response => {
  //     const src =
  //       response !== undefined && response?.assets !== undefined
  //         ? response?.assets[0]?.uri
  //         : avatar;
  //       if(src !== undefined && src !== null){
  //           images.push(src);
  //           setListImage(images);
  //       }
  //   });
  // };
  return (
    <ScrollView keyboardShouldPersistTaps='handled' style={styles.container}>
      {/* Phía trên */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: avatar }} style={styles.avatar} />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.wrapMode}>
            <Icon name='earth-asia' size={16} color={color.primary}></Icon>
            <Text style={styles.userMode}>Công khai</Text>
          </View>
        </View>
      </View>

      {/* Giữa */}
      <TextInput multiline placeholder='Nhập nội dung bài viết...' style={styles.input} />
      <View>
        {listImage.map((image, index) => {
          return <Image source={{ uri: image }} key={index}></Image>;
        })}
      </View>

      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          {/* Nội dung modal */}
          <Text>Chọn Ảnh/Video</Text>

          {/* Nút đóng modal */}
          <Button title='Đóng' onPress={toggleModal} />
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: 'white'
  },
  wrapMode: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    backgroundColor: color.opacity,
    borderRadius: 5,
    padding: 3
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  avatarContainer: {
    marginRight: 12
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25
  },
  userInfo: {
    // Thêm styles cho phần thông tin người dùng
  },
  username: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  userMode: {
    color: color.primary,
    fontWeight: 'bold'
  },
  input: {
    marginTop: 16,
    padding: 8,
    textAlignVertical: 'top',
    maxHeight: 500
  },
  button: {
    marginTop: 16,
    padding: 8,
    backgroundColor: 'blue',
    borderRadius: 8
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  image1: {
    height: 300,
    width: 200
  },
  image2: {
    height: 300,
    width: 200
  },
  image3: {
    height: 300,
    width: 200
  },
  image4: {
    height: 300,
    width: 200
  }
});

export default CreatePostScreen;
