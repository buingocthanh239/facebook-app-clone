import { useRef, useState } from 'react';
import BaseFlatList from 'src/components/BaseFlatList';
import NotificationItem from './components/NotificationItem';
import { INotification } from 'src/components/interfaces/notification.interface';
import { NotificationType } from 'src/common/enum/commom';
import {
  Avatar,
  Card,
  Divider,
  IconButton,
  Snackbar,
  Text,
  TouchableRipple
} from 'react-native-paper';
import BaseModal from 'src/components/BaseModal';
import { color } from 'src/common/constants/color';
import { View } from 'react-native';
import { useScrollToTop } from '@react-navigation/native';
function NotificationTab() {
  const [isVisibleModal, setIsVisibleModal] = useState(false);
  const [modalContent, setModalContent] = useState<INotification | null>(null);
  const [isVisibleSnackbar, setIsVisibleSnackbar] = useState<boolean>(false);
  const onDismissSnackBar = () => setIsVisibleSnackbar(false);
  const visibaleModal = (item: INotification) => {
    setModalContent(item);
    setIsVisibleModal(true);
  };

  const hideModal = () => {
    setIsVisibleModal(false);
    setModalContent(null);
  };
  const onRemoveNotification = () => {
    hideModal();
    setIsVisibleSnackbar(true);
  };
  const oldData: INotification[] = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d74',
      description: 'Bùi Ngọc Thành đã đăng trong một nhóm mà bạn tham gia',
      time: '9 h',
      isLook: false,
      type: NotificationType.COMMENT
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      description: 'Bùi Ngọc Thành',
      time: '9 h',
      isLook: false,
      type: NotificationType.COMMENT
    }
  ];
  const newData: INotification[] = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d75',
      description: 'Bùi Ngọc Thành',
      time: '9 h',
      isLook: false,
      type: NotificationType.COMMENT
    }
  ];
  const [data, setdata] = useState(oldData);
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    setTimeout(() => {
      setdata(data => [
        ...data,
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72' + Math.floor(Math.random() * 100),
          description: 'Bùi Ngọc Thành',
          time: '9 h',
          isLook: true,
          type: NotificationType.COMMENT
        }
      ]);
      setrefreshing(false);
    }, 2000);
  };

  // scroll to top
  const ref = useRef(null);
  useScrollToTop(ref);

  return (
    <>
      <BaseFlatList
        ref={ref}
        ListHeaderComponent={
          <>
            {newData.length !== 0 && (
              <Text
                variant='titleMedium'
                style={{ marginLeft: 10, marginTop: 10, marginBottom: 5 }}
              >
                Hôm nay
              </Text>
            )}
            {newData.map((item, i) => (
              <NotificationItem
                key={i}
                description={item.description}
                isLook={item.isLook}
                time={item.time}
                type={item.type}
                onPressRightIcon={() => visibaleModal(item)}
                onLongPress={() => visibaleModal(item)}
              />
            ))}
            {oldData.length !== 0 && (
              <Text
                variant='titleMedium'
                style={{ marginLeft: 10, marginTop: 10, marginBottom: 5 }}
              >
                Trước đó
              </Text>
            )}
          </>
        }
        data={data}
        renderItem={({ item }) => (
          <NotificationItem
            description={item.description}
            isLook={item.isLook}
            time={item.time}
            type={item.type}
            onPressRightIcon={() => visibaleModal(item)}
            onLongPress={() => visibaleModal(item)}
          />
        )}
        ListEmptyComponent={
          <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: '50%' }}>
            Không có thông báo
          </Text>
        }
        ItemSeparatorComponent={Divider}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
      <BaseModal isVisible={isVisibleModal} onBackdropPress={hideModal}>
        <View style={{ display: 'flex', alignItems: 'center', marginBottom: 20, gap: 10 }}>
          <Avatar.Image
            source={
              modalContent?.ownerUri
                ? { uri: modalContent?.ownerUri }
                : require('src/assets/logo.png')
            }
            size={40}
          />
          <Text
            variant='bodySmall'
            style={{
              color: color.activeOutlineColor,
              textAlign: 'center',
              marginBottom: 4,
              paddingHorizontal: 24
            }}
          >
            {modalContent?.description}
          </Text>
        </View>
        <TouchableRipple rippleColor={color.borderColor} onPress={onRemoveNotification}>
          <Card.Title
            title={<Text variant='titleMedium'>Gỡ thông báo này</Text>}
            left={props => (
              <IconButton
                {...props}
                icon='close-box'
                containerColor={color.borderColor}
                size={24}
                style={{ height: 36, width: 36 }}
              />
            )}
          />
        </TouchableRipple>
      </BaseModal>

      <Snackbar
        visible={isVisibleSnackbar}
        onDismiss={onDismissSnackBar}
        action={{
          label: 'Hoàn tác',
          onPress: () => {
            // Do something
          }
        }}
      >
        Đã gỡ thông báo
      </Snackbar>
    </>
  );
}

export default NotificationTab;
