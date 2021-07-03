import React, { useCallback } from 'react';
import { Image } from 'react-native';

import { Formik } from 'formik';

import { ButtonSubmit, Container, LogoArea, ButtonText } from './styles';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';

const SignInPage: React.FC = () => {
  const { signIn } = useAuth();

  const handleSubmitForm = useCallback(
    async values => {
      await signIn({ email: values.mail, password: values.password });
    },
    [signIn],
  );

  return (
    <Container>
      <LogoArea>
        <Image source={logo} style={{ width: 200, height: 40 }} />
      </LogoArea>

      <Formik
        initialValues={{ mail: '', password: '' }}
        onSubmit={values => handleSubmitForm(values)}
      >
        {({ values, handleChange, handleSubmit }) => (
          <>
            <Input
              name="mail"
              icon="mail"
              placeholder="E-mail"
              value={values.mail}
              onChangeText={handleChange('mail')}
              keyboardType="email-address"
            />
            <Input
              name="password"
              icon="lock"
              placeholder="Password"
              value={values.password}
              onChangeText={handleChange('password')}
              secureTextEntry
            />

            <ButtonSubmit onPress={handleSubmit}>
              <ButtonText>Entrar</ButtonText>
            </ButtonSubmit>
          </>
        )}
      </Formik>
    </Container>
  );
};

export default SignInPage;
