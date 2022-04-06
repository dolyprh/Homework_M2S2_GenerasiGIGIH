import React, { useState, useEffect} from 'react'
import axios from 'axios'
import '../components/style.css'
import Track from '../components/Track'
import SpotifyGetPlaylist from '../components/playlist'
import CreatePlaylist from '../components/createPlaylist'
import { setToken } from '../store/token'
import { useSelector, useDispatch } from 'react-redux'


export default function SpotifyAPI() {

  const CLIENT_ID = "d3b87dbbd6b64ae5a80d0613bd182d5e"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const RESPONSE_TYPE = "token"

  const token = useSelector((state) => state.token.value);
//   const [token, setToken] = useState("");
  const [search, setSearch] = useState("")
  const [result, setResult] = useState([])

  useEffect(() => {
    const hash = window.location.hash
    let token = window.localStorage.getItem("token")
    if (!token && hash) {
        token = hash.substring(1).split("&").find(elem => elem.startsWith("access_token")).split("=")[1]

        window.location.hash = ""
        window.localStorage.setItem("token", token)
    }

    setToken(token)

    }, [])

    const logout = () => {
        setToken("")
        window.localStorage.removeItem("token")
    }


  const searchArtists = async (e) => {
    e.preventDefault();
    const { data } = await axios
        .get("https://api.spotify.com/v1/search", {
            headers: {
                Authorization: `Bearer ${token}`
        },
            params: {
                q: search,
                type: "track"
            }
        })
    setResult(data.tracks.items)

    };

  return (
    <div>
        <header className="App-header">
            <h1>Playlist Spotify</h1>
            {!token ?
                    <a href={`${AUTH_ENDPOINT}?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=${RESPONSE_TYPE}`}>Login
                        to Spotify</a>
                    : <button onClick={logout} className="btn-logout">Logout</button>}

            {token ?
                <form onSubmit={searchArtists}>
                    <input className='inputForm' type="text" onChange={e => setSearch(e.target.value)}/>
                    <button type={"submit"}>Search</button>
                </form>

                : <h2>Please login</h2>
            }
            <SpotifyGetPlaylist />
            <CreatePlaylist />
            <Track dataResult={result}/>

        </header>
    </div>
  )
}
