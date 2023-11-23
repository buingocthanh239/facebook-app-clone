import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Avatar, Card, Divider, IconButton, List, Text } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import { getAvatarUri } from 'src/utils/helper';
import IconFont from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import globalStyles from 'src/common/styles/globalStyles';
import TextTitle from './components/TextTitle';
import ListItemCard from './components/ListItemCard';

function SettingTab() {
  return (
    <View>
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
          <ListItemCard
            title='Cài đặt'
            left={<IconFont name='user-cog' color={color.textColor} size={20} />}
          />
        </List.Accordion>
        <Divider />
        <TouchableOpacity activeOpacity={0.6}>
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
    </View>
  );
}
const styles = StyleSheet.create({
  menuTitle: { fontSize: 24, fontWeight: 'bold', marginLeft: 10 },
  wrapperAcountCard: { backgroundColor: color.sureface, margin: 10 }
});
export default SettingTab;
