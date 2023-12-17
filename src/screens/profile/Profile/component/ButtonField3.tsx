//react native
import { Text, TouchableOpacity, View } from 'react-native';
import { useState } from 'react';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/Fontisto';

//lib
import styles from '../styles';
import { color } from 'src/common/constants/color';
import Modal from 'react-native-modal';
import OptionCard from './OptionCard';
import { ISetAcceptFriend } from 'src/interfaces/friends.interface';
import { setAcceptFriendApi } from 'src/services/friends.services';
import ButtonField1 from './ButtonField1';
import ButtonField0 from './ButtonField0';

const ButtonField3 = ({ user_id }: { user_id: string }) => {
  const [status, setStatus] = useState('');

  const [modalResponseVisible, setModalResponseVisible] = useState(false);
  const showModalResponse = () => {
    setModalResponseVisible(true);
  };
  const hideModalResponse = () => {
    setModalResponseVisible(false);
  };
  const optionsResponse = [
    {
      icon: 'check',
      title: 'Chấp nhận'
    },
    {
      icon: 'delete-outline',
      title: 'Xóa'
    }
  ];
  const onPressAccept = async (data: ISetAcceptFriend) => {
    try {
      const result = await setAcceptFriendApi(data);
      setStatus('Accept');
      return result;
    } catch (error) {
      console.log(error);
      return console.log({ message: 'sever availability' });
    }
  };

  const onPressDelete = async (data: ISetAcceptFriend) => {
    try {
      const result = await setAcceptFriendApi(data);
      setStatus('Delete');
      return result;
    } catch (error) {
      return console.log({ message: 'sever availability' });
    }
  };
  return (
    <View>
      {status === '' ? (
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 20 }}>
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
            onPress={showModalResponse}
          >
            <IconFA6 name='user-check' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Phản hồi</Text>
          </TouchableOpacity>
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
          >
            <IconF name='messenger' color={'black'} size={15} style={{ paddingRight: 5 }} />
            <Text style={[styles.buttonText, { color: color.textColor }]}>Nhắn tin</Text>
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
          <Modal
            isVisible={modalResponseVisible}
            animationIn='slideInUp'
            animationOut='slideOutDown'
            backdropOpacity={0.5}
            onBackdropPress={hideModalResponse}
            style={styles.modal}
          >
            <View style={styles.modalContent}>
              {optionsResponse.map((option, index) => (
                <TouchableOpacity
                  activeOpacity={0.8}
                  key={index}
                  onPress={() => {
                    {
                      index === 0
                        ? onPressAccept({ user_id: user_id, is_accept: '1' })
                        : index === 1
                        ? onPressDelete({ user_id: user_id, is_accept: '0' })
                        : null;
                    }
                    hideModalResponse();
                  }}
                >
                  <View style={[styles.option, { height: 50 }]}>
                    <OptionCard icon={option.icon} title={option.title} />
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </Modal>
        </View>
      ) : status === 'Accept' ? (
        <ButtonField1 user_id={user_id} />
      ) : status === 'Delete' ? (
        <ButtonField0 user_id={user_id} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ButtonField3;
