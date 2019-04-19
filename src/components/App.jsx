import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SongInputForm from "./editing/SongInputForm.jsx";
import SearchBy from "./SearchBy.jsx";
import Song from "./Song.jsx";
import Collection from "./editing/Collection.jsx";
import ImportSongData from "./editing/ImportSongData.jsx";
import Home from "./views/Home.jsx";

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* lists of songs routes */}
        <Route exact path="/" render={props => <Home {...props} />} />
        <Route
          path="/songs/tag/:tagname"
          render={props => <SearchBy {...props} filterBy="tags" />}
        />
        <Route
          path="/songs"
          render={props => <SearchBy filterBy={false} {...props} />}
        />
        {/* song detail page route */}
        <Route path="/song/:id" component={Song} />
        {/* song editing */}
        <Route path="/song/new" component={SongInputForm} />
        <Route
          path="/admin/song/:id/edit"
          render={props => <SongInputForm editing={true} {...props} />}
        />
        {/* other edit routes */}
        <Route
          path="/admin/instruments"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/instruments"
              collectionName="Instrument"
            />
          )}
        />
        <Route
          path="/admin/topics"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/topics"
              collectionName="Topic"
            />
          )}
        />
        <Route
          path="/admin/locations"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/locations"
              collectionName="Location"
            />
          )}
        />
        <Route
          path="/admin/inkeys"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/inkeys"
              collectionName="Key"
            />
          )}
        />
        <Route
          path="/admin/beards"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/beards"
              collectionName="Beard"
            />
          )}
        />
        <Route
          path="/admin/tags"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/tags"
              collectionName="Tag"
            />
          )}
        />
        <Route
          path="/admin/import-song-data"
          render={props => <ImportSongData {...props} />}
        />
      </Switch>
    </BrowserRouter>
  );
};

module.exports = App;
