/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';

import NavbarLessons from '../../components/NavbarLessons';
import { useOffline } from '../../hooks/offline';
import {
  BackLesson,
  BackLessonText,
  ClockIcon,
  DescriptionText,
  InfoView,
  LessonMenu,
  LessonScrollView,
  LessonTextContent,
  LessonTextIcon,
  LessonTextInfo,
  LessonTitle,
  MenuArea,
  MenuIcon,
  NextLesson,
  NextLessonText,
  VideoView,
} from './styles';

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

interface LessonProps {
  route: {
    params: {
      course: {
        id: string;
        name: string;
        image: string;
      };
      user: {
        id: string;
        name: string;
        email: string;
      };
      lessons: LessonContent[];
      lesson: LessonContent;
    };
  };
}

const Lesson: React.FC<LessonProps> = ({ route }: LessonProps): JSX.Element => {
  const { course, user, lessons, lesson } = route.params;
  const { handleMarkAsDone, getLessonsCompleted, completed } = useOffline();
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    getLessonsCompleted();
  }, [getLessonsCompleted]);

  // Controla o estado do player, quando a aula acabar marca a aula como completa.
  const onStateChange = (state: string) => {
    if (state === 'ended') {
      const lessonCompleted = completed.filter(
        filterLesson => filterLesson.id === lesson.id,
      );
      if (Array.isArray(lessonCompleted) && lessonCompleted.length <= 0) {
        handleMarkAsDone(lesson.id, lesson.name);
        setPlaying(false);
      }
      setPlaying(false);
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  const formatDuration = (time: number) => {
    const measuredTime = new Date(2021, 5, 17, -3);
    measuredTime.setSeconds(time);
    const MHSTime = measuredTime.toISOString().substr(11, 8);
    return MHSTime;
  };
  return (
    <>
      <NavbarLessons course={course} user={user} />
      <LessonScrollView>
        <VideoView>
          <YoutubeIframe
            height={300}
            videoId={lesson.video_id}
            play={playing}
            onChangeState={onStateChange}
          />
        </VideoView>
        <LessonTextContent>
          <LessonTitle>{lesson.name}</LessonTitle>
          <InfoView>
            <LessonTextInfo>
              {`Aula ${lessons.indexOf(lesson) + 1}`}
            </LessonTextInfo>
            <LessonTextIcon>
              <LessonTextInfo>
                <ClockIcon>
                  <AntDesignIcons
                    name="clockcircleo"
                    color="#C4C4D1"
                    size={13}
                  />
                </ClockIcon>
              </LessonTextInfo>
              <LessonTextInfo>
                {`${formatDuration(lesson.duration)}`}
              </LessonTextInfo>
            </LessonTextIcon>
          </InfoView>
          <DescriptionText>{lesson.description}</DescriptionText>
        </LessonTextContent>
      </LessonScrollView>
      <MenuArea>
        <LessonMenu>
          <BackLesson>
            <MenuIcon>
              <AntDesignIcons name="arrowleft" color="#ff6680" size={13} />
            </MenuIcon>
            <BackLessonText>Aula anterior</BackLessonText>
          </BackLesson>
          <NextLesson>
            <NextLessonText>Próxima aula</NextLessonText>
            <MenuIcon>
              <AntDesignIcons name="arrowright" color="#fff" size={13} />
            </MenuIcon>
          </NextLesson>
        </LessonMenu>
      </MenuArea>
    </>
  );
};

export default Lesson;
