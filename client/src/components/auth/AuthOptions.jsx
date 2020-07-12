import React, { useContext, Fragment } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const AuthOptions = () => {
  const { userData, setUserData } = useContext(UserContext);
  const history = useHistory();

  const register = () => history.push('/register');
  const login = () => history.push('/login');
  const logout = () => {
    setUserData({
      token: undefined,
      user: undefined,
    });
    localStorage.setItem('auth-token', '');
  };

  return (
    <nav>
      {userData.user ? (
        <button onClick={logout}>Log out</button>
      ) : (
        <Fragment>
          <button type='button' onClick={register}>
            Register
          </button>
          <button type='button' onClick={login}>
            Log In
          </button>
        </Fragment>
      )}
    </nav>
  );
};

export default AuthOptions;
