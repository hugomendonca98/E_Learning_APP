import React, { useState } from 'react';
import { Image } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';

import {
  NavegationBar,
  InputView,
  InputSearch,
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
} from './styles';
import logo from '../../assets/logo.png';

const Home: React.FC = () => {
  const DATA = [
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
  ];

  const [search, setSearch] = useState('');

  const filterCourse =
    search !== ''
      ? DATA.filter(course =>
          course.title.toLowerCase().includes(search.toLowerCase()),
        )
      : DATA;

  return (
    <>
      <NavegationBar>
        <Image source={logo} />
        <Icon name="poweroff" size={20} color="#FF6680" />
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

      <CourseList
        numColumns={2}
        columnWrapperStyle={{ paddingLeft: 17 }}
        ListHeaderComponent={
          <CoursesBar>
            <Title>Categorias</Title>
            <InfoText>43 cursos</InfoText>
          </CoursesBar>
        }
        contentContainerStyle={{
          paddingBottom: 25,
          backgroundColor: '#F0EDF5',
          borderTopLeftRadius: 24,
          borderTopRightRadius: 24,
        }}
        data={filterCourse}
        keyExtractor={course => course.id}
        renderItem={({ item: course }) => (
          <CourseCard>
            <CourseImage source={{ uri: course.image }} />
            <CourseTitle>{course.title}</CourseTitle>
            <CourseLessons>16 Aulas</CourseLessons>
          </CourseCard>
        )}
      />
      <BottomMenu>
        <TextMenu>
          <Icon name="home" color="#ff6680" size={20} /> Home
        </TextMenu>
        <TextMenu>
          <Icon name="hearto" color="#ff6680" size={20} /> Salvos
        </TextMenu>
      </BottomMenu>
    </>
  );
};

export default Home;
