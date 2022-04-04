import React from 'react';
import './style.css';

function msToMinutesAndSeconds(ms) {
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }

const Track = (props) => {
  console.log("Data = ", props.listdata);
  return(
    <div>
        <div className="song-header-container">
          <div className="song-poster-header">
            <p></p>
          </div>
          <div className="song-title-header">
            <p>Tittle</p>
          </div>
          <div className="song-album-header">
            <p>Album</p>
          </div>
          <div className="song-artist-header">
            <p>Artist</p>
          </div>
          <div className="song-length-header">
            <p>Durasi</p>
          </div>
        </div>

      {props.listdata.map((datas) => {
        return(
          <div className="container" key={datas.id}>
            <div className="playlist-content">
                <div className="btn-play">
                    <button>Play</button>
                </div>
                <div className="playlist-item">
                    <img src={datas.album.images[0]?.url} />
                </div>
                <div className="playlist-item">
                    <p>{datas.name}</p>
                </div>
                <div className="playlist-item">
                    <p>{datas.album.name}</p>
                </div>
                <div className="playlist-item">
                    <p>{datas.artists[0].name}</p>
                </div>
                <div className="playlist-item">
                    <p>{msToMinutesAndSeconds(datas.duration_ms)}</p>
                </div>

            </div>
          </div>
        )
      })}
    </div>
  )
}

export default Track ;
