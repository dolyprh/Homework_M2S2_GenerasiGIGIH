import React from 'react';
import SpotifyAPI from './components/spotifyAPI';
import './App.css'

function App() {
  return (
    <div className="App">
      <header className='header'>
        <h1 className="header-content">Playlist</h1>
      </header>
      <SpotifyAPI />
    </div>
  );
}

export default App;
