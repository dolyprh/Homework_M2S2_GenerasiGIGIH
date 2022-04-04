import React from 'react';
import SpotifyAPI from './api/spotifyAPI';
import SpotifyGetPlaylist from './components/playlist/index';
import './App.css'

function App() {
  return (
    <div className="App">
        <SpotifyAPI />
      </div>
  );
}

export default App;
