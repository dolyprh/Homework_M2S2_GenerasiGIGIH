import React from 'react'
import data from '../data/index'
import Track from './content'

const { album, name: songTitle, artists } = data;

function TrackData() {
  return (
    <div className="playlist-container">
      <Track
        image={album?.images[0]?.url}
        songTitle={songTitle}
        albumName={album?.name}
        artists={artists}
      />
    </div>
  );
}

export default TrackData;