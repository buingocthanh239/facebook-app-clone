import { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { color } from 'src/common/constants/color';
import GridImage from 'src/components/GridImages/GridImage';
import OptionCard from './component/OptionCard';
import { MediaType, PhotoQuality, launchImageLibrary } from 'react-native-image-picker';

const CreatePostScreen = () => {
  const avatar = 'https://placekitten.com/200/200';
  const username = 'Ngô Hải Văn';
  const options = [
    {
      icon: 'insert-photo',
      title: 'Ảnh/video',
      color: color.green
    },
    {
      icon: 'emoji-emotions',
      title: 'Cảm xúc/hoạt động',
      color: color.yellow
    }
  ];

  const [listImage, setListImage] = useState(['']);

  const openImagePicker = async () => {
    if (Platform.OS === 'android') {
      try {
        const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA, {
          title: 'App Camera Permission',
          message: 'App needs access to your camera ',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        });
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Camera permission given');
        } else {
          console.log('Camera permission denied');
        }
      } catch (err) {
        console.warn(err);
      }
    }
    const options = {
      mediaType: 'mixed' as MediaType,
      includeBase64: true,
      quality: 0.4 as PhotoQuality,
      maxWidth: 800,
      maxHeight: 800
    };
    await launchImageLibrary(options, response => {
      const src =
        response !== undefined && response?.assets !== undefined ? response?.assets[0]?.uri : '';
      if (src !== undefined && src !== null && src !== '') {
        const newImages = [...listImage, src];
        setListImage(newImages);
        console.log(listImage);
      }
    });
  };

  const handleEnA = () => {
    console.log('Go to EnA Screen');
  };
  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' style={{ marginBottom: 90 }}>
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

        <TextInput multiline placeholder='Nhập nội dung bài viết...' style={styles.input} />
        <View>
          <GridImage
            images={listImage}
            onPress={() => console.log('image')}
            style={{ width: '100%', height: 300, marginBottom: 8 }}
          ></GridImage>
        </View>
      </ScrollView>
      <View style={styles.modelFooter}>
        {options.map((option, index) => {
          return (
            <TouchableOpacity key={index} onPress={index === 0 ? openImagePicker : handleEnA}>
              <OptionCard icon={option.icon} color={option.color} title={option.title} />
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
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
  userInfo: {},
  username: {
    fontSize: 18,
    fontWeight: 'bold',
    color: color.textColor
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
  modelFooter: {
    flex: 1,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0
  }
});

export default CreatePostScreen;
