import { useSelector } from "react-redux";
import { useState } from "react";
import { CreatePlaylist, addTrackToPlaylist } from "../../auth/spotifyAPI";
import './style.css'

import React from 'react'

export default function PlaylistItem({ uris }) {
    
  const accessToken = useSelector((state) => state.auth.accessToken)
  const userId = useSelector((state) => state.auth.user.id)

  const [playlist, setPlaylist] = useState({
      title: "",
      description: "",
  })

  const handleChange = (e) => {
    const {name, value} = e.target;
    console.info(name, value);
    setPlaylist({...playlist, [name]: value}) 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try{
        const requestPlaylist = await CreatePlaylist(accessToken, userId, {
            name: playlist.title,
            description: playlist.description,
        });

        await addTrackToPlaylist( accessToken, requestPlaylist.id, uris);

        setPlaylist({
          title: "",
          description: "",
        });

        alert("create playlist berhasil")

            
    }catch(error) {
      alert(error)
    }
  };

  return (
    <div className="container">
        <h3>Create Playlist</h3>
        <form className="form-input-playlist" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            id="title"
            value={playlist.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            id="desc"
            value={playlist.description}
            onChange={handleChange}
            required
            rows={4}
          />

          <button className="btn-submit" type="submit">Submit</button>
        </form>
    </div>
  )
}
