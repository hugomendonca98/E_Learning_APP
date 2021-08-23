/* eslint-disable camelcase */
import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import YoutubeIframe from 'react-native-youtube-iframe';

import NavbarLessons from '../../components/NavbarLessons';
import { useOffline } from '../../hooks/offline';
import getRealm from '../../services/realmDB/schema';
import {
  BackLesson,
  BackLessonText,
  ClockIcon,
  DescriptionText,
  InfoView,
  LessonCompleted,
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
  const { handleMarkAsDone, setCompleted, completed } = useOffline();
  const [playing, setPlaying] = useState(false);
  const [lessonController, setLessonController] = useState({} as LessonContent);

  useEffect(() => {
    async function getLessonsCompleted() {
      const realm = await getRealm();
      const lessonsCompleted = realm.objects('Complete').toJSON();

      setCompleted(lessonsCompleted);
    }
    getLessonsCompleted();
  }, [setCompleted]);

  // Controla o estado do player, quando a aula acabar marca a aula como completa.
  const onStateChange = (state: string) => {
    if (state === 'ended') {
      const lessonCompleted = completed.filter(
        filterLesson => filterLesson.id === lessonController.id,
      );
      if (Array.isArray(lessonCompleted) && lessonCompleted.length <= 0) {
        handleMarkAsDone(lessonController.id, lessonController.name);
        setPlaying(false);
      }
      setPlaying(false);
    }
    if (state !== 'playing') {
      setPlaying(false);
    }
  };

  useEffect(() => {
    setLessonController(lesson);
  }, [lesson]);

  // Navega para próxima aula caso ela exista.
  const handleNextLesson = () => {
    const findNextLesson = lessons.indexOf(lessonController);
    if (findNextLesson !== lessons.length - 1) {
      const nextLesson = lessons[findNextLesson + 1];
      setLessonController(nextLesson);
    }
  };

  // Navega para aula anterior caso ela exista.
  const handleBackLesson = () => {
    const findNextLesson = lessons.indexOf(lessonController);
    if (findNextLesson !== 0) {
      const nextLesson = lessons[findNextLesson - 1];
      setLessonController(nextLesson);
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
            videoId={lessonController.video_id}
            play={playing}
            onChangeState={onStateChange}
            onError={err => Alert.alert(err)}
          />
        </VideoView>
        <LessonTextContent>
          <LessonTitle>{lessonController.name}</LessonTitle>
          <InfoView>
            <LessonTextInfo>
              {`Aula ${lessons.indexOf(lessonController) + 1}`}
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
              {!!completed.find(
                filterLesson => filterLesson.id === lessonController.id,
              ) && <LessonCompleted>Completo!</LessonCompleted>}
            </LessonTextIcon>
          </InfoView>
          <DescriptionText>{lessonController.description}</DescriptionText>
        </LessonTextContent>
      </LessonScrollView>
      <MenuArea>
        <LessonMenu>
          <BackLesson onPress={() => handleBackLesson()}>
            <MenuIcon>
              <AntDesignIcons name="arrowleft" color="#ff6680" size={13} />
            </MenuIcon>
            <BackLessonText>Aula anterior</BackLessonText>
          </BackLesson>
          <NextLesson onPress={() => handleNextLesson()}>
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
