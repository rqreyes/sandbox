import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import UserContext from './contexts/UserContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import './styles.css';

const App = () => {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  useEffect(() => {
    const checkLoggedIn = async () => {
      let token = localStorage.getItem('auth-token');
      if (token === null) {
        localStorage.setItem('auth-token', '');
        token = '';
      }
      const tokenRes = await axios.post('/users/tokenIsValid', null, {
        headers: { 'x-auth-token': token },
      });

      if (tokenRes.data) {
        const userRes = await axios.get('/users', {
          headers: { 'x-auth-token': token },
        });
        setUserData({
          token,
          user: userRes.data,
        });
      }
    };

    checkLoggedIn();
  }, []);

  return (
    <Fragment>
      <UserContext.Provider value={{ userData, setUserData }}>
        <BrowserRouter>
          <Header />
          <div className='container'>
            <Switch>
              <Route exact path='/'>
                <Home />
              </Route>
              <Route exact path='/login'>
                <Login />
              </Route>
              <Route exact path='/register'>
                <Register />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
      </UserContext.Provider>
    </Fragment>
  );
};

export default App;
