import React, { Component, Fragment } from "react";

import { get } from "../helpers/requests";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import Playlist from "../components/Playlist";

import "../styles/Global.scss";
import "../styles/Home.scss";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    this.getHeroSong();
  }

  getHeroSong = songNumber => {
    songNumber = songNumber || 1;

    get(`api/song/${songNumber}`).then(response => {
      this.setState({ song: response.data });
    });
  };

  swapHeroSong = songNumber => {
    this.getHeroSong(songNumber);
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

  render() {
    const { song } = this.state;
    const tagList = this.createTagList();

    return (
      <div>
        <Header />
        {song ? (
          <Fragment>
            <HomeHero song={song} tagList={tagList} />
            <div className="">
              <h3>Playlist</h3>
              <Playlist currentSong={song} swapHeroSong={this.swapHeroSong} />
            </div>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default Home;
