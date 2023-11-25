import { NavigationProp, useNavigation } from '@react-navigation/native';
import { TouchableHighlight, View } from 'react-native';
import { Card, Divider, IconButton, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';

interface IListItemInfo {
  title: string;
  subtitle: string;
  onPress?: () => any;
}

function SettingInfo() {
  const navigation: NavigationProp<SettingNavigationType> = useNavigation();
  const onPressInfoName = () => navigation.navigate('SettingInfoName');
  const listItem: IListItemInfo[] = [
    {
      title: 'Tên',
      subtitle: 'Bùi Ngọc Thành',
      onPress: onPressInfoName
    },
    {
      title: 'Thông tin liên hệ',
      subtitle: 'Quản lí số điện thoại và email'
    },
    {
      title: 'Xác nhận danh tính',
      subtitle: 'Xác nhận danh tính của bạn trên Facebook'
    },
    {
      title: 'Quản lí tài khoản',
      subtitle: 'Cài đăt cách vô hiệu hóa và người liên hệ thừa kế'
    }
  ];
  return (
    <>
      <Text style={{ fontSize: 20, fontWeight: 'bold', paddingLeft: 10, paddingVertical: 10 }}>
        Thông tin cá nhân
      </Text>
      <Divider />
      {listItem.map((item, i) => (
        <View key={i}>
          <TouchableHighlight
            activeOpacity={1}
            underlayColor={color.borderColor}
            onPress={item.onPress ?? (() => {})}
          >
            <Card.Title
              title={item.title}
              subtitle={item.subtitle}
              titleVariant='titleMedium'
              subtitleVariant='bodySmall'
              subtitleStyle={{ color: color.activeOutlineColor }}
              subtitleNumberOfLines={3}
              right={props => (
                <IconButton {...props} icon='chevron-right' iconColor={color.activeOutlineColor} />
              )}
            />
          </TouchableHighlight>
          <Divider />
        </View>
      ))}
    </>
  );
}

export default SettingInfo;
