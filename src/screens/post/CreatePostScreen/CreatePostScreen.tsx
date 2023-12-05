import { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  Platform,
  PermissionsAndroid,
  BackHandler
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';
import { color } from 'src/common/constants/color';
import GridImage from 'src/components/GridImages/GridImage';
import OptionCard from './component/OptionCard';
import Modal from 'react-native-modal';
import { MediaType, PhotoQuality, launchImageLibrary } from 'react-native-image-picker';
import { NavigationProp, useNavigation } from '@react-navigation/native';

const CreatePostScreen = ({ route }: CreatePostScreenProps) => {
  const selectedItem = route?.params?.selectedItem;

  const navigation: NavigationProp<CreatePostNavigationType> = useNavigation();
  const avatar = 'https://placekitten.com/200/200';
  const username = 'Ngô Hải Văn';
  interface IOption {
    icon: string;
    title: string;
    color: string;
    textColor?: string;
  }
  const options: IOption[] = [
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

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const optionsModal: IOption[] = [
    {
      icon: 'flag',
      title: `Lưu làm bản nháp`,
      color: color.textColor
    },
    {
      icon: 'delete',
      title: `Bỏ bài viết`,
      color: color.textColor
    },
    {
      icon: 'check',
      title: `Tiếp tục chỉnh sửa`,
      color: color.primary,
      textColor: color.primary
    }
  ];
  //Xử lý sử kiện button back của android
  useEffect(() => {
    const backAction = () => {
      console.log('Back button pressed!');
      showModal();
      return true;
    };

    const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction);

    // Xóa lắng nghe khi component bị hủy
    return () => backHandler.remove();
  }, []);

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
    navigation.navigate('EnAScreen');
  };

  return (
    <View style={styles.container}>
      <ScrollView keyboardShouldPersistTaps='handled' style={{ marginBottom: 90 }}>
        <View style={styles.header}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatar }} style={styles.avatar} />
          </View>
          <View style={styles.userInfo}>
            <View style={{ flexDirection: 'row', marginRight: 80, marginBottom: 5 }}>
              <Text style={styles.username}>
                {username}{' '}
                {selectedItem ? (
                  !selectedItem?.label.startsWith('Đang') ? (
                    <Text style={styles.username}>
                      - Đang {selectedItem.emoji} cảm thấy {selectedItem.label.toLowerCase()}
                    </Text>
                  ) : (
                    <Text style={styles.username}>
                      - Đang {selectedItem.emoji} {selectedItem.label.slice(5)}
                    </Text>
                  )
                ) : (
                  <Text></Text>
                )}
              </Text>
            </View>
            <View style={styles.wrapMode}>
              <Icon name='earth-asia' size={16} color={color.primary} style={{ padding: 5 }}></Icon>
              <Text style={styles.userMode}>Công khai</Text>
            </View>
          </View>
        </View>

        <TextInput
          multiline
          placeholder={
            listImage.length === 1 ? 'Bạn đang nghĩ gì...' : 'Hãy nói gì đó về các bức ảnh này...'
          }
          style={styles.input}
        />
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
            <TouchableOpacity
              key={index}
              onPress={index === 0 ? openImagePicker : handleEnA}
              style={{ borderTopColor: color.borderBottom, borderTopWidth: 1 }}
            >
              <OptionCard icon={option.icon} color={option.color} title={option.title} />
            </TouchableOpacity>
          );
        })}
      </View>
      <Modal
        isVisible={modalVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <View style={{ marginBottom: 10 }}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 10,
                marginLeft: 15
              }}
            >
              <View style={{ alignContent: 'center' }}>
                <Text style={{ fontWeight: '500', fontSize: 17, color: color.textColor }}>
                  Bạn muốn hoàn thành bài viết của mình sau?
                </Text>
                <Text style={{ marginTop: 5, fontSize: 14 }}>
                  Lưu làm bản nháp hoặc bạn có thể tiếp tục chỉnh sửa
                </Text>
              </View>
            </View>
          </View>
          {optionsModal.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={
                index === 0
                  ? () => console.log('Save Post & Go to Home Page')
                  : index === 1
                  ? () => console.log('Go to Home Page')
                  : index === 2
                  ? hideModal
                  : () => console.log('Lỗi!')
              }
            >
              <View style={[styles.option, { height: 19 * 3 }]}>
                <OptionCard
                  icon={option.icon}
                  title={option.title}
                  color={option.color}
                  textColor={option?.textColor}
                />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginBottom: 60
  },
  wrapMode: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    backgroundColor: color.opacity,
    borderRadius: 5,
    padding: 0
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16
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
    fontWeight: 'bold',
    alignContent: 'center'
  },
  input: {
    paddingHorizontal: 16,
    textAlignVertical: 'top',
    maxHeight: 500,
    fontSize: 16
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
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    paddingTop: 20
  },
  option: {
    paddingVertical: 0
  }
});

export default CreatePostScreen;
