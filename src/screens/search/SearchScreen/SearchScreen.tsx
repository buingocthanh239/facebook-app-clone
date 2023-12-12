import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import ListSearchResult from './compoment/ListSearchResult';
import CommentTab from '../../../components/Post/components/Comment/CommentModal';
import { Appbar, Divider, TextInput } from 'react-native-paper';
import { color } from 'src/common/constants/color';
// import { HeaderWithSearch } from 'src/components/BaseHeader';
function SearchScreen() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenCommentTab = () => {
    setOpenModal(true);
  };
  const _goBack = () => {
    console.log('went back');
  };
  const _handleSearch = () => {
    console.log('_handleSearch');
  };
  // const _handleMore = () => { console.log('_handleMore') }
  return (
    <ScrollView style={styles.container}>
      <Appbar.Header style={{ backgroundColor: color.white }}>
        <Appbar.BackAction onPress={_goBack} />
        {/* <Appbar.Content title='Title' /> */}
        <View
          style={{
            borderRadius: 50,
            overflow: 'hidden'
          }}
        >
          <TextInput
            placeholder='Tìm kiếm'
            onChangeText={_handleSearch}
            // selectionColor = {color.black}
            clearButtonMode='while-editing'
            activeUnderlineColor='transparent'
            style={{
              height: 34,
              width: 250,
              backgroundColor: color.backgroundColor,
              borderColor: 'transparent'
            }}
            // value={search}selectionColor
          />
        </View>
        <Appbar.Action icon='magnify' onPress={_handleSearch} />
        {/* <Appbar.Action icon='dots-vertical' onPress={_handleMore} /> */}
      </Appbar.Header>
      <View style={styles.section}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.nearlyall}
          // onPress={navigateEditProfileScreen}
        >
          <Text style={styles.nearly}>Gần đây</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.8}
          style={styles.nearlyall}
          // onPress={navigateEditProfileScreen}\
          onPress={handleOpenCommentTab}
        >
          <Text style={styles.seeall}>Xem tất cả</Text>
        </TouchableOpacity>
      </View>
      <Divider style={{ marginTop: 10 }} bold />
      <View style={styles.section}>
        <ListSearchResult></ListSearchResult>
      </View>
      <CommentTab openModal={openModal} setOpenModal={setOpenModal} />
    </ScrollView>
  );
}

export default SearchScreen;
