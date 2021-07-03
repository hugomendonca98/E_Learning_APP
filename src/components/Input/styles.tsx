import styled, { css } from 'styled-components/native';
import FeatherIcon from 'react-native-vector-icons/Feather';

interface ContainerProps {
  isFocused: boolean;
  isErrored?: boolean;
}

export const Container = styled.View<ContainerProps>`
  width: 100%;
  padding: 0 16px;
  height: 60px;
  background-color: #fff;
  flex-direction: row;
  align-items: center;
  border-radius: 10px;
  border-width: 2px;
  border-style: solid;
  border-color: #c4c4d1;
  margin-bottom: 8px;

  ${props =>
    props.isErrored &&
    css`
      border-color: #c53030;
    `}

  ${props =>
    props.isFocused &&
    css`
      border-color: #ff6680;
    `}
`;

export const TextInput = styled.TextInput`
  flex: 1;
  background-color: #fff;
  font-size: 16px;
  color: #2d2d2d;
`;

export const Icon = styled(FeatherIcon)`
  margin-right: 16px;
`;
