/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback, useEffect } from 'react';
import { Image, LogBox } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import CourseListComponent from '../../components/CourseList';
import logo from '../../assets/logo.png';
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
import { useAuth } from '../../hooks/auth';
import useRealm from '../../services/realmDB/schema';

interface Courses {
  id: string;
  name: string;
  image: string;
}

const SavedCourses: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [courses, setCourses] = useState<Courses[]>([]);
  const [courseNameModal, setCourseNameModal] = useState('');
  const { signOut } = useAuth();
  const { navigate } = useNavigation();
  const realm = useRealm();

  useEffect(() => {
    async function getOfflineCourses() {
      const realmDB = await realm;

      realmDB.write(() => {
        const offlineCourses = realmDB.objects('Course');
        setCourses(offlineCourses.toJSON());
      });
    }
    getOfflineCourses();
  }, [realm]);

  const setCourseModal = useCallback((courseName: string) => {
    setModal(true);
    setCourseNameModal(courseName);
  }, []);

  const filterCourse =
    search !== ''
      ? courses.filter((course: { name: string }) =>
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
      <CourseListComponent
        courses={filterCourse}
        title="Cursos salvos"
        deletable
        actionStateDeletable={setCourseModal}
      />
      <BottomMenu>
        <TextMenu onPress={() => navigate('Home')}>
          <ButtonText>
            <Icon name="home" color="#C4C4D1" size={20} /> Home
          </ButtonText>
        </TextMenu>
        <TextMenu>
          <ButtonText active>
            <Icon name="hearto" color="#ff6680" size={20} /> Salvos
          </ButtonText>
        </TextMenu>
      </BottomMenu>
    </>
  );
};

export default SavedCourses;
