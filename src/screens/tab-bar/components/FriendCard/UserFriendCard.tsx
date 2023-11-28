import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { color } from 'src/common/constants/color';
import OptionCard from 'src/screens/profile/Profile/component/OptionCard';

interface UserFriendCardProps {
  username: string;
  avatarSource: string;
  mutualFriend: number;
}

const RequestFriendCard: React.FC<UserFriendCardProps> = ({
  username,
  avatarSource,
  mutualFriend
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const options = [
    {
      icon: 'message',
      title: `Nhắn tin cho ${username}`
    },
    {
      icon: 'person-off',
      title: `Chặn trang cá nhân của ${username}`
    },
    {
      icon: 'person-remove',
      title: `Hủy kết bạn với ${username}`
    }
  ];

  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarSource }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.usernameField}>
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.friendCount}>{mutualFriend} bạn chung</Text>
        </View>
        <IconButton
          icon={require('../../../../assets/three-dot.png')}
          onPress={() => {
            showModal();
          }}
        ></IconButton>
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
          <TouchableOpacity
            style={{ borderBottomWidth: 1, borderBottomColor: '#ccc', marginBottom: 10 }}
            onPress={() => console.log('Go to User Friend Page')}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
              <View style={styles.avatarContainer}>
                <Image
                  source={{ uri: avatarSource }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
              <View style={{ alignContent: 'center' }}>
                <Text style={styles.username}>{username}</Text>
                <Text>Là bạn bè từ tháng 3 năm 2022</Text>
              </View>
            </View>
          </TouchableOpacity>
          {options.map((option, index) => (
            <TouchableOpacity key={index} onPress={() => console.log(`Selected: ${option.title}`)}>
              <View style={[styles.option, { height: 19 * 3 }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modal: {
    justifyContent: 'flex-end',
    margin: 0
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingHorizontal: 20,
    paddingTop: 20
  },
  option: {
    paddingVertical: 0
  },
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 13
  },
  avatarContainer: {
    marginRight: 16
  },
  usernameField: {
    justifyContent: 'space-between'
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 45
  },
  infoContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  username: {
    fontSize: 16,
    fontWeight: 'bold',
    paddingBottom: 3
  },
  friendCount: {
    fontSize: 14,
    color: color.textColor,
    marginBottom: 10
  }
});

export default RequestFriendCard;