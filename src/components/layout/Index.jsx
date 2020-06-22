import React, { Fragment } from 'react';
import Search from '../tracks/Search';
import Tracks from '../tracks/Tracks';

const Index = () => {
  return (
    <Fragment>
      <Search />
      <Tracks />
    </Fragment>
  );
};

export default Index;
