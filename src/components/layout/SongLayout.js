import React, { Component } from "react";
import { Helmet } from "react-helmet";

class SongLayout extends Component {
  render() {
    return (
      <Helmet
        meta={[
          {
            name: "description",
            content: "SONG DETAIL"
          }
        ]}
      />
    );
  }
}

export default SongLayout;
