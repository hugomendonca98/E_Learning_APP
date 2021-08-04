/* eslint-disable camelcase */
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';

import realm from '../services/realmDB/schema';

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

type OfflineContextData = {
  offLineCourses: CoursesTypes[];
  setOfflineCourses: React.Dispatch<React.SetStateAction<CoursesTypes[]>>;
  lessonsOffline: LessonContent[];
  getOfflineLessons(courseId: string): Promise<void>;
  setNewCourse: (course: CoursesTypes[]) => void;
};

export const OfflineContext = createContext<OfflineContextData>(
  {} as OfflineContextData,
);

// eslint-disable-next-line react/prop-types
export const OfflineProvider: React.FC = ({ children }) => {
  const [offLineCourses, setOfflineCourses] = useState<CoursesTypes[]>([]);
  const [lessons, setLessons] = useState<LessonContent[]>([]);

  // Busca os cursos salvos localmente.
  useEffect(() => {
    async function getOfflineCourses() {
      const realmDB = await realm;
      const data = realmDB.objects('Course');
      setOfflineCourses(data.toJSON());
    }

    getOfflineCourses();
  }, [setOfflineCourses]);

  // Atualiza o estado com um novo curso.
  const setNewCourse = useCallback(
    (course: CoursesTypes[]) => {
      setOfflineCourses([...offLineCourses, ...course]);
    },
    [offLineCourses],
  );

  // Busca as aulas offline de um determinado curso.
  const getOfflineLessons = useCallback(async (courseId: string) => {
    const realmDB = await realm;
    const existLessonOffiline = realmDB
      .objects('Lesson')
      .filtered(`course.id == '${courseId}'`);
    if (existLessonOffiline) {
      setLessons(existLessonOffiline.toJSON());
    }
  }, []);

  return (
    <OfflineContext.Provider
      value={{
        offLineCourses,
        setOfflineCourses,
        lessonsOffline: lessons,
        getOfflineLessons,
        setNewCourse,
      }}
    >
      {children}
    </OfflineContext.Provider>
  );
};

export function useOffline(): OfflineContextData {
  const context = useContext(OfflineContext);
  if (!context) {
    throw new Error('useOffline must be used within a CoursesProvider');
  }
  return context;
}
