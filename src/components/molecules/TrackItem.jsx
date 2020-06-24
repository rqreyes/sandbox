import React from 'react';
import { Link } from 'react-router-dom';

const TrackItem = ({ track }) => {
  return (
    <li>
      <h3>
        {track.artist_name} - {track.track_name}
      </h3>
      <Link to={`/lyrics/${track.track_id}`}>
        <button type='button'>View Lyrics</button>
      </Link>
    </li>
  );
};

export default TrackItem;
