import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { Alert, Text, View } from 'react-native';
import { color } from 'src/common/constants/color';
import BaseForm from 'src/components/BaseForm';
import * as yup from 'yup';
import WraperAuthScreen from 'src/components/WraperScreen';
import BaseButton from 'src/components/BaseButton';
import BaseInputNumber from 'src/components/BaseInputNumber';
import { IAddMoney } from 'src/interfaces/setting.interface';
import { buyCoins } from 'src/services/setting.service';
import { useNavigation } from '@react-navigation/native';

const AddMoneyScreen = () => {
  const schema = yup.object({
    coins: yup.string().required()
  });
  const methods = useForm({ resolver: yupResolver(schema) });
  const { handleSubmit } = methods;
  const navigation = useNavigation();
  const onPressNextButton = (values: IAddMoney) => {
    Alert.alert('Xác nhận', `Bạn có muốn nạp ${values.coins} coins vào tài khoản?`, [
      {
        text: 'Hủy',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'Đồng ý',
        onPress: async () => {
          try {
            const data: { code: string; coins: string } = {
              code: '1',
              coins: values.coins
            };
            const res = await buyCoins(data);
            Alert.alert('Thành công!', `Bạn có ${res.data.coins} coins trong tài khoản`);
            navigation.goBack();
            return res;
          } catch (error) {
            console.log(error);
          }
        }
      }
    ]);
  };
  return (
    <WraperAuthScreen spaceBetween linnerGradient>
      <View style={{ flex: 1, paddingTop: 30 }}>
        <BaseForm methods={methods}>
          <Text
            style={{ fontSize: 24, fontWeight: 'bold', color: color.textColor, paddingBottom: 10 }}
          >
            Nạp tiền
          </Text>
          <Text style={{ fontSize: 16, color: color.textColor }}>
            Nạp thêm tiền để có thể tiếp tục thực hiện các tác vụ nâng cao.
          </Text>
          <View style={{ paddingTop: 10 }}>
            <BaseInputNumber mode='outlined' label='Nhập số tiền cần nạp' name='coins' />
          </View>
        </BaseForm>
        <BaseButton style={{ marginTop: 20 }} onPress={handleSubmit(onPressNextButton)}>
          Tiếp
        </BaseButton>
      </View>
    </WraperAuthScreen>
  );
};

export default AddMoneyScreen;
