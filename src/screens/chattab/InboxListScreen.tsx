import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { TextInput, IconButton, Avatar, useTheme } from 'react-native-paper';

interface MyMessageProps {
  message: string;
}

const MyMessage: React.FC<MyMessageProps> = ({ message }: MyMessageProps) => (
  <View style={styles.myMessageContainer}>
    <Text style={styles.myMessageText}>{message}</Text>
  </View>
);

interface TheirMessageProps {
  message: string;
}

const TheirMessage: React.FC<TheirMessageProps> = ({ message }: TheirMessageProps) => (
  <View style={styles.theirMessageContainer}>
    <Avatar.Image source={require('../../assets/avatar-default.png')} size={40} />
    <View style={styles.theirMessageContent}>
      <Text style={styles.theirMessageText}>{message}</Text>
    </View>
  </View>
);

const InboxListScreen: React.FC = () => {
  const [text, setText] = useState('');
  const theme = useTheme();
  const { colors } = theme;

  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'their', content: '1' },
    { type: 'mine', content: 'ádasasdadasdads' },
    { type: 'their', content: 'adasdasad' }
    // ... (các tin nhắn khác)
  ]);

  const handleSendMessage = () => {
    if (text.trim() !== '') {
      const newMessage = { type: 'mine', content: text };
      setMessages(prevMessages => [...prevMessages, newMessage]);
      setText('');
    }
    setIsTyping(false);
  };

  return (
    <>
      <View style={{ flexDirection: 'row', backgroundColor: '#fff' }}>
        <IconButton icon={'keyboard-backspace'} iconColor={'#6A5ACD'} onPress={() => {}} />
        <Avatar.Image
          size={35}
          style={{ marginTop: 10 }}
          source={require('../../assets/avatar-default.png')}
        />
        <View style={{ flexDirection: 'column', marginTop: 8, marginLeft: 10 }}>
          <Text style={{ fontWeight: 'bold', fontSize: 15, color: '#003' }}> Trần Tuấn </Text>
          <Text style={{ fontSize: 10, fontWeight: '300' }}> Hoạt động 20 phút trước </Text>
        </View>
        <IconButton icon={'phone'} iconColor={'#6A5ACD'} style={{ marginLeft: 'auto' }} />
        <IconButton icon={'video'} iconColor={'#6A5ACD'} />
        <IconButton icon={'information'} iconColor={'#6A5ACD'} />
      </View>
      <ScrollView style={styles.container}>
        {messages.map((message, index) =>
          message.type === 'mine' ? (
            <MyMessage key={index} message={message.content} />
          ) : (
            <TheirMessage key={index} message={message.content} />
          )
        )}
      </ScrollView>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          maxHeight: 250
        }}
      >
        <IconButton icon={'dots-grid'} size={30} iconColor='#0066FF' onPress={() => {}} />
        <IconButton
          icon={'camera'}
          size={30}
          iconColor='#0066FF'
          onPress={() => {}}
          style={isTyping && { display: 'none' }}
        />
        <IconButton
          icon={'file-image'}
          size={30}
          iconColor='#0066FF'
          onPress={() => {}}
          style={isTyping && { display: 'none' }}
        />
        <IconButton
          icon={'microphone'}
          size={30}
          iconColor='#0066FF'
          onPress={() => {}}
          style={isTyping && { display: 'none' }}
        />
        <View style={{ flex: 1, borderRadius: 10, maxHeight: 250 }}>
          <TextInput
            placeholder='Nhắn tin'
            multiline
            value={text}
            onFocus={() => setIsTyping(true)}
            onBlur={!text ? () => setIsTyping(false) : () => {}}
            onChangeText={text => setText(text)}
            right={<TextInput.Icon icon='sticker-emoji' color={'#0066FF'} />}
            onSubmitEditing={handleSendMessage}
            theme={{ ...theme, colors: { ...colors, primary: 'transparent' }, roundness: 20 }}
            style={{
              backgroundColor: '#DCDCDC',
              flex: 1,
              borderRadius: 20,
              textAlign: 'left'
            }}
            underlineColor='transparent'
          />
        </View>

        <IconButton size={30} icon={'thumb-up'} iconColor='#0066FF' />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#F4F4F4'
  },
  myMessageContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#0066FF',
    padding: 10,
    marginBottom: 10,
    borderRadius: 20
  },
  myMessageText: {
    color: '#FFFFFF'
  },
  theirMessageContainer: {
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
    paddingRight: 20,
    borderRadius: 10
  },
  theirMessageContent: {
    marginLeft: 10,
    backgroundColor: '#E0E0E0',
    padding: 10,
    borderRadius: 20
  },
  theirMessageText: {
    color: '#000000'
  }
});

export default InboxListScreen;
