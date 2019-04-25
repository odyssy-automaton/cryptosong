import React, { Component } from "react";
import moment from "moment";

import "../styles/Playlist.scss";

class Playlist extends Component {
  createPlayList = () => {
    if (this.props.songs) {
      return this.props.songs.map((song, i) => {
        return (
          <div
            className="Playlist__Item"
            key={i}
            onClick={() => this.props.swapHeroSong(song.number)}
          >
            <div
              className="Playlist__Item--Hero"
              style={{ backgroundImage: `url(` + song.imagePath + `)` }}
            />
            <div className="Date">
              <p className="Large">{`${moment(song.date).format("DD")}`}</p>
              <p className="Small">{`${moment(song.date).format(
                "MMM 'YY"
              )}`}</p>
            </div>
            {!i && <p>Now Playing</p>}
            <div className="Playlist__Item--Meta">
              <p>{song.title}</p>
              {this.createTagList(song)}
            </div>
          </div>
        );
      });
    }
  };

  createTagList = song => {
    return song.tagNames.map((tag, i) => {
      return (
        <div className="Tag" key={i} tag={tag}>
          {tag}
        </div>
      );
    });
  };

  render() {
    const playlist = this.createPlayList();

    return <div className="Playlist">{playlist}</div>;
  }
}

export default Playlist;
