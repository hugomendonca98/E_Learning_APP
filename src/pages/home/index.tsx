import React, { useEffect, useState, useCallback } from 'react';
import { Image, Modal } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import IconFeather from 'react-native-vector-icons/Feather';

import { useNavigation } from '@react-navigation/native';
import {
  NavegationBar,
  InputView,
  InputSearch,
  SignOutButton,
  CoursesBar,
  Title,
  InfoText,
  CourseCard,
  CourseList,
  CourseTitle,
  CourseImage,
  CourseLessons,
  BottomMenu,
  TextMenu,
  ButtonText,
  TrashView,
  TrashButton,
  ModalContainer,
  OutModalStyle,
  InnerModal,
  ContentModal,
  ButtonModal,
  TextModal,
  ButtonTextModal,
  NoButtonModal,
  AlignButtons,
  ButtonToLessons,
} from './styles';
import logo from '../../assets/logo.png';
import api from '../../services/api';

import { useAuth } from '../../hooks/auth';

const Home: React.FC = () => {
  const [search, setSearch] = useState('');
  const [isHome, setIsHome] = useState(true);
  const { navigate } = useNavigation();
  const { signOut } = useAuth();

  const DATA = isHome
    ? [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Matemática',
          image: 'https://i.imgur.com/8bLNgWj.png',
        },
        {
          id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
          title: 'Física',
          image: 'https://i.imgur.com/dULRLNc.png',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72',
          title: 'Inglês',
          image: 'https://i.imgur.com/a1VHJMh.png',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d42387',
          title: 'Quimíca',
          image: 'https://i.imgur.com/TqAitEv.png',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d7439',
          title: 'Escrita',
          image: 'https://i.imgur.com/FbX8juC.png',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d7634',
          title: 'Talk',
          image: 'https://i.imgur.com/A9FzyRB.png',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d732',
          title: '5',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72483',
          title: '7',
        },
        {
          id: '58694a0f-3da1-471f-bd96-145571e29d72349',
          title: '8',
        },
      ]
    : [
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
          title: 'Matemática',
          image: 'https://i.imgur.com/8bLNgWj.png',
        },
        {
          id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb285ba',
          title: 'Matemática',
          image: 'https://i.imgur.com/8bLNgWj.png',
        },
      ];

  const filterCourse =
    search !== ''
      ? DATA.filter(course =>
          course.title.toLowerCase().includes(search.toLowerCase()),
        )
      : DATA;

  const [modal, setModal] = useState(false);
  const [courses, setCourses] = useState([]);

  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2MjQzMDE0NDMsImV4cCI6MTYyNDM4Nzg0Mywic3ViIjoiYTg1M2NmZjgtNjc0OS00YmI0LWE3YWEtZmNiYmM4ODVhYWM5In0.90K4L8UAXIhLwkCLqo4mh8z0yCPrTLdHOF1paMvao4o`,
    },
  };

  /* useEffect(() => {
    async function getDate() {
      const response = await api.get('/courses', config);
      setCourses(response.data);
      console.log(response.data);
    }

    getDate();
  }, []); */

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

      <ModalContainer>
        <Modal
          animationType="fade"
          transparent
          visible={modal}
          onRequestClose={() => setModal(false)}
        >
          <OutModalStyle>
            <InnerModal>
              <ContentModal>
                <IconFeather name="trash" color="#FF6680" size={45} />

                <TextModal>Quer excluir suas aulas de Matemática?</TextModal>

                <AlignButtons>
                  <NoButtonModal onPress={() => setModal(false)}>
                    Não!
                  </NoButtonModal>
                  <ButtonModal
                    underlayColor="#ff8599"
                    onPress={() => setModal(false)}
                  >
                    <ButtonTextModal>Com certeza!</ButtonTextModal>
                  </ButtonModal>
                </AlignButtons>
              </ContentModal>
            </InnerModal>
          </OutModalStyle>
        </Modal>
      </ModalContainer>

      <CourseList
        numColumns={2}
        ListHeaderComponent={
          <CoursesBar>
            <Title>{isHome ? 'Categorias' : 'Cursos Salvos'}</Title>
            {isHome && <InfoText>43 cursos</InfoText>}
          </CoursesBar>
        }
        data={filterCourse}
        keyExtractor={course => course.id}
        renderItem={({ item: course }) => (
          <ButtonToLessons onPress={() => navigate('Lessons')}>
            <CourseCard>
              <TrashView>
                <CourseImage source={{ uri: course.image }} />
                {!isHome && (
                  <TrashButton>
                    <IconFeather
                      onPress={() => setModal(true)}
                      name="trash"
                      color="#C4C4D1"
                      size={20}
                    />
                  </TrashButton>
                )}
              </TrashView>
              <CourseTitle>{course.title}</CourseTitle>
              <CourseLessons>16 Aulas</CourseLessons>
            </CourseCard>
          </ButtonToLessons>
        )}
      />

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
