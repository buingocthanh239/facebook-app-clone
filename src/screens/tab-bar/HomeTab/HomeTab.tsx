import Post from 'src/components/Post';
import NewPostCreate from './components/NewPostCreate/NewPostCreate';
import { useEffect, useRef, useState } from 'react';
import BaseFlatList from 'src/components/BaseFlatList';
// import { PanResponder } from 'react-native';
import {
  NavigationProp,
  useIsFocused,
  useNavigation,
  useScrollToTop
} from '@react-navigation/native';
import { AppNaviagtionName } from 'src/common/constants/nameScreen';
import { useAppDispatch, useAppSelector } from 'src/redux';
import { getListPosts, getNextListPosts, selectPost } from 'src/redux/slices/postSlice';
const COUNT_ITEM = 10;

function HomeTab() {
  const dispatch = useAppDispatch();
  const [skip, setSkip] = useState<number>(0);

  const postStore = useAppSelector(selectPost);

  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    setSkip(Math.floor(Math.random() * (postStore.post.length ?? 1)));
    dispatch(getListPosts({ index: skip, count: COUNT_ITEM }));
    setSkip(skip => skip + COUNT_ITEM);
    setrefreshing(false);
  };

  async function onEndReadable() {
    if (postStore.isNextFetch) {
      dispatch(getNextListPosts({ index: skip, count: COUNT_ITEM }));
      setSkip(skip => skip + COUNT_ITEM);
    }
  }

  const ref = useRef(null);
  useScrollToTop(ref);

  const navigation: NavigationProp<AppNavigationType, AppNaviagtionName.TabNavigation> =
    useNavigation();

  // header handle
  // const [isShowHeader, setIsShowHeader] = useState(true);
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isFocus) {
      navigation?.getParent()?.setOptions({ headerShown: true });
    } else {
      navigation?.getParent()?.setOptions({ headerShown: false });
    }
  }, [isFocus, navigation]);

  // const panResponder = useRef(
  //   PanResponder.create({
  //     onStartShouldSetPanResponder: () => true,
  //     onMoveShouldSetPanResponder: () => true,
  //     onPanResponderMove: (event, gestureState) => {
  //       const { dy } = gestureState;
  //       if (dy < 0) {
  //         setIsShowHeader(false);
  //       } else {
  //         setIsShowHeader(true);
  //       }
  //     }
  //   })
  // ).current;

  // get post handle
  useEffect(() => {
    dispatch(getListPosts({ index: 0, count: COUNT_ITEM }));
    setSkip(skip => skip + COUNT_ITEM);
  }, [dispatch]);

  return (
    <BaseFlatList
      // {...panResponder.panHandlers}
      ref={ref}
      ListHeaderComponent={<NewPostCreate />}
      data={postStore.post}
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
      isFootterLoading={postStore.getPostloading}
    />
  );
}

export default HomeTab;
