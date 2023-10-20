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
  required: false,
  activeOutlineColor: color.activeOutlineColor,
  outlineColor: color.outlineColor,
  selectionColor: color.outlineColor
};
export type BaseInputProps = InputTextProps & TextInputProps;
function BaseInputText(props: BaseInputProps): JSX.Element {
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
        selectionColor={props.selectionColor}
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
        autoFocus={props.autoFocus}
        outlineStyle={{ borderWidth: 1.5, borderRadius: 8 }}
        style={[props.style, { height: 54 }]}
      />
      {errorText ? <TextError>{errorText}</TextError> : ''}
    </View>
  );
}
BaseInputText.defaultProps = defaultProps;
const TextError = styled.Text`
  color: ${color.error};
  padding-top: 4dp;
  font-size: 14dp;
  padding-left: 8dp;
`;
const Label: FC<PropsWithChildren<LableProps>> = styled.Text`
  color: ${props => (props.error ? color.error : color.primary)};
  padding-bottom: 8dp;
  font-size: 16dp;
  padding-left: 12dp;
  font-weight: bold;
`;
const RequiredIcon = styled.Text`
  color: ${color.error};
  padding-left: 4dp;
`;
export default BaseInputText;
