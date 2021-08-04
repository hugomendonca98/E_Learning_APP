/* eslint-disable react/require-default-props */
/* eslint-disable camelcase */
import { useNavigation } from '@react-navigation/native';
import React, { ReactNode } from 'react';

import IconFeather from 'react-native-vector-icons/Feather';

import LessonsContity from '../LessonsContity';

import {
  CourseList,
  CoursesBar,
  Title,
  InfoText,
  ButtonToLessons,
  CourseCard,
  TrashView,
  CourseImage,
  CourseTitle,
  CourseLessons,
  TrashButton,
} from './styles';

type CourseTypes = {
  id: string;
  name: string;
  image: string;
};

interface CourseProps {
  courses: CourseTypes[];
  title: string;
  infoText?: string;
  children?: ReactNode;
  deletable?: boolean;
  actionStateDeletable?: (courseName: string, courseId: string) => void;
}

const CourseListComponent: React.FC<CourseProps> = ({
  courses,
  title,
  infoText = '',
  children,
  deletable = false,
  actionStateDeletable,
}: CourseProps) => {
  const { navigate } = useNavigation();

  return (
    <CourseList
      numColumns={2}
      ListHeaderComponent={
        <CoursesBar>
          <Title>{title}</Title>
          {!!infoText && <InfoText>{infoText}</InfoText>}
        </CoursesBar>
      }
      data={courses}
      keyExtractor={(course: CourseTypes) => course.id}
      renderItem={({ item: course }) => (
        <ButtonToLessons onPress={() => navigate('Lessons', { course })}>
          <CourseCard>
            <TrashView>
              <CourseImage source={{ uri: course.image }} />
              {deletable && (
                <TrashButton>
                  <IconFeather
                    onPress={() =>
                      actionStateDeletable &&
                      actionStateDeletable(course.name, course.id)
                    }
                    name="trash"
                    color="#C4C4D1"
                    size={20}
                  />
                </TrashButton>
              )}
              {children}
            </TrashView>
            <CourseTitle>{course.name}</CourseTitle>

            <CourseLessons>
              <LessonsContity id={course.id} />
            </CourseLessons>
          </CourseCard>
        </ButtonToLessons>
      )}
    />
  );
};

export default CourseListComponent;
