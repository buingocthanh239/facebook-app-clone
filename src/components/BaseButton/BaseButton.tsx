import { Button, ButtonProps } from '@rneui/themed';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { color } from 'src/common/constants/color';

export interface BaseButtonProps {
  height?: number;
  width?: number;
  borderRadius?: number;
  borderColor?: string;
  borderWidth?: number;
}
export type WraperButtonProp = ButtonProps & BaseButtonProps;

const defaultProps: WraperButtonProp = {
  color: color.primary,
  width: 300,
  height: 40,
  borderRadius: 5
};

function BaseButton(props: WraperButtonProp) {
  return (
    <WrapperButton onPress={props.onPress} width={props.width} height={props.height}>
      <Button
        loading={props.loading}
        color={props.color}
        type={props.type}
        radius={props.borderRadius}
        disabled={props.disabled}
        buttonStyle={{ borderColor: props.borderColor, borderWidth: props.borderWidth }}
      >
        {props.title}
      </Button>
    </WrapperButton>
  );
}
BaseButton.defaultProps = defaultProps;

const WrapperButton: FC<PropsWithChildren<WraperButtonProp>> = styled.View`
  width: ${(props) => props.width}px;
  height: ${(props) => props.height}px;
`;

export default BaseButton;
