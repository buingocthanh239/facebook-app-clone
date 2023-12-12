import { ForwardedRef, forwardRef } from 'react';
import { FlatListProps, FlatList, RefreshControl } from 'react-native';
import { color } from 'src/common/constants/color';

const ITEM_HEIGHT = 10;

export type BaseFlatListProps = FlatListProps<any>;
function BaseFlatList(props: BaseFlatListProps, ref: ForwardedRef<FlatList>) {
  const { onRefresh, refreshing, ...propsRemain } = props;
  return (
    <FlatList
      ref={ref}
      {...propsRemain}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index
      })}
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

export default forwardRef(BaseFlatList);
