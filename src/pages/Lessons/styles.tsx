import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import styled from 'styled-components/native';

export const NavBar = styled.View`
  flex-direction: row;
  justify-content: space-between;
  padding: 10px;
  padding-left: 24px;
  padding-right: 24px;
`;

export const AddToFavotites = styled(RectButton)``;

export const LessonsList = styled(FlatList as new () => FlatList).attrs({
  contentContainerStyle: {
    paddingBottom: 25,
    backgroundColor: '#F0EDF5',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: 10,
    minHeight: '100%',
  },
})``;

export const LessonsListHeader = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-top: 30px;
  padding-left: 24px;
  padding-right: 24px;
  background-color: #f0edf5;
  border-top-right-radius: 24px;
  border-top-left-radius: 24px;
`;

export const LessonsListHeaderTitle = styled.Text`
  font-family: 'Rubik-Regular';
  font-size: 30px;
  color: #3d3d4c;
  line-height: 36px;
`;

export const LessonsListHeaderText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #a0a0b2;
`;

export const GoToLesson = styled(RectButton)``;

export const LessonCard = styled.View`
  flex-direction: row;
  align-items: center;
  margin: auto;
  margin-top: 20px;
`;

export const LessonPlay = styled.View`
  width: 68px;
  height: 68px;
  border-radius: 16px;
  background-color: #61c5bd;
  align-items: center;
  margin-right: -30px;
  z-index: 1000;
`;

export const LessonTextContent = styled.View`
  background-color: #fff;
  width: 290px;
  height: 100px;
  border-radius: 16px;
  padding: 16px;
  padding-left: 45px;
`;

export const LessonTitle = styled.Text`
  font-family: 'Rubik-Regular';
  font-size: 15px;
  line-height: 20px;
  color: #6c6c80;
`;

export const LessonInfoContent = styled.View`
  flex-direction: row;
  margin-top: 10px;
  align-items: center;
  justify-content: space-between;
`;

export const DurationContent = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const LessonInfoText = styled.Text`
  font-family: 'Roboto:Regular';
  font-size: 10px;
  color: #c4c4d1;
  line-height: 11px;
  align-items: center;
  margin-right: 10px;
`;

export const ClockIcon = styled.View`
  margin-right: 5px;
`;

export const Completed = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 10px;
  background-color: #61c5bd;
  color: #fff;
  padding: 10px;
  padding-top: 3px;
  padding-bottom: 3px;
  border-radius: 12px;
  justify-content: flex-end;
`;
