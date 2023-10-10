import { Button, ButtonProps } from 'react-native-paper';
import { TouchableOpacityProps } from 'react-native';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { color } from 'src/common/constants/color';

export interface BaseButtonProps {
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
}

export interface CustomTouchProps {
  height?: number;
  width?: number;
}
export type WraperButtonProp = ButtonProps & BaseButtonProps & CustomTouchProps;

const defaultProps: WraperButtonProp = {
  mode: 'contained',
  children: '',
  borderColor: color.primary,
  buttonColor: color.primary,
  textColor: color.white,
  width: 300,
  height: 40,
  borderRadius: 5,
  borderWidth: 3
};

function BaseButton(props: WraperButtonProp) {
  return (
    <WrapperButton width={props.width} height={props.height} activeOpacity={0.7}>
      <Button
        loading={props.loading}
        buttonColor={props.mode === 'contained' ? props.buttonColor : ''}
        disabled={props.disabled}
        textColor={props.mode === 'outlined' ? color.primary : props.textColor}
        mode={props.mode}
        onPress={props.onPress}
        style={[
          {
            borderRadius: props.borderRadius
          },
          props.mode === 'outlined'
            ? {
                borderColor: props.borderColor,
                borderWidth: props.borderWidth
              }
            : {}
        ]}
      >
        {!props.loading ? props.children : ''}
      </Button>
    </WrapperButton>
  );
}
BaseButton.defaultProps = defaultProps;

const WrapperButton: FC<
  PropsWithChildren<CustomTouchProps & TouchableOpacityProps>
> = styled.TouchableOpacity`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export default BaseButton;
