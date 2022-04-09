import { useState } from 'react';
import './style.css'
function Playlist({url, title, artist, toggleSelect, album}) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };

    return (
        <div className='card-playlist'>
            <div className='playlist-item'>
                <img src={url} alt={title} />
            </div>
            <div className='playlist-item'>
                <h3>{title}</h3>
            </div>
            <div className='playlist-item'>
                <p>{artist}</p>
            </div>
            <div className='playlist-item'>
                <p>{album}</p>
            </div>
            <div className='playlist-item'>
                <button className="btn-select" onClick={handleSelect}>
                    {isSelected ? "Deselect" : "Select"}
                </button>            
            </div>
            
        </div>
    );
}

export default Playlist;
