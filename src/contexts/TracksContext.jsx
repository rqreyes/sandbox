import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

export const TracksContext = createContext();

const TracksProvider = ({ children }) => {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/chart.tracks.get?chart_name=top&page=1&page_size=10&country=us&f_has_lyrics=1&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => {
        setTracks(res.data.message.body.track_list);
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <TracksContext.Provider value={{ tracks, setTracks }}>
      {children}
    </TracksContext.Provider>
  );
};

export default TracksProvider;
