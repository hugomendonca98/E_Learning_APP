import React from 'react';
import { Image } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import logo from '../../assets/logo.png';
import {
  GoToLesson,
  LessonPlay,
  LessonCard,
  LessonsList,
  LessonsListHeader,
  LessonsListHeaderText,
  LessonsListHeaderTitle,
  NavBar,
  LessonTextContent,
  LessonTitle,
  LessonInfoContent,
  LessonInfoText,
  ClockIcon,
  DurationContent,
  Completed,
} from './styles';

const Lessons: React.FC = () => {
  const DATA = [
    {
      id: '6b620742-5c76-440c-b1e8-fdd30f023c39',
      name: 'Introdução à teoria matemática blabla blabla bla blablabla bla blabla',
      duration: 30,
      course_id: '875a031e-6e83-49af-9f8b-e65cdd3d7bd2',
      description: 'Testando se está funcionando',
      video_id: 'tXTS0wQkZio',
      created_at: '2021-05-23T16:45:21.000Z',
      updated_at: '2021-05-23T16:45:21.000Z',
      course: {
        id: '875a031e-6e83-49af-9f8b-e65cdd3d7bd2',
        name: 'Curso de typescript completo 2021',
        image: 'https://i.ytimg.com/vi/Z0RlhHuw6hk/maxresdefault.jpg',
        created_at: '2021-05-23T16:45:07.000Z',
        updated_at: '2021-05-23T16:45:07.000Z',
      },
    },
    {
      id: '6b620742-5c76-440c-b1e8-fdd30f025c39',
      name: 'Introdução à teoria matemática',
      duration: 30,
      course_id: '875a031e-6e83-49af-9f8b-e65cdd3d7bd2',
      description: 'Testando se está funcionando',
      video_id: 'tXTS0wQkZio',
      created_at: '2021-05-23T16:45:21.000Z',
      updated_at: '2021-05-23T16:45:21.000Z',
      course: {
        id: '875a031e-6e83-49af-9f8b-e65cdd3d7bd2',
        name: 'Curso de typescript completo 2021',
        image: 'https://i.ytimg.com/vi/Z0RlhHuw6hk/maxresdefault.jpg',
        created_at: '2021-05-23T16:45:07.000Z',
        updated_at: '2021-05-23T16:45:07.000Z',
      },
    },
  ];

  const formatDuration = (time: number) => {
    const measuredTime = new Date(2021, 5, 17, -3);
    measuredTime.setSeconds(time);
    const MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  };

  return (
    <>
      <NavBar>
        <MaterialIcons name="arrow-back" color="#FF6680" size={25} />
        <Image source={logo} />
        <AntDesignIcons name="hearto" color="#FF6680" size={20} />
      </NavBar>
      <LessonsList
        ListHeaderComponent={
          <LessonsListHeader>
            <LessonsListHeaderTitle>Matemática</LessonsListHeaderTitle>
            <LessonsListHeaderText>16 Aulas</LessonsListHeaderText>
          </LessonsListHeader>
        }
        data={DATA}
        keyExtractor={lesson => lesson.id}
        renderItem={({ item: lesson, index }) => (
          <LessonCard>
            <LessonPlay>
              <EvilIcons
                name="play"
                color="#fff"
                size={55}
                style={{ marginTop: 11 }}
              />
            </LessonPlay>
            <LessonTextContent>
              <LessonTitle numberOfLines={2}>{lesson.name}</LessonTitle>
              <LessonInfoContent>
                <DurationContent>
                  <LessonInfoText>{`Aula ${index + 1}`}</LessonInfoText>
                  <ClockIcon>
                    <AntDesignIcons
                      name="clockcircleo"
                      color="#C4C4D1"
                      size={13}
                    />
                  </ClockIcon>
                  <LessonInfoText>
                    {formatDuration(lesson.duration)}
                  </LessonInfoText>
                </DurationContent>
                <Completed>Completo!</Completed>
              </LessonInfoContent>
            </LessonTextContent>
          </LessonCard>
        )}
      />
    </>
  );
};

export default Lessons;
