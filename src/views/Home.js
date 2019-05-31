import React, { Component, Fragment } from "react";

import { get } from "../helpers/requests";
import Header from "../components/Header";
import HomeHero from "../components/HomeHero";
import Playlist from "../components/Playlist";
import Tag from "../components/Tag";

import "../styles/Global.scss";
import "../styles/Home.scss";
import HeroCanvas from "../components/HeroCanvas";

class Home extends Component {
  _isMounted = false;
  state = {
    song: null,
    songs: []
  };

  componentDidMount() {
    this._ismounted = true;
    this.getSongs();
  }

  componentWillUnmount() {
    this._ismounted = false;
  }

  getSongs = songNumber => {
    songNumber = songNumber || 1;

    get(`api/song/${songNumber}`).then(response => {
      get(`api/song/${response.data.number}/playlist`).then(songs => {
        if (this._ismounted) {
          this.setState({ song: response.data, songs: songs.data });
        }
      });
    });
  };

  swapHeroSong = songNumber => {
    this.getSongs(songNumber);
  };

  createTagList = () => {
    if (this.state.song) {
      return this.state.song.tagNames.map((tag, i) => {
        return <Tag tag={tag} key={i} />;
      });
    }
  };

  render() {
    const { song, songs } = this.state;
    const tagList = this.createTagList();

    return (
      <div className="Home">
        <Header swapHeroSong={this.swapHeroSong} />
        {song ? (
          <Fragment>
            <HomeHero song={song} tagList={tagList} />
            <HeroCanvas song={song} cb={(px)=>  console.log('px', px)} />
            <div className="Container--Standard">
              <div className="Container__Contents">
                <h3>Current Playlist: All Songs</h3>
                <Playlist
                  songs={[song, ...songs]}
                  swapHeroSong={this.swapHeroSong}
                />
              </div>
            </div>
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default Home;
