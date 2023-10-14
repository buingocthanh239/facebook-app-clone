import { Appbar, AppbarContentProps } from 'react-native-paper';
// import { Platform } from 'react-native';
// const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
export type BaseHeaderProps = AppbarContentProps;
function BaseHeader(props: BaseHeaderProps) {
  return (
    <Appbar.Header style={{ height: 50 }}>
      <Appbar.BackAction onPress={() => {}} />
      <Appbar.Content title={props.title} />
      {/* <Appbar.Action icon='magnify' onPress={() => {}} />
      <Appbar.Action icon={MORE_ICON} onPress={() => {}} /> */}
    </Appbar.Header>
  );
}

export default BaseHeader;
