import { config } from "../../auth/config";
import { GetUserSpotify } from "../../auth/spotifyAPI";
import { useDispatch } from "react-redux";
import { login } from "../../redux/authSlice";
import { useHistory } from 'react-router-dom'
import { useEffect } from "react";
import React from 'react';
import { Link } from "@mui/material";
import { Box } from "@mui/material";

export default function LoginApp() {

  const dispatch = useDispatch();
  const history = useHistory()

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get('#access_token');

        if(accessToken !== null) {
            const getUser = async () => {
                try{
                    const response = await GetUserSpotify(accessToken);
                    dispatch(login({
                        accessToken: accessToken,
                        user: response
                    }));
                    history.push('/create-playlist');
                } catch(error) {
                    console.log(error)
                }
            }; 
            getUser();
        }

    }, [])


    const getSpotifyLogin = () => {
        const state = Date.now().toString();
        const CLIENT_ID = config.CLIENT_ID
        return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&state=${state}&response_type=${config.RESPONSE_TYPE}&scope=${config.SCOPES}`
    }

  return (
    <div>
        <Box 
            component="span"
            sx={{
            visibility: 'visible',
            my: 2,
            p: 1,
            mx: "auto",
            justifyContent:"center",
            alignItems:"center",
            bgcolor: (theme) =>
                theme.palette.mode === 'dark' ? '#101010' : 'greenligth',
            color: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.300' : 'grey.800',
            border: '1px solid',
            borderColor: (theme) =>
                theme.palette.mode === 'dark' ? 'grey.800' : 'grey.300',
            borderRadius: 20,
            fontSize: '0.875rem',
            fontWeight: '700',
            }}
        >
            <Link href={getSpotifyLogin()}
                variant="body1"
                underline="none">
                    
            Login</Link>
        </Box>
    </div>
  )
}
