import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Platform,
  PermissionsAndroid,
  ScrollView
} from 'react-native';
import { MediaType, PhotoQuality, launchImageLibrary } from 'react-native-image-picker';
import WraperAuthScreen from 'src/components/WraperScreen';
import { color } from 'src/common/constants/color';
import BaseInputText from 'src/components/BaseInputText';
import BaseForm from 'src/components/BaseForm';
import BaseButton from 'src/components/BaseButton';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { nameFormSchema } from 'src/validation/signUp.validate';
import { useAppDispatch } from 'src/redux';
import { IChangeInfoScreen } from 'src/interfaces/profile.interface';
import { changeInfoAfterSignup } from 'src/redux/slices/profileSlice';
import { Buffer } from 'buffer';

const ChangeInfoAfterSignUpScreen: React.FC = () => {
  const methods = useForm({ resolver: yupResolver(nameFormSchema) });
  const { handleSubmit } = methods;

  const [avatarSource, setAvatarSource] = useState<File | null>(null);
  const [avatarPreview, setAvatarPreview] = useState('');
  const selectAvatar = async () => {
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
      const srcUri =
        response !== undefined && response?.assets !== undefined
          ? response?.assets[0]?.uri
          : avatarPreview;
      setAvatarPreview(srcUri !== undefined && srcUri !== null ? srcUri : '');

      const assets =
        response !== undefined && response?.assets !== undefined ? response?.assets[0] : {};

      const base64Image =
        response !== undefined && response?.assets !== undefined ? response?.assets[0].base64 : '';
      const fileName = assets.fileName;
      const fileType = assets.type;
      const buffer = Buffer.from(base64Image !== undefined ? base64Image : '', 'base64');
      const blob = new Blob([buffer], { type: fileType });

      const file = new File([blob], fileName !== undefined ? fileName : '', { type: fileType });
      setAvatarSource(file);
      console.log(typeof avatarSource, avatarSource);
    });
  };

  const dispatch = useAppDispatch();

  const onPressNextButton = (data: IChangeInfoScreen) => {
    const username = data.firstname + ' ' + data.lastname;

    const formData = {
      username,
      avatar: avatarPreview
    };
    dispatch(changeInfoAfterSignup(formData));
  };

  return (
    <WraperAuthScreen spaceBetween linnerGradient>
      <ScrollView>
        <BaseForm methods={methods}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: color.textColor, paddingBottom: 10 }}
          >
            Thêm ảnh đại diện
          </Text>
          <Text style={{ fontSize: 16, color: color.textColor }}>
            Hãy thêm ảnh đại diện để bạn bè nhận ra bạn. Mọi người có thể nhìn thấy ảnh của bạn.
          </Text>
          <TouchableOpacity onPress={selectAvatar} style={{ alignItems: 'center', paddingTop: 20 }}>
            <View style={styles.avatarContainer}>
              {avatarPreview ? (
                <TouchableOpacity style={styles.wrapAvatar} onPress={selectAvatar}>
                  <Image source={{ uri: avatarPreview }} style={styles.avatar}></Image>
                </TouchableOpacity>
              ) : (
                <Text>Chọn ảnh đại diện</Text>
              )}
            </View>
          </TouchableOpacity>

          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: color.textColor, paddingBottom: 10 }}
          >
            Bạn tên gì?
          </Text>
          <Text style={{ fontSize: 16, color: color.textColor }}>
            Nhập tên bạn sử dụng trong đời thực.
          </Text>
          <View
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between',
              paddingTop: 10
            }}
          >
            <BaseInputText mode='outlined' label='Họ' style={{ width: 165 }} name='firstname' />
            <BaseInputText mode='outlined' label='Tên' style={{ width: 165 }} name='lastname' />
          </View>
        </BaseForm>
        <BaseButton style={{ marginTop: 20 }} onPress={handleSubmit(onPressNextButton)}>
          Tiếp
        </BaseButton>
      </ScrollView>
    </WraperAuthScreen>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10
  },
  avatarContainer: {
    width: 225,
    height: 225,
    borderRadius: 125,
    backgroundColor: color.borderBottom,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderColor: color.white,
    borderWidth: 5
  },
  wrapAvatar: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  avatar: {
    width: 225,
    height: 225,
    borderRadius: 125,
    borderColor: color.white,
    borderWidth: 5
  },
  nameContainer: {
    marginBottom: 20,
    paddingTop: 20,
    flexDirection: 'row'
  },
  input: {
    flex: 1,
    marginHorizontal: 5,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: color.primary,
    padding: 10,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    textAlign: 'center'
  }
});

export default ChangeInfoAfterSignUpScreen;
