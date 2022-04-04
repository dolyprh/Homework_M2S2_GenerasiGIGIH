import React, { useState, useEffect} from 'react'
import '../style.css'

export default function Track(props) {
  console.log("data : ", props.dataResult);

  const [select, setSelected] = useState([])

  const handleSelected = (URI) => {
      const alreadySelected = select.find((selectedUri) => selectedUri === URI);
      if(alreadySelected) {
          setSelected(
              select.filter((track) => track.id !== URI)
        );
      }else{
          setSelected((tr) => [...tr, URI])
      }
  };

  return (
    <div>
       {props.dataResult.map((tr) => {
           const isSelected = true;
           return(
            <div key={tr.id} className="content">
                <div className="playlist-content">
                    <div className="playlist-item">
                        <img src={tr.album.images[1].url} alt=""/>
                    </div>
                    <div className="playlist-item">
                        <p>{tr.name}</p>
                    </div>
                    <div className="playlist-item">
                        <p>{tr.artists[0].name}</p>
                    </div>
                    <div className="playlist-item">
                        <button onClick={handleSelected} type="button">{isSelected ? "deselect" : "select"}</button>
                    </div>
                </div>
            </div>
            )
        })}
    </div>
  )
}
