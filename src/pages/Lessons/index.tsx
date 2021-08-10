/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { Image, TouchableOpacity } from 'react-native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import logo from '../../assets/logo.png';
import {
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
  AddToFavotites,
} from './styles';

import realm from '../../services/realmDB/schema';
import { useAuth } from '../../hooks/auth';
import { useOffline } from '../../hooks/offline';
import { useCourses } from '../../hooks/courses';

type LessonsProps = {
  route: {
    params: {
      course: {
        id: string;
        name: string;
        image: string;
      };
    };
  };
};

type LessonContent = {
  id: string;
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_id: string;
  course: {
    id: string;
    name: string;
    image: string;
  };
};

interface RenderItemLesson {
  item: LessonContent;
  index: number;
}

const Lessons: React.FC<LessonsProps> = ({ route }: LessonsProps) => {
  const { course } = route.params;
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { getLessons, lessons } = useCourses();
  const {
    getOfflineLessons,
    lessonsOffline,
    isFavorite,
    favToggle,
    handleAddToFavorites,
    setCompleted,
    completed,
    handleMarkAsDone,
  } = useOffline();

  // Busca as aulas, tanto online quanto offline caso exista.
  useEffect(() => {
    getLessons(course.id);
    getOfflineLessons(course.id);
  }, [course.id, getLessons, getOfflineLessons]);

  // Verifica se o course em questão já é um favorito.
  useEffect(() => {
    isFavorite(course.id);
  }, [course.id, isFavorite]);

  useEffect(() => {
    async function getLessonsCompleted() {
      const realmDB = await realm;
      const lessonsCompleted = realmDB.objects('Complete').toJSON();
      setCompleted(lessonsCompleted);
    }
    getLessonsCompleted();
  }, [setCompleted]);

  const formatDuration = (time: number) => {
    const measuredTime = new Date(2021, 5, 17, -3);
    measuredTime.setSeconds(time);
    const MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  };

  return (
    <>
      <NavBar>
        <MaterialIcons
          name="arrow-back"
          color="#FF6680"
          size={25}
          onPress={() => goBack()}
        />
        <Image source={logo} />
        <AddToFavotites onPress={() => handleAddToFavorites(course, user)}>
          <AntDesignIcons
            name={favToggle ? 'heart' : 'hearto'}
            color="#FF6680"
            size={20}
          />
        </AddToFavotites>
      </NavBar>
      <LessonsList
        ListHeaderComponent={
          <LessonsListHeader>
            <LessonsListHeaderTitle>
              {lessons.length > 0
                ? lessons[0].course.name
                : lessonsOffline[0]?.course.name}
            </LessonsListHeaderTitle>
            <LessonsListHeaderText>
              {lessons.length > 0
                ? `${lessons.length} Aula(s)`
                : `${lessonsOffline?.length} Aula(s)`}
            </LessonsListHeaderText>
          </LessonsListHeader>
        }
        data={lessons}
        keyExtractor={(lesson: LessonContent) => lesson.id}
        renderItem={({ item: lesson, index }: RenderItemLesson) => (
          <TouchableOpacity
            onLongPress={() => handleMarkAsDone(lesson.id, lesson.name)}
            onPress={() => console.log('Ir ara página da aula.')}
          >
            <LessonCard>
              {completed.length > 0 ? (
                completed.map(
                  lessonCompleted =>
                    lessonCompleted.id === lesson.id && (
                      <LessonPlay key={lesson.id} complete>
                        <EvilIcons
                          name="play"
                          color="#fff"
                          size={55}
                          style={{ marginTop: 11 }}
                        />
                      </LessonPlay>
                    ),
                )
              ) : (
                <LessonPlay key={lesson.id} complete={false}>
                  <EvilIcons
                    name="play"
                    color="#fff"
                    size={55}
                    style={{ marginTop: 11 }}
                  />
                </LessonPlay>
              )}

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
                  {completed.map(
                    lessonCompleted =>
                      lessonCompleted.id === lesson.id && (
                        <Completed key={lesson.id}>Completo!</Completed>
                      ),
                  )}
                </LessonInfoContent>
              </LessonTextContent>
            </LessonCard>
          </TouchableOpacity>
        )}
      />
    </>
  );
};

export default Lessons;
