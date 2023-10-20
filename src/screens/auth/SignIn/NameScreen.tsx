import { View } from 'react-native';
import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseInputText from 'src/components/BaseInputText';
import BaseButton from 'src/components/BaseButton';
import BaseTextTitle from 'src/components/BaseTextTitle';
import { color } from 'src/common/constants/color';
import { useNavigation } from '@react-navigation/native';

function NameScreen() {
  const naviagtion = useNavigation();
  return (
    <WraperAuthScreen spaceBetween>
      <View style={{ flex: 1, flexDirection: 'column', gap: 10 }}>
        <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
          Bạn tên gì?
        </Text>
        <Text variant='bodyMedium'>Nhập tên bạn sử dụng trong đời thực.</Text>
        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
          <BaseInputText mode='outlined' label='Họ' style={{ width: 165 }} />
          <BaseInputText mode='outlined' label='Tên' style={{ width: 165 }} />
        </View>
        <BaseButton onPress={() => naviagtion.navigate('BirthdayScreen' as never)}>Tiếp</BaseButton>
      </View>
      <BaseTextTitle color={color.primary} onPress={() => naviagtion.navigate('Login' as never)}>
        Bạn đã có tài khoản ư?
      </BaseTextTitle>
    </WraperAuthScreen>
  );
}

export default NameScreen;
