import { RadioButton, RadioButtonGroupProps } from 'react-native-paper';
import BaseRadioButton from 'src/components/BaseRadioButton';
import { Gender } from 'src/common/enum/commom';
function GenderRadioGroup(props: Omit<RadioButtonGroupProps, 'children'>) {
  return (
    <RadioButton.Group value={props.value} onValueChange={props.onValueChange}>
      <BaseRadioButton label='Nam' value={Gender.male} />
      <BaseRadioButton label='Nữ' value={Gender.female} />
      <BaseRadioButton
        label='Tùy chọn khác'
        value={Gender.other}
        subLabel='Chọn tùy chọn khác nếu bạn thuôc giới tính khác hoặc không muốn tiết lộ'
      />
    </RadioButton.Group>
  );
}

export default GenderRadioGroup;
