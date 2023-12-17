//react native
import { Text, TouchableOpacity, View } from 'react-native';

//icon
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import IconFA from 'react-native-vector-icons/FontAwesome5';
import IconF from 'react-native-vector-icons/Fontisto';
import styles from '../styles';
import { color } from 'src/common/constants/color';
import { useState } from 'react';
import { ISetRequestFriend } from 'src/interfaces/friends.interface';
import { setRequestFriendApi } from 'src/services/friends.services';
import ButtonField2 from './ButtonField2';

const ButtonField0 = ({ user_id }: { user_id: string }) => {
  const [status, setStatus] = useState('');
  const onPressAddFriend = async (data: ISetRequestFriend) => {
    try {
      const result = await setRequestFriendApi(data);
      setStatus('AddFriend');
      console.log(result);
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
            onPress={() => onPressAddFriend({ user_id })}
          >
            <IconFA name='user-plus' color={'white'} size={15} style={{ paddingRight: 5 }} />
            <Text style={styles.buttonText}>Thêm bạn bè</Text>
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
      ) : status === 'AddFriend' ? (
        <ButtonField2 user_id={user_id} />
      ) : (
        <></>
      )}
    </View>
  );
};

export default ButtonField0;
