import BaseSwitch from 'src/components/BaseSwitch';
import BaseForm from 'src/components/BaseForm';
import { useForm } from 'react-hook-form';
import { IListItem } from 'src/interfaces/common.interface';
import { IconButton } from 'react-native-paper';
import { color } from 'src/common/constants/color';

interface IItem extends IListItem {
  name: string;
  turOnIcon: string;
  turOffIcon: string;
}

function SettingPushNotification() {
  const methods = useForm();
  const { getValues } = methods;
  const listItem: IItem[] = [
    {
      name: 'pushNotification',
      title: 'Tắt thông báo đẩy',
      subtitle: 'Tắt',
      turOffIcon: 'bell-off',
      turOnIcon: 'bell'
    },
    {
      name: 'vibrate',
      title: 'Rung',
      turOffIcon: 'vibrate-off',
      turOnIcon: 'vibrate',
      subtitle: 'Rung khi có thông báo đến'
    },
    {
      name: 'ledLight',
      title: 'Đèn LED điện thoại',
      subtitle: 'Nhấp nháy đền LED khi có thông báo đến',
      turOffIcon: 'flash-off',
      turOnIcon: 'flash'
    },
    {
      name: 'sound',
      title: 'Âm thanh',
      subtitle: 'Phát âm thanh khi có thông báo đến',
      turOffIcon: 'volume-off',
      turOnIcon: 'volume-high'
    },
    {
      name: 'generalMusic',
      title: 'Nhạc chuông',
      subtitle: 'facebook',
      turOffIcon: 'phone-off',
      turOnIcon: 'phone'
    },
    {
      name: 'logoutNotification',
      title: 'Thông báo đã đăng xuất',
      subtitle: 'Nhận thông báo khi đã đăng xuất',
      turOffIcon: 'cellphone-off',
      turOnIcon: 'cellphone'
    }
  ];
  return (
    <BaseForm methods={methods}>
      {listItem.map((item, i) => (
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
        />
      ))}
    </BaseForm>
  );
}

export default SettingPushNotification;
