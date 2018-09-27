import React, { Component } from "react";
import "../styles/global.scss";

export default class PageHeader extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let number_of_songs = "3,666";
    return (
      <nav className="global-navigation">
        <a style={{display: "block"}} href="/">
          <h1 className="site-name">Song A Day World</h1>
          <h2 className="site-sub-name">
            By the one and only Jonathan Mann
          </h2>
        </a>
        <div className="global-navigation-search">
          <input
            className="global-search-input icon-search"
            type="search"
            placeholder={`Search through ${number_of_songs} songs`}
          />
        </div>
      </nav>
    );
  }
}
