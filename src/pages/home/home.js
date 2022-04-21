// import { useState, useEffect } from "react";
// import { config } from "../../auth/config";
// import { GetUserSpotify } from "../../auth/spotifyAPI";
// import SearchBar from "../../components/SearchBar/index.tsx";
// import Playlist from "../../components/Playlist/playlist";
// import PlaylistItem from "../../components/CreatePlaylist/CreatePlaylist";
// import { login } from '../../redux/authSlice';
// import { useDispatch, useSelector } from "react-redux";
// import React from 'react'
// import '../style.css'
// import { Box, Paper, Grid } from "@mui/material";

// function SpotifyPages() {
//   const [tracks, setTracks] = useState([]);
//   const [isSearch, setIsSearch] = useState(false);
//   const [selectedTrackURI, setSelectedTrackURI] = useState([]);
//   const [selectedTracks, setSelectedTracks] = useState([]);
//   const { isAuthorized } = useSelector(state => state.auth);
//   const dispatch = useDispatch();

 

//   useEffect(() => {
//     const params = new URLSearchParams(window.location.hash);
//     const accessToken = params.get('#access_token');

//         if(accessToken !== null) {
//             // setToken(accessToken);
//             // setAuthorized(accessToken !== null);
            
//             const getUser = async () => {
//                 try{
//                     const response = await GetUserSpotify(accessToken);
//                     // setUser(response);
//                     dispatch(login({
//                         accessToken: accessToken,
//                         user: response
//                     }));
//                 } catch(error) {
//                     console.log(error)
//                 }
//             }; 
//             getUser();
//         }

//     }, [])

//     const filterSelectedTrack = () => {
//         return tracks.filter((track) => selectedTrackURI.includes(track.uri))
//     }

//     useEffect(() => {
//         if(!isSearch) {
//             const selectedTracks = filterSelectedTrack();
//             setTracks(selectedTracks);
//         }
//     }, [])

//     const getSpotifyLogin = () => {
//         const state = Date.now().toString();
//         const CLIENT_ID = config.CLIENT_ID
//         return `https://accounts.spotify.com/authorize?client_id=${CLIENT_ID}&redirect_uri=${config.REDIRECT_URI}&state=${state}&response_type=${config.RESPONSE_TYPE}&scope=${config.SCOPES}`
//     }
    
//     const handleSearch = (searchTracks) => {
//         setIsSearch(true);
        
//         const selectedSearchTracks = searchTracks.filter(
//             (track) => selectedTrackURI.includes(track.uri)
//         );

//         setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
//     };
    

//     const toggleSelect = (track) => {
//         const uri = track.uri;
//         if (selectedTrackURI.includes(uri)) {
//             setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
//             setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
//         } else {
//             setSelectedTrackURI([...selectedTrackURI, uri]);
//             setSelectedTracks([...selectedTracks, track]);
//         }
//     };

//   return (
//     <div>
//         {!isAuthorized && (
//             <div className="btn-login">
//                 <a href={getSpotifyLogin()}>Login to Spotify</a> 
//             </div>
//         )}

//         {isAuthorized && (
//             <>
//             <div className="content-spotify">
//                 <SearchBar onSuccess={(tracks) => handleSearch(tracks)} />
//                 <PlaylistItem uris={selectedTrackURI} className="playlist-form"/>
//             </div>

//                 {tracks.length === 0 && <p>No tracks</p>}

//                 <Box className="track-list" sx={{ flexGrow: 1 }} >
//                     <Item container spacing={{ xs: 2, md: 3 }} columns={{ xs: 4, sm: 8, md: 12 }}>
//                         {tracks.map((track) => (
//                             <Playlist
//                                 key={track.id}
//                                 url={track.album.images[2].url}
//                                 title={track.name}
//                                 artist={track.artists[0].name}
//                                 album={track.album.name}
//                                 toggleSelect={() => toggleSelect(track)}
//                             />
//                         ))}
//                     </Item>
//                 </Box>
//         </>
//         )

//         }
//     </div>
//   )
// }

// export default SpotifyPages;