import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

interface PropButtonText {
  active?: boolean;
}

export const NavegationBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
`;

export const InputView = styled.View`
  height: 56px;
  margin: 15px;
  border-radius: 100px;
  background-color: #fff;
  padding-left: 15px;
  flex-direction: row;
  align-items: center;
`;

export const InputSearch = styled.TextInput`
  flex: 1;
  border-radius: 100px;
  font-size: 15px;
  font-family: 'Roboto-Regular';
  color: #919191;
  margin-left: 10px;
  margin-right: 10px;
`;

export const SignOutButton = styled(RectButton)``;

export const BottomMenu = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 73px;
  border: 1px solid #f0edf5;
  background-color: #ffff;
`;

export const TextMenu = styled(RectButton)`
  margin: auto;
  align-items: center;
  flex: 1;
`;

export const ButtonText = styled.Text<PropButtonText>`
  border-top-color: ${props => (props.active ? '#ff6680' : '#f0edf5')};
  color: ${props => (props.active ? '#ff6680' : '#C4C4D1')};
  font-family: 'Roboto-Medium';
  font-size: 15px;
  border-top-width: 2px;
  flex: 1;
  width: 100%;
  text-align: center;
  margin-top: -1px;
  padding-top: 23px;
`;

export const ButtonModal = styled.TouchableHighlight`
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  margin-top: 28px;
  padding: 11px 24px;
  border-radius: 100px;
  background-color: #ff6680;
`;

export const ButtonTextModal = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #fff;
`;

export const NoButtonModal = styled.Text`
  color: #ff6680;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 18px;
  margin-top: 30px;
  margin-right: 20px;
`;

export const AlignButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
