import React, { Component } from "react";
import { Embed } from "semantic-ui-react";
import Header from "../components/Header";
import { get } from "../helpers/requests";
import '../styles/Home.scss'

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      song: null
    };
  }

  componentDidMount() {
    get(`api/song/1`).then(response => {
      console.log(response.data);

      this.setState({ song: response.data });
    });
  }

  componentWillUnmount() {}

  render() {
    const { song } = this.state;

    return (
      <div>
        <Header />
        <div className="Hero">
          <div className="Left">
          {song ? 
            <img src={song.imagePath} /> : 
          null}
          </div>
          <div className="Right">
            {song ? 
            <div className="Card">
              <div className="Card__Header">
                <div className="Card__Header--Title">
                  <h2>{song.title}</h2>
                  <p>{song.number} | {song.date}</p>
                </div>
                <div className="Card__Header--Date">
                  <p>{song.date}</p>
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
            : null}
          </div>
        </div>
        
      </div>
    );
  }
}

export default Home;
