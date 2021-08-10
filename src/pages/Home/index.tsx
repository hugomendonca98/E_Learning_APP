import React, { useState } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import { useNavigation } from '@react-navigation/native';
import {
  NavegationBar,
  InputView,
  InputSearch,
  SignOutButton,
  BottomMenu,
  TextMenu,
  ButtonText,
} from './styles';
import logo from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';
import { useCourses } from '../../hooks/courses';
import CourseListComponent from '../../components/CourseList';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');

  const { signOut } = useAuth();
  const { courses } = useCourses();
  const { navigate } = useNavigation();

  const filterCourse =
    search !== ''
      ? courses.filter(course =>
          course.name.toLowerCase().includes(search.toLowerCase()),
        )
      : courses;

  return (
    <>
      <NavegationBar>
        <Image source={logo} />
        <SignOutButton onPress={signOut}>
          <Icon name="poweroff" size={20} color="#FF6680" />
        </SignOutButton>
      </NavegationBar>
      <InputView>
        <Icon name="search1" size={20} color="#C4C4D1" />
        <InputSearch
          placeholder="Busque um curso"
          placeholderTextColor="#C4C4D1"
          onChangeText={text => setSearch(text)}
          value={search}
        />
      </InputView>

      <CourseListComponent
        courses={filterCourse}
        title="Categorias"
        infoText={`${filterCourse.length} Curso${
          filterCourse.length > 1 ? 's' : ''
        }`}
      />

      <BottomMenu>
        <TextMenu>
          <ButtonText active>
            <Icon name="home" color="#ff6680" size={20} /> Home
          </ButtonText>
        </TextMenu>
        <TextMenu onPress={() => navigate('SavedCourses')}>
          <ButtonText>
            <Icon name="hearto" color="#C4C4D1" size={20} /> Salvos
          </ButtonText>
        </TextMenu>
      </BottomMenu>
    </>
  );
};

export default Home;
