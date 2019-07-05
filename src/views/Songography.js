import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import _ from "lodash";
import moment from "moment";
import * as JsSearch from "js-search";

import { get } from "../helpers/requests";
import Header from "../components/Header";
import AlbumCanvas from "../components/AlbumCanvas";

import '../styles/songs.scss';

class Songography extends Component {
  _isMounted = false;
  jsSearch = null;
  state = {
    songs: [],
    size: "md",
    imageSize: 100,
    searchInputValue: "",
    currentSearch: "",
    sortOrder: "desc",
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
    let endPoint = "api/songs";
    if (this.props.filterBy === "tags") {
      endPoint = `api/find_tags?tags=${this.props.match.params.tagname}`;
    }

    get(endPoint).then(songs => {
      console.log(songs.data);

      if (this._ismounted) {
        this.setState({ songs: songs.data, loading: false }, () => {
          this.jsSearch = new JsSearch.Search("description");
          this.jsSearch.addIndex("title");
          this.jsSearch.addIndex("tagNames");
          this.jsSearch.addDocuments(songs.data);
        });
      }
    });
  };

  onSearchKeyPress = e => {
    if (e.key === "Enter") {
      this.setState({ currentSearch: this.state.searchInputValue });
    }
  };

  onSearchChange = e => {
    this.setState({ searchInputValue: e.target.value });
  };

  filterSongs = songs => {
    let filteredSongs = songs;

    if (this.jsSearch && !_.isEmpty(this.state.currentSearch)) {
      filteredSongs = this.jsSearch.search(this.state.currentSearch);
    }

    return _.orderBy(filteredSongs, "number", this.state.sortOrder);
  };

  sortBy = () => {
    const newOrder = this.state.sortOrder === "asc" ? "desc" : "asc";
    this.setState({ sortOrder: newOrder });
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
    const { size, loading, sortOrder } = this.state;
    const songs = this.filterSongs(this.state.songs);
    const sizeClass = `size-${size}`;

    return (
      <div className="Songography">
        <Header />
        <div>
          <h1 style={{ paddingTop: 35, paddingLeft: 55, paddingBottom: 10 }}>Songography</h1>
          <h3 style={{ paddingTop: 0, paddingLeft: 55, paddingBottom: 10 }}>
              {!songs.length && loading
                ? "loading songs"
                : `${songs.length} ${songs.length === 1 ? "song" : "songs"} `}
          </h3>
          <div className="Toolbar" style={{ display: "flex" }}>
            <button className="Button Sort" onClick={this.sortBy}>
                Sort {sortOrder === "asc" ? <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/>
                <path fill="#010101" d="M20 12l-1.41-1.41L13 16.17V4h-2v12.17l-5.58-5.59L4 12l8 8 8-8z"/>
                </svg> : <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path fill="none" d="M0 0h24v24H0V0z"/>
                <path d="M4 12l1.41 1.41L11 7.83V20h2V7.83l5.58 5.59L20 12l-8-8-8 8z"/>
                </svg>}
              </button>
              <input
                style={{
                  backgroundColor: "#fff",
                  color: "rgba(0, 0, 0, 0.87)",
                  flexShrink: 0
                }}
                className="global-search-input icon-search Search"
                type="search"
                placeholder="Search"
                value={this.state.searchInputValue}
                onKeyPress={this.onSearchKeyPress}
                onChange={this.onSearchChange}
              />
          </div>
        </div>
        <div style={{ paddingTop: 40, width: "100%" }}>
          {this.renderSongs(songs, sizeClass)}
        </div>
      </div>
    );
  }
}

export default withRouter(Songography);
