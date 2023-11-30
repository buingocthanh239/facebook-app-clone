import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { IconButton } from 'react-native-paper';
// import FriendCard from './FriendCard';

const ListSearchResult = () => {
  const avatarUrl = 'https://placekitten.com/200/200';
  const ListSearchResult = [
    {
      id: '1',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '2',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '3',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '4',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '5',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '6',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '7',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '8',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '9',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    },
    {
      id: '10',
      avatarUrl: avatarUrl,
      username: 'Nguyễn Hữu Truyền'
    }
  ];

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.allFriendBtn} activeOpacity={0.7}>
        {ListSearchResult.map(item => (
          <View key={item.id} style={styles.ListSearchResult}>
            <View style={styles.ListSearchResultText}>
              <Image
                style={{ height: 40, width: 40 }}
                source={{
                  uri: 'https://i.vietgiaitri.com/2022/1/30/rose-blackpink-tiet-lo-6-tips-so-huu-lan-da-trang-su-8ab-6295268.jpg'
                }}
                accessibilityLabel={item.username}
              />
              {/* <Text>{item.username}</Text> */}
              <Text style={styles.username}>{item.username}</Text>
            </View>
            <IconButton
              icon='keyboard-backspace'
              mode='contained'
              iconColor='#4b4c4f'
              containerColor='#fff'
              size={26}
              // onPress={showModalCover}
            />
          </View>
        ))}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
    // padding: 10
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10
  },
  image: {
    height: 40,
    width: 40
  },

  ListSearchResult: {
    height: 55,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  ListSearchResultText: {
    flexDirection: 'row',
    display: 'flex',
    alignItems: 'center',
    gap: 10
  },
  username: {
    lineHeight: 55
  },
  searchFriend: {
    padding: 8
  },
  allFriendBtn: {
    marginHorizontal: 10
    // backgroundColor: '#E9F1FE',
    // padding: 10,
    // borderRadius: 7
  }
});

export default ListSearchResult;
