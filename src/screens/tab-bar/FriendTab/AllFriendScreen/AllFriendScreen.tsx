import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { color } from 'src/common/constants/color';
import { UserFriendCard } from '../../components/FriendCard';
import Modal from 'react-native-modal';
import { useState } from 'react';
import OptionCard from 'src/screens/profile/Profile/component/OptionCard';

function AllFriendScreen() {
  const totalFriend = 2151;
  const formattedNumberTotalFriend = totalFriend.toLocaleString();

  const [modalVisible, setModalVisible] = useState(false);

  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };

  const options = [
    {
      icon: 'auto-mode',
      title: `Mặc định`
    },
    {
      icon: 'arrow-drop-up',
      title: `Bạn bè mới nhất trước tiên`
    },
    {
      icon: 'arrow-drop-down',
      title: `Bạn bè lâu năm nhất trước tiên`
    }
  ];

  const friends = [
    {
      username: 'Ngô Hải Văn',
      avatarSource: 'https://placekitten.com/300/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải A',
      avatarSource: 'https://placekitten.com/200/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải B',
      avatarSource: 'https://placekitten.com/400/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải C',
      avatarSource: 'https://placekitten.com/500/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải D',
      avatarSource: 'https://placekitten.com/200/300',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải E',
      avatarSource: 'https://placekitten.com/200/400',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải F',
      avatarSource: 'https://placekitten.com/200/500',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải G',
      avatarSource: 'https://placekitten.com/600/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải H',
      avatarSource: 'https://placekitten.com/900/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải I',
      avatarSource: 'https://placekitten.com/1000/200',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải K',
      avatarSource: 'https://placekitten.com/200/260',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải L',
      avatarSource: 'https://placekitten.com/200/210',
      mutualFriend: 200
    },
    {
      username: 'Ngô Hải M',
      avatarSource: 'https://placekitten.com/200/220',
      mutualFriend: 200
    }
  ];
  return (
    <ScrollView
      style={styles.container}
      keyboardShouldPersistTaps='handled'
      contentContainerStyle={{ flexGrow: 1 }}
    >
      <View style={styles.lineText}>
        <Text style={{ fontWeight: '800', fontSize: 20, color: color.textColor }}>
          {formattedNumberTotalFriend} bạn bè
        </Text>
        <TouchableOpacity
          style={{ marginRight: 10 }}
          onPress={() => {
            showModal();
          }}
        >
          <Text style={{ fontSize: 17, color: color.primary }}>Sắp xếp</Text>
        </TouchableOpacity>
      </View>
      {friends.map((friend, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => console.log(`Go to ${friend.username} page.`)}
          >
            <UserFriendCard
              avatarSource={friend.avatarSource}
              username={friend.username}
              mutualFriend={friend.mutualFriend}
            ></UserFriendCard>
          </TouchableOpacity>
        );
      })}
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
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: color.white
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginLeft: 15,
    marginRight: 15,
    paddingBottom: 15
  },
  lineText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
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

export default AllFriendScreen;
