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
} from './styles';

const Lessons: React.FC = () => {
  const DATA = [
    {
      id: '6b620742-5c76-440c-b1e8-fdd30f023c39',
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
        renderItem={({ item: lesson }) => (
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
              <LessonTitle>{lesson.name}</LessonTitle>
            </LessonTextContent>
          </LessonCard>
        )}
      />
    </>
  );
};

export default Lessons;
