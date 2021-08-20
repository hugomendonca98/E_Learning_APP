import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const LessonScrollView = styled.View`
  flex: 1;
  background-color: #fff;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
`;

export const VideoView = styled.View`
  overflow: hidden;
  height: 240px;
  border-top-left-radius: 24px;
  border-top-right-radius: 24px;
  background-color: #fff;
`;

export const LessonTextContent = styled.View`
  padding: 20px;
`;

export const LessonTitle = styled.Text`
  font-family: 'Rubik-Regular';
  color: #3d3d4c;
  font-size: 30px;
`;

export const InfoView = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
`;

export const LessonTextInfo = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 12px;
  color: #a0a0b2;
  margin: 3px;
  margin-top: 20px;
`;

export const LessonTextIcon = styled.View`
  display: flex;
  align-items: center;
  flex-direction: row;
  margin-left: 10px;
`;

export const ClockIcon = styled.View`
  margin-right: 5px;
`;

export const DescriptionText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #a0a0b2;
  margin-top: 20px;
`;

export const MenuArea = styled.View`
  background-color: #fff;
  padding-bottom: 20px;
`;

export const LessonMenu = styled.View`
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
  background-color: #fff;
`;

export const BackLesson = styled(RectButton)`
  align-items: center;
  flex-direction: row;
  background-color: #fff;
  padding: 15px 25px;
  border-radius: 25px;
  margin-left: 10px;
`;

export const BackLessonText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #ff6680;
`;

export const NextLesson = styled(RectButton)`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  background-color: #ff6680;
  padding: 15px 25px;
  border-radius: 25px;
  margin-right: 15px;
`;

export const NextLessonText = styled.Text`
  font-family: 'Roboto-Regular';
  font-size: 15px;
  color: #fff;
`;

export const MenuIcon = styled.Text`
  margin-right: 5px;
  margin-top: 2px;
  margin-left: 5px;
`;
