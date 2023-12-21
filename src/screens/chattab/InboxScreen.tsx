import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { IconButton, TextInput, Avatar, Surface, TouchableRipple } from 'react-native-paper';

const avatarsData = [
  'Tuấn',
  'Văn',
  'Truyền',
  'Trí',
  'Thành'
  // Thêm tên các avatar khác ở đây
];

const contactsData = [
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' },
  { name: 'Trần Anh Tuấn', message: 'Hello bạn 23:57' }
  // Thêm dữ liệu của các người liên lạc khác ở đây
];

function AvatarList() {
  return (
    <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
      {avatarsData.map((avatar, index) => (
        <View key={index}>
          <Avatar.Image
            size={60}
            style={{ marginTop: 10, marginLeft: 20 }}
            source={require('../../assets/avatar-default.png')}
          />
          <Text style={{ marginLeft: 27, fontWeight: '500', color: '#000' }}>{avatar}</Text>
        </View>
      ))}
    </View>
  );
}

function ContactList() {
  return (
    <>
      {contactsData.map((contact, index) => (
        <TouchableRipple
          key={index}
          style={{ marginVertical: 10 }}
          onPress={() => {}}
          rippleColor='rgba(0, 0, 0, .32)'
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image
              size={60}
              style={{ marginTop: 10, marginLeft: 10 }}
              source={require('../../assets/avatar-default.png')}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontWeight: '500', fontSize: 15, color: '#000', marginBottom: 5 }}>
                {contact.name}
              </Text>
              <Text style={{ fontWeight: '500', color: '#000' }}> Bạn: {contact.message}</Text>
            </View>
            <IconButton icon={'check-circle-outline'} style={{ marginLeft: 'auto' }} size={20} />
          </View>
        </TouchableRipple>
      ))}
    </>
  );
}

function InboxScreen() {
  const [text, setText] = useState('');

  return (
    <>
      <Surface style={styles.surface}>
        <IconButton
          style={styles.iconButton}
          icon='format-list-bulleted'
          size={20}
          onPress={() => {}}
        />
        <Text style={styles.title}> Đoạn chat </Text>
        <IconButton style={styles.iconButton} icon='pencil' size={20} onPress={() => {}} />
      </Surface>
      <ScrollView style={styles.scrollView}>
        <TextInput
          label='Tìm kiếm'
          value={text}
          onChangeText={text => setText(text)}
          left={<TextInput.Icon icon='magnify' />}
          style={styles.textInput}
        />
        <AvatarList />
        <ContactList />
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  surface: {
    flexDirection: 'row',
    paddingBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 15,
    elevation: 4
  },
  iconButton: {
    backgroundColor: '#DCDCDC',
    marginTop: 10
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 10
  },
  scrollView: {
    backgroundColor: '#fff'
  },
  textInput: {
    borderColor: '#fff',
    backgroundColor: '#DCDCDC',
    margin: 15,
    marginTop: 20,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30
  }
});

export default InboxScreen;
