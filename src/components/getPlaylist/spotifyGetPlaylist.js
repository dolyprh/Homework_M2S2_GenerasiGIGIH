import React, { useEffect, useState } from 'react'
import axios from 'axios'
import '../style.css';

export default function SpotifyGetPlaylist() {
  const playList_END = "https://api.spotify.com/v1/me/playlists";

  const [token, setToken] = useState("");
  const [data, setData] = useState({});

  useEffect(() => {
      if(localStorage.getItem("accessToken")) {
          setToken(localStorage.getItem("accessToken"));
      }
  }, []);

  const handleClick = () => {
    axios
        .get(playList_END, {
            headers: {
                Authorization: `Bearer ${token}`            },
        })
        .then((response) => {
            setData(response.data);
        })    
        .catch((error) => {
            console.log(error)
        })
    }

  return (
    <div>
        <button onClick={handleClick}>Get Playlist</button>
        {data?.items ? data.items.map((item) => {
            return(
            <div className="container" key={item.id}>
                <div className="playlist-content">
                    <div className="playlist-item">
                        <img src={item.images[0]?.url} />
                    </div>
                    <div className="playlist-item">
                        <p>{item.name}</p>
                    </div>
                </div>
            </div>
            )
        }): null}
    </div>
  )
}
