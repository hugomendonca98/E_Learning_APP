/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useCallback } from 'react';
import { Image } from 'react-native';
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
import getRealm from '../../services/realmDB/schema';
import { useOffline } from '../../hooks/offline';

interface ModalInfo {
  id: string;
  name: string;
}

const SavedCourses: React.FC = () => {
  const [modal, setModal] = useState(false);
  const [search, setSearch] = useState('');
  const [courseInfoModal, setCourseInfoModal] = useState<ModalInfo>(
    {} as ModalInfo,
  );
  const { signOut } = useAuth();
  const { navigate } = useNavigation();
  const { offLineCourses, setOfflineCourses } = useOffline();

  const setCourseModal = useCallback((courseName: string, courseId: string) => {
    setModal(true);
    setCourseInfoModal({ id: courseId, name: courseName });
  }, []);

  const handleDeleteCourse = useCallback(
    (courseId: string) => {
      async function removeCourse() {
        const realm = await getRealm();

        const existCourse = realm
          .objects('Course')
          .filtered(`id == '${courseId}'`);

        if (existCourse.length > 0) {
          realm.write(() => {
            realm.delete(existCourse);
          });

          const newCourses = offLineCourses.filter(
            course => course.id !== courseId,
          );
          setOfflineCourses(newCourses);
          setModal(false);
        }
      }
      removeCourse();
    },
    [offLineCourses, setOfflineCourses],
  );

  const filterCourse =
    search !== ''
      ? offLineCourses.filter((course: { name: string }) =>
          course.name.toLowerCase().includes(search.toLowerCase()),
        )
      : offLineCourses;

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
        modalTitle={`Desej?? excluir o curso de ${courseInfoModal.name}?`}
        icon="trash"
        setModal={setModal}
        modal={modal}
      >
        <AlignButtons>
          <NoButtonModal onPress={() => setModal(false)}>N??o!</NoButtonModal>
          <ButtonModal underlayColor="#ff8599" onPress={() => setModal(false)}>
            <ButtonTextModal
              onPress={() => handleDeleteCourse(courseInfoModal.id)}
            >
              Com Certeza
            </ButtonTextModal>
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
