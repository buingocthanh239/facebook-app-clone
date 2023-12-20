import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { IconButton } from 'react-native-paper';
import Modal from 'react-native-modal';
import { color } from 'src/common/constants/color';
import OptionCard from 'src/screens/profile/Profile/component/OptionCard';
import { ISetRequestFriend, IUnfriend } from 'src/interfaces/friends.interface';
import { setRequestFriendApi, unfriendApi } from 'src/services/friends.services';
import { getAvatarUri } from 'src/utils/helper';

interface UserFriendCardProps {
  id: string;
  username: string;
  avatarSource: string;
  same_friends: string;
  created: string;
}

const UserFriendCard: React.FC<UserFriendCardProps> = ({
  id,
  username,
  avatarSource,
  same_friends,
  created
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

  const [status, setStatus] = useState('');
  const handleUnfriend = async (data: IUnfriend) => {
    try {
      const result = await unfriendApi(data);
      hideModal();
      setStatus('unfriended');
      return result;
    } catch (error) {
      return console.log({ message: 'sever availability' });
    }
  };

  const onPressAddFriend = async (data: ISetRequestFriend) => {
    try {
      const result = await setRequestFriendApi(data);
      setStatus('addFriend');
      return result;
    } catch (error) {
      return console.log({ message: 'sever availability' });
    }
  };

  const onPressCancel = () => {
    setStatus('unfriended');
  };

  return (
    <View style={styles.cardContainer}>
      <View style={styles.avatarContainer}>
        <Image source={getAvatarUri(avatarSource)} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.usernameField}>
          <Text style={styles.username}>{username}</Text>
          {parseInt(same_friends) < 1 ? (
            <></>
          ) : (
            <Text style={styles.friendCount}>{same_friends} bạn chung</Text>
          )}
        </View>
        {status === '' ? (
          <IconButton
            icon={require('../../../../assets/three-dot.png')}
            onPress={() => {
              showModal();
            }}
          ></IconButton>
        ) : status === 'unfriended' ? (
          <TouchableOpacity
            style={styles.acceptButton}
            onPress={() => onPressAddFriend({ user_id: id })}
          >
            <Text style={styles.buttonText}>Thêm bạn bè</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.acceptButton} onPress={() => onPressCancel()}>
            <Text style={styles.buttonText}>Hủy</Text>
          </TouchableOpacity>
        )}
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
            onPress={() => console.log('Go to User Friend Page with id: ' + id)}
          >
            <View style={{ flexDirection: 'row', alignItems: 'center', paddingBottom: 10 }}>
              <View style={styles.avatarContainer}>
                <Image
                  source={getAvatarUri(avatarSource)}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              </View>
              <View style={{ alignContent: 'center' }}>
                <Text style={styles.username}>{username}</Text>
                <Text>Là bạn bè từ {created}</Text>
              </View>
            </View>
          </TouchableOpacity>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                index === 2
                  ? handleUnfriend({ user_id: id })
                  : console.log(`Selected: ${option.title}`)
              }
            >
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
    alignItems: 'flex-start',
    justifyContent: 'center'
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
    paddingBottom: 3,
    color: color.textColor
  },
  friendCount: {
    fontSize: 14,
    color: color.textColor,
    marginBottom: 10
  },
  acceptButton: {
    backgroundColor: color.borderBottom,
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 5,
    height: 35,
    marginTop: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonText: {
    color: color.textColor,
    textAlign: 'center',
    fontWeight: '800'
  }
});

export default UserFriendCard;
