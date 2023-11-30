import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import RequestFriendCard from '../components/FriendCard/RequestFriendCard';
import { color } from 'src/common/constants/color';
import { NavigationProp, useNavigation } from '@react-navigation/native';

function Friends() {
  const navigation: NavigationProp<FriendNavigationType> = useNavigation();
  const handleSuggestPress = () => navigation.navigate('SuggestionsScreen');
  const handleFriendPress = () => navigation.navigate('AllFriendScreen');
  const totalRequestFriend = 251;
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={{ fontSize: 24, fontWeight: '700', color: color.textColor }}>Bạn bè</Text>
        <View style={styles.lineText}>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              borderRadius: 25,
              marginRight: 10,
              marginLeft: -5
            }}
            onPress={handleSuggestPress}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: 'bold',
                textAlign: 'center',
                paddingVertical: 7,
                paddingHorizontal: 13,
                color: color.textColor
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
                paddingHorizontal: 13,
                color: color.textColor
              }}
              onPress={handleFriendPress}
            >
              Bạn bè
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.lineText}>
        <Text style={{ fontWeight: 'bold', fontSize: 20, marginRight: 5, color: color.textColor }}>
          Lời mời kết bạn
        </Text>
        <Text style={{ fontWeight: 'bold', fontSize: 21, color: color.error }}>
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
      <RequestFriendCard
        username='Nguyễn Văn C'
        avatarSource='https://placekitten.com/500/200'
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
    alignItems: 'flex-end',
    marginLeft: 15,
    marginTop: 10,
    marginBottom: 5
  }
});

export default Friends;
