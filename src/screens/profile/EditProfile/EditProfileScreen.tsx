import { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid
} from 'react-native';
import { launchImageLibrary, MediaType, PhotoQuality } from 'react-native-image-picker';
import { color } from 'src/common/constants/color';
import { getAvatarUri } from 'src/utils/helper';

function EditProfile() {
  const [avatar, setAvatar] = useState('https://placekitten.com/200/200');
  const [cover, setCover] = useState('https://placekitten.com/350/200');
  const openImagePickerAvatar = async () => {
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
      mediaType: 'photo' as MediaType,
      includeBase64: true,
      quality: 0.4 as PhotoQuality,
      maxWidth: 800,
      maxHeight: 800
    };
    launchImageLibrary(options, response => {
      const src =
        response !== undefined && response?.assets !== undefined
          ? response?.assets[0]?.uri
          : avatar;
      setAvatar(src !== undefined && src !== null ? src : '');
    });
  };
  const openImagePickerCover = async () => {
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
      mediaType: 'photo' as MediaType,
      includeBase64: true,
      quality: 0.4 as PhotoQuality,
      maxWidth: 800,
      maxHeight: 800
    };
    launchImageLibrary(options, response => {
      const src =
        response !== undefined && response?.assets !== undefined ? response?.assets[0]?.uri : cover;
      setCover(src !== undefined && src !== null ? src : '');
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.wrapTexta}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>
          Ảnh đại diện
        </Text>
        <TouchableOpacity
          onPress={() => {
            openImagePickerAvatar();
          }}
        >
          <Text style={{ fontSize: 18, color: color.primary }}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.wrapAvatar}>
        <Image source={getAvatarUri(avatar)} style={styles.avatar}></Image>
      </TouchableOpacity>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>Ảnh bìa</Text>
        <TouchableOpacity
          onPress={() => {
            openImagePickerCover();
          }}
        >
          <Text style={{ fontSize: 18, color: color.primary }}>Chỉnh sửa</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.wrapAvatar} activeOpacity={0.8}>
        <Image source={{ uri: cover }} style={styles.cover}></Image>
      </TouchableOpacity>
      <View style={styles.wrapText}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', color: color.textColor }}>Tiểu sử</Text>
        <TouchableOpacity activeOpacity={0.8}>
          <Text style={{ fontSize: 18, color: color.primary }}>Thêm</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.wrapAvatar} activeOpacity={0.8}>
        <Text style={{ fontSize: 18 }}>Mô tả bản thân...</Text>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: color.borderBottom,
    backgroundColor: color.white
  },
  wrapTexta: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  wrapText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 15,
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ddd'
  },
  avatar: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginRight: 10
  },
  wrapAvatar: {
    alignItems: 'center',
    marginTop: 20
  },
  cover: {
    height: 200,
    width: '100%',
    borderRadius: 10
  }
});

export default EditProfile;
