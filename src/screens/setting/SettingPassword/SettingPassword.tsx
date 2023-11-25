import { NavigationProp, useNavigation } from '@react-navigation/native';
import { FieldValue, useForm } from 'react-hook-form';
import { TouchableOpacity, View } from 'react-native';
import { color } from 'src/common/constants/color';
import BaseButton from 'src/components/BaseButton';
import BaseForm from 'src/components/BaseForm';
import BaseInputPassword from 'src/components/BaseInputPassword';
import { Text } from 'react-native-paper';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

const changPasswordSchema = yup.object({
  currPassword: yup.string().min(6).required(),
  newPassword: yup.string().min(6).required(),
  confirmNewPassword: yup.string().min(6).required()
});

interface IChangePassword {
  currPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

function SettingPassword() {
  const navigation: NavigationProp<SettingNavigationType> = useNavigation();
  const onPressCancelButton = () => navigation.goBack();
  const methods = useForm({ resolver: yupResolver(changPasswordSchema) });
  const { handleSubmit } = methods;
  const onSubmit = (data: FieldValue<IChangePassword>) => {
    console.log(data);
  };
  return (
    <>
      <BaseForm methods={methods}>
        <View style={{ padding: 10 }}>
          <BaseInputPassword
            placeholder='Mật khẩu hiện tại'
            mode='flat'
            name='currPassword'
            style={{ backgroundColor: color.sureface }}
            underlineColor={color.activeOutlineColor}
            activeUnderlineColor={color.activeOutlineColor}
          />
          <BaseInputPassword
            placeholder='Mật khẩu mới'
            mode='flat'
            name='newPassword'
            style={{ backgroundColor: color.sureface }}
            underlineColor={color.activeOutlineColor}
            activeUnderlineColor={color.activeOutlineColor}
          />
          <BaseInputPassword
            placeholder='Gõ lại mật khẩu'
            mode='flat'
            name='confirmNewPassword'
            style={{ backgroundColor: color.sureface }}
            underlineColor={color.activeOutlineColor}
            activeUnderlineColor={color.activeOutlineColor}
          />

          <BaseButton
            width={350}
            style={{ marginTop: 20 }}
            onPress={handleSubmit(onSubmit)}
            borderRadius={8}
          >
            Lưu thay đổi
          </BaseButton>
          <BaseButton
            width={350}
            style={{ marginTop: 10 }}
            onPress={onPressCancelButton}
            borderRadius={8}
            buttonColor={color.borderColor}
          >
            Hủy
          </BaseButton>
          <TouchableOpacity activeOpacity={0.7}>
            <Text
              variant='titleSmall'
              style={{ textAlign: 'center', color: color.primary, marginTop: 8 }}
            >
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
      </BaseForm>
    </>
  );
}

export default SettingPassword;
