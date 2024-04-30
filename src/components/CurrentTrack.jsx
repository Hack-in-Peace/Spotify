import React, {useEffect} from 'react';
import "./CurrentTrack.css";
import { useStateProvider } from '../utils/StateProvider';
import axios from 'axios';
import { reducerCases } from '../utils/Constants';

export default function CurrentTrack() {
    const [{token, currentlyPlaying},dispatch] = useStateProvider();
    useEffect(()=> {
        const getCurrentTrack = async () => {
            const response = await axios.get("https://api.spotify.com/v1/me/player/currently-playing", {
                headers: {
                    Authorization: "Bearer "+token,
                    "Content-Type": "application/json",
                },
            }
            );
            let updatedCurrentlyPlaying = {};

            if(response.data !== "") {
                const {item} = response.data
                updatedCurrentlyPlaying = {
                    id: item.id,
                    name: item.name,
                    artists: item.artists.map((artist) => artist.name),
                    image: item.album.images[2].url,

                }
            }
           
            dispatch({ type:reducerCases.SET_PLAYING,  currentlyPlaying: updatedCurrentlyPlaying });

        };
        // console.log(currentlyPlaying);
        // getCurrentTrack();
        // console.log({updatedCurrentPlaying});
    }, 
    [token, dispatch,currentlyPlaying])
  return (
    <div className="cur">
        {currentlyPlaying && (
                <div className="track">
                    <div className="track_image">
                        <img src={currentlyPlaying.image} alt="currentlyplaying" />
                    </div>
                    <div className="track_info">
                        <h4>{currentlyPlaying.name}</h4>
                        {/* <h6>{currentlyPlaying.artists.join(", ")}</h6> */}
                        <h6>{currentlyPlaying.artists?.join(", ") ?? "No artists available"}</h6>
                    </div>
                </div>
            )
        }
        
      
    </div>
  )
}
