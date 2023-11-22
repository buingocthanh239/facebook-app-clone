import Post from 'src/components/Post';
import NewPostCreate from './components/NewPostCreate/NewPostCreate';
import { FlatList } from 'react-native';

export interface IPost {
  id: string;
  ownerAvatar?: string;
  ownerName: string;
  createdAt: string;
  content?: string;
  imageUrl?: string[];
  videoUrl?: string;
  numberLikes?: number;
  numberComments?: number;
  numberShares?: number;
  friendComments?: string[];
}

function HomeTab() {
  const data: IPost[] = [
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
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',

      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9'
    }
  ];
  return (
    <FlatList
      ListHeaderComponent={<NewPostCreate />}
      data={data}
      renderItem={({ item }) => (
        <Post
          ownerName={item.ownerName}
          createdAt={item.createdAt}
          friendComments={item.friendComments}
          content={item.content}
          imageUrl={item.imageUrl}
          ownerAvatar={item.ownerAvatar}
          videoUrl={item.videoUrl}
          numberComments={item.numberComments}
          numberLikes={item.numberLikes}
          numberShares={item.numberShares}
        />
      )}
      keyExtractor={item => item.id}
    />
  );
}

export default HomeTab;
