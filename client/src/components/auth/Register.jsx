import React from 'react';
import { useContext, useState } from 'react';
import UserContext from '../../contexts/UserContext';
import ErrorNotice from '../misc/ErrorNotice';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const { setUserData } = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [passwordCheck, setPasswordCheck] = useState();
  const [displayName, setDisplayName] = useState();
  const [error, setError] = useState();
  const history = useHistory();

  const submit = async (evt) => {
    evt.preventDefault();

    try {
      const newUser = { email, password, passwordCheck, displayName };
      await axios.post('/users/register', newUser);
      const loginRes = await axios.post('/users/login', {
        email,
        password,
      });

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
      <h2>Register</h2>
      {error && (
        <ErrorNotice message={error} clearError={() => setError(undefined)} />
      )}
      <form onSubmit={submit}>
        <label htmlFor='register-email'>Email</label>
        <input
          id='register-email'
          type='email'
          onChange={(evt) => setEmail(evt.target.value)}
        />
        <label htmlFor='register-password'>Password</label>
        <input
          id='register-password'
          type='password'
          onChange={(evt) => setPassword(evt.target.value)}
        />
        <input
          type='password'
          placeholder='verify-password'
          onChange={(evt) => setPasswordCheck(evt.target.value)}
        />
        <label htmlFor='register-display-name'>Display name</label>
        <input
          id='register-display-name'
          type='text'
          onChange={(evt) => setDisplayName(evt.target.value)}
        />
        <input type='submit' value='Register' />
      </form>
    </div>
  );
};

export default Register;
