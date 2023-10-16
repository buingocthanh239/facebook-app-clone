import { TextInput } from 'react-native-paper';
import { View } from 'react-native';
import { FC, PropsWithChildren, useState } from 'react';
import styled from 'styled-components/native';
import { color } from 'src/common/constants/color';
import { BaseInputProps, LableProps } from '../BaseInputText/BaseInputText';

const defaultProps: BaseInputProps = {
  hideLabel: false,
  required: false,
  activeOutlineColor: color.activeOutlineColor,
  outlineColor: color.outlineColor
};
function BaseInputPassword(props: BaseInputProps) {
  const [hidden, setHidden] = useState(false);
  const [hiddenEyeIcon, setHiddenEyeIcon] = useState(true);
  const { errorText } = props;
  const onPressEyeIcon = () => setHidden(!hidden);
  return (
    <View>
      {props.hideLabel && props.label ? (
        <Label error={!!errorText}>
          {props.label}
          {props.required && props.hideLabel ? <RequiredIcon> *</RequiredIcon> : ''}
        </Label>
      ) : (
        ''
      )}
      <TextInput
        right={
          !hiddenEyeIcon ? (
            hidden ? (
              <TextInput.Icon icon='eye' onPress={onPressEyeIcon} />
            ) : (
              <TextInput.Icon icon='eye-off' onPress={onPressEyeIcon} />
            )
          ) : (
            ''
          )
        }
        label={!props.hideLabel ? props.label : ''}
        mode={props.mode}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        cursorColor={props.cursorColor}
        outlineColor={props.outlineColor}
        activeOutlineColor={props.activeOutlineColor}
        textColor={props.textColor}
        numberOfLines={props.numberOfLines}
        value={props.value}
        error={errorText ? true : false}
        outlineStyle={{ borderWidth: 1.5, borderRadius: 8 }}
        style={props.style}
        autoFocus={props.autoFocus}
        secureTextEntry={hidden}
        onFocus={() => setHiddenEyeIcon(false)}
        onBlur={() => setHiddenEyeIcon(true)}
      />
      {errorText ? <TextError>{errorText}</TextError> : ''}
    </View>
  );
}
BaseInputPassword.defaultProps = defaultProps;

const TextError = styled.Text`
  color: ${color.error};
  padding-top: 4px;
  font-size: 14px;
  padding-left: 8px;
`;
const Label: FC<PropsWithChildren<LableProps>> = styled.Text`
  color: ${props => (props.error ? color.error : color.primary)};
  padding-bottom: 8px;
  font-size: 16px;
  padding-left: 12px;
  font-weight: bold;
`;
const RequiredIcon = styled.Text`
  color: ${color.error};
  padding-left: 4px;
`;
export default BaseInputPassword;
