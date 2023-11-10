import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
import { useState } from 'react';
import styles from './styles';
import FriendField from './component/FriendField';
import OptionCard from './component/OptionCard';
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
function ProfileScreen() {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const options = [
    {
      icon: 'account-circle',
      title: 'Xem ảnh đại diện'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh đại diện'
    },
    {
      icon: 'photo-library',
      title: 'Chọn ảnh đại diện'
    }
  ];
  const totalHeight = options.length * 19;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Image style={styles.coverPhoto} source={require('../../../assets/cover.jpg')} />
        <View style={styles.cameraIconWrapper}>
          <TouchableOpacity style={styles.cameraIcon} onPress={showModal}>
            <IconButton
              icon='camera'
              mode='contained'
              iconColor='black'
              containerColor='#E6E6EF'
              size={28}
              onPress={showModal}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.avatarWrapper}>
          <Image style={styles.avatar} source={{ uri: 'https://placekitten.com/200/200' }} />
        </View>
        <TouchableOpacity style={styles.cameraIconAvatar} onPress={showModal}>
          <IconButton
            icon='camera'
            mode='contained'
            iconColor='black'
            containerColor='#E6E6EF'
            size={32}
            onPress={showModal}
          />
        </TouchableOpacity>
        <View style={styles.infomation}>
          <Text style={styles.name}>Ngô Hải Văn</Text>
          <Text style={styles.bio}>Developer at XYZ Company</Text>
        </View>
      </View>
      <View style={styles.section}>
        <TouchableOpacity style={styles.button}>
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
      <TouchableOpacity style={styles.editPublicButton}>
        <Text style={styles.editPublicButtonText}>Chỉnh sửa chi tiết công khai</Text>
      </TouchableOpacity>
      <View style={styles.section}>
        <FriendField></FriendField>
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
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(`Selected: ${option.title}`)}>
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
