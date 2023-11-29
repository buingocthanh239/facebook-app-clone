import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { color } from 'src/common/constants/color';

interface SuggestFriendCardProps {
  username: string;
  avatarSource: string;
}

const SuggestFriendCard: React.FC<SuggestFriendCardProps> = ({ username, avatarSource }) => {
  const [status, setStatus] = useState('');
  const onPressAddFriend = () => {
    setStatus('AddFriend');
  };
  const onPressDelete = () => {
    setStatus('Delete');
  };
  const onPressCancle = () => {
    setStatus('Cancle');
  };

  return (
    <>
      {status === '' ? (
        <View style={styles.cardContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatarSource }} style={styles.avatar} />
          </View>
          <View style={styles.infoContainer}>
            <Text style={styles.username}>{username}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={onPressAddFriend}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Thêm bạn bè</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
                <Text style={[styles.buttonText, { color: color.textColor }]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : status === 'AddFriend' ? (
        <View style={styles.cardContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatarSource }} style={styles.avatar} />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={[styles.username, { marginTop: 0 }]}>{username}</Text>
            </View>
            <Text style={{ marginBottom: 10 }}>Đã gửi yêu cầu</Text>
            <TouchableOpacity style={styles.button} onPress={onPressCancle}>
              <Text style={styles.buttonText}>Hủy</Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : status === 'Cancle' ? (
        <View style={styles.cardContainer}>
          <View style={styles.avatarContainer}>
            <Image source={{ uri: avatarSource }} style={styles.avatar} />
          </View>
          <View style={styles.infoContainer}>
            <View>
              <Text style={[styles.username, { marginTop: 0 }]}>{username}</Text>
            </View>
            <Text style={{ marginBottom: 10 }}>Đã hủy yêu cầu</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.acceptButton} onPress={onPressAddFriend}>
                <Text style={[styles.buttonText, { color: 'white' }]}>Thêm bạn bè</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={onPressDelete}>
                <Text style={[styles.buttonText, { color: color.textColor }]}>Xóa</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      ) : (
        <View></View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 13
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
    flex: 1
  },
  username: {
    flex: 1,
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15
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
  button: {
    backgroundColor: color.outlineColor,
    padding: 9,
    borderRadius: 5
  },
  buttonText: {
    color: color.textColor,
    textAlign: 'center',
    fontWeight: 'bold'
  }
});

export default SuggestFriendCard;
