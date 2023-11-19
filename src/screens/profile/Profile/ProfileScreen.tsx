import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useState } from 'react';
import styles from './styles';
import FriendField from './component/FriendField';
import OptionCard from './component/OptionCard';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import CreatePostCard from '../../../components/CreatePostCard/CreatePostCard';
import { color } from 'src/common/constants/color';
function ProfileScreen() {
  const [modalAvatarVisible, setModalAvatarVisible] = useState(false);
  const [modalCoverVisible, setModalCoverVisible] = useState(false);

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
      <View style={styles.header}>
        <TouchableOpacity style={styles.coverPhoto} onPress={showModalCover} activeOpacity={0.8}>
          <Image style={styles.coverPhoto} source={require('../../../assets/cover.jpg')} />
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
          <Image style={styles.avatar} source={{ uri: 'https://placekitten.com/200/200' }} />
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
          <Text style={styles.name}>Ngô Hải Văn</Text>
          <Text style={styles.bio}>Developer at XYZ Company</Text>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity activeOpacity={0.8} style={styles.button}>
          <Text style={styles.buttonText}>Edit Profile</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.detailsContainer}>
        <View style={styles.detailRow}>
          <Icon name='home' size={20} color='black' />
          <Text style={styles.detailLabel}>Sống tại</Text>
          <Text style={styles.detailText}>Hà Nội</Text>
        </View>
        <View style={styles.detailRow}>
          <Icon name='map-marker' size={20} color='black' />
          <Text style={styles.detailLabel}>Đến từ</Text>
          <Text style={styles.detailText}>Kim Bảng - Hà Nam</Text>
        </View>
      </View>
      <TouchableOpacity activeOpacity={0.8} style={styles.editPublicButton}>
        <Text style={styles.editPublicButtonText}>Chỉnh sửa chi tiết công khai</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <FriendField></FriendField>
      </View>
      <View style={styles.section}>
        <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black', marginLeft: 20 }}>
          Bài viết
        </Text>
        <CreatePostCard avatar='https://placekitten.com/200/200' />
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
