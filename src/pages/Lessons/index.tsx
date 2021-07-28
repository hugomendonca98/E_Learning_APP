/* eslint-disable react/no-unused-prop-types */
/* eslint-disable camelcase */
import React, { useEffect, useCallback, useState } from 'react';
import { Image } from 'react-native';

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

import { useCourses } from '../../hooks/courses';
import realm from '../../services/realmDB/schema';
import { useAuth } from '../../hooks/auth';

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
  const [favToggle, setFavToggle] = useState(false);

  useEffect(() => {
    getLessons(course.id);
  }, [getLessons, course.id]);

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

    const existCourse = realmdDB
      .objects('Course')
      .filtered(`id == '${course.id}'`);

    if (existCourse.length <= 0) {
      realmdDB.write(() => {
        realmdDB.create('Course', {
          id: course.id,
          userId: user.id,
          name: course.name,
          image: course.image,
        });

        setFavToggle(true);
      });

      return;
    }

    realmdDB.write(() => {
      realmdDB.delete(existCourse);
    });
    setFavToggle(false);
  }, [user, course]);

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
              {lessons.length > 0 && lessons[0].course.name}
            </LessonsListHeaderTitle>
            <LessonsListHeaderText>
              {lessons.length > 0 && `${lessons.length} Aula(s)`}
            </LessonsListHeaderText>
          </LessonsListHeader>
        }
        data={lessons}
        keyExtractor={(lesson: LessonContent) => lesson.id}
        renderItem={({ item: lesson, index }: RenderItemLesson) => (
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
