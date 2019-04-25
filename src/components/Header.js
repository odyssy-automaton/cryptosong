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
        <nav className="Header__Nav" />
        <SurpriseLink swapHeroSong={this.props.swapHeroSong} />
      </div>
    );
  }
}

export default Header;
