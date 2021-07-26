/* eslint-disable camelcase */
import React, {
  useEffect,
  useState,
  createContext,
  useContext,
  useCallback,
} from 'react';

import api from '../services/api';
import { useAuth } from './auth';

type CoursesTypes = {
  id: string;
  name: string;
  image: string;
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

type CoursesContextData = {
  courses: CoursesTypes[];
  lessons: LessonContent[];
  getLessons(courseId: string): Promise<void>;
};

export const CoursesContext = createContext<CoursesContextData>(
  {} as CoursesContextData,
);

// eslint-disable-next-line react/prop-types
export const CoursesProvider: React.FC = ({ children }) => {
  const { user, token, signOut } = useAuth();
  const [courses, setCourses] = useState<CoursesTypes[]>([]);
  const [course, setCourse] = useState('');
  const [lessons, setLessons] = useState([]);
  const [savedCourses, setSavedCourses] = useState<CoursesTypes[]>([]);

  useEffect(() => {
    async function allCourses() {
      if (user) {
        try {
          const onlineCourses = await api.get(
            '/courses' /* {
          headers: {
            Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjYxMTg4MzYsImV4cCI6MTYyNjIwNTIzNiwic3ViIjoiMDcwOWRkOTEtZDYzMS00NDczLWFmN2QtZWQ2OTk0YWQzZGI0In0.nf8udpW2ekBIQ3ZMqdLoLUaoiByFwUMzIN0vIeTJTlc`,
          },
        } */,
          );
          setCourses(onlineCourses.data);
        } catch {
          signOut();
        }
      }

      // Pegar os cursos salvos localmente, se tiver.
    }
    allCourses();
  }, [signOut, token, user]);

  const getLessons = useCallback(
    async (courseId: string) => {
      if (course !== courseId) {
        const { data } = await api.get(`/lesson/${courseId}/lessons`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCourse(courseId);
        setLessons(data);
      }
    },
    [course, token],
  );

  return (
    <CoursesContext.Provider value={{ courses, getLessons, lessons }}>
      {children}
    </CoursesContext.Provider>
  );
};

export function useCourses(): CoursesContextData {
  const context = useContext(CoursesContext);

  if (!context) {
    throw new Error('useCourses must be used within a CoursesProvider');
  }

  return context;
}
