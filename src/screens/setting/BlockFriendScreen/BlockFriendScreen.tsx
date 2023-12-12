import { useCallback, useEffect, useState } from 'react';

import BaseFlatList from 'src/components/BaseFlatList';
import BlockFirendItem from './components/BlockFirendItem';
import HeaderItem from './components/HeaderItem';
import { Divider, Text } from 'react-native-paper';
import { getListBlockApi } from 'src/services/block.service';
import { COUNT_ITEM } from 'src/common/constants';

export interface IBlockFriend {
  id: string;
  avatar?: string;
  name: string;
}

function BlockFriendScreen() {
  const [blockUsers, setBlockUsers] = useState<IBlockFriend[]>([]);
  const [isFetch, setIsFetch] = useState<boolean>(true);
  const [skip, setSkip] = useState<number>(0);

  const getListUsers = useCallback(() => {
    async function getFirstUsers() {
      try {
        const res = await getListBlockApi({ index: 0, count: COUNT_ITEM });
        if (res.success) {
          setBlockUsers(res.data);
          if (res.data.length < COUNT_ITEM) {
            setIsFetch(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getFirstUsers();
  }, []);

  useEffect(() => {
    getListUsers();
  }, [getListUsers]);

  async function onEndReadable() {
    if (isFetch) {
      try {
        const res = await getListBlockApi({ index: skip + COUNT_ITEM, count: COUNT_ITEM });
        if (res.success) {
          if (res.data.length === 0) {
            return setIsFetch(false);
          }
          setBlockUsers(blockUsers => [...blockUsers, ...res.data]);
          setSkip(skip => skip + COUNT_ITEM);
        }
      } catch (err) {
        console.log(err);
      }
    }
  }

  return (
    <>
      <BaseFlatList
        ListHeaderComponent={<HeaderItem />}
        ListEmptyComponent={
          <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: 20 }}>
            Danh sách chặn trống
          </Text>
        }
        data={blockUsers}
        renderItem={({ item }) => (
          <>
            <BlockFirendItem title={item.name} />
            <Divider />
          </>
        )}
        keyExtractor={item => item.id}
        refreshing={false}
        onEndReached={onEndReadable}
        onEndReachedThreshold={0.05}
      />
    </>
  );
}

export default BlockFriendScreen;
