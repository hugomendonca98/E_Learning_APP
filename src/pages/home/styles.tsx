import { FlatList } from 'react-native';
import styled from 'styled-components/native';

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

export const CourseList = styled(FlatList as new () => FlatList)``;

export const BottomMenu = styled.View`
  flex-direction: row;
  justify-content: space-between;
  height: 73px;
  border: 1px solid #f0edf5;
  background-color: #ffff;
`;

export const TextMenu = styled.Text`
  font-family: 'Roboto-Medium';
  margin: auto;
  align-items: center;
  font-size: 15px;
  color: #ff6680;
`;
