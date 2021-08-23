import React, { useCallback, useState } from 'react';
import { Image } from 'react-native';

import { Formik } from 'formik';
import * as Yup from 'yup';

import {
  ButtonSubmit,
  Container,
  LogoArea,
  ButtonText,
  ButtonConfirm,
  ButtonConfirmText,
} from './styles';
import Input from '../../components/Input';
import logo from '../../assets/logo.png';
import { useAuth } from '../../hooks/auth';
import ModalComponent from '../../components/Modal';

interface ValuesSign {
  email: string;
  password: string;
}

const signInSchema = Yup.object().shape({
  email: Yup.string().email('Email Invalido.').required('Campo obrigatório.'),
  password: Yup.string().required('Campo obrigatório.'),
});

const SignInPage: React.FC = () => {
  const { signIn } = useAuth();
  const [modal, setModal] = useState(false);

  const handleSubmitForm = useCallback(
    async (values: ValuesSign) => {
      try {
        await signIn({ email: values.email, password: values.password });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          return;
        }

        setModal(true);
      }
    },
    [signIn],
  );

  return (
    <>
      <Container>
        <LogoArea>
          <Image source={logo} style={{ width: 200, height: 40 }} />
        </LogoArea>
        <ModalComponent
          modalTitle="Ocorreu um erro ao fazer o login, tente novamente."
          icon="alert-circle"
          setModal={setModal}
          modal={modal}
        >
          <ButtonConfirm>
            <ButtonConfirmText onPress={() => setModal(false)}>
              ok
            </ButtonConfirmText>
          </ButtonConfirm>
        </ModalComponent>
        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={signInSchema}
          onSubmit={values => {
            handleSubmitForm(values);
          }}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleBlur,
            handleSubmit,
          }) => (
            <>
              <Input
                name="email"
                icon="mail"
                placeholder="E-mail"
                value={values.email}
                onBlur={handleBlur('email')}
                isErrored={touched.email && !!errors.email}
                onChangeText={handleChange('email')}
                keyboardType="email-address"
              />
              <Input
                name="password"
                icon="lock"
                placeholder="Password"
                onBlur={handleBlur('password')}
                value={values.password}
                isErrored={touched.password && !!errors.password}
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
    </>
  );
};

export default SignInPage;
