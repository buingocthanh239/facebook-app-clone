import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import Modal from 'react-native-modal';
import OptionCard from 'src/screens/profile/Profile/component/OptionCard';

interface RequestFriendCardProps {
  username: string;
  avatarSource: string;
}

const RequestFriendCard: React.FC<RequestFriendCardProps> = ({ username, avatarSource }) => {
  const options = [
    {
      icon: 'report',
      title: `Báo cáo ${username}`
    },
    {
      icon: 'person-remove',
      title: `Chặn trang cá nhân của ${username}`
    }
  ];

  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const onPressAccept = () => {
    setStatus('Accept');
  };
  const onPressDelete = () => {
    setStatus('Delete');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        <Image source={{ uri: avatarSource }} style={styles.avatar} />
      </View>

      {status === '' ? (
        <View style={styles.infoContainer}>
          <Text style={styles.username}>{username}</Text>
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.acceptButton} onPress={onPressAccept}>
              <Text style={styles.buttonText}>Chấp nhận</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
              <Text style={[styles.buttonText, { color: color.textColor }]}>Xóa</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : status === 'Accept' ? (
        <View style={styles.infoContainer}>
          <View style={styles.usernameField}>
            <Text style={styles.username}>{username}</Text>
          </View>
          <Text style={{ marginBottom: 20 }}>Các bạn đã là bạn bè</Text>
        </View>
      ) : (
        <View style={styles.infoContainer}>
          <View style={styles.usernameField}>
            <Text style={styles.username}>{username}</Text>
            <IconButton
              icon={require('../../../../assets/three-dot.png')}
              onPress={() => {
                showModal();
                console.log('detail');
              }}
            ></IconButton>
          </View>
          <Text style={{ marginBottom: 20 }}>Đã gỡ lời mời</Text>
        </View>
      )}
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
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8
  },
  avatarContainer: {
    marginRight: 16
  },
  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45
  },
  infoContainer: {
    flex: 1,
    justifyContent: 'space-around',
    alignContent: 'center'
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
    color: color.textColor
  },
  usernameField: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10
  },
  acceptButton: {
    flex: 1,
    backgroundColor: color.primary,
    padding: 8,
    borderRadius: 5,
    marginRight: 10
  },
  deleteButton: {
    flex: 1,
    backgroundColor: color.outlineColor,
    padding: 8,
    borderRadius: 5
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center'
  },
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
  }
});

export default RequestFriendCard;
