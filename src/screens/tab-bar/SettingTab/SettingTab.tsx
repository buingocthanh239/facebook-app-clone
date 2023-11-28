import { StyleSheet, TouchableOpacity, View, ScrollView, BackHandler } from 'react-native';
import { Avatar, Card, Divider, IconButton, List, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { getAvatarUri } from 'src/utils/helper';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from 'src/common/styles/globalStyles';
import TextTitle from './components/TextTitle';
import ListItemCard from './components/ListItemCard';
import { useNavigation, NavigationProp } from '@react-navigation/native';

interface ISettingAcordion {
  title: string;
  iconName: string;
  onPress: () => any;
}
function SettingTab() {
  const navigation: NavigationProp<SettingNavigationType> = useNavigation();
  const onPressSettingItem = () => navigation.navigate('SettingScreen');
  const onPressPrivacyItem = () => navigation.navigate('BlockFriendScreen');
  const onPressNotificationItem = () => navigation.navigate('SettingNotification');
  const onPressExit = () => BackHandler.exitApp();
  const settingAccordion: ISettingAcordion[] = [
    {
      title: 'Cài đặt',
      iconName: 'user-cog',
      onPress: onPressSettingItem
    },
    {
      title: 'Quyền riêng tư',
      iconName: 'user-lock',
      onPress: onPressPrivacyItem
    },
    {
      title: 'Thông báo',
      iconName: 'volume-up',
      onPress: onPressNotificationItem
    }
  ];
  return (
    <ScrollView>
      <View
        style={[
          globalStyles.flexRow,
          globalStyles.spaceBetweenJustify,
          globalStyles.centerAlignItem
        ]}
      >
        <Text style={styles.menuTitle}>Menu</Text>
        <IconButton icon='magnify' size={30} />
      </View>
      <Card style={styles.wrapperAcountCard}>
        <Card.Title
          title={<Text variant='titleMedium'>Bùi Ngọc Thành</Text>}
          left={props => <Avatar.Image {...props} source={getAvatarUri('')} size={40} />}
          right={props => (
            <IconButton
              {...props}
              mode='contained'
              icon={() => <IconFont name='chevron-down' color={color.iconButtonColor} size={16} />}
              containerColor={color.iconButtonBackgroundColor}
              size={20}
            />
          )}
        />
        <Divider />
        <Card.Title
          title={
            <Text variant='titleMedium' style={{ color: color.activeOutlineColor }}>
              Tạo trang cá nhân khác
            </Text>
          }
          left={props => (
            <IconButton
              {...props}
              icon={() => <Ionicons name='add-circle' color={color.activeOutlineColor} size={30} />}
              size={20}
              style={[globalStyles.flexRow, globalStyles.centerAlignItem]}
            />
          )}
        />
      </Card>
      <List.Section>
        <Divider />

        <List.Accordion
          style={{ backgroundColor: color.backgroundColor }}
          title={<TextTitle>Trợ giúp và hỗ trợ</TextTitle>}
          left={props => <List.Icon {...props} icon='help-circle' color={color.primary} />}
        >
          <ListItemCard
            title='Điều khoản và chính sách'
            left={<IconFont name='envelope-open-text' color={color.textColor} size={20} />}
          />
        </List.Accordion>

        <Divider />
        <List.Accordion
          style={{ backgroundColor: color.backgroundColor }}
          title={<TextTitle>Cài đặt và quyền riêng tư</TextTitle>}
          left={props => <List.Icon {...props} icon='cog' />}
        >
          {settingAccordion.map((item, i) => (
            <ListItemCard
              key={i}
              title={item.title}
              left={<IconFont name={item.iconName} color={color.textColor} size={20} />}
              onPress={item.onPress}
            />
          ))}
        </List.Accordion>
        <Divider />
        <TouchableOpacity activeOpacity={0.6} onPress={onPressExit}>
          <List.Item
            title={<TextTitle>Thoát</TextTitle>}
            left={props => <List.Icon {...props} icon='exit-run' color={color.green} />}
          />
        </TouchableOpacity>
        <Divider />
        <TouchableOpacity activeOpacity={0.6}>
          <List.Item
            title={<TextTitle>Đăng xuất</TextTitle>}
            left={props => <List.Icon {...props} icon='logout' color={color.textColor} />}
          />
        </TouchableOpacity>
      </List.Section>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  menuTitle: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  wrapperAcountCard: { backgroundColor: color.sureface, margin: 10 }
});
export default SettingTab;