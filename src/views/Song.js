import React, { Component } from "react";
import { Embed } from "semantic-ui-react";

import { get } from "../helpers/requests";
import AlbumCanvas from "../components/AlbumCanvas";
import moment from "moment";
import Header from "../components/Header";

import "../styles/song.scss";

class Song extends Component {
  constructor(props) {
    super(props);
    this.state = {
      done: false,
      song: null
    };
  }

  componentDidMount() {
    const { match } = this.props;
    get(`api/song/${match.params.id}`).then(response => {
      this.setState({ song: response.data, done: true });
    });
  }

  renderSong() {
    const { song } = this.state;
    let instruments = [],
      tags = [];
    // rarity = Math.floor(Math.random() * 100) + "%";

    song.instruments.map(instrument => {
      return instruments.push(instrument.name);
    });

    song.tags.map(tag => {
      return tags.push(tag.name);
    });

    return (
      <div>
        
        <span className="page-nav previous-song">
          <span className="text">The Day Before</span>
        </span>
        <span href="" className="page-nav next-song">
          <span className="text">The Next Day</span>
        </span>

        <div className="song-header-container">
          <AlbumCanvas
            width={300}
            backgroundImage={song.imagePath}
            song={song}
            songnumber="song.number"
            list={false}
          />
        </div>
        <div className="song-content-container">
          <div className="song-meta">
            <h2 className="song-meta-title">Instruments</h2>
            <p className="song-meta-content">{instruments.join(", ")}</p>

            <h2 className="song-meta-title">Tags</h2>
            <p className="song-meta-content">
              {tags.map((tag, key) => {
                let url = `/songs/tag/${tag}`;
                return (
                  <span key={key}>
                    <a href={url}>{tag}</a>
                    {tags.length === key + 1 ? " " : ", "}
                  </span>
                );
              })}
            </p>

            <h2 className="song-meta-title">Location Written</h2>
            <p className="song-meta-content">{song.location.name}</p>

            <h2 className="song-meta-title">Mood</h2>
            <p className="song-meta-content">{song.mood.name}</p>

            <h2 className="song-meta-title">Topic</h2>
            <p className="song-meta-content">{song.topic.name}</p>

            <h2 className="song-meta-title">Key</h2>
            <p className="song-meta-content">{song.inkey.name}</p>
          </div>
          {/*
          <div className="rarity">
            <div style={{ width: "200px", height: "200px" }}>
              <div className="rarity-score">{rarity}</div>
              <div className="rarity-title">Rarity Score</div>
            </div>
          </div>
          */}
          <div className="Card">
            <div className="Card__Header">
              <div className="Card__Header--Title">
                <h2><a href={'/song/' + song.number}>{song.title}</a></h2>
                <p>
                  {`Song ${song.number} | ${moment(song.date).format(
                    "MMMM Do, YYYY"
                  )}`}
                </p>
              </div>
              <div className="Card__Header--Date">
                <p className="Large">{`${moment(song.date).format("DD")}`}</p>
                <p className="Small">{`${moment(song.date).format(
                  "MMM 'YY"
                )}`}</p>
              </div>
            </div>
            <div className="Card__Video">
              <Embed
                id={song.videoid}
                placeholder={`https://img.youtube.com/vi/${
                  song.videoid
                }/mqdefault.jpg`}
                source="youtube"
              />
            </div>
            <div className="Card__Meta">
              <p>{song.description}</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    return (
      <div>
        <Header />
        {this.state.done && this.renderSong()}
        {!this.state.done && <div>Loading</div>}
      </div>
    );
    // const { match } = this.props;
    // return (
    //   <div>
    //   {match.params.id}
    //   </div>
    // )
  }
}

export default Song;
