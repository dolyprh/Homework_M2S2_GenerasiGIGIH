import React, { useState, useEffect } from "react";
import SpotifyGetPlaylist from "./getPlaylist/spotifyGetPlaylist";

export default function SpotifyAPI() {
  const ClIENT_ID = "d3b87dbbd6b64ae5a80d0613bd182d5e"
  const REDIRECT_URI = "http://localhost:3000"
  const AUTH_ENDPOINT = "https://accounts.spotify.com/authorize"
  const SPACE_DELIMITER = "%20";
    const SCOPES = [
        "user-read-currently-playing",
        "user-read-playback-state",
        "playlist-read-private",
    ];
    const SCOPES_URL_PARAM = SCOPES.join(SPACE_DELIMITER);

  const getReturned = (hash) => {
    const stringAfterHashtag = hash.substring(1);
    const paramsInUrl = stringAfterHashtag.split("&");
    const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
      console.log(currentValue);
      const [key, value] = currentValue.split("=");
      accumulater[key] = value;
      return accumulater;
    }, {});
  
    return paramsSplitUp;
  };

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturned(window.location.hash);

      localStorage.clear();

      localStorage.setItem("accessToken", access_token);
      localStorage.setItem("tokenType", token_type);
      localStorage.setItem("expiresIn", expires_in);
    }
  });

  const handleLogin = () => {
      window.location = `${AUTH_ENDPOINT}?client_id=${ClIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${SCOPES_URL_PARAM}&response_type=token&show_dialog=true`
  }

  return (
    <div className='header'>
        <button onClick={handleLogin}>Login to spotify</button>
        <SpotifyGetPlaylist />
    </div>
  )
}
