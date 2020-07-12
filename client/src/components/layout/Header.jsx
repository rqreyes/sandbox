import React from 'react';
import { Link } from 'react-router-dom';
import AuthOptions from '../auth/AuthOptions';

const Header = () => {
  return (
    <header>
      <Link to='/'>
        <h1 className='title'>MERN Auth App</h1>
      </Link>
      <AuthOptions />
    </header>
  );
};

export default Header;
