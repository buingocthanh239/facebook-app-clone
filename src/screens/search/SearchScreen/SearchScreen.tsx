import { View, Text, ScrollView, TouchableOpacity } from 'react-native';
import { IconButton, Searchbar } from 'react-native-paper';
import { useState } from 'react';
import styles from './styles';
import ListSearchResult from './compoment/ListSearchResult';
import CommentTab from '../../../components/Post/components/Comment/CommentModal';

function SearchScreen() {
  // const [modalCoverVisible, setModalCoverVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [openModal, setOpenModal] = useState(false);
  // const navigation: NavigationProp<PropfileNavigationType, 'EditProfile'> = useNavigation();

  // const navigateEditProfileScreen = () => navigation.navigate('EditProfile');

  const onChangeSearch = (query: any) => setSearchQuery(query);
  // const showModalCover = () => {
  //     setModalCoverVisible(true);
  //     // console.log('hihi')
  // };
  const handleOpenCommentTab = () => {
    setOpenModal(true);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <IconButton
          icon='keyboard-backspace'
          mode='contained'
          iconColor='#4b4c4f'
          containerColor='#fff'
          size={26}
          // onPress={showModalCover}
        />
        <TouchableOpacity style={styles.searchheader} activeOpacity={0.8}>
          <Searchbar
            placeholder='Tìm kiếm'
            onChangeText={onChangeSearch}
            value={searchQuery}
            style={styles.searchInput}
            icon={undefined}
          />
        </TouchableOpacity>
      </View>

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

      <View style={styles.section}>
        <ListSearchResult></ListSearchResult>
      </View>
      <CommentTab openModal={openModal} setOpenModal={setOpenModal} />
    </ScrollView>
  );
}

export default SearchScreen;
