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
  margin-right: -20px;
  z-index: 1000;
`;

export const LessonTextContent = styled.View`
  background-color: #fff;
  width: 290px;
  height: 100px;
  border-radius: 16px;
  padding: 20px;
  padding-left: 30px;
`;

export const LessonTitle = styled.Text``;
