import { TouchableOpacityProps } from 'react-native';
import { FC, PropsWithChildren } from 'react';
import styled from 'styled-components/native';
import { color } from 'src/common/constants/color';

export interface BaseButtonProps {
  title?: string;
  bgColor?: string;
  height?: number;
  width?: number;
  borderRadius?: number;
}
export type WraperButtonProp = TouchableOpacityProps & BaseButtonProps;

const defaultProps: WraperButtonProp = {
  bgColor: color.primary,
  width: 300,
  height: 40,
  borderRadius: 5
};

function BaseButton(props: WraperButtonProp) {
  return (
    <WraperButton
      onPress={props.onPress}
      width={props.width}
      height={props.height}
      bgColor={props.bgColor}
      borderRadius={props.borderRadius}
    >
      <TextButton>{props.title}</TextButton>
    </WraperButton>
  );
}
BaseButton.defaultProps = defaultProps;
const TextButton = styled.Text`
  text-align: center;
  color: #ffffff;
  font-size: 16px;
  font-weight: bold;
`;
const WraperButton: FC<PropsWithChildren<WraperButtonProp>> = styled.TouchableOpacity`
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  background-color: ${(props) => props.bgColor};
  border-radius: ${(props) => props.borderRadius};
  justify-content: center;
`;

export default BaseButton;
