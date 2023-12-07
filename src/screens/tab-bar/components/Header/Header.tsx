import { Appbar, IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import Icon from 'react-native-vector-icons/FontAwesome';
import IconFont from 'react-native-vector-icons/FontAwesome6';
import { NavigationProp, useNavigation } from '@react-navigation/core';
function Header() {
  const navigation: NavigationProp<SearchNavigationType> = useNavigation();
  const navigaSearchTab = () => navigation.navigate('SearchScreen');
  return (
    <Appbar.Header>
      <Appbar.Content
        title='facebook'
        color={color.primary}
        titleStyle={{ fontWeight: 'bold', fontSize: 28 }}
      />

      <IconButton
        mode='contained'
        icon={() => <IconFont name='plus' color={color.iconButtonColor} size={20} />}
        containerColor={color.iconButtonBackgroundColor}
        size={25}
      />
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
      />
    </Appbar.Header>
  );
}

export default Header;
