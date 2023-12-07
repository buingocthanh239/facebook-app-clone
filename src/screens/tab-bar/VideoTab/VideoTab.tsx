import { View } from 'react-native';
import Post from 'src/components/Post';

import { Button, IconButton, Text, Divider } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import { IVideo } from 'src/interfaces/common.interface';
import { useState } from 'react';
import BaseFlatList from 'src/components/BaseFlatList';

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

function VideoTab() {
  const Data: IPost[] = [
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
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f64',
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
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f65',
      ownerName: 'Bùi Ngọc Thành',
      createdAt: '9',
      content: 'hsdjkfhdfkjdhdsjfhdksfhdj',
      video: {
        videoUri:
          'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        thumnail: 'https://i.picsum.photos/id/866/1600/900.jpg'
      }
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
        data={data}
        renderItem={({ item }) => (
          <Post
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  title: {},
  header: { flex: 1 },
  button: { flexDirection: 'row' }
});

export default VideoTab;
