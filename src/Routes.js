import React from "react";
import { Switch, Route } from "react-router-dom";

import Home from "./views/Home";
import Songs from "./views/Songs";
import Song from "./views/Song";
import FourOhFour from "./views/FourOhFour";
// import SongInputForm from "./components/editing/SongInputForm";
// import Collection from "./components/editing/Collection";
// import ImportSongData from "./components/editing/ImportSongData";
// import FourOhFour from "./views/404/404";

const Routes = () => (
  <Switch>
    <Route exact path="/" render={props => <Home {...props} />} />
    <Route
      path="/songs"
      render={props => <Songs filterBy={false} {...props} />}
    />
    <Route path="/song/:id" component={Song} />
    <Route
      path="/songs/tag/:tagname"
      render={props => <Songs {...props} filterBy="tags" />}
    />
    {/* 
  <Route path="/song/new" component={SongInputForm} />
  <Route
    path="/admin/song/:id/edit"
    render={props => <SongInputForm editing={true} {...props} />}
  />
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
  /> */}
    <Route component={FourOhFour} />
  </Switch>
);

export default Routes;
