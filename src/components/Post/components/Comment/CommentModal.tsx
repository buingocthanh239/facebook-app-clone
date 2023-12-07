import { View, Text } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import PostReactions from './PostReaction/PostReactions';
import { color } from 'src/common/constants/color';
import { ScrollView } from 'react-native';
import ListComments from './ListComment/ListComment';
interface CommentTabProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommentTab = (props: CommentTabProps) => {
  const Emotions = [
    {
      id: 1,
      name: 'Like',
      icon: 'like2',
      library: 'AntDesign',
      number: 100,
      color: `${color.likeIcon}`
    },
    {
      id: 2,
      name: 'Love',
      icon: 'heart',
      library: 'FontAwesome6',
      number: 80,
      color: `${color.heartIcon}`
    },
    {
      id: 3,
      name: 'Haha',
      icon: 'laugh',
      library: 'Ionicons',
      number: 60,
      color: `${color.laughtIcon}`
    },
    {
      id: 4,
      name: 'Sad',
      icon: 'face-sad-cry',
      library: 'FontAwesome6',
      number: 120,
      color: `${color.likeIcon}`
    },
    {
      id: 5,
      name: 'Angry',
      icon: 'face-angry',
      library: 'FontAwesome6',
      number: 20,
      color: `${color.likeIcon}`
    }
  ];

  const listComments = [
    {
      id: 1,
      author: 'Truyền',
      content: 'Đây là comment.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '1 Giờ'
    },
    {
      id: 2,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '1 ngày'
    },
    {
      id: 3,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '2 ngày'
    },
    {
      id: 4,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '1 ngày'
    },
    {
      id: 5,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '5 phút'
    },
    {
      id: 6,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '1 ngày'
    },
    {
      id: 7,
      author: 'Truyền',
      content: 'Another comment here.',
      avatarUrl:
        'https://media-cdn-v2.laodong.vn/storage/newsportal/2023/7/25/1220914/Rose.jpg?w=660',
      timePost: '1 ngày'
    }
    // ...Thêm các comment khác vào đây
  ];

  // const navigateEditProfileScreen = () => navigation.navigate('EditProfile');
  const handleCancel = () => {
    props.setOpenModal(false);
  };
  return (
    <ScrollView>
      <Modal
        isVisible={props.openModal}
        style={styles.container}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={handleCancel}
      >
        <View style={styles.header}>
          {/* <Text>đây là header comment</Text> */}
          <View style={styles.icon}>
            {/* <AntdIcon name='like1' size={18} color='#02ADFC' style={styles.like} />
          <Ionicons name='heart-circle' size={18} color='#FF74AE' style={styles.heart} />
          <FontAwesomeIcon6 name='laugh-squint' size={18} color='#FFF298' style={styles.laugh} />
          <Text style={styles.numbericon}> 1000 </Text>
          <AntdIcon name='right' size={18} color='#000' style={styles.like} /> */}
            <PostReactions emotions={Emotions} />
          </View>
        </View>
        <View>
          <ListComments listComments={listComments} />
        </View>
        <View>
          <Text>đây là header comment</Text>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default CommentTab;
