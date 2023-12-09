import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import RequestFriendCard from '../components/FriendCard/RequestFriendCard';
import { color } from 'src/common/constants/color';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { useEffect, useState } from 'react';
import { IGetRequestedFriends, IRequestedFriends } from 'src/interfaces/friends.interface';
import { getRequestedFriendsApi } from 'src/services/friends.services';
import BaseFlatList from 'src/components/BaseFlatList';

function Friends() {
  const navigation: NavigationProp<FriendNavigationType> = useNavigation();
  const handleSuggestPress = () => navigation.navigate('SuggestionsScreen');
  const handleFriendPress = () => navigation.navigate('AllFriendScreen');

  const [totalRequestFriend, setTotalRequestFriend] = useState(0);
  const [listRequestFriend, setListRequestFriend] = useState<IRequestedFriends[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);
  };

  useEffect(() => {
    const data: IGetRequestedFriends = {
      index: '0',
      count: '100'
    };
    const fetchData = async (data: IGetRequestedFriends) => {
      try {
        const result = await getRequestedFriendsApi(data);
        console.log(result);
        setTotalRequestFriend(result.data.total);
        setListRequestFriend(result.data.requests);
        setRefreshing(false);
        return result;
      } catch (error) {
        return console.log({ message: 'sever availability' });
      }
    };

    fetchData(data).catch(console.error);
  }, [refreshing]);
  return (
    <View style={styles.container}>
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
      <BaseFlatList
        data={listRequestFriend}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => console.log(`Go to ${item.username} page.`)}>
            <RequestFriendCard
              id={item.id}
              username={item.username}
              avatarSource={item.avatar}
              same_friends={item.same_friends}
              created={item.created}
            ></RequestFriendCard>
          </TouchableOpacity>
        )}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
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
