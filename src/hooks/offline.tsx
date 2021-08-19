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

interface User {
  id: string;
  name: string;
  email: string;
}

type CompletedLessons = {
  id: string;
  name: string;
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
  favToggle: boolean;
  isFavorite(courseId: string): Promise<void>;
  handleAddToFavorites: (course: CoursesTypes, user: User) => Promise<void>;
  handleMarkAsDone: (lessonId: string, lessonName: string) => Promise<void>;
  completed: CompletedLessons[];
  setCompleted: React.Dispatch<React.SetStateAction<CompletedLessons[]>>;
  getLessonsCompleted(): Promise<void>;
};

export const OfflineContext = createContext<OfflineContextData>(
  {} as OfflineContextData,
);

// eslint-disable-next-line react/prop-types
export const OfflineProvider: React.FC = ({ children }) => {
  const [offLineCourses, setOfflineCourses] = useState<CoursesTypes[]>([]);
  const [lessons, setLessons] = useState<LessonContent[]>([]);
  const [favToggle, setFavToggle] = useState(false);
  const [completed, setCompleted] = useState<CompletedLessons[]>([]);

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

  // Busca as aulas completadas.
  async function getLessonsCompleted() {
    const realmDB = await realm;
    const lessonsCompleted = realmDB.objects('Complete').toJSON();
    setCompleted(lessonsCompleted);
  }

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

  // Verifica se o curso já está nos favoritos, para mudar o icone.
  async function isFavorite(courseId: string) {
    const realmdDB = await realm;

    const existCourse = realmdDB
      .objects('Course')
      .filtered(`id == '${courseId}'`);

    if (existCourse.length <= 0) {
      setFavToggle(false);
    } else {
      setFavToggle(true);
    }
  }

  // Adiciona aos favoritos, caso já seja um favorito remove.
  const handleAddToFavorites = useCallback(
    async (course, user) => {
      const realmdDB = await realm;

      const existCourse: CoursesTypes[] = realmdDB
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
    },
    [offLineCourses, setOfflineCourses, setNewCourse, lessons],
  );

  // Marcar aula como concluida, caso já esteja marcada remove.
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

  return (
    <OfflineContext.Provider
      value={{
        offLineCourses,
        setOfflineCourses,
        lessonsOffline: lessons,
        getOfflineLessons,
        setNewCourse,
        favToggle,
        isFavorite,
        handleAddToFavorites,
        handleMarkAsDone,
        completed,
        setCompleted,
        getLessonsCompleted,
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
