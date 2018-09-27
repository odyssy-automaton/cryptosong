import React, { Component } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import SongInputForm from "./editing/SongInputForm.jsx";
import SearchBy from "./SearchBy.jsx";
import Song from "./Song.jsx";
import Collection from "./editing/Collection.jsx";
import ImportSongData from './editing/ImportSongData.jsx';

const App = () => {
  return (
    <BrowserRouter>
      <Switch>
        {/* lists of songs routes */}
        <Route 
          exact
          path="/" 
          render={props => (
            <SearchBy
              filterBy={false}
              {...props}
            />
          )
        } 
        />
        <Route 
          path="/songs" 
          render={props => (
            <SearchBy
              filterBy={false}
              {...props}
            />
          )
        } 
        />
        <Route 
          path="/songs/tag/:tagname" 
          render={props => (
            <SearchBy 
              {...props} 
              filterBy={"tags"} 
            />
          )} 
        />
        {/* song detail page route */}
        <Route path="/song/:id" component={Song} />  
        {/* song editing */}
        <Route path="/song/new" component={SongInputForm} />
        <Route 
          path="/song/:id/edit" 
          render={props => <SongInputForm editing={true} {...props} />} 
        />
        {/* other edit routes */}
        <Route
          path="/instruments"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/instruments"
              collectionName="Instrument"
            />
          )}
        />
        <Route
          path="/topics"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/topics"
              collectionName="Topic"
            />
          )}
        />
        <Route
          path="/locations"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/locations"
              collectionName="Location"
            />
          )}
        />
        <Route
          path="/inkeys"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/inkeys"
              collectionName="Key"
            />
          )}
        />
        <Route
          path="/beards"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/beards"
              collectionName="Beard"
            />
          )}
        />
        <Route
          path="/tags"
          render={props => (
            <Collection
              {...props}
              apiCollectionPath="/api/tags"
              collectionName="Tag"
            />
          )}
        />
        <Route
          path="/import-song-data"
          render={props => (
            <ImportSongData
              {...props}
            />
          )}
        />
      </Switch>
    </BrowserRouter>
  );
};

module.exports = App;
