/* eslint-disable no-nested-ternary */
import React, { useState, useEffect } from 'react';

import { Text } from 'react-native';
import api from '../../services/api';

type LessonsProps = {
  id: string;
};

const LessonsContity = ({ id }: LessonsProps): JSX.Element => {
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    async function contity(courseId: string) {
      const allLessons = await api.get(`/lesson/${courseId}/lessons`);
      setLessons(allLessons.data);
    }
    contity(id);
  }, [id]);
  return (
    <Text>
      {lessons.length === 0
        ? `Sem Aulas`
        : lessons.length === 1
        ? `${lessons.length} Aula`
        : `${lessons.length} Aulas`}
    </Text>
  );
};

export default LessonsContity;
