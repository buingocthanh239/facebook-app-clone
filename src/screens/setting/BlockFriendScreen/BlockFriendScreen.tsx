import BaseFlatList from 'src/components/BaseFlatList';
import BlockFirendItem from './components/BlockFirendItem';
import HeaderItem from './components/HeaderItem';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { getListBlockApi } from 'src/services/block.service';
import useLoadingListApi from 'src/hooks/useLoadingListApi';
import { color } from 'src/common/constants/color';

export interface IBlockFriend {
  id: string;
  avatar?: string;
  name: string;
}

function BlockFriendScreen() {
  const { data, onEndReadable, isLoadingFirstApi, isNextFetchingApi } =
    useLoadingListApi(getListBlockApi);

  return isLoadingFirstApi ? (
    <ActivityIndicator color={color.activeOutlineColor} style={{ marginTop: '50%' }} />
  ) : (
    <>
      <BaseFlatList
        ListHeaderComponent={<HeaderItem />}
        ListEmptyComponent={
          <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: 20 }}>
            Danh sách chặn trống
          </Text>
        }
        data={data}
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
        isFootterLoading={isNextFetchingApi}
      />
    </>
  );
}

export default BlockFriendScreen;
