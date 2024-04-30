import React from 'react'
import './Login.css';

export default function Login() {
    const handleClick = () =>{
        const clientId = "78c9b113af4c4c4ab891ccc4b71d6ea3";
        const redirectUrl ="http://localhost:3000/";
        const apiUrl = "https://accounts.spotify.com/authorize";
        const scope = ["user-read-email",
        "user-read-private",
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-playback-position",
        "user-top-read",
        "user-read-recently-played"
    ];
    window.location.href =`${apiUrl}?client_id=${clientId}&redirect_uri=${redirectUrl}&scope=${scope.join(
        " "

    )}&response_type=token&show_dialog=true`;
    }  
    return (
    <>
      <div className="container">
        <img src="https://storage.googleapis.com/pr-newsroom-wp/1/2018/11/Spotify_Logo_CMYK_Black.png" alt="spotifylogo"/>
        <button onClick={handleClick}>Connect Spotify</button>
      </div>
    </>
  )
}
