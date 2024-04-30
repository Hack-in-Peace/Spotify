import React,{ useEffect } from 'react';
import "./Body.css";
import {AiFillClockCircle} from "react-icons/ai";
import { useStateProvider } from "../utils/StateProvider";
import axios from "axios";
import { reducerCases } from '../utils/Constants';


export default function Body() {
  const [{ token, selectedPlaylistId, selectedPlaylist}, dispatch] = useStateProvider();
  useEffect(() => {
    const getInitialPlaylist = async () => {
      console.log(selectedPlaylistId);
      const response = await axios.get(
        `https://api.spotify.com/v1/playlists/${selectedPlaylistId}`,
       {
        headers: {
        Authorization: "Bearer "+token,
        "Content-Type": "application/json",
        },
      }
  );
      const selectedPlaylist = {
        id: response.data.id,
        name: response.data.name,
        description: response.data.description.startsWith("<a") 
        ? "" 
        : response.data.description,
        image: response.data.images[0].url,
        tracks: response.data.tracks.items.map(({track})=> ({
          id: track.id,
          name: track.name,
          artists: track.artists.map((artist) => artist.name),
          image: track.album.images[2].url,
          duration: track.duration_ms,
          album: track.album.name,
          context_uri: track.album.uri,
          track_number:track.track_number,

        })),
      };
      
    // console.log(selectedPlaylist);
    // console.log(response.data);
    dispatch({type:reducerCases.SET_PLAYLIST,selectedPlaylist})
  };
   getInitialPlaylist();
  }, [token, dispatch, selectedPlaylistId]);
  const msToMinutesAndSecons = (ms) => {
    const minutes = Math.floor(ms/60000);
    const seconds = ((ms%60000/1000).toFixed(0));
    return minutes + ":" + (seconds <10 ? "0" : "") +seconds;
  }
  return (
    <div className="whole_body">
      {selectedPlaylist && (
        <>
        <div className="playlist">
          <div className="image">
            <img src={selectedPlaylist.image} alt="selectedPlaylist" />
          </div>
          <div className="details">
                <span className="type">PLAYLIST</span>
                <h1 className="title">{selectedPlaylist.name}</h1>
                <p className="description">{selectedPlaylist.description}</p>
          </div>
        </div>
        <div className="list2">
          <div className="header_row">
            <div className="col">
              <span>#</span>
            </div>

            <div className="col">
              <span>TITLE</span>
            </div>

            <div className="col">
              <span>ALBUM</span>
            </div>

            <div className="col">
              <span>
                <AiFillClockCircle />
                </span>
            </div>
          </div>
          <div className="tracks">
              {
                selectedPlaylist.tracks.map(({
                  id,
                  name,
                  artists,
                  image,
                  duration,
                  album,
                  context_uri,
                  track_number,
                },index) => {
                  return (
                    <div className="rows" key={id}>
                          <div className="col">
                            <span>{index+1}</span>
                          </div>

                          <div className="col_detail">
                            <div className="image">
                            <img src={image} alt="track"/>
                          </div>
                          <div className="info">
                            <span className="name">{name}</span>
                            <span>{artists}</span>
                          </div>
                          </div>

                          <div className="col">
                            <span>{album}</span>
                          </div>

                          <div className="col">
                            <span>{ msToMinutesAndSecons(duration)}</span>
                          </div>

                    </div>
                  )
                })
      
              }
          </div>
          

        </div>
        </>

      )}
    </div>
  )
}
