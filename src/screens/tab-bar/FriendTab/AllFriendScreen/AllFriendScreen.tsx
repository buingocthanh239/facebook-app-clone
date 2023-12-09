import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { color } from 'src/common/constants/color';
import { UserFriendCard } from '../../components/FriendCard';
import Modal from 'react-native-modal';
import { useEffect, useState } from 'react';
import OptionCard from 'src/screens/profile/Profile/component/OptionCard';
import { IGetUserFriends, IUserFriends } from 'src/interfaces/friends.interface';
import { getUserFriends } from 'src/services/friends.services';
import { useSelector } from 'react-redux';
import { selectAuth } from 'src/redux/slices/authSlice';

function AllFriendScreen() {
  const [totalFriend, setTotalFriend] = useState(0);
  const formattedNumberTotalFriend = totalFriend.toLocaleString();

  const [listFriends, setListFriends] = useState<IUserFriends[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const createdFriendAt = (created: string) => {
    const createdDate = new Date(created);

    const month = createdDate.getMonth() + 1;
    const year = createdDate.getFullYear();
    return `tháng ${month} năm ${year}`;
  };

  const userSelector = useSelector(selectAuth);
  const user_id = userSelector.user?.id;

  useEffect(() => {
    const data: IGetUserFriends = {
      index: '0',
      count: '5',
      user_id: !user_id ? '' : user_id
    };
    const fetchData = async (data: IGetUserFriends) => {
      try {
        const result = await getUserFriends(data);
        console.log(result);
        setTotalFriend(result.data.total);
        setListFriends(result.data.friends);
        return result;
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };

    fetchData(data).catch(console.error);
  }, []);

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
      {listFriends.map((friend, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => console.log(`Go to ${friend.username} page.`)}
          >
            <UserFriendCard
              id={friend.id}
              created={createdFriendAt(friend.created)}
              avatarSource={friend.avatar}
              username={friend.username}
              same_friends={friend.same_friends}
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
