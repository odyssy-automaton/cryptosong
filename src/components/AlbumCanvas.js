import React, { Component } from "react";
import moment from "moment";

export default class AlbumCanvas extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mergedImage: ""
    };
  }

  render() {
    const { backgroundImage, width, height } = this.props;
    let song_date,
      song_link,
      song_list_item_classes = ["song-list-item"];

    if (this.props.list) {
      song_date = new Date(this.props.song.date);
      song_date = moment(song_date).format("MMMM Do, YYYY");
      song_link = "/song/" + this.props.song.number + "/";
      return (
        <div
          className={song_list_item_classes.join(" ")}
          style={{
            width: width,
            height: height,
            flexShrink: "0",
            margin: "5px"
          }}
        >
          <a href={song_link}>
            <div
              className="song-list-image"
              style={{
                backgroundImage: "url(" + backgroundImage + ")",
                backgroundSize: "cover",
                backgroundPosition: "center center",
                width: width,
                height: height
              }}
            />
          </a>
          <div className="song-list-item-data">
            <div>
              Day: {this.props.song.number}{" "}
              <span className="song-list-item-data-date">{song_date}</span>
            </div>
            <h3 className="song-list-item-data-title">
              <a href={song_link}>{this.props.song.title.slice(0, 100)}</a>
            </h3>
          </div>
        </div>
      );
    } else {
      return (
        <img
          src={backgroundImage}
          className="song-image"
          alt={this.props.song.title}
        />
      );
    }
  }
}
