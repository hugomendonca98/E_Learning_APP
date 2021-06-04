import { FlatList } from 'react-native';
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

export const CoursesBar = styled.View`
  flex-direction: row;
  background-color: #f0edf5;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const Title = styled.Text`
  font-family: 'Rubik-Regular';
  font-size: 20px;
  color: #3d3d4c;
`;

export const InfoText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #a0a0b2;
`;

export const CourseCard = styled.View`
  width: 156px;
  height: 172px;
  border-radius: 16px;
  background-color: #ffffff;
  margin: 24px 16px 18px 16px;
  padding-left: 20px;
  padding-right: 20px;
`;

export const TrashView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const TrashButton = styled(RectButton)`
  margin-top: -45px;
  margin-right: -10px;
`;

export const CourseImage = styled.Image`
  width: 64px;
  height: 66px;
  margin-top: 25px;
`;

export const CourseTitle = styled.Text`
  font-family: 'Rubik-Regular';
  line-height: 20px;
  color: #6c6c80;
  font-size: 15px;
  margin-top: 20px;
`;

export const CourseLessons = styled.Text`
  font-family: 'Roboto-Regular';
  color: #c4c4d1;
  font-size: 10px;
  margin-top: 5px;
`;

export const CourseList = styled(FlatList as new () => FlatList).attrs({
  columnWrapperStyle: { paddingLeft: 17 },
  contentContainerStyle: {
    paddingBottom: 25,
    backgroundColor: '#F0EDF5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    minHeight: '100%',
  },
})``;

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

export const ModalContainer = styled.View`
  flex: 1;
  align-items: center;
  justify-content: center;
  background-color: #ecf0f1;
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

export const AlignButtons = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
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

export const TextModal = styled.Text`
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 25px;
  text-align: center;
  color: #6c6c80;
`;

export const NoButtonModal = styled.Text`
  color: #ff6680;
  font-family: 'Roboto-Regular';
  font-size: 15px;
  line-height: 18px;
  margin-top: 30px;
  margin-right: 20px;
`;
