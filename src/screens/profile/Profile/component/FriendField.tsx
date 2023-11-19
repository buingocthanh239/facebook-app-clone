import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import FriendCard from './FriendCard';
import { color } from 'src/common/constants/color';

const FriendField = () => {
  const avatarUrl = 'https://placekitten.com/200/200';
  const friends = [
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Nguyễn Văn Quyền'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    },
    {
      avatarUrl: avatarUrl,
      username: 'Ngô Hải Văn'
    }
  ];
  const totalFriend = 1523;
  return (
    <View style={styles.container}>
      <View style={styles.headerFriendField}>
        <View style={styles.totalFriend}>
          <Text style={{ fontWeight: 'bold', fontSize: 16, color: 'black' }}>Bạn bè</Text>
          <Text style={{ fontSize: 14 }}>{totalFriend.toLocaleString()} người bạn</Text>
        </View>
        <TouchableOpacity style={styles.searchFriend} onPress={() => console.log('Tìm bạn bè')}>
          <Text style={{ fontSize: 16, color: color.primary }}>Tìm bạn bè</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.row}>
        <FriendCard avatarUrl={friends[0].avatarUrl} username={friends[0].username} />
        <FriendCard avatarUrl={friends[1].avatarUrl} username={friends[1].username} />
        <FriendCard avatarUrl={friends[2].avatarUrl} username={friends[2].username} />
      </View>
      <View style={styles.row}>
        <FriendCard avatarUrl={friends[3].avatarUrl} username={friends[3].username} />
        <FriendCard avatarUrl={friends[4].avatarUrl} username={friends[4].username} />
        <FriendCard avatarUrl={friends[5].avatarUrl} username={friends[5].username} />
      </View>
      <TouchableOpacity style={styles.allFriendBtn} activeOpacity={0.7}>
        <Text
          style={{ color: color.textColor, textAlign: 'center', fontWeight: 'bold', fontSize: 16 }}
        >
          Xem tất cả bạn bè
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  totalFriend: {
    marginLeft: 5,
    marginBottom: 20,
    marginRight: 8
  },
  headerFriendField: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  searchFriend: {
    padding: 8
  },
  allFriendBtn: {
    marginHorizontal: 10,
    backgroundColor: '#E9F1FE',
    padding: 10,
    borderRadius: 7
  }
});

export default FriendField;
