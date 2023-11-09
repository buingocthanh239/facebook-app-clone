import { View, Text, StyleSheet } from 'react-native';
import FriendCard from './FriendCard';

const FriendField = () => {
  const avatarUrl =
    'https://scontent-hkg4-2.xx.fbcdn.net/v/t39.30808-6/344771274_635656204564021_5313788662963468311_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=5f2048&_nc_eui2=AeHOKImvTwCiDzliOSGGKL_NJufFjy4-vqEm58WPLj6-oQxnd0EhiFoOlqZgBSwhBo7iM378XRvIqQlK56Ma37ZB&_nc_ohc=K4ScATsuiHEAX_1B_qb&_nc_ht=scontent-hkg4-2.xx&oh=00_AfAuHerakFRh3arkj1z45hYat85uuJcLKPAJhG44RYdmMQ&oe=6550AD99';
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
  const totalFriend = 1000;
  return (
    <View style={styles.container}>
      <View style={styles.totalFriend}>
        <Text>Bạn bè</Text>
        <Text>{totalFriend.toLocaleString()} người bạn</Text>
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
    marginBottom: 20
  },
  totalFriend: {
    marginLeft: 5,
    marginBottom: 20
  }
});

export default FriendField;
