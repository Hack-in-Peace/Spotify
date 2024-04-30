import React, { useEffect , useRef, useState} from 'react'
import axios from "axios";
import "./Spotify.css";
import Body from "./Body";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import Footer from "./Footer";
import { useStateProvider } from '../utils/StateProvider';
import {reducerCases} from "../utils/Constants";


export default function Spotify() {
   const [{token}, dispatch] = useStateProvider();
   const bodyRef = useRef();
   const [navBackground, setNavBackground] = useState(false);
   const [headerBackground, setHeaderBackground] = useState(false);
   const bodyScrolled = () => {
        bodyRef.current.scrollTop >=30 
        ?setNavBackground(true) :setNavBackground(false);

        bodyRef.current.scrollTop >=268 
        ?setHeaderBackground(true) :setHeaderBackground(false);
   }
   useEffect(()=>{
        const getUserInfo =  async () => {
            const { data } = await axios.get("https://api.spotify.com/v1/me", {
                headers: {
                    Authorization: "Bearer "+token,
                    "Content-Type": "application/json",
                },
            });
            const userInfo = {
                userId :data.id,
                userName: data.display_name,
            };
            // console.log(userInfo);
            dispatch({type:reducerCases.SET_USER, userInfo})   
        };
        getUserInfo();
        
        

   },[dispatch,token]) ;

  return (
    <>
    <div className="spot">
        <div className="spotify_body">
            <Sidebar />

            <div className="bodyy" ref={bodyRef} onScroll={bodyScrolled}>
                <Navbar navBackground={navBackground}/>
                <div className="body_contents">
                    <Body headerBackground={headerBackground}/>
                </div>

            </div>
        </div>
        <div className="spotify_footer">
            <Footer />
        </div>
        </div>
    </>
  )
  
}
 
