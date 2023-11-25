import { ScrollView } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { IListItem } from 'src/interfaces/common.interface';
import FunctionItem from '../components/FunctionItem';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import BaseForm from 'src/components/BaseForm';
import { useForm } from 'react-hook-form';
import BaseSwitch from 'src/components/BaseSwitch';
import { color } from 'src/common/constants/color';

interface IReciveListItem extends IListItem {
  name: string;
  turOnIcon: string;
  turOffIcon: string;
}

function SettingNotification() {
  const navigation: NavigationProp<SettingNavigationType> = useNavigation();
  const methods = useForm();
  const { getValues } = methods;
  const onPressPushNotification = () => navigation.navigate('SettingPushNotification');
  const listReciveNotifcations: IReciveListItem[] = [
    {
      name: 'comment',
      title: 'Bình luận',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'message-outline',
      turOffIcon: 'message-off-outline'
    },

    {
      name: 'update',
      title: 'Cập nhật từ bạn bè',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'account-supervisor-outline',
      turOffIcon: 'account-multiple-remove-outline'
    },
    {
      name: 'friendInvitaion',
      title: 'Lời mời kết bạn',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'account-plus-outline',
      turOffIcon: 'account-remove-outline'
    },
    {
      name: 'peopleSuggestion',
      title: 'Những người bạn có thể biết',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'account-network-outline',
      turOffIcon: 'account-off-outline'
    },
    {
      name: 'birthday',
      title: 'Sinh nhật',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'cake-variant-outline',
      turOffIcon: 'cupcake'
    },
    {
      name: 'video',
      title: 'Video',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'clipboard-play-outline',
      turOffIcon: 'clipboard-remove-outline'
    },
    {
      name: 'report',
      title: 'Phản hồi báo cáo',
      subtitle: 'Thông báo đẩy,email,SMS',
      turOnIcon: 'sticker-alert-outline',
      turOffIcon: 'sticker-remove-outline'
    }
  ];
  const listMethodPushNotifications: IListItem[] = [
    {
      title: 'Thông báo đẩy',
      subtitle: 'Bật',
      iconName: 'shape-square-plus',
      onPress: onPressPushNotification
    },
    {
      title: 'Email',
      subtitle: 'Bật gợi ý',
      iconName: 'email-outline'
    },
    {
      title: 'SMS',
      subtitle: 'Không có-Thêm số di động của bạn',
      iconName: 'comment-multiple-outline'
    }
  ];
  const methodLastIndex = listMethodPushNotifications.length - 1;
  const reciveLastIndex = listReciveNotifcations.length - 1;
  return (
    <ScrollView contentContainerStyle={{ paddingBottom: 50 }}>
      <Text
        style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 16, paddingHorizontal: 10 }}
      >
        Bạn nhận thông báo về
      </Text>
      <BaseForm methods={methods}>
        {listReciveNotifcations.map((item, i) => (
          <BaseSwitch
            key={i}
            name={item.name}
            title={item.title}
            subtitle={item.subtitle}
            left={() => (
              <IconButton
                icon={getValues(item.name) ? item.turOnIcon : item.turOffIcon}
                iconColor={color.textColor}
              />
            )}
            isDivider={i !== reciveLastIndex}
          />
        ))}
      </BaseForm>
      <Text
        style={{ fontSize: 18, fontWeight: 'bold', paddingVertical: 16, paddingHorizontal: 10 }}
      >
        Bạn nhận thông báo qua
      </Text>
      {listMethodPushNotifications.map((item, i) => (
        <FunctionItem
          key={i}
          title={item.title}
          subtitle={item.subtitle}
          leftIconName={item.iconName}
          sizeLeftIcon={24}
          isDivider={i !== methodLastIndex}
          onPress={item?.onPress}
        />
      ))}
    </ScrollView>
  );
}

export default SettingNotification;
