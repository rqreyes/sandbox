import React from 'react';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import ErrorNotice from '../misc/ErrorNotice';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const { setUserData } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const submit = async (evt) => {
    evt.preventDefault();
    try {
      const loginUser = { email, password };
      const loginRes = await axios.post('/users/login', loginUser);

      setUserData({
        token: loginRes.data.token,
        user: loginRes.data.user,
      });
      localStorage.setItem('auth-token', loginRes.data.token);
      history.push('/');
    } catch (err) {
      err.response.data.msg && setError(err.response.data.msg);
    }
  };

  return (
    <div className='page'>
      <h2>Login</h2>{' '}
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit}>
        <label htmlFor='login-email'>Email</label>
        <input
          id='login-email'
          type='email'
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor='login-password'>Password</label>
        <input
          id='login-password'
          type='password'
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <input type='submit' value='login' />
      </form>
    </div>
  );
};

export default Login;
