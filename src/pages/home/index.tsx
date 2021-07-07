import React, { useState, useCallback } from 'react';
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
  AlignButtons,
  ButtonModal,
  ButtonTextModal,
  NoButtonModal,
} from './styles';
import ModalComponent from '../../components/Modal';
import logo from '../../assets/logo.png';

import { useAuth } from '../../hooks/auth';
import useCourses from '../../hooks/courses';
import CourseListComponent from '../../components/CourseList';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isHome, setIsHome] = useState(true);
  const [modal, setModal] = useState(false);
  const [courseNameModal, setCourseNameModal] = useState('');

  const { navigate } = useNavigation();
  const { signOut } = useAuth();
  const { courses } = useCourses();

  const setCourseModal = useCallback((courseName: string) => {
    setModal(true);
    setCourseNameModal(courseName);
  }, []);

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
      <ModalComponent
        modalTitle={`Desejá excluir o curso de ${courseNameModal}?`}
        icon="trash"
        setModal={setModal}
        modal={modal}
      >
        <AlignButtons>
          <NoButtonModal onPress={() => setModal(false)}>Não!</NoButtonModal>
          <ButtonModal underlayColor="#ff8599" onPress={() => setModal(false)}>
            <ButtonTextModal>Com Certeza</ButtonTextModal>
          </ButtonModal>
        </AlignButtons>
      </ModalComponent>

      {isHome ? (
        <CourseListComponent
          courses={filterCourse}
          title="Categorias"
          infoText={`${filterCourse.length} Curso${
            filterCourse.length > 1 ? 's' : ''
          }`}
          navegateTo={() => navigate('Lessons')}
        />
      ) : (
        <CourseListComponent
          courses={filterCourse}
          title="Cursos salvos"
          navegateTo={() => navigate('Lessons')}
          deletable
          actionStateDeletable={setCourseModal}
        />
      )}

      <BottomMenu>
        <TextMenu onPress={() => setIsHome(true)}>
          <ButtonText active={isHome}>
            <Icon
              name="home"
              color={isHome ? '#ff6680' : '#C4C4D1'}
              size={20}
            />{' '}
            Home
          </ButtonText>
        </TextMenu>
        <TextMenu onPress={() => setIsHome(false)}>
          <ButtonText active={!isHome}>
            <Icon
              name="hearto"
              color={isHome ? '#C4C4D1' : '#ff6680'}
              size={20}
            />{' '}
            Salvos
          </ButtonText>
        </TextMenu>
      </BottomMenu>
    </>
  );
};

export default Home;
