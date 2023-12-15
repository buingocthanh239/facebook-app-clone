import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useEffect, useState } from 'react';
import styles from './styles';
import FriendField from './component/FriendField';
import OptionCard from './component/OptionCard';
import Modal from 'react-native-modal';
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
import ButtonField0 from './component/ButtonField0';
import ButtonField1 from './component/ButtonField1';
import ButtonField2 from './component/ButtonField2';
import ButtonField3 from './component/ButtonField3';
import InforDetail from './component/InforDetail';
import { HeaderWithSearch } from 'src/components/BaseHeader';
import { IGetUserFriends, IUserFriends } from 'src/interfaces/friends.interface';
import { getUserFriendsApi } from 'src/services/friends.services';

function ProfileScreen() {
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalCoverVisible, setModalCoverVisible] = useState(false);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [listFriends, setListFriends] = useState<IUserFriends[]>([]);
  const [totalFriend, setTotalFriend] = useState('');

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
          setProfile(result.data);
        } catch (error) {
          return console.log({ message: 'sever availability' });
        }
      };
      fetchUserData({ user_id }).catch(console.error);
    }
    const fetchData = async (data: IGetUserFriends) => {
      try {
        const result = await getUserFriendsApi(data);
        setTotalFriend(result.data.total);
        setListFriends(result.data.friends);
        return result;
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };

    fetchData({
      index: '0',
      count: '6',
      user_id: !user_id ? '' : user_id
    }).catch(console.error);
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

  const totalHeight = 2 * 25;
  return (
    <ScrollView style={styles.container}>
      <HeaderWithSearch title={profile?.username as string} titleIsCenter={true} />
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
          {profile?.description !== '' ? (
            <Text style={styles.bio}>{profile?.description}</Text>
          ) : (
            <></>
          )}
        </View>
      </View>
      {/* Button Field */}
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
        <ButtonField0 />
      ) : !isOwnProfile && isFriend === '1' ? (
        <ButtonField1 />
      ) : !isOwnProfile && isFriend === '2' ? (
        <ButtonField2 />
      ) : !isOwnProfile && isFriend === '3' ? (
        <ButtonField3 />
      ) : null}
      {/* Infor Detail */}
      <InforDetail address={profile?.address} city={profile?.city} isOwnProfile={isOwnProfile} />
      {/* Friend Field */}
      <View style={styles.section}>
        <FriendField
          friends={listFriends}
          totalFriend={totalFriend}
          isOwnProfile={isOwnProfile}
        ></FriendField>
      </View>
      {/* Post Field */}
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
    </ScrollView>
  );
}

export default ProfileScreen;
