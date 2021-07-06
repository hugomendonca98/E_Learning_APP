import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
`;

export const OutModalStyle = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.2);
`;

export const InnerModal = styled.View`
  background-color: #fff;
  padding: 50px;
  border-radius: 16px;
`;

export const ContentModal = styled.View`
  justify-content: center;
  align-items: center;
  width: 180px;
`;

export const TextModal = styled.Text`
  margin-top: 10px;
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  color: #6c6c80;
`;

export const TextModalMessage = styled.Text`
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  color: #6c6c80;
`;
