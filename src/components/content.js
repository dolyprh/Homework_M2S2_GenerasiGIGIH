import React from 'react';

function Track({ image, songTitle, albumName, artists }) {
  return (
    <div className="container">
      <img className="img" src={image} alt={songTitle} />
      <div className="content">
        <h2 className="title-content">Title: {songTitle}</h2>
        <h2>Artist: {artists.map((artist) => artist.name).join(', ')}</h2>
        <h2>Album: {albumName}</h2>
      </div>
      <div className="action">
        <button type="button" className="btn-action">
          Play
        </button>
      </div>
    </div>
  );
}

export default Track ;
