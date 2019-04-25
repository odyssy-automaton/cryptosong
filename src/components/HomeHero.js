import React from "react";
import moment from "moment";
import { Embed } from "semantic-ui-react";

import "../styles/Home.scss";

const HomeHero = ({ song, tagList }) => {
  return (
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
            {tagList}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeHero;
