/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useEffect } from 'react';
import { TouchableOpacity } from 'react-native';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import { useNavigation } from '@react-navigation/native';
import {
  LessonPlay,
  LessonCard,
  LessonsList,
  LessonsListHeader,
  LessonsListHeaderText,
  LessonsListHeaderTitle,
  LessonTextContent,
  LessonTitle,
  LessonInfoContent,
  LessonInfoText,
  ClockIcon,
  DurationContent,
  Completed,
} from './styles';

import getRealm from '../../services/realmDB/schema';
import { useAuth } from '../../hooks/auth';
import { useOffline } from '../../hooks/offline';
import { useCourses } from '../../hooks/courses';
import NavbarLessons from '../../components/NavbarLessons';

interface LessonsProps {
  route: {
    params: {
      course: {
        id: string;
        name: string;
        image: string;
      };
    };
  };
}

interface LessonContent {
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
}

interface RenderItemLesson {
  item: LessonContent;
  index: number;
}

const Lessons: React.FC<LessonsProps> = ({ route }: LessonsProps) => {
  const { course } = route.params;
  const { user } = useAuth();
  const { navigate } = useNavigation();
  const { getLessons, lessons } = useCourses();

  const {
    getOfflineLessons,
    lessonsOffline,
    isFavorite,
    completed,
    handleMarkAsDone,
    setCompleted,
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
      const realm = await getRealm();
      const lessonsCompleted = realm.objects('Complete').toJSON();

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
      <NavbarLessons course={course} user={user} />
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
        data={lessons.length > 0 ? lessons : lessonsOffline}
        keyExtractor={(lesson: LessonContent) => lesson.id}
        renderItem={({ item: lesson, index }: RenderItemLesson) => (
          <TouchableOpacity
            onLongPress={() => handleMarkAsDone(lesson.id, lesson.name)}
            onPress={() =>
              navigate('Lesson', { lessons, lesson, course, user })
            }
          >
            <LessonCard>
              <LessonPlay
                complete={
                  !!completed.find(
                    lessonCompleted => lessonCompleted.id === lesson.id,
                  )
                }
              >
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
                  {!!completed.find(
                    filterLesson => filterLesson.id === lesson.id,
                  ) && <Completed key={lesson.id}>Completo!</Completed>}
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
