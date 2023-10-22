import { Appbar, AppbarContentProps } from 'react-native-paper';
import { color } from 'src/common/constants/color';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
export type BaseHeaderProps = AppbarContentProps;
function BaseHeader() {
  const navigation = useNavigation();
  return (
    <LinearGradient
      colors={color.linearBackgroundColor}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
    >
      <Appbar.BackAction onPress={() => navigation.goBack()} />
    </LinearGradient>
  );
}

export default BaseHeader;
