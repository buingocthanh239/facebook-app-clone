import { View, Text } from 'react-native';
import styles from './styles';
import Modal from 'react-native-modal';
import AntdIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon6 from 'react-native-vector-icons/FontAwesome6';
import Ionicons from 'react-native-vector-icons/Ionicons';
interface CommentTabProps {
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const CommentTab = (props: CommentTabProps) => {
  // const navigateEditProfileScreen = () => navigation.navigate('EditProfile');
  const handleCancel = () => {
    props.setOpenModal(false);
  };
  return (
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
          <AntdIcon name='like1' size={18} color='#02ADFC' style={styles.like} />
          <Ionicons name='heart-circle' size={18} color='#FF74AE' style={styles.heart} />
          <FontAwesomeIcon6 name='laugh-squint' size={18} color='#FFF298' style={styles.laugh} />
          <Text style={styles.numbericon}> 1000 </Text>
          <AntdIcon name='right' size={18} color='#000' style={styles.like} />
        </View>
        <View>
          <Text>đây là header comment</Text>
        </View>
      </View>
      <View>
        <Text>đây là header comment</Text>
      </View>
      <View>
        <Text>đây là header comment</Text>
      </View>
    </Modal>
  );
};

export default CommentTab;
