import React, { useState, useEffect} from 'react'
import axios from 'axios'
import '../style.css'

export default function SpotifyGetTrack() {
  const [token, setToken] = useState("");
  const [search, setSearch] = useState("")
  const [artists, setArtists] = useState([])

    const searchArtist = async (e) => {
        e.preventDefault();
        const {data} = await axios
            .get("https://api.spotify.com/v1/search", {
                headers: {
                    Authorization: `Bearer ${token}`
            },
                params: {
                    q: search,
                    type: "artist"
                }
            })

        setArtists(data.artists.items)
    }


    const renderArtists = () => {
        return artists.map(artist => (
            <div key={artist.id} className="content">
                <div className="playlist-content">
                    <div className="playlist-item">
                        {artist.images.length ? 
                        <img src={artist.images[0].url} alt=""/> : 
                        <div>No Image</div>}                  
                    </div>
                    <div className="playlist-item">
                        <p>{artist.name}</p>
                    </div>
                    <div className="playlist-item">
                        <p>{artist.artists}</p>
                    </div>
                    <div className="playlist-item">
                        <button>Select</button>
                    </div>
                </div>
            </div>
        ))
    }

  return (
    <div>
        <header className="App-header">
            <h1>Playlist Spotify</h1>
                    <form onSubmit={searchArtist}>
                        <input 
                            className='inputForm' 
                            type="text" 
                            onChange={(e) => setSearch(e.target.value)}/>
                        <button type={"submit"}>Search</button>
                    </form>

                {renderArtists()}

        </header>
    </div>
  )
}
