import React, { Component } from "react";
import { get } from "../helpers/requests";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    get(`api/song/1`).then(response => {
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

export default Home;
