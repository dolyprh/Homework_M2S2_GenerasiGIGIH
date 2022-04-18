import React, { useState } from 'react'
import { searchTrack } from '../../auth/spotifyAPI'
import { useSelector } from 'react-redux'
import { TRootState } from '../../redux/store'
import './style.css'
import { Button, TextField } from '@mui/material'

// export default function SearchBar({ onSuccess }) {
//   const accessToken = useSelector((state) => state.auth.accessToken);
//   const [search, setSearch] = useState('')

interface Props {
  onSuccess:  (tracks: any[]) => void;
}

  const SearchBar: React.FC<Props> = ({ onSuccess }) => {
    const [search, setSearch] = useState<string>('');
    const accessToken:string =  useSelector((state: TRootState ) => state.auth.accessToken, );


  const handleInput = (e: React.ChangeEvent) => {
    const target = e.target as HTMLTextAreaElement;
    setSearch(target.value)
  }

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
        {/* <form className='form-Input-Search' onSubmit={(e) => handleSubmit(e) } > */}
        <form className='form-Input-Search' onSubmit={ handleSubmit }>  
            <div className='container-searchBar'>
              <h3>Search Playlist</h3>
               <TextField
                    id="filled-search"
                    variant="filled"

                    type="text"
                    name="query"
                    onChange={handleInput }
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

export default SearchBar;