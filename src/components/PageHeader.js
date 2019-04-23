import React, { Component } from "react";
import "../styles/global.scss";

class PageHeader extends Component {
  render() {
    return (
      <nav className="global-navigation">
        <a style={{ display: "block" }} href="/">
          <h1 className="site-name">Song A Day World</h1>
          <h2 className="site-sub-name">By the one and only Jonathan Mann</h2>
        </a>
      </nav>
    );
  }
}

export default PageHeader;
