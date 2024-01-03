import { Appbar, IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/core';
import {
  AddMoneyNavigationName,
  AppNaviagtionName,
  ChatNavigationName,
  SearchNavigationName
} from 'src/common/constants/nameScreen';
import { useState } from 'react';
import { Text, TouchableOpacity } from 'react-native';
import { useAppSelector } from 'src/redux';
import { selectAuth } from 'src/redux/slices/authSlice';
function Header() {
  const navigation: NavigationProp<AppNavigationType, AppNaviagtionName.SearchNavigation> =
    useNavigation();
  const navigationChatScreen: NavigationProp<AppNavigationType, AppNaviagtionName.ChatNavigation> =
    useNavigation();
  const navigationAddMoney: NavigationProp<AppNavigationType> = useNavigation();

  const [click, setClick] = useState(false);
  const navigaSearchTab = () =>
    navigation.navigate(AppNaviagtionName.SearchNavigation, {
      screen: SearchNavigationName.SearchScreen
    });
  const handleNaviagtionChatScreen = () =>
    navigationChatScreen.navigate(AppNaviagtionName.ChatNavigation, {
      screen: ChatNavigationName.InboxListScreen
    });
  const onPressAddMoney = () =>
    navigationAddMoney.navigate(AppNaviagtionName.AddMoneyNavigation, {
      screen: AddMoneyNavigationName.AddMoneyScreen
    });
  const auth = useAppSelector(selectAuth);
  const coins = auth.user?.coins;

  return (
    <Appbar.Header style={{ height: 40, marginTop: 8 }}>
      <Appbar.Content
        title='facebook'
        color={color.primary}
        titleStyle={{ fontWeight: 'bold', fontSize: 28 }}
      />

      <IconButton
        mode='contained'
        icon={() => <IconFont name='coins' color={color.iconButtonColor} size={20} />}
        containerColor={color.iconButtonBackgroundColor}
        size={25}
        onPress={() => setClick(!click)}
        style={click && { display: 'none' }}
      />
      <IconButton
        mode='contained'
        icon={() => <IconFont name='plus' color={color.iconButtonColor} size={20} />}
        containerColor={color.iconButtonBackgroundColor}
        size={25}
        style={!click && { display: 'none' }}
        onPress={onPressAddMoney}
      />
      <TouchableOpacity
        style={[
          !click
            ? { display: 'none' }
            : { flexDirection: 'row', alignItems: 'center', gap: 7, paddingHorizontal: 5 }
        ]}
        onPress={() => setClick(!click)}
      >
        <Text style={{ color: color.iconButtonColor, fontWeight: 'bold', fontSize: 16 }}>
          {coins?.toLocaleString()}
        </Text>
        <IconFont name='coins' color={color.iconButtonColor} size={16} />
      </TouchableOpacity>
      <IconButton
        mode='contained'
        icon={() => <Icon name='search' color={color.iconButtonColor} size={20} />}
        containerColor={color.iconButtonBackgroundColor}
        size={25}
        onPress={navigaSearchTab}
      />
      <IconButton
        mode='contained'
        icon='facebook-messenger'
        containerColor={color.iconButtonBackgroundColor}
        iconColor={color.iconButtonColor}
        size={25}
        onPress={handleNaviagtionChatScreen}
      />
    </Appbar.Header>
  );
}

export default Header;
