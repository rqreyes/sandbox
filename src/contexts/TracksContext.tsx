import React, { createContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';

export const TracksContext = createContext<iTracksContext | undefined>(
  undefined
);

interface iTracksProviderProps {
  children: ReactNode;
}

const TracksProvider: React.FC<iTracksProviderProps> = ({ children }) => {
  const [tracks, setTracks] = useState<iTrack[]>([]);

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
