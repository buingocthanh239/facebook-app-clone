import BaseFlatList from 'src/components/BaseFlatList';
import BlockFirendItem from './components/BlockFirendItem';
import HeaderItem from './components/HeaderItem';
import { ActivityIndicator, Divider, Text } from 'react-native-paper';
import { IBlockUserData, getListBlockApi } from 'src/services/block.service';
import useLoadingListApi from 'src/hooks/useLoadingListApi';
import { color } from 'src/common/constants/color';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { SettingNavigationName } from 'src/common/constants/nameScreen';

export interface IBlockFriend {
  id: string;
  avatar?: string;
  name: string;
}

function BlockFriendScreen() {
  const { data, onEndReadable, isLoadingFirstApi, isNextFetchingApi } =
    useLoadingListApi(getListBlockApi);

  // handle navigation search user screen
  const navigationSearchUser: NavigationProp<
    SettingNavigationType,
    SettingNavigationName.SearchUserScreen
  > = useNavigation();

  const onPessAddButton = () =>
    navigationSearchUser.navigate(SettingNavigationName.SearchUserScreen);
  return isLoadingFirstApi ? (
    <ActivityIndicator color={color.activeOutlineColor} style={{ marginTop: '50%' }} />
  ) : (
    <>
      <BaseFlatList
        ListHeaderComponent={<HeaderItem onPressAddItem={onPessAddButton} />}
        ListEmptyComponent={
          <Text variant='bodyLarge' style={{ textAlign: 'center', marginTop: 20 }}>
            Danh sách chặn trống
          </Text>
        }
        data={data}
        renderItem={({ item }: { item: IBlockUserData }) => (
          <>
            <BlockFirendItem title={item.name} avatar={item.avatar} id={item.id} />
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
