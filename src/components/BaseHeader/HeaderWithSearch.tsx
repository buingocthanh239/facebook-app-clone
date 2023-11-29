import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import { color } from 'src/common/constants/color';

interface HeaderWithSearchProps {
  title: string;
}

const HeaderWithSearch: React.FC<HeaderWithSearchProps> = ({ title }) => {
  const navigation = useNavigation();

  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSearchPress = () => {
    console.log('Search button pressed');
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        paddingBottom: 15,
        borderBottomColor: color.borderBottom,
        borderBottomWidth: 1
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          paddingHorizontal: 10,
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name='arrow-left' size={22} color='black' />
        </TouchableOpacity>
        <Text style={{ fontSize: 20, fontWeight: '500', marginLeft: 25, color: color.textColor }}>
          {title}
        </Text>
      </View>
      <TouchableOpacity onPress={handleSearchPress}>
        <Icon name='search' size={24} color='black' />
      </TouchableOpacity>
    </View>
  );
};

export default HeaderWithSearch;
