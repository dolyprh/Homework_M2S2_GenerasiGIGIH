import { useState } from 'react';
import './style.css'
function Playlist({url, title, artist, toggleSelect, album}) {
    const [isSelected, setIsSelected] = useState(false);

    const handleSelect = () => {
        setIsSelected(!isSelected);
        toggleSelect();
    };

    return (
        <div className='container'>
            <div className='card-playlist'>
                <div className='playlist-item-img'>
                    <img src={url} alt={title} />
                </div>
                <div className='playlist-item-decs'>
                    <span>{title}</span>
                    <p>{artist}</p>
                    <p>{album}</p>
                    <button className="btn-select" onClick={handleSelect}>
                        {isSelected ? "Deselect" : "Select"}
                    </button>            
                </div>
            </div>
            
        </div>
    );
}

export default Playlist;
