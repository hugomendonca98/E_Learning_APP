import Realm from 'realm';

const Course = {
  name: 'Course',
  properties: {
    id: 'string',
    userId: 'string',
    name: 'string',
    image: 'string',
  },
};

const Lesson = {
  name: 'Lesson',
  properties: {
    id: 'string',
    name: 'string',
    duration: 'int',
    description: 'string',
    video_id: 'string',
    course: 'Course',
  },
};

const Complete = {
  name: 'Complete',
  properties: {
    id: 'string',
    name: 'string',
  },
};

export default Realm.open({
  schema: [Course, Lesson, Complete],
  schemaVersion: 4,
});
