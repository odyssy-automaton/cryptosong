import React, { Component, Fragment } from "react";
import { withRouter, Link } from "react-router-dom";

import SurpriseLink from "./SurpriseLink";

import "../styles/Header.scss";

class Header extends Component {
  render() {
    const { pathname } = this.props.location;

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
        {pathname === "/" ? (
          <Fragment>
            <Link to="/songography">Songography</Link>
            <SurpriseLink swapHeroSong={this.props.swapHeroSong} />
          </Fragment>
        ) : (
          <Link to="/">Home</Link>
        )}
      </div>
    );
  }
}

export default withRouter(Header);
