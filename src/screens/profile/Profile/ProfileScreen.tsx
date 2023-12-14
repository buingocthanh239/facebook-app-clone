import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import styles from './styles';
import FriendField from './component/FriendField';
import OptionCard from './component/OptionCard';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/Fontisto';
import CreatePostCard from '../../../components/CreatePostCard/CreatePostCard';
import { color } from 'src/common/constants/color';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { RouteProp, useRoute } from '@react-navigation/native';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
import { ProfileNavigationName } from 'src/common/constants/nameScreen';
import { IUser } from 'src/interfaces/common.interface';
import { getAvatarUri } from 'src/utils/helper';
import { getUserInfoApi } from 'src/services/profile.services';

function ProfileScreen() {
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalCoverVisible, setModalCoverVisible] = useState(false);
  const [modalResponseVisible, setModalResponseVisible] = useState(false);
  const [profile, setProfile] = useState<IUser | null>(null);

  const route: RouteProp<PropfileNavigationType, ProfileNavigationName.Profile> = useRoute();
  const auth = useAppSelector(selectAuth);
  const user_id = route.params.user_id;
  const isOwnProfile = auth.user?.id === user_id;
  useEffect(() => {
    if (isOwnProfile) {
      setProfile(auth.user);
    } else {
      const fetchUserData = async (data: { user_id: string }) => {
        try {
          const result = await getUserInfoApi(data);
          console.log(result);
          setProfile(result.data);
        } catch (error) {
          return console.log({ message: 'sever availability' });
        }
      };
      fetchUserData({ user_id }).catch(console.error);
    }
  }, []);
  const isFriend = profile?.is_friend;

  const navigation: NavigationProp<PropfileNavigationType, 'EditProfile'> = useNavigation();

  const navigateEditProfileScreen = () => navigation.navigate('EditProfile');

  /*
   * isFirend =
   * *0: chưa gửi/nhận lời mời kết bạn với tài khoản này
   * *1: là bạn bè với tài khoản này
   * *2: đang gửi lời mời kết bạn với tài khoản này
   * *3: đang nhận lời mời kết bạn với tài khoản này
   */

  const showModalAvatar = () => {
    setModalAvatarVisible(true);
  };
  const hideModalAvatar = () => {
    setModalAvatarVisible(false);
  };
  const showModalCover = () => {
    setModalCoverVisible(true);
  };
  const hideModalCover = () => {
    setModalCoverVisible(false);
  };
  const showModalResponse = () => {
    setModalResponseVisible(true);
  };
  const hideModalResponse = () => {
    setModalResponseVisible(false);
  };
  const optionsAvatar = [
    {
      icon: 'account-circle',
      title: 'Xem ảnh đại diện'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh đại diện'
    }
  ];
  const optionsCover = [
    {
      icon: 'account-circle',
      title: 'Xem ảnh bìa'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh bìa'
    }
  ];
  const optionsResponse = [
    {
      icon: 'check',
      title: 'Chấp nhận'
    },
    {
      icon: 'delete-outline',
      title: 'Xóa'
    }
  ];
  const totalHeight = 2 * 25;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.coverPhoto} onPress={showModalCover} activeOpacity={0.8}>
          <Image style={styles.coverPhoto} source={getAvatarUri(profile?.avatar as string)} />
        </TouchableOpacity>
        <View style={styles.cameraIconWrapper}>
          <TouchableOpacity style={styles.cameraIcon} onPress={showModalCover} activeOpacity={0.8}>
            <IconButton
              icon='camera'
              mode='contained'
              iconColor='black'
              containerColor='#E6E6EF'
              size={28}
              onPress={showModalCover}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={showModalAvatar}
          activeOpacity={0.8}
        >
          <Image style={styles.avatar} source={getAvatarUri(profile?.avatar as string)} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cameraIconAvatar}
          onPress={showModalAvatar}
          activeOpacity={0.8}
        >
          <IconButton
            icon='camera'
            mode='contained'
            iconColor={color.textColor}
            containerColor='#E6E6EF'
            size={32}
            onPress={showModalAvatar}
          />
        </TouchableOpacity>
        <View style={styles.infomation}>
          <Text style={styles.name}>{profile?.username}</Text>
          <Text style={styles.bio}>{profile?.description}</Text>
        </View>
      </View>
      {isOwnProfile ? (
        <View style={styles.section}>
          <TouchableOpacity
            activeOpacity={0.8}
            style={styles.button}
            onPress={navigateEditProfileScreen}
          >
            <Text style={styles.buttonText}>Edit Profile</Text>
          </TouchableOpacity>
        </View>
      ) : !isOwnProfile && isFriend === '0' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconFA name='user-plus' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Thêm bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconF name='messenger' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '12%',
              alignItems: 'center'
            }}
          >
            <Icon name='dots-horizontal' size={20}></Icon>
          </TouchableOpacity>
        </View>
      ) : !isOwnProfile && isFriend === '1' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconFA name='user-check' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconF name='messenger' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '12%',
              alignItems: 'center'
            }}
          >
            <Icon name='dots-horizontal' size={20}></Icon>
          </TouchableOpacity>
        </View>
      ) : !isOwnProfile && isFriend === '2' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconFA6 name='user-clock' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Hủy lời mời</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconF name='messenger' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '12%',
              alignItems: 'center'
            }}
          >
            <Icon name='dots-horizontal' size={20}></Icon>
          </TouchableOpacity>
        </View>
      ) : !isOwnProfile && isFriend === '3' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={showModalResponse}
          >
            <IconFA6 name='user-check' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Phản hồi</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconF name='messenger' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '12%',
              alignItems: 'center'
            }}
          >
            <Icon name='dots-horizontal' size={20}></Icon>
          </TouchableOpacity>
        </View>
      ) : null}
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name='home' size={20} color='black' />
          {profile?.address ? (
            <>
              <Text style={styles.detailLabel}>Sống tại</Text>
              <Text style={styles.detailText}>{profile?.address}</Text>
            </>
          ) : (
            <Text style={styles.detailLabel}>không có thông tin</Text>
          )}
        </View>
        <View style={styles.detailRow}>
          <Icon name='map-marker' size={20} color='black' />

          {profile?.city ? (
            <>
              <Text style={styles.detailLabel}>Đến từ</Text>
              <Text style={styles.detailText}>{profile?.city}</Text>
            </>
          ) : (
            <Text style={styles.detailLabel}>không có thông tin</Text>
          )}
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.editPublicButton}>
        <Text style={styles.editPublicButtonText}>
          {isOwnProfile ? 'Chỉnh sửa chi tiết công khai' : 'Xem thông tin chi tiết'}
        </Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <FriendField></FriendField>
      </View>
      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 20 }}>
          Bài viết
        </Text>
        <CreatePostCard avatar={profile?.avatar as string} />
      </View>
      <Modal
        isVisible={modalAvatarVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalAvatar}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {optionsAvatar.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => console.log(`Selected: ${option.title}`)}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        isVisible={modalCoverVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalCover}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {optionsCover.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => console.log(`Selected: ${option.title}`)}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
      <Modal
        isVisible={modalResponseVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModalResponse}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {optionsResponse.map((option, index) => (
            <TouchableOpacity
              activeOpacity={0.8}
              key={index}
              onPress={() => {
                console.log(`Selected: ${option.title}`);
                hideModalResponse();
              }}
            >
              <View style={[styles.option, { height: totalHeight }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </ScrollView>
  );
}

export default ProfileScreen;
