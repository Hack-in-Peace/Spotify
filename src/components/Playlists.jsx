import React from 'react'
import "./Playlists.css";
import { useEffect } from "react";
import { useStateProvider } from "../utils/StateProvider";
import { reducerCases } from "../utils/Constants";
import axios from "axios";
// import CurrentTrack from './CurrentTrack';

export default function Playlists() {
    const [{token, playlists },dispatch] = useStateProvider();
    useEffect(()=> {
        const getPlaylistData = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/playlists", {
                headers: {
                    Authorization: "Bearer "+token,
                    "Content-Type": "application/json",
                },
            }
            );
            const { items } = response.data;
            const playlists = items.map(({name, id})=> {
                return { name, id};
            });
            
            dispatch({type:reducerCases.SET_PLAYLISTS, playlists });

        };
        // console.log(items);
        getPlaylistData();
    }, 
    [token, dispatch])
return (
    <div className="list1">
      <ul>
        {playlists.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
        {playlists.map(({ name, id }) => (
          <li key={id}>{name}</li>
        ))}
      </ul>
      
    </div>
  );

  
    
}
