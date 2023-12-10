import { View, StyleSheet, Text } from 'react-native';
import { color } from 'src/common/constants/color';
import { SuggestFriendCard } from '../../components/FriendCard';
import { useEffect, useState } from 'react';
import { IGetSuggestedFriends, ISuggestedFriends } from 'src/interfaces/friends.interface';
import { getSuggestedFriendsApi } from 'src/services/friends.services';
import BaseFlatList from 'src/components/BaseFlatList';

function SuggestionsScreen() {
  const [listSuggestedFriend, setListSuggestedFriend] = useState<ISuggestedFriends[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const [index, setIndex] = useState(0);
  const ITEM_HEIGHT = 10;

  const onRefresh = () => {
    setRefreshing(true);
    if (index + 20 > 100) {
      setIndex(Math.random() * 10);
    }
    setIndex(index => index + Math.random() * 10 + 10);
  };

  useEffect(() => {
    const data: IGetSuggestedFriends = {
      index: index.toString(),
      count: '20'
    };
    const fetchData = async (data: IGetSuggestedFriends) => {
      try {
        const result = await getSuggestedFriendsApi(data);
        console.log(result);
        setListSuggestedFriend(result.data);
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
      <BaseFlatList
        ListHeaderComponent={() => (
          <View style={styles.lineText}>
            <Text style={{ fontWeight: '800', fontSize: 20, color: color.textColor }}>
              Những người bạn có thể biết
            </Text>
          </View>
        )}
        data={listSuggestedFriend}
        renderItem={({ item }) => (
          <SuggestFriendCard
            id={item.id}
            username={item.username}
            avatarSource={item.avatar}
            same_friends={item.same_friends}
            created={item.created}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        getItemLayout={(data, index) => ({
          length: ITEM_HEIGHT,
          offset: ITEM_HEIGHT * index,
          index
        })}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white'
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
