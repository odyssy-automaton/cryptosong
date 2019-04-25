import React, { Component } from "react";
import moment from "moment";

import { get } from "../helpers/requests";
import '../styles/Playlist.scss';

class Playlist extends Component {
  state = {
    songs: []
  };

  componentDidMount = () => {
    get(`api/song/${this.props.currentSong.number}/playlist`).then(response => {
      this.setState({ songs: response.data });
    });
  };

  createTagList = () => {
    if (this.state.song) {
      return this.state.song.tagNames.map((tag, i) => {
        return (
          <div className="Tag" key={i} tag={tag}>
            {tag}
          </div>
        );
      });
    }
  };

  createPlayList = () => {
    

    if (this.state.songs) {
      return [this.props.currentSong, ...this.state.songs].map(song => {
        const tagList = this.createTagList();
        return (
          <div className="Playlist__Item" key={song.number}>
            <div className="Playlist__Item--Hero" style={{ backgroundImage: `url(` + song.imagePath + `)` }}></div>
            <div className="Date">
              <p className="Large">{`${moment(song.date).format(
                "DD"
              )}`}</p>
              <p className="Small">{`${moment(song.date).format(
                "MMM 'YY"
              )}`}</p>
            </div>
            <div className="Playlist__Item--Meta">
              <p>{song.title}</p>
              <p>{tagList}</p>
            </div>
          </div>
        );
      });
    }
  };

  render() {
    const playlist = this.createPlayList();

    return (
      <div className="Playlist">
        {playlist}
      </div>
    );
  }
}

export default Playlist;
