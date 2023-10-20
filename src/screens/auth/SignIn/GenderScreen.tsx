import { Text } from 'react-native-paper';
import WraperAuthScreen from 'src/components/WraperAuthScreen';
import BaseButton from 'src/components/BaseButton';
import { useNavigation } from '@react-navigation/core';
import { useState } from 'react';
import styled from 'styled-components/native';
import GenderRadioGroup from 'src/components/GenderRadioGroup';
import { ViewProps } from 'react-native';
import { color } from 'src/common/constants/color';

function GenderScreen() {
  const navigation = useNavigation();
  const [gender, setGender] = useState('');
  const onChangeGender = (value: string) => setGender(value);
  const handleSubmit = () => navigation.navigate('EmailScreen' as never);
  return (
    <WraperAuthScreen>
      <Text variant='titleLarge' style={{ fontWeight: 'bold' }}>
        Bạn giới tính là gì?
      </Text>
      <Text variant='bodyMedium'>
        Bạn có thể thay đổi người nhìn thấy giới tính của mình trên trang cá nhân vào lúc khác.
      </Text>
      <WrapperGenderOption>
        <GenderRadioGroup value={gender} onValueChange={onChangeGender} />
      </WrapperGenderOption>
      <BaseButton onPress={handleSubmit}>Tiếp</BaseButton>
    </WraperAuthScreen>
  );
}
const WrapperGenderOption = styled.View<ViewProps>`
  padding: 16px 10px;
  background-color: ${color.white};
  border-radius: 8px;
  margin: 16px 0;
`;
export default GenderScreen;
