import React, { Component } from "react";

import { get } from "../helpers/requests";

class Playlist extends Component {
  state = {
    songs: []
  };

  componentDidMount = () => {
    get(`api/song/${this.props.currentSong.number}/playlist`).then(response => {
      this.setState({ songs: response.data });
    });
  };

  createPlayList = () => {
    if (this.state.songs) {
      return [this.props.currentSong, ...this.state.songs].map(song => {
        return (
          <div key={song.number}>
            <p>{song.title}</p>
            <img src={song.imagePathSmall} alt={song.title} />
          </div>
        );
      });
    }
  };

  render() {
    const playlist = this.createPlayList();

    return (
      <div className="Playlist">
        <h3>Playlist</h3>

        {playlist}
      </div>
    );
  }
}

export default Playlist;
