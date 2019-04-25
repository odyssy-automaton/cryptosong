import React, { Component } from "react";
import { Link } from "react-router-dom";

import { get } from "../helpers/requests";

class SurpriseLink extends Component {
  state = {
    songNumber: null
  };

  componentDidMount = () => {
    get("api/songs/count").then(count => {
      const songNumber =
        Math.floor(Math.random() * Math.floor(+count.data.number - 1)) + 1;

      this.setState({ songNumber });
    });
  };

  render() {
    const { songNumber } = this.state;

    return (
      <div className="SurpriseLink">
        <Link to={`song/${songNumber}`}>Surprise me</Link>
      </div>
    );
  }
}

export default SurpriseLink;
