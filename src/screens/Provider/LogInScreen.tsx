import React, { useState, useEffect } from 'react';
import { StackNavigationProp } from '@react-navigation/stack';

import { getDataFromStorage } from '../../utils';
import LoginForm from '../../components/LoginForm';
import { useAuth, AUTH_DATA } from '../../hooks/useAuth';
import { StackParams } from '../../navigation/types';

interface Props {
  navigation: StackNavigationProp<StackParams>;
}

const LogInScreen = ({ navigation }: Props) => {
  const [userName, setUserName] = useState('arce');
  const [password, setPassword] = useState('arce');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const auth = useAuth();

  const onChangeUser = (user: string): void => {
    setUserName(user);
  };
  const onChangePassword = (pw: string): void => {
    setPassword(pw);
  };

  const onSubmit = () => {
    if (!userName || !password) {
      setErrorMessage('Ingrese usuario y contraseña');
      return;
    }

    setIsLoading(true);

    auth
      .signin(userName, password)
      .then(
        (res: any) =>
          res.jwt && navigation.navigate('OrdersScreen', { userName }),
      )
      .catch(() => setErrorMessage('Usuario o contraseña incorrectas'));

    setIsLoading(false);
  };

  useEffect(() => {
    auth.errorMessage && setErrorMessage(auth.errorMessage);
  }, [auth.errorMessage]);

  useEffect(() => {
    // deleteStorageData();
    getDataFromStorage(AUTH_DATA)
      .then((res) => console.log('TK', res.data))
      .catch((err) => console.log('TKERR', err));
  }, []);

  return (
    <LoginForm
      onChangeUser={onChangeUser}
      onChangePassword={onChangePassword}
      onSubmit={onSubmit}
      errorMessage={errorMessage}
      isLoading={isLoading}
    />
  );
};

export default LogInScreen;
