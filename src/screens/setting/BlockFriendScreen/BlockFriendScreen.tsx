import { useState } from 'react';

import BaseFlatList from 'src/components/BaseFlatList';
import BlockFirendItem from './components/BlockFirendItem';
import HeaderItem from './components/HeaderItem';
import { Divider } from 'react-native-paper';

export interface IBlockFriend {
  id: string;
  avatar?: string;
  name: string;
}

function BlockFriendScreen() {
  const Data: IBlockFriend[] = [
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      name: 'Bùi Ngọc Thành'
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d71',
      name: 'Bùi Ngọc Thành'
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
          id: '58694a0f-3da1-471f-bd96-145571e29d75' + Math.floor(Math.random() * 100),
          name: 'Bùi Ngọc Thành'
        }
      ]);
      setrefreshing(false);
    }, 2000);
  };
  return (
    <>
      <BaseFlatList
        ListHeaderComponent={<HeaderItem />}
        data={data}
        renderItem={({ item }) => (
          <>
            <BlockFirendItem title={item.name} />
            <Divider />
          </>
        )}
        keyExtractor={item => item.id}
        onRefresh={onRefresh}
        refreshing={refreshing}
      />
    </>
  );
}

export default BlockFriendScreen;
