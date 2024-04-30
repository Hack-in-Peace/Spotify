import React from 'react'
import "./Navbar.css";
import {FaSearch} from "react-icons/fa";
import {CgProfile} from "react-icons/cg";
import { useStateProvider } from '../utils/StateProvider';

export default function Navbar({navBackground}) {
  const [{userInfo}] = useStateProvider();
  // console.log({userInfo}, "from Navbar");
  return (
    <div className={`nav ${navBackground ? 'dark-background' : ''}`}>
      <div className="search_bar">
        <FaSearch />
        <input type="text" placeholder="Artists, songs, or podcasts" />

      </div>
      <div className="avatar">
        <a href="#">
          <CgProfile />
          <span>{userInfo?.userName}</span>
        </a>
      </div>

    </div>
  )
}
