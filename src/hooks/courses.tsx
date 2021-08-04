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
  const { signOut, token, loading } = useAuth();
  const [courses, setCourses] = useState<CoursesTypes[]>([]);
  const [course, setCourse] = useState('');
  const [lessons, setLessons] = useState<LessonContent[]>([]);

  /*
   * Busca todos os cursos disponiveis.
   * Caso a sessão do usuario tenha expirado ele vai deslogar da aplicação.
   */
  useEffect(() => {
    async function allCourses() {
      try {
        const onlineCourses = await api.get('/courses', {
          headers: { Authorization: `Bearer ${token}` },
        });

        setCourses(onlineCourses.data);
      } catch (error) {
        if (error.response.status === 401) {
          signOut();
        }
      }
    }
    if (!loading) {
      allCourses();
    }
  }, [loading, signOut, token]);

  // Busca as aulas online, caso não encontre ele busca as aulas localmente armazenadas.
  const getLessons = useCallback(
    async (courseId: string) => {
      if (course !== courseId) {
        const { data } = await api.get(`/lesson/${courseId}/lessons`, {
          headers: { Authorization: `bearer ${token}` },
        });
        setCourse(courseId);
        setLessons(data);
      }
    },
    [course, token],
  );

  return (
    <CoursesContext.Provider
      value={{
        courses,
        getLessons,
        lessons,
      }}
    >
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
