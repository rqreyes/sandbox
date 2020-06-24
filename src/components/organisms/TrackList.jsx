import React, { useContext } from 'react';
import { TracksContext } from '../../contexts/TracksContext';
import Spinner from '../atoms/Spinner';
import TrackItem from '../molecules/TrackItem';

const TrackList = () => {
  const { tracks } = useContext(TracksContext);
  const trackListDisplay =
    tracks.length === 0 ? (
      <Spinner />
    ) : (
      tracks.map((trackItem) => (
        <TrackItem key={trackItem.track.track_id} track={trackItem.track} />
      ))
    );

  return (
    <section>
      <h2>Track List</h2>
      <ul>{trackListDisplay}</ul>
    </section>
  );
};

export default TrackList;
