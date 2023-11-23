import { FlatListProps, FlatList, RefreshControl } from 'react-native';
import { color } from 'src/common/constants/color';
export type BaseFlatListProps = FlatListProps<any>;
function BaseFlatList(props: BaseFlatListProps) {
  const { onRefresh, refreshing, ...propsRemain } = props;

  return (
    <FlatList
      {...propsRemain}
      refreshControl={
        <RefreshControl
          onRefresh={onRefresh as any}
          refreshing={refreshing as boolean}
          colors={[color.primary]}
        />
      }
    />
  );
}

export default BaseFlatList;
