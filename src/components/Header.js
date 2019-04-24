import React, { Component } from "react";
import "../styles/Header.scss";

class Header extends Component {
  render() {
    return (
      <div className="Header">
      <div className="Header__Brand">
        <a style={{ display: "block" }} href="/">
          <img src="../../img/SongADayWorld__Logo--Standard.png"/>
        </a>
      </div>
      <nav className="Header__Nav"></nav>
        <button className="Button" href="" >Surprise Me</button>
      </div>
    );
  }
}

export default Header;
