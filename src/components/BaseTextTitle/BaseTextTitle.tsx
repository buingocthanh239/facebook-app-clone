import { TextProps, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';
interface TitleProps {
  fontSize?: number;
  color?: string;
}
export type BaseTextTitleProps = TextProps & TitleProps;
const defaultProps: BaseTextTitleProps = {
  fontSize: 14
};
function BaseTextTitle(props: BaseTextTitleProps) {
  return (
    <TouchableOpacity style={props.style} activeOpacity={0.6}>
      <Title onPress={props.onPress} fontSize={props.fontSize} color={props.color}>
        {props.children}
      </Title>
    </TouchableOpacity>
  );
}
BaseTextTitle.defaultProps = defaultProps;
const Title = styled.Text<BaseTextTitleProps>`
  font-weight: bold;
  font-size: ${props => props.fontSize}px;
  text-align: center;
  ${props => (props.color ? `color: ${props.color}` : '')};
`;
export default BaseTextTitle;
