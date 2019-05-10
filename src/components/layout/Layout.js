import React, { Component } from "react";
import { Helmet } from "react-helmet";

class Layout extends Component {
  render() {
    return (
      <Helmet
        meta={[
          { "http-equiv": "X-UA-Compatible", content: "IE=edge,chrome=1" },
          {
            name: "description",
            content: "A Song a Day"
          },
          { name: "keywords", content: "Songs" },
          { property: "og:app_id", content: "" },
          { property: "og:url", content: "" },
          { property: "og:type", content: "website" },
          {
            property: "og:title",
            content: "Song a Day World"
          },
          {
            property: "og:description",
            content: "Song a Day World"
          },
          {
            property: "og:image",
            content:
              "https://sadw-staging.odyssy.io/img/SongADayWorld__Logo--Standard.png"
          },
          { name: "twitter:card", content: "summary" },
          { name: "twitter:site", content: "" },
          {
            name: "twitter:title",
            content: "Song a Day World"
          },
          {
            name: "twitter:description",
            content: "Song a Day World"
          },
          {
            name: "twitter:image",
            content:
              "https://sadw-staging.odyssy.io/img/SongADayWorld__Logo--Standard.png"
          },
          {
            name: "google-site-verification",
            content: ""
          }
        ]}
      />
    );
  }
}

export default Layout;
