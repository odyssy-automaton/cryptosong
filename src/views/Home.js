import React, { Component, Fragment } from "react";
import { Embed } from "semantic-ui-react";
import moment from "moment";

import { get } from "../helpers/requests";
import Header from "../components/Header";
import Playlist from "../components/Playlist";

import '../styles/Global.scss';
import '../styles/Home.scss';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    get(`api/song/1`).then(response => {
      this.setState({ song: response.data });
    });
  }

  componentWillUnmount() {}

  render() {
    const { song } = this.state;

    return (
      <div>
        <Header />
        {song ? (
          // style={ { backgroundImage: `url(require(` + {song.imagePathBg} + `))` } }
          <Fragment>
            <div
              className="Hero"
              style={{ backgroundImage: `url(` + song.imagePathBg + `)` }}
            >
              <div className="Left">
                <img src={song.imagePathJon} alt={song.title} />
              </div>
              <div className="Right">
                <div className="Card">
                  <div className="Card__Header">
                    <div className="Card__Header--Title">
                      <h2>{song.title}</h2>
                      <p>
                        {`Song ${song.number} | ${moment(song.date).format(
                          "MMMM Do, YYYY"
                        )}`}
                      </p>
                    </div>
                    <div className="Card__Header--Date">
                      <p className="Large">{`${moment(song.date).format(
                        "DD"
                      )}`}</p>
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
                    <p>{song.tagNames}</p>
                  </div>
                </div>
              </div>
            </div>
            <Playlist currentSong={song} />
          </Fragment>
        ) : null}
      </div>
    );
  }
}

export default Home;
