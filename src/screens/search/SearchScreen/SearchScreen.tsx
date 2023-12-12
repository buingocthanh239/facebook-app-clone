import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './styles';
import ListSearchResult from './compoment/ListSearchResult';
import CommentTab from '../../../components/Post/components/Comment/CommentModal';
import { Appbar, Divider } from 'react-native-paper';
import { color } from 'src/common/constants/color';

function SearchScreen() {
  const [openModal, setOpenModal] = useState(false);
  const handleOpenCommentTab = () => {
    setOpenModal(true);
  };
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => console.log('Shown more');
  return (
    <>
      <Appbar.Header style={{ backgroundColor: color.white }}>
        <Appbar.BackAction onPress={_goBack} />
        <Appbar.Content title='Title' />
        <Appbar.Action icon='magnify' onPress={_handleSearch} />
        <Appbar.Action icon='dots-vertical' onPress={_handleMore} />
      </Appbar.Header>
      <ScrollView style={styles.container}>
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
    </>
  );
}

export default SearchScreen;
