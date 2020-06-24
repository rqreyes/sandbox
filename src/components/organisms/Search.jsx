import React, { useContext, useState } from 'react';
import { TracksContext } from '../../contexts/TracksContext';
import axios from 'axios';

const Search = () => {
  const { setTracks } = useContext(TracksContext);
  const [trackSearch, setTrackSearch] = useState('');
  const handleSubmit = (evt) => {
    evt.preventDefault();

    axios
      .get(
        `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.search?q_track=${trackSearch}&page_size=10&page=1&s_track_rating=desc&apikey=${process.env.REACT_APP_MM_KEY}`
      )
      .then((res) => setTracks(res.data.message.body.track_list))
      .catch((err) => console.log(err));

    setTrackSearch('');
  };

  return (
    <section>
      <h2>Search</h2>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          value={trackSearch}
          onChange={(evt) => setTrackSearch(evt.target.value)}
        />
        <button type='submit'>Search Song</button>
      </form>
    </section>
  );
};

export default Search;
