import { PropsWithChildren } from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { color } from 'src/common/constants/color';
import { View } from 'react-native';
export type WrapperAuthScreenProps = PropsWithChildren<{
  paddingHorizontal?: number;
  paddingTop?: number;
  paddingBottom?: number;
  spaceBetween?: boolean;
}>;
const defaultProps: WrapperAuthScreenProps = {
  paddingHorizontal: 20,
  paddingBottom: 8,
  spaceBetween: false
};
function WrapperAuthScreen(props: WrapperAuthScreenProps): JSX.Element {
  const insets = useSafeAreaInsets();
  return (
    <LinearGradient
      colors={color.linearBackgroundColor}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <View
        style={{
          paddingTop: insets.top + (props.paddingTop ?? 0),
          paddingBottom: insets.bottom + (props.paddingBottom ?? 0),
          paddingLeft: insets.left + (props.paddingHorizontal ?? 0),
          paddingRight: insets.right + (props.paddingHorizontal ?? 0),
          flex: 1,
          justifyContent: props.spaceBetween ? 'space-between' : 'flex-start',
          gap: 10
        }}
      >
        {props.children}
      </View>
    </LinearGradient>
  );
}
WrapperAuthScreen.defaultProps = defaultProps;
export default WrapperAuthScreen;
