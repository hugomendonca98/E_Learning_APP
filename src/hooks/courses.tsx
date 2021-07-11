/* eslint-disable camelcase */
import { AxiosResponse } from 'axios';
import { useCallback, useEffect, useState } from 'react';

import api from '../services/api';
import { useAuth } from './auth';

type CoursesTypes = {
  id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type LessonTypes = {
  id: string;
  name: string;
  duration: number;
  course_id: string;
  description: string;
  video_id: string;
  created_at: string;
  updated_at: string;
  course: CoursesTypes;
};

type ReturnUseCoursesTypes = {
  courses: CoursesTypes[];
  // lessonsContity: (courseId: string) => Promise<AxiosResponse<LessonTypes[]>>;
};

export default function useCourses(): ReturnUseCoursesTypes {
  const { user, token } = useAuth();
  const [courses, setCourses] = useState<CoursesTypes[]>([]);
  const [savedCourses, setSavedCourses] = useState<CoursesTypes[]>([]);

  useEffect(() => {
    async function allCourses() {
      if (user) {
        const onlineCourses = await api.get(
          '/courses' /* {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        } */,
        );
        setCourses(onlineCourses.data);
      }

      // Pegar os cursos salvos localmente, se tiver.
    }
    allCourses();
  }, [token, user]);

  return { courses };
}
