import React from 'react';
import './App.css';
import { Provider } from './Context';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Index from './components/layout/Index';
import Lyrics from './components/tracks/Lyrics';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Navbar />
        <div className='container'>
          <Switch>
            <Route path='/' exact component={Index} />
            <Route path='/lyrics/track/:id' exact component={Lyrics} />
          </Switch>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
