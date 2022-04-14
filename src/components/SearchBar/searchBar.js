import { useState } from 'react'
import { searchTrack } from '../../auth/spotifyAPI'
import { useSelector } from 'react-redux'
import './style.css'
import { Button, TextField } from '@mui/material'

export default function SearchBar({ onSuccess }) {
  const accessToken = useSelector((state) => state.auth.accessToken);
  const [search, setSearch] = useState('')

  const handleSubmit = async (event) => {
    event.preventDefault();

    try{
        const response = await searchTrack(search, accessToken);
        const tracks = response.tracks.items;
        onSuccess(tracks);
    } catch(error) {
        alert(error)
    }
  }
  return (
    <div>
        <form className='form-Input-Search' onSubmit={(e) => handleSubmit(e) } >
            <div className='container-searchBar'>
              <h3>Search Playlist</h3>
               <TextField
                    id="filled-search"
                    variant="filled"

                    type="text"
                    name="query"
                    onChange={e => setSearch(e.target.value) }
               />
               <Button sx={{ borderRadius:20, background:"rgb(78, 245, 56)"}} 
                variant="contained" 
                type="submit" 
                >Search</Button> 
            </div>
        </form>
    </div>
  )
}
