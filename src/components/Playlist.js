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
            {!i && <div className="Now">Now Playing</div>}
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
            
            <div className="Playlist__Item--Meta">
              <div className="Inner">
                <h3>{song.title}</h3>
                <div className="Tags">
                  {this.createTagList(song)}
                </div>
              </div>
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
