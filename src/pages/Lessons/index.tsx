/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from 'react';
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

interface Courses {
  id: string;
  name: string;
  image: string;
}

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

type CompletedLessons = {
  id: string;
  name: string;
};

const Lessons: React.FC<LessonsProps> = ({ route }: LessonsProps) => {
  const { course } = route.params;
  const { user } = useAuth();
  const { goBack } = useNavigation();
  const { getOfflineLessons, lessonsOffline } = useOffline();
  const { getLessons, lessons } = useCourses();
  const { offLineCourses, setOfflineCourses, setNewCourse } = useOffline();
  const [favToggle, setFavToggle] = useState(false);
  const [completed, setCompleted] = useState<CompletedLessons[]>([]);

  useEffect(() => {
    getLessons(course.id);
    getOfflineLessons(course.id);
  }, [course.id, getLessons, getOfflineLessons]);

  useEffect(() => {
    async function isFavorite() {
      const realmdDB = await realm;

      const existCourse = realmdDB
        .objects('Course')
        .filtered(`id == '${course.id}'`);

      if (existCourse.length <= 0) {
        setFavToggle(false);
      } else {
        setFavToggle(true);
      }
    }

    isFavorite();
  }, [course.id]);

  const handleAddToFavorites = useCallback(async () => {
    const realmdDB = await realm;

    const existCourse: Courses[] = realmdDB
      .objects('Course')
      .filtered(`id == '${course.id}'`)
      .toJSON();

    if (Array.isArray(existCourse) && existCourse.length <= 0) {
      realmdDB.write(() => {
        const newCourse = realmdDB.create('Course', {
          id: course.id,
          userId: user.id,
          name: course.name,
          image: course.image,
        });

        setNewCourse([newCourse.toJSON()]);

        if (Array.isArray(lessons) && lessons.length > 0) {
          realmdDB.create('Lesson', {
            id: lessons[0].id,
            name: lessons[0].name,
            duration: lessons[0].duration,
            description: lessons[0].description,
            video_id: lessons[0].video_id,
            course: newCourse,
          });

          setFavToggle(true);
        }

        setFavToggle(true);
      });

      return;
    }

    const courseToDelete = realmdDB
      .objects('Course')
      .filtered(`id == '${course.id}'`);

    realmdDB.write(() => {
      realmdDB.delete(courseToDelete);
    });

    const newCourses = offLineCourses.filter(
      courseDelete => courseDelete.id !== course.id,
    );

    setOfflineCourses(newCourses);

    setFavToggle(false);
  }, [
    course.id,
    course.name,
    course.image,
    offLineCourses,
    setOfflineCourses,
    user.id,
    setNewCourse,
    lessons,
  ]);

  useEffect(() => {
    async function getLessonsCompleted() {
      const realmDB = await realm;
      const lessonsCompleted = realmDB.objects('Complete').toJSON();
      setCompleted(lessonsCompleted);
    }
    getLessonsCompleted();
  }, []);

  const handleMarkAsDone = useCallback(
    async (lessonId: string, lessonName: string) => {
      const realmDB = await realm;

      const existLesson = realmDB
        .objects('Complete')
        .filtered(`id == '${lessonId}'`);

      if (
        Array.isArray(existLesson.toJSON()) &&
        existLesson.toJSON().length <= 0
      ) {
        realmDB.write(() => {
          const newLessonCompleted = realmDB
            .create('Complete', {
              id: lessonId,
              name: lessonName,
            })
            .toJSON();

          setCompleted([...completed, newLessonCompleted]);
        });

        return;
      }
      realmDB.write(() => {
        realmDB.delete(existLesson);

        const newLessonsCompleted = existLesson
          .toJSON()
          .filter(lesson => lesson.id !== lessonId);

        setCompleted(newLessonsCompleted);
      });
    },
    [completed],
  );

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
        <AddToFavotites onPress={() => handleAddToFavorites()}>
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
