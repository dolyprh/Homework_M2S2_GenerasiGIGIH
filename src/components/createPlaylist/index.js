import React, { useState } from 'react'
import './style.css'
export default function CreatePlaylist() {

  const [title, setTitle] = useState([]);
  const [describe, setDescribe] = useState([]);
  const [errorForm, setErrorForm] = useState(null);


  const resetPlaylistCreator = () => {
    setPlaylistTitle('');
    setPlaylistDescription('');
  };

  const handleCreatePlaylist = async (event) => {
    event.preventDefault();

    if (!userId) return;

    setErrorForm(null);

    if (selectedTracks.length < 1) {
      setErrorForm('Please select at least one track');
      return;
    }

    if (!playlistTitle || !playlistDescription) {
      setErrorForm('Please fill in the required fields');
      return;
    }

    const payload = {
      name: playlistTitle,
      description: playlistDescription,
    };

    try {
      const {
        data: { id },
      } = await playlistService.create(userId, payload);
      await playlistService.addTracks(id, selectedTracks);
      resetPlaylistCreator();
    } catch (e) {
      const errorMessage = e.response.data.error.message;
      setErrorForm(errorMessage);
    }
  };


  return (
    <div className='create'>
      <form className='form-create-playlist'>
        <label htmlFor='title'>Title</label>
        <input 
          type="text"
          id='title' 
          name='title' 
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          />
        <label htmlFor='description'>Description</label>
        <textarea 
          type='text'
          id="description"
          name="description"
          value={describe}
          onChange={(e) => setDescribe(e.target.value)}
        />
        <button onClick={handleCreatePlaylist}>Create Playlist</button>
        
        <div className='container'>
          <div className='result-playlist'>
            <p>{title}</p>
            <p>{describe}</p>
          </div>
        </div>
      </form>
    </div>
  )
}
