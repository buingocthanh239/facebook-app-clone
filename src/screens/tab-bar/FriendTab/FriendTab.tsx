import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import RequestFriendCard from '../components/FriendCard/RequestFriendCard';
import { color } from 'src/common/constants/color';

function Friends() {
  const totalRequestFriend = 251;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: '700' }}>Bạn bè</Text>
        <View style={styles.lineText}>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              borderRadius: 25,
              marginRight: 10,
              marginLeft: -5
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 7,
                paddingHorizontal: 13
              }}
            >
              Gợi ý
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: color.outlineColor, borderRadius: 25 }}>
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 7,
                paddingHorizontal: 13
              }}
            >
              Bạn bè
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineText}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 5 }}>Lời mời kết bạn</Text>
        <Text style={{ fontWeight: 'bold', fontSize: 22, color: color.error }}>
          {totalRequestFriend}
        </Text>
      </View>
      <RequestFriendCard
        username='Ngô Hải Văn'
        avatarSource='https://placekitten.com/200/200'
      ></RequestFriendCard>
      <RequestFriendCard
        username='Nguyễn Văn A'
        avatarSource='https://placekitten.com/300/200'
      ></RequestFriendCard>
      <RequestFriendCard
        username='Nguyễn Văn B'
        avatarSource='https://placekitten.com/400/200'
      ></RequestFriendCard>
      <RequestFriendCard
        username='Nguyễn Văn C'
        avatarSource='https://placekitten.com/500/200'
      ></RequestFriendCard>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10
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
    alignItems: 'flex-end',
    marginLeft: 15,
    marginTop: 10
  }
});

export default Friends;
