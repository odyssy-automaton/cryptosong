import React, { Component } from "react";
import axios from "axios";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    axios.get(`/api/song/1`).then(response => {
      console.log(response.data);
      this.setState({ song: response.data });
    });
  }

  componentWillUnmount() {}

  render() {
    const { song } = this.state;

    return (
      <div>
        <h1>SAD WORLD</h1>
        {song ? <p>{song.title}</p> : null}
      </div>
    );
  }
}

module.exports = Home;
