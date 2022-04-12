import { useState, useEffect } from "react";
import SearchBar from "../../components/SearchBar/searchBar";
import Playlist from "../../components/Playlist/playlist";
import PlaylistItem from "../../components/CreatePlaylist/CreatePlaylist";
import { login } from '../../redux/authSlice';
import { GetUserSpotify } from "../../auth/spotifyAPI";
import { useDispatch } from "react-redux";

function CreatePlaylist() {
  const [tracks, setTracks] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [selectedTrackURI, setSelectedTrackURI] = useState([]);
  const [selectedTracks, setSelectedTracks] = useState([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const params = new URLSearchParams(window.location.hash);
    const accessToken = params.get('#access_token');

        if(accessToken !== null) {
            
            const getUser = async () => {
                try{
                    const response = await GetUserSpotify(accessToken);
                    // setUser(response);
                    dispatch(login({
                        accessToken: accessToken,
                        user: response
                    }));
                } catch(error) {
                    console.log(error)
                }
            }; 
            getUser();
        }

    }, [])

    const filterSelectedTrack = () => {
        return tracks.filter((track) => selectedTrackURI.includes(track.uri))
    }

    useEffect(() => {
        if(!isSearch) {
            const selectedTracks = filterSelectedTrack();
            setTracks(selectedTracks);
        }
    }, [])
    
    const handleSearch = (searchTracks) => {
        setIsSearch(true);
        
        const selectedSearchTracks = searchTracks.filter(
            (track) => selectedTrackURI.includes(track.uri)
        );

        setTracks([...new Set([...selectedSearchTracks, ...searchTracks])]);
    };
    

    const toggleSelect = (track) => {
        const uri = track.uri;
        if (selectedTrackURI.includes(uri)) {
            setSelectedTrackURI(selectedTrackURI.filter((item) => item !== uri));
            setSelectedTracks(selectedTrackURI.filter((item) => item.uri !== uri));
        } else {
            setSelectedTrackURI([...selectedTrackURI, uri]);
            setSelectedTracks([...selectedTracks, track]);
        }
    };

  return (
    <div>
        <div className="content-spotify">
            <SearchBar onSuccess={(tracks) => handleSearch(tracks)} />
            <PlaylistItem uris={selectedTrackURI} className="playlist-form"/>

        </div>

            {tracks.length === 0 && <p>No tracks</p>}

            <div className="track-list">
                {tracks.map((track) => (
                    <Playlist
                        key={track.id}
                        url={track.album.images[2].url}
                        title={track.name}
                        artist={track.artists[0].name}
                        album={track.album.name}
                        toggleSelect={() => toggleSelect(track)}
                    />
            ))}
        </div>
    </div>
  )
}

export default CreatePlaylist;