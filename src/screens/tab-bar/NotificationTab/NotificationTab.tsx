import { useState } from 'react';
import { NotificationType } from 'src/common/enum/commom';
import BaseFlatList from 'src/components/BaseFlatList';
import { INotification } from 'src/interfaces/notification.interface';

function NotificationTab() {
  const Data: INotification[] = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      description: 'Bui Ngoc Thanh da dawng bai',
      time: '9 gio',
      type: NotificationType.COMMENT,
      isLook: true
    }
  ];
  const [data, setdata] = useState(Data);
  const [refreshing, setrefreshing] = useState(false);
  const onRefresh = async () => {
    setrefreshing(true);
    setTimeout(() => {
      setdata(data => [
        ...data,
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72' + Math.floor(Math.random() * 100),
          description: 'Bui Ngoc Thanh da dawng bai',
          time: '9 gio',
          type: NotificationType.COMMENT,
          isLook: true
        }
      ]);
      setrefreshing(false);
    }, 2000);
  };

  return (
    <BaseFlatList
      data={data}
      renderItem={() => <NotificationTab />}
      keyExtractor={item => item.id}
      onRefresh={onRefresh}
      refreshing={refreshing}
    />
  );
}

export default NotificationTab;
