import { View, Text, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import ListSearchResult from './compoment/SearchResult/ListSearchResult';
import CommentTab from '../../../components/Post/components/Comment/CommentModal';
import { Appbar, Divider, IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import HistorySearch from './compoment/HistorySearch';

function SearchScreen() {
  const [openModal, setOpenModal] = useState(false);
  const [openModalHistorySearch, setOpenModalHistorySearch] = useState(false);
  const [searchText, setSearchText] = useState('');
  // const [onSearch, setOnSearch] = useState(false)
  // const handleOpenCommentTab = () => {
  //   setOpenModal(true);
  // };
  const _goBack = () => console.log('Went back');

  const handleTextChange = (e: any) => setSearchText(e);

  const _handleSearch = () => console.log(`Searching ${searchText}...`);

  // const _handleMore = () => console.log('Shown more');

  const handleTextClear = () => setSearchText('');
  return (
    <>
      <Appbar.Header style={{ backgroundColor: color.white }}>
        <Appbar.BackAction onPress={_goBack} />
        {/* <Appbar.Content title='Title' /> */}
        <View>
          <TextInput
            placeholder='Tìm kiếm'
            clearButtonMode='always'
            onChangeText={handleTextChange}
            value={searchText}
            style={{
              height: 40,
              width: 250,
              borderRadius: 50,
              backgroundColor: color.backgroundColor,
              paddingLeft: 20
            }}
          />
          {searchText !== '' && (
            <IconButton
              icon='close'
              size={25}
              iconColor={color.black}
              style={styles.clearButton}
              onPress={handleTextClear}
            />
          )}
        </View>
        <Appbar.Action icon='magnify' onPress={_handleSearch} />
        {/* <Appbar.Action icon='dots-vertical' onPress={_handleMore} /> */}
      </Appbar.Header>
      <ScrollView style={styles.container}>
        {searchText ? (
          <View style={styles.headerSearchresult}>
            <Text style={styles.All}>Tất cả</Text>
            <Text style={styles.post}>Bài viết</Text>
            <Text style={styles.All}>Mọi người</Text>
            <Text style={styles.All}>Nhóm</Text>
            <Text style={styles.All}>Reals</Text>
          </View>
        ) : (
          <View style={styles.section}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.nearlyall}
              // onPress={navigateEditProfileScreen}
            >
              <Text style={styles.nearly}>Tìm kiếm gần đây</Text>
            </TouchableOpacity>

            <TouchableOpacity
              activeOpacity={0.8}
              style={styles.nearlyall}
              // onPress={navigateEditProfileScreen}\
              onPress={() => {
                setOpenModalHistorySearch(true);
              }}
            >
              <Text style={styles.seeall}>Chỉnh sửa</Text>
            </TouchableOpacity>
          </View>
        )}
        <Divider style={{ marginTop: 10 }} bold />
        <View style={styles.section}>
          <ListSearchResult searchText={searchText} />
        </View>
        <CommentTab openModal={openModal} setOpenModal={setOpenModal} />
        <HistorySearch
          openModal={openModalHistorySearch}
          setOpenModal={setOpenModalHistorySearch}
        />
      </ScrollView>
    </>
  );
}

export default SearchScreen;
