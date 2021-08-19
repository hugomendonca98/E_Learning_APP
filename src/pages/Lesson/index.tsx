/* eslint-disable camelcase */
import React from 'react';
import { View } from 'react-native';

import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { ScrollView } from 'react-native-gesture-handler';
import YoutubeIframe from 'react-native-youtube-iframe';
import LessonsContity from '../../components/LessonsContity';

import NavbarLessons from '../../components/NavbarLessons';
import {
  ClockIcon,
  DescriptionText,
  InfoView,
  LessonScrollView,
  LessonTextContent,
  LessonTextIcon,
  LessonTextInfo,
  LessonTitle,
  VideoView,
} from './styles';

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

type LessonProps = {
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
};

const Lesson: React.FC<LessonProps> = ({ route }: LessonProps): JSX.Element => {
  const { course, user, lessons, lesson } = route.params;

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
          <YoutubeIframe height={300} videoId={lesson.video_id} />
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
    </>
  );
};

export default Lesson;
