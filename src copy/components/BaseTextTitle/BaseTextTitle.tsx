import { TextProps, ViewProps } from 'react-native';
import styled from 'styled-components/native';
interface TitleProps {
  fontSize?: number;
}
export type BaseTextTitleProps = TextProps & TitleProps;
const defaultProps: BaseTextTitleProps = {
  fontSize: 12
};
function BaseTextTitle(props: TextProps) {
  return (
    <WrapperTextTitle style={props.style}>
      <Title onPress={props.onPress}>{props.children}</Title>
    </WrapperTextTitle>
  );
}
BaseTextTitle.defaultProps = defaultProps;
const WrapperTextTitle = styled.View<ViewProps>``;
const Title = styled.Text<BaseTextTitleProps>`
  font-weight: bold;
  font-size: 14px;
  text-align: center;
`;
export default BaseTextTitle;
