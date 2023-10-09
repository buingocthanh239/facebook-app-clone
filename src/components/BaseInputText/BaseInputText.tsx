import { TextInput, TextInputProps } from 'react-native-paper';
import { View } from 'react-native';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { color } from 'src/common/constants/color';
interface InputTextProps {
  errorText?: string;
  hideLabel?: boolean;
  required?: boolean;
}
export interface LableProps {
  error: boolean;
}

const defaultProps: BaseInputProps = {
  hideLabel: false,
  required: false
};
export type BaseInputProps = InputTextProps & TextInputProps;
function BaseInputText(props: BaseInputProps) {
  const { errorText } = props;
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
        left={props.left}
        right={props.right}
        label={!props.hideLabel ? props.label : ''}
        disabled={props.disabled}
        mode={props.mode}
        placeholder={props.placeholder}
        onChangeText={props.onChangeText}
        cursorColor={props.cursorColor}
        underlineColor={props.underlineColor}
        activeUnderlineColor={props.activeUnderlineColor}
        outlineColor={props.outlineColor}
        activeOutlineColor={props.activeOutlineColor}
        textColor={props.textColor}
        multiline={props.multiline}
        numberOfLines={props.numberOfLines}
        value={props.value}
        error={errorText ? true : false}
        keyboardType={props.keyboardType}
        style={props.style}
      />
      {errorText ? <TextError>{errorText}</TextError> : ''}
    </View>
  );
}
BaseInputText.defaultProps = defaultProps;
const TextError = styled.Text`
  color: ${color.error};
  padding-top: 4px;
  font-size: 14px;
  padding-left: 8px;
`;
const Label: FC<PropsWithChildren<LableProps>> = styled.Text`
  color: ${(props) => (props.error ? color.error : color.primary)};
  padding-bottom: 8px;
  font-size: 16px;
  padding-left: 12px;
  font-weight: bold;
`;
const RequiredIcon = styled.Text`
  color: ${color.error};
  padding-left: 4px;
`;
export default BaseInputText;
