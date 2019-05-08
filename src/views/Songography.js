import React, { Component } from "react";
import _ from "lodash";
import moment from "moment";
import * as JsSearch from "js-search";

import { get } from "../helpers/requests";
import Header from "../components/Header";
import AlbumCanvas from "../components/AlbumCanvas";

class Songography extends Component {
  _isMounted = false;
  jsSearch = null;
  state = {
    songs: [],
    size: "md",
    imageSize: 100,
    searchInputValue: "",
    currentSearch: "",
    loading: true
  };

  componentDidMount() {
    this._ismounted = true;
    this.getSongs();
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  getSongs = () => {
    get("api/songs").then(songs => {
      console.log(songs.data);
      if (this._ismounted) {
        this.setState({ songs: songs.data, loading: false }, () => {
          this.jsSearch = new JsSearch.Search("description");
          this.jsSearch.addIndex("title");

          //todo: tag search not working
          this.jsSearch.addIndex("tags");
          this.jsSearch.addDocuments(songs.data);
        });
      }
    });
  };

  renderSongs(songs, sizeClass) {
    const songsByMonth = _.groupBy(songs, song =>
      moment(song.date).format("MMMM YYYY")
    );

    return _.map(songsByMonth, (monthSongs, month) => {
      const songMarkup = monthSongs.map((song, key) => (
        <AlbumCanvas
          key={key}
          width={this.state.imageSize}
          height={this.state.imageSize}
          backgroundImage={song.imagePathSmall}
          song={song}
          songnumber={song.number}
          list
        />
      ));
      return (
        <div key={month}>
          <h2 style={{ paddingLeft: 55 }}>{month}</h2>
          <div
            style={{ paddingTop: 10 }}
            className={`song-list-container ${sizeClass}`}
          >
            {songMarkup}
          </div>
        </div>
      );
    });
  }

  render() {
    const { songs, size, loading } = this.state;
    const sizeClass = `size-${size}`;

    return (
      <div>
        <Header />
        <div style={{ paddingTop: 40, width: "100%" }}>
          <h4 style={{ paddingLeft: 55, paddingBottom: 10 }}>
            {!songs.length && loading
              ? "loading songs"
              : `${songs.length} ${songs.length === 1 ? "song" : "songs"} `}
          </h4>
          {this.renderSongs(songs, sizeClass)}
        </div>
      </div>
    );
  }
}

export default Songography;
