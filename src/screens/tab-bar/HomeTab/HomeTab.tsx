import Post from 'src/components/Post';
import NewPostCreate from './components/NewPostCreate/NewPostCreate';
import { IVideo } from 'src/interfaces/common.interface';
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

export interface IPost {
  id: string;
  ownerAvatar?: string;
  ownerName: string;
  createdAt: string;
  content?: string;
  imageUrl?: string[];
  video?: IVideo;
  numberLikes?: number;
  numberComments?: number;
  numberShares?: number;
  friendComments?: string[];
}

function HomeTab() {
  const Data: IPost[] = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9',
      friendComments: ['Bùi Ngọc Thành', 'Bùi Ngọc Thành', 'Bùi Ngọc Thành'],
      content: 'hsdjkfhdfkjdhdsjfhdksfhdj',
      imageUrl: [
        'https://picsum.photos/700',
        'https://picsum.photos/700',
        'https://picsum.photos/700',
        'https://picsum.photos/700',
        'https://picsum.photos/700',
        'https://picsum.photos/700'
      ]
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',

      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',

      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9'
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9',
      content: 'hsdjkfhdfkjdhdsjfhdksfhdj',
      video: {
        videoUri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumnail: 'https://i.picsum.photos/id/866/1600/900.jpg'
      }
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',

      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9'
    }
  ];
  const [data, setdata] = useState(Data);
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    setTimeout(() => {
      setdata(data => [
        ...data,
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72' + Math.floor(Math.random() * 100),

          ownerName: 'Bùi Ngọc Thành',
          createdAt: '9'
        }
      ]);
      setrefreshing(false);
    }, 2000);
  };

  const ref = useRef(null);
  useScrollToTop(ref);

  const navigation: NavigationProp<AppNavigationType, AppNaviagtionName.TabNavigation> =
    useNavigation();

  // const [isShowHeader, setIsShowHeader] = useState(true);
  const isShowHeader = true;
  const isFocus = useIsFocused();
  useEffect(() => {
    if (isShowHeader && isFocus) {
      navigation?.getParent()?.setOptions({ headerShown: true });
    } else {
      navigation?.getParent()?.setOptions({ headerShown: false });
    }
  }, [isShowHeader, isFocus, navigation]);

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

  return (
    <BaseFlatList
      // {...panResponder.panHandlers}
      ref={ref}
      ListHeaderComponent={<NewPostCreate />}
      data={data}
      renderItem={({ item }) => (
        <Post
          id={item.id}
          ownerName={item.ownerName}
          createdAt={item.createdAt}
          friendComments={item.friendComments}
          content={item.content}
          imageUrl={item.imageUrl}
          ownerAvatar={item.ownerAvatar}
          video={item.video}
          numberComments={item.numberComments}
          numberLikes={item.numberLikes}
          numberShares={item.numberShares}
        />
      )}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

export default HomeTab;
