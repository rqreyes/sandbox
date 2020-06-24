import React from 'react';
import TracksProvider from './contexts/TracksContext';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Search from './components/organisms/Search';
import TrackList from './components/organisms/TrackList';
import Lyrics from './components/organisms/Lyrics';
import './App.css';

function App() {
  return (
    <div className='App'>
      <h1>Lyrics Finder</h1>
      <TracksProvider>
        <BrowserRouter>
          <Switch>
            <Route exact path='/'>
              <Search />
              <TrackList />
            </Route>
            <Route exact path='/lyrics/:id'>
              <Lyrics />
            </Route>
          </Switch>
        </BrowserRouter>
      </TracksProvider>
    </div>
  );
}

export default App;
