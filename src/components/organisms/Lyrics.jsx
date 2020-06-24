import React, { useState, useEffect, Fragment } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from '../atoms/Spinner';

const Lyrics = () => {
  const [track, setTrack] = useState({});
  const [lyrics, setLyrics] = useState({});
  const { id } = useParams();

  const lyricsDisplay =
    Object.keys(track).length === 0 || Object.keys(lyrics).length === 0 ? (
      <Spinner />
    ) : (
      <Fragment>
        <Link to='/'>
          <button type='button'>Go Back</button>
        </Link>
        <h3>
          {track.artist_name} - {track.track_name}
        </h3>
        <p>{lyrics.lyrics_body}</p>
      </Fragment>
    );

  useEffect(() => {
    const reqTrack = axios.get(
      `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
    );
    const reqLyrics = axios.get(
      `http://cors-anywhere.herokuapp.com/https://api.musixmatch.com/ws/1.1/track.lyrics.get?track_id=${id}&apikey=${process.env.REACT_APP_MM_KEY}`
    );

    axios
      .all([reqTrack, reqLyrics])
      .then(
        axios.spread((...res) => {
          setTrack(res[0].data.message.body.track);
          setLyrics(res[1].data.message.body.lyrics);
        })
      )
      .catch((err) => console.log(err));
  }, [id]);

  return <section>{lyricsDisplay}</section>;
};

export default Lyrics;
