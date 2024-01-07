import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { IconButton, Avatar, Surface, TouchableRipple } from 'react-native-paper';
import database from '@react-native-firebase/database';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import { AppNaviagtionName, ChatNavigationName } from 'src/common/constants/nameScreen';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
interface Contact {
  name: string;
  lastMsg: string;
  avatar: string;
}

function ContactList() {
  const [chatlist, setChatlist] = useState<Contact[]>([]);
  const navigationChatScreen: NavigationProp<AppNavigationType, AppNaviagtionName.ChatNavigation> =
    useNavigation();
  const handleNaviagtionChatScreen = (contact: Contact) =>
    navigationChatScreen.navigate(AppNaviagtionName.ChatNavigation, {
      screen: ChatNavigationName.InboxListScreen,
      params: { contact }
    });
  useEffect(() => {
    getChatlist();
  });
  const auth = useAppSelector(selectAuth);
  console.log(auth.user);

  const getChatlist = async () => {
    database()
      .ref('/chatlistt/' + auth.user?.id)
      .on('value', snapshot => {
        if (snapshot.val()) {
          const chatlistData = snapshot.val();
          setChatlist(Object.values(chatlistData));
        }
      });
  };

  return (
    <>
      {chatlist.map((contact, index) => (
        <TouchableRipple
          key={index}
          style={{ marginVertical: 10 }}
          onPress={() => handleNaviagtionChatScreen(contact)}
          rippleColor='rgba(0, 0, 0, .32)'
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Avatar.Image
              size={60}
              style={{ marginTop: 10, marginLeft: 10 }}
              source={{ uri: contact.avatar }}
            />
            <View style={{ flexDirection: 'column', marginLeft: 10, marginTop: 10 }}>
              <Text style={{ fontWeight: '500', fontSize: 15, color: '#000', marginBottom: 5 }}>
                {contact.name}
              </Text>
              <Text style={{ fontWeight: '500', color: '#000' }}> {contact.lastMsg}</Text>
            </View>
            <IconButton icon={'check-circle-outline'} style={{ marginLeft: 'auto' }} size={20} />
          </View>
        </TouchableRipple>
      ))}
    </>
  );
}
function InboxScreen() {
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
