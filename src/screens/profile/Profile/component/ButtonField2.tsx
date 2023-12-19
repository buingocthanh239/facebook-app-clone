//react native
import { Text, TouchableOpacity, View } from 'react-native';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA6 from 'react-native-vector-icons/FontAwesome6';
import IconF from 'react-native-vector-icons/Fontisto';
import styles from '../styles';
import { color } from 'src/common/constants/color';
import { useState } from 'react';
import { deleteRequestFriendApi } from 'src/services/friends.services';
import { IDeleteRequestFriend } from 'src/interfaces/friends.interface';
import ButtonField0 from './ButtonField0';

const ButtonField2 = ({ user_id }: { user_id: string }) => {
  const [status, setStatus] = useState('RequestFriend');

  const onPressCancel = async (data: IDeleteRequestFriend) => {
    try {
      const result = await deleteRequestFriendApi(data);
      setStatus('Cancel');
      console.log(result);
      return result;
    } catch (error) {
      return console.log({ message: 'sever availability' });
    }
  };

  return (
    <View>
      {status === 'RequestFriend' ? (
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
            onPress={() => onPressCancel({ user_id })}
          >
            <IconFA6 name='user-clock' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Hủy lời mời</Text>
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
        </View>
      ) : status === 'Cancel' ? (
        <ButtonField0 user_id={user_id} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ButtonField2;
