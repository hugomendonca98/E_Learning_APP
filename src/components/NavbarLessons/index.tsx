import React from 'react';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AntDesignIcons from 'react-native-vector-icons/AntDesign';
import { useOffline } from '../../hooks/offline';
import logo from '../../assets/logo.png';

import { NavBar, AddToFavotites } from './styles';

interface NavbarLessonsProps {
  course: {
    id: string;
    name: string;
    image: string;
  };
  user: {
    id: string;
    name: string;
    email: string;
  };
}

const NavbarLessons = ({ course, user }: NavbarLessonsProps): JSX.Element => {
  const { goBack } = useNavigation();
  const { handleAddToFavorites, favToggle } = useOffline();

  return (
    <NavBar>
      <MaterialIcons
        name="arrow-back"
        color="#FF6680"
        size={25}
        onPress={() => goBack()}
      />
      <Image source={logo} />
      <AddToFavotites onPress={() => handleAddToFavorites(course, user)}>
        <AntDesignIcons
          name={favToggle ? 'heart' : 'hearto'}
          color="#FF6680"
          size={20}
        />
      </AddToFavotites>
    </NavBar>
  );
};

export default NavbarLessons;
