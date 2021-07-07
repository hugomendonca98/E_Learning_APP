/* eslint-disable camelcase */
import { useEffect, useState } from 'react';

import api from '../services/api';
import { useAuth } from './auth';

type CoursesTypes = {
  id: string;
  name: string;
  image: string;
  created_at: string;
  updated_at: string;
};

type ReturnUseCoursesTypes = {
  courses: CoursesTypes[];
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
