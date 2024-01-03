import { View } from 'react-native';
import Post from 'src/components/Post';

import { Button, IconButton, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { useEffect, useRef, useState } from 'react';
import BaseFlatList from 'src/components/BaseFlatList';
import { useScrollToTop } from '@react-navigation/native';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getListVideos, getNextListVideos, selectVideo } from 'src/redux/slices/videoSlice';
const COUNT_ITEM = 5;

function VideoTab() {
  // video api
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<number>(0);

  const videoStore = useAppSelector(selectVideo);

  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    setSkip(Math.floor(Math.random() * (videoStore.videos.length ?? 1)));
    dispatch(getListVideos({ index: skip, count: COUNT_ITEM }));
    setSkip(skip => skip + COUNT_ITEM);
    setrefreshing(false);
  };

  async function onEndReadable() {
    if (videoStore.isNextFetch) {
      dispatch(getNextListVideos({ index: skip, count: COUNT_ITEM }));
      setSkip(skip => skip + COUNT_ITEM);
    }
  }

  useEffect(() => {
    dispatch(getListVideos({ index: 0, count: COUNT_ITEM }));
    setSkip(skip => skip + COUNT_ITEM);
  }, [dispatch]);

  //scroll to top
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <SafeAreaView style={styles.header}>
      <View style={styles.button}>
        <Text
          style={{
            fontSize: 30,
            fontWeight: 'bold',
            padding: 20
          }}
        >
          Watch
        </Text>
        <IconButton icon='account-circle' style={{ alignSelf: 'center' }} />
        <IconButton icon='magnify' style={{ alignSelf: 'center' }} />
      </View>
      <View style={styles.button}>
        <Button icon='camera' mode='contained-tonal'>
          Trực tiếp
        </Button>
        <Button icon='hamburger' mode='contained-tonal'>
          Ẩm thực
        </Button>
        <Button icon='gamepad-variant' mode='contained-tonal'>
          Chơi game
        </Button>
      </View>

      <Divider />
      <BaseFlatList
        ref={ref}
        data={videoStore.videos}
        renderItem={({ item }) => (
          <Post
            id={item.id}
            author={item.author}
            created={item.created}
            comment_mark={item.comment_mark}
            described={item.described}
            image={item.image}
            video={item.video}
            name={item.name}
            feel={item.feel}
            numberShares={item.numberShares}
            banned={item.banned}
            can_edit={item.can_edit}
            is_blocked={item.is_blocked}
            is_felt={item.is_felt}
            status={item.state}
          />
        )}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
        onEndReached={onEndReadable}
        onEndReachedThreshold={0.01}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {},
  header: { flex: 1 },
  button: { flexDirection: 'row' }
});

export default VideoTab;
