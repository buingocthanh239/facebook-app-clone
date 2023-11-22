import { View, StyleSheet, TouchableOpacity, ScrollView, Text } from 'react-native';
import { color } from 'src/common/constants/color';
import { SuggestFriendCard } from '../../components/FriendCard';

function SuggestionsScreen() {
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
          Những người bạn có thể biết
        </Text>
      </View>
      {friends.map((friend, index) => {
        return (
          <TouchableOpacity
            key={index}
            onPress={() => console.log(`Go to ${friend.username} page.`)}
          >
            <SuggestFriendCard
              avatarSource={friend.avatarSource}
              username={friend.username}
            ></SuggestFriendCard>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 50
  },
  lineText: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 15,
    marginRight: 15,
    marginTop: 10
  }
});

export default SuggestionsScreen;
