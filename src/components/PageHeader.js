import React, { Component } from "react";
import "../styles/Header.scss";

class PageHeader extends Component {
  render() {
    return (
      <div className="Header">
        <nav className="Header__Nav global-navigation">
          <a style={{ display: "block" }} href="/">
            <div className="Header__Nav--Brand">
              <img src="/img/SongADayWorld__Logo.svg" alt="Song a Day World" />
            </div>
          </a>
        </nav>
      </div>
    );
  }
}

export default PageHeader;
