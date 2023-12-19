import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useEffect, useRef, useState } from 'react';
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
import { getAvatarUri, getCoverUri } from 'src/utils/helper';
import { getUserInfoApi } from 'src/services/profile.services';
import ButtonField0 from './component/ButtonField0';
import ButtonField1 from './component/ButtonField1';
import ButtonField3 from './component/ButtonField3';
import InforDetail from './component/InforDetail';
import { HeaderWithSearch } from 'src/components/BaseHeader';
import { IGetUserFriends, IUserFriends } from 'src/interfaces/friends.interface';
import { getUserFriendsApi } from 'src/services/friends.services';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

function ProfileScreen() {
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalCoverVisible, setModalCoverVisible] = useState(false);
  const [profile, setProfile] = useState<IUser | null>(null);
  const [listFriends, setListFriends] = useState<IUserFriends[]>([]);
  const [totalFriend, setTotalFriend] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: 0, animated: true });
    }
  };

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
      index: 0,
      count: 6,
      user_id: !user_id ? '' : user_id
    }).catch(console.error);
    scrollToTop();
  }, [auth.user, user_id]);
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
    <ScrollView style={styles.container} ref={scrollViewRef}>
      <HeaderWithSearch title={profile?.username as string} titleIsCenter={true} />
      <View style={styles.header}>
        <TouchableOpacity style={styles.coverPhoto} onPress={showModalCover} activeOpacity={0.8}>
          <Image style={styles.coverPhoto} source={getCoverUri(profile?.cover_image as string)} />
        </TouchableOpacity>
        {isOwnProfile && (
          <View style={styles.cameraIconWrapper}>
            <TouchableOpacity
              style={styles.cameraIcon}
              onPress={showModalCover}
              activeOpacity={0.8}
            >
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
        )}
        <TouchableOpacity
          style={styles.avatarWrapper}
          onPress={showModalAvatar}
          activeOpacity={0.8}
        >
          <Image style={styles.avatar} source={getAvatarUri(profile?.avatar as string)} />
        </TouchableOpacity>
        {isOwnProfile && (
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
        )}
        <View style={isOwnProfile ? styles.infomation : { ...styles.infomation, marginTop: 100 }}>
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
        <View
          style={[
            styles.section,
            { flexDirection: 'row', justifyContent: 'space-between', padding: 20 }
          ]}
        >
          <TouchableOpacity
            activeOpacity={0.8}
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '84%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={navigateEditProfileScreen}
          >
            <Text style={[styles.buttonText]}>Edit Profile</Text>
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
      ) : !isOwnProfile && isFriend === '0' ? (
        <ButtonField0 user_id={user_id} />
      ) : !isOwnProfile && isFriend === '1' ? (
        <ButtonField1 user_id={user_id} />
      ) : !isOwnProfile && isFriend === '3' ? (
        <ButtonField3 user_id={user_id} />
      ) : null}
      {/* Infor Detail */}
      <InforDetail
        address={profile?.address}
        city={profile?.city}
        country={profile?.country}
        isOwnProfile={isOwnProfile}
      />
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
