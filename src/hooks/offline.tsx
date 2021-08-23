/* eslint-disable camelcase */
import React, {
  createContext,
  useEffect,
  useState,
  useContext,
  useCallback,
} from 'react';

import getRealm from '../services/realmDB/schema';

interface CoursesTypes {
  id: string;
  name: string;
  image: string;
}

interface User {
  id: string;
  name: string;
  email: string;
}

interface CompletedLessons {
  id: string;
  name: string;
}

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

interface OfflineContextData {
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
}

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
      const realm = await getRealm();
      const data = realm.objects('Course');
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
    const realm = await getRealm();
    const lessonsCompleted = realm.objects('Complete').toJSON();
    setCompleted(lessonsCompleted);
  }

  // Busca as aulas offline de um determinado curso.
  const getOfflineLessons = useCallback(async (courseId: string) => {
    const realm = await getRealm();
    const existLessonOffiline = realm
      .objects('Lesson')
      .filtered(`course.id == '${courseId}'`);
    if (existLessonOffiline) {
      setLessons(existLessonOffiline.toJSON());
    }
  }, []);

  // Verifica se o curso já está nos favoritos, para mudar o icone.
  async function isFavorite(courseId: string) {
    const realm = await getRealm();

    const existCourse = realm.objects('Course').filtered(`id == '${courseId}'`);

    if (existCourse.length <= 0) {
      setFavToggle(false);
    } else {
      setFavToggle(true);
    }
  }

  // Adiciona aos favoritos, caso já seja um favorito remove.
  const handleAddToFavorites = useCallback(
    async (course, user) => {
      const realm = await getRealm();

      const existCourse: CoursesTypes[] = realm
        .objects('Course')
        .filtered(`id == '${course.id}'`)
        .toJSON();

      if (Array.isArray(existCourse) && existCourse.length <= 0) {
        realm.write(() => {
          const newCourse = realm.create('Course', {
            id: course.id,
            userId: user.id,
            name: course.name,
            image: course.image,
          });

          setNewCourse([newCourse.toJSON()]);

          if (Array.isArray(lessons) && lessons.length > 0) {
            realm.create('Lesson', {
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

      const courseToDelete = realm
        .objects('Course')
        .filtered(`id == '${course.id}'`);

      realm.write(() => {
        realm.delete(courseToDelete);
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
      const realm = await getRealm();

      const existLesson = realm
        .objects('Complete')
        .filtered(`id == '${lessonId}'`);

      if (
        Array.isArray(existLesson.toJSON()) &&
        existLesson.toJSON().length <= 0
      ) {
        realm.write(() => {
          const newLessonCompleted = realm
            .create('Complete', {
              id: lessonId,
              name: lessonName,
            })
            .toJSON();

          setCompleted([...completed, newLessonCompleted]);
        });

        return;
      }
      realm.write(() => {
        realm.delete(existLesson);

        const newLessonsCompleted: CompletedLessons[] = completed.filter(
          lesson => lesson.id !== lessonId,
        );

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
