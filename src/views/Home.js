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
    songs: [],
    backgroundColor: null
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

  handelPixel = (pixelData) => {
    console.log('handelPixel', pixelData);
    
    if(pixelData.length) {
      this.setState({backgroundColor: `rgb(${pixelData[0]}, ${pixelData[1]}, ${pixelData[2]})`});
    } else {
      this.setState({backgroundColor: 'rgb(256, 256, 256)'});
    }
  }

  render() {
    const { song, songs, backgroundColor } = this.state;
    const tagList = this.createTagList();
    const bgStyle = {backgroundColor};
    console.log('render bgStyle', bgStyle);
    

    return (
      <div className="Home" >
        <Header swapHeroSong={this.swapHeroSong} />
        {song ? (
          <Fragment>
            <HomeHero song={song} tagList={tagList} />
            <div style={{display: 'none' }}>
            <HeroCanvas song={song} cb={(px) => this.handelPixel(px)} />
            </div>
            <div className="Container--Standard">
              <div className="Container__Contents" style={bgStyle}>
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
