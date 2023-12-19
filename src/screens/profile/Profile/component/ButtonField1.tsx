//react native
import { Text, TouchableOpacity, View } from 'react-native';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/Fontisto';
import styles from '../styles';
import { color } from 'src/common/constants/color';
import { useState } from 'react';
import { unfriendApi } from 'src/services/friends.services';
import { IUnfriend } from 'src/interfaces/friends.interface';
import ButtonField0 from './ButtonField0';
import Modal from 'react-native-modal';
import OptionCard from './OptionCard';

const ButtonField1 = ({ user_id }: { user_id: string }) => {
  const [status, setStatus] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const showModal = () => {
    setModalVisible(true);
  };

  const hideModal = () => {
    setModalVisible(false);
  };
  const options = [
    {
      icon: 'person-off',
      title: `Chặn trang cá nhân`
    },
    {
      icon: 'person-remove',
      title: `Hủy kết bạn`
    }
  ];
  const handleUnfriend = async (data: IUnfriend) => {
    try {
      const result = await unfriendApi(data);
      hideModal();
      setStatus('unfriended');
      return result;
    } catch (error) {
      return console.log({ message: 'sever availability' });
    }
  };

  return (
    <View>
      {status === '' ? (
        <View
          style={[
            styles.section,
            { flexDirection: 'row', justifyContent: 'space-between', padding: 20 }
          ]}
        >
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
            onPress={() => {
              showModal();
            }}
          >
            <IconFA name='user-check' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Bạn bè</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.primary,
              padding: 8,
              borderRadius: 5,
              width: '42%',
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            <IconF name='messenger' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Nhắn tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              backgroundColor: color.outlineColor,
              padding: 8,
              borderRadius: 5,
              width: '12%',
              alignItems: 'center'
            }}
          >
            <Icon name='dots-horizontal' size={20}></Icon>
          </TouchableOpacity>
        </View>
      ) : (
        <ButtonField0 user_id={user_id} />
      )}
      <Modal
        isVisible={modalVisible}
        animationIn='slideInUp'
        animationOut='slideOutDown'
        backdropOpacity={0.5}
        onBackdropPress={hideModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                index === 1
                  ? handleUnfriend({ user_id: user_id })
                  : console.log(`Selected: ${option.title}`)
              }
            >
              <View style={[styles.option, { height: 19 * 3 }]}>
                <OptionCard icon={option.icon} title={option.title} />
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </Modal>
    </View>
  );
};

export default ButtonField1;
