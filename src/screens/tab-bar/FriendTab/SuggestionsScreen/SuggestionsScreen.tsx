import { View, StyleSheet, Text } from 'react-native';
import { color } from 'src/common/constants/color';
import { SuggestFriendCard } from '../../components/FriendCard';
import { getSuggestedFriendsApi } from 'src/services/friends.services';
import BaseFlatList from 'src/components/BaseFlatList';
import useLoadingListApi from 'src/hooks/useLoadingListApi';
import BaseActivityIndicator from 'src/components/BaseActivityIndicator';

function SuggestionsScreen() {
  const { data, isLoadingFirstApi, isNextFetchingApi, onEndReadable, refreshing, onRefresh } =
    useLoadingListApi(getSuggestedFriendsApi);

  return isLoadingFirstApi ? (
    <BaseActivityIndicator />
  ) : (
    <View style={styles.container}>
      <BaseFlatList
        ListHeaderComponent={() => (
          <View style={styles.lineText}>
            <Text style={{ fontWeight: '800', fontSize: 20, color: color.textColor }}>
              Những người bạn có thể biết
            </Text>
          </View>
        )}
        data={data}
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
        onEndReached={onEndReadable}
        onEndReachedThreshold={0.05}
        isFootterLoading={isNextFetchingApi}
        onRefresh={onRefresh}
        refreshing={refreshing}
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
