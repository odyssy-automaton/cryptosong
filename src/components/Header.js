import React, { Component } from "react";

import SurpriseLink from "./SurpriseLink";

import "../styles/Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header">
        <div className="Header__Brand">
          <a style={{ display: "block" }} href="/">
            <img 
              src="../../img/SongADayWorld__Logo--Standard.png"
              alt="Song A Day World"
            />
          </a>
        </div>
        <nav className="Header__Nav"><SurpriseLink /></nav>
        <button className="Button" href="">
          <span className="Icon">
            <svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M19.9689 24.4001L18.8689 21.6001L16.0689 20.5001L18.8689 19.4001L19.9689 16.6001L21.0689 19.4001L23.8689 20.5001L21.0689 21.6001L19.9689 24.4001Z" fill="white"/>
              <path d="M13.5689 17L14.0689 18.25L15.3189 18.75L14.0689 19.25L13.5689 20.5L13.0689 19.25L11.8189 18.75L13.0689 18.25L13.5689 17Z" fill="white"/>
              <path d="M24.4689 8.65005L19.9689 6.90005L22.1689 2.65005L17.7689 4.60005L16.2689 0.0500488L14.5689 4.55005L10.2189 2.35005L12.2189 6.75005L7.61887 8.25005L12.1689 10.05L14.2189 7.95005C14.4689 7.70005 14.7689 7.60005 15.0689 7.60005C15.3689 7.60005 15.6689 7.70005 15.9189 7.95005L16.5189 8.50005C16.9689 9.00005 16.9689 9.75005 16.5189 10.2L14.2689 12.45L15.8189 16.85L17.5689 12.4L21.8189 14.55L19.8689 10.2L24.4689 8.65005Z" fill="white"/>
              <path d="M10.9689 15.75L16.5689 10.15C17.0189 9.70005 17.0189 8.95005 16.5689 8.45005L15.9689 7.90005C15.7189 7.65005 15.4189 7.55005 15.1189 7.55005C14.8189 7.55005 14.5189 7.65005 14.2689 7.90005L8.71887 13.5" stroke="white" stroke-width="2" stroke-miterlimit="10" stroke-linecap="round"/>
              <path d="M9.51894 12L0.468937 21.05C-0.181063 21.75 -0.131063 22.8 0.468937 23.45L1.01894 24C1.36894 24.3 1.81894 24.5 2.21894 24.5C2.66894 24.5 3.06894 24.35 3.41894 24L12.4689 14.95L9.51894 12Z" fill="white"/>
            </svg>
          </span> 
        </button>
      </div>
    );
  }
}

export default Header;
