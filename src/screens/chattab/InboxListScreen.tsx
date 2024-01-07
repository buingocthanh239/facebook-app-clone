import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, IconButton, Avatar } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
import { getAvatarUri } from 'src/utils/helper';

const InboxListScreen = ({ route }: { route: any }) => {
  //   const alltestchat = [
  //     {
  //       sender: 'you',
  //       text: 'Hello from you',
  //       messageType: 'sent'
  //     },
  //     {
  //       sender: 'other',
  //       text: 'Hi from other',
  //       messageType: 'received'
  //     },
  //     {
  //       sender: 'other',
  //       text: 'Hi from other',
  //       messageType: 'received'
  //     },
  //     {
  //       sender: 'you',
  //       text: 'Hello from you',
  //       messageType: 'sent'
  //     },
  //     {
  //       sender: 'you',
  //       text: 'Hello from you',
  //       messageType: 'sent'
  //     },
  //     {
  //       sender: 'other',
  //       text: 'Hi from other',
  //       messageType: 'received'
  //     }
  //     // Thêm tin nhắn khác nếu cần
  //   ];
  const { contact } = route.params;

  //   const [text, setText] = useState('');
  const [, setIsTyping] = useState(false);
  const [msg, setMsg] = useState('');
  const [allChat, setAllChat] = useState<Message[]>([]);

  interface Message {
    // Định nghĩa kiểu dữ liệu của một tin nhắn
    // Ví dụ:
    from: string;
    messages: string;
    mstType: string;
    roomId: string;
    to: string;
    // Các trường khác nếu cần
  }

  useEffect(() => {
    const onChildAdd = database()
      .ref('/messages/' + contact.roomId)
      .on('child_added', snapshot => {
        const newMessage = snapshot.val();
        setAllChat(state => [...state, newMessage]);
      });

    // Stop listening for updates when no longer required
    return () =>
      database()
        .ref('/messages' + contact.roomId)
        .off('child_added', onChildAdd);
  }, [contact.roomId]);
  const auth = useAppSelector(selectAuth);

  const msgvalid = (txt: string) => txt && txt.replace(/\s/g, '').length;

  const sendMsg = () => {
    if (msg == '' || msgvalid(msg) == 0) {
      alert('Enter something...');
    }
    const msgData = {
      roomId: contact.roomId,
      messages: msg,
      from: auth.user?.id,
      to: contact.user_id,
      mstType: 'text'
    };

    // Tạo một reference đến đường dẫn cụ thể trong Firebase
    const newReference = database()
      .ref('/messages/' + contact.roomId)
      .push();

    // console.log('Auto generated key: ', newReference.key);

    // Set dữ liệu tại key mới tạo
    newReference.set(msgData).then(() => {
      const chatlistupdate = {
        lastMsg: msg
      };

      database()
        .ref('/chatlistt/' + contact.user_id + '/' + auth.user?.id)
        .update(chatlistupdate)
        .then(() => console.log('Data updated'));
      database()
        .ref('/chatlistt/' + auth.user?.id + '/' + contact.user_id)
        .update(chatlistupdate)
        .then(() => console.log('Data updated'));

      setMsg('');
    });
  };

  return (
    <>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <IconButton icon={'keyboard-backspace'} iconColor={'#6A5ACD'} onPress={() => {}} />
        <Avatar.Image size={35} style={{ marginTop: 10 }} source={getAvatarUri(contact.avatar)} />
        <View style={{ flexDirection: 'column', marginTop: 8, marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#003' }}>{contact.name}</Text>
          <Text style={{ fontSize: 10, fontWeight: '300' }}> Hoạt động 20 phút trước </Text>
        </View>
      </View>
      <ScrollView style={styles.container}>
        {allChat.map((message, index) => {
          return (
            <View
              key={index}
              style={[
                styles.messageContainer,
                message.from === auth.user?.id ? styles.sentMessage : styles.receivedMessage
              ]}
            >
              <Text style={message.from === auth.user?.id ? styles.sentText : styles.receivedText}>
                {message.messages}
              </Text>
            </View>
          );
        })}
      </ScrollView>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
        <IconButton
          icon={'dots-grid'}
          size={30}
          iconColor='#0066FF'
          onPress={() => {}}
          style={{ marginRight: -5 }}
        />

        <TextInput
          label='Nhắn tin'
          value={msg}
          onFocus={() => setIsTyping(true)}
          onChangeText={msg => setMsg(msg)}
          //   right={<TextInput.Icon icon='sticker-emoji' color={'#0066FF'} />}
          onSubmitEditing={() => {
            sendMsg();
          }}
          style={{
            paddingBottom: -20,
            paddingTop: -20,
            borderColor: '#fff',
            backgroundColor: '#DCDCDC',
            margin: 15,
            marginTop: 20,
            borderBottomLeftRadius: 30,
            borderBottomRightRadius: 30,
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30
          }}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column-reverse',
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4'
  },

  messageContainer: {
    padding: 10,
    borderRadius: 10,
    marginVertical: 5
  },
  sentMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#0066FF'
  },
  receivedMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#FFFFFF'
  },
  sentText: {
    color: '#FFFFFF'
  },
  receivedText: {
    color: '#000000'
  }
});
export default InboxListScreen;
