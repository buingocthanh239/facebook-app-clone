import { View, Text, StyleSheet } from 'react-native';
import Modal from 'react-native-modal';
import { IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import BaseFlatList from 'src/components/BaseFlatList';
// import FriendCard from './FriendCard';
interface HistorySearchProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const HistorySearch = (props: HistorySearchProps) => {
  const HistorySearch = [
    {
      id: '1',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền1'
    },
    {
      id: '2',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền2'
    },
    {
      id: '3',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền3'
    },
    {
      id: '4',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền4'
    },
    {
      id: '5',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền5'
    },
    {
      id: '6',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền6'
    },
    {
      id: '7',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền7'
    },
    {
      id: '8',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền8'
    },
    {
      id: '9',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền9'
    },
    {
      id: '10',
      // avatarUrl: avatarUrl,
      keyword: 'Nguyễn Hữu Truyền10'
    }
  ];

  const handleCancel = () => {
    props.setOpenModal(false);
  };
  return (
    <View style={styles.container}>
      <Modal
        isVisible={props.openModal}
        style={styles.container}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={handleCancel}
      >
        <View style={{ borderBottomColor: color.borderBottom, borderBottomWidth: 2 }}>
          <Text
            style={{
              height: 45,
              color: color.black,
              fontSize: 18,
              fontWeight: 'bold',
              padding: 10,
              textAlign: 'center'
            }}
          >
            Nhật ký hoạt động
          </Text>
        </View>
        <BaseFlatList
          style={{
            marginTop: 20
          }}
          data={HistorySearch}
          renderItem={({ item }) => (
            <View key={item.id} style={styles.ListSearchResult}>
              <IconButton
                icon='magnify'
                size={25}
                iconColor={color.white}
                containerColor={color.primary}
              />
              <View style={styles.ListSearchResultText}>
                {/* <Text>{item.username}</Text> */}
                <View
                  style={{
                    display: 'flex',
                    height: 80
                    // marginTop: 10
                  }}
                >
                  <Text
                    style={{
                      color: color.black,
                      fontSize: 15,
                      fontWeight: 'bold'
                    }}
                  >
                    Bạn đã tìm kiếm trên Facebook
                  </Text>
                  <Text>{item.keyword}</Text>
                  <Text
                    style={{
                      fontSize: 12,
                      opacity: 0.7
                    }}
                  >
                    Chỉ mình tôi - đã ẩn khỏi dòng thời gian
                  </Text>
                </View>
              </View>
              <IconButton
                icon='close'
                mode='contained'
                iconColor={color.activeOutlineColor}
                containerColor='#fff'
                size={26}

                // onPress={showModalCover}
              />
            </View>
          )}
        />
      </Modal>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'flex-start',
    margin: 0,
    marginTop: 40,
    borderRadius: 10,
    backgroundColor: 'white'
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
    // marginTop:20,
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
    // lineHeight: 55,
    color: color.black
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

export default HistorySearch;
