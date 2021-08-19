import styled from 'styled-components/native';

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
