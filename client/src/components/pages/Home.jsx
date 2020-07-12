import React, { useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const Home = () => {
  const { userData } = useContext(UserContext);
  const history = useHistory();

  useEffect(() => {
    if (!userData.user) history.push('/login');
  });

  return <h1>Home</h1>;
};

export default Home;
