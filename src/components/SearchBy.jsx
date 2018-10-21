import React, { Component } from "react";
import { Container, Icon, Dropdown } from "semantic-ui-react";
import Select from 'react-select';
import _ from 'lodash';
import axios from "axios";
import AlbumCanvas from "./AlbumCanvas.jsx";
import PageHeader from "./PageHeader.jsx";
import TagSelector from "./TagSelector.jsx";
import moment from "moment";
import * as JsSearch from 'js-search';

// import URI from 'urijs';

import "../styles/songs.scss";
import { runInThisContext } from "vm";

class SearchBy extends Component {


  constructor(props) {
    super(props);
    this.state = {
      songs: [],
      size: "md",
      imageSize: 100,
      tagSelector: false,
      selectedOptions: {},

      searchInputValue: "",
      currentSearch: ""
    };

    this.jsSearch = null; // populate after songs fetched

    this.filterSongs = this.filterSongs.bind(this);
    this.renderControls = this.renderControls.bind(this);
    this.renderDropdown = this.renderDropdown.bind(this);
  }

  componentDidMount() {
    axios.get("/api/songs").then(songs => {
      console.log(songs.data);
      this.setState(
        { songs: songs.data },
        () => {
          this.jsSearch = new JsSearch.Search('description');
          this.jsSearch.addIndex('title');
          this.jsSearch.addIndex('tags');
          this.jsSearch.addDocuments(songs.data);
        });
    });
  }

  /*
  getStateFromUrl() {

  }
  */

  renderControls(songs) {
    let locations = {}, keys = {}, instruments = {}, moods = {}, topics = {};
    songs.forEach(song => {
      let location = song.location && song.location.name;
      let key = song.inkey && song.inkey.name;
      let mood = song.mood && song.mood.name;
      let topic = song.topic && song.topic.name

      if (location) {
        locations[location] = (locations[location] || 0) + 1;
      }
      if (!_.isEmpty(song.instruments)) {
        song.instruments.forEach(i => {
          instruments[i.name] = (instruments[i.name] || 0) + 1;
        });
      }
      if (key) {
        keys[key] = (keys[key] || 0) + 1;
      }
      if (mood) {
        moods[mood] = (moods[mood] || 0) + 1;
      }
      if (topic) {
        topics[topic] = (topics[topic] || 0) + 1;
      }
    });

    let locationDropdown = this.renderDropdown(
      _.sortBy(Object.keys(locations), l => locations[l] * -1), 
      "Location",
      "rgb(236, 55, 36)");

    let keysList = _.sortBy(Object.keys(keys));
    let newFirstIndex = keysList.indexOf("C");
    if (newFirstIndex > 0) {
      let first = keysList.slice(0, newFirstIndex);
      let last = keysList.slice(newFirstIndex);
      keysList = last.concat(first);
    }
    let keysDropdown = this.renderDropdown(
      keysList, 
      "Key", 
      "rgb(67, 115, 217)");
    let topicsDropdown = this.renderDropdown(
      _.sortBy(Object.keys(topics), t => topics[t] * -1), 
      "Topic",
      "rgb(84, 137, 78)")
    let otherDropdown = this.renderDropdown(
      _.sortBy(Object.keys(moods), m => moods[m] * -1), 
      "Mood",
      "rgb(222, 134,72)")
  
    let onSearchKeyPress = (e) => {
      if (e.key === 'Enter') {
        this.setState({currentSearch: this.state.searchInputValue});
      }
    };

    let onSearchChange = (e) => {
      this.setState({searchInputValue: e.target.value});
    }

    return (
      <React.Fragment>
        <div className="global-navigation-search">
          <div style={{display: "flex"}}>
            <input
              style={{backgroundColor: "#fff", color: "rgba(0, 0, 0, 0.87)", flexShrink: 0}}
              className="global-search-input icon-search"
              type="search"
              placeholder={`Search through ${songs.length} songs`}
              value={this.state.searchInputValue}
              onKeyPress={onSearchKeyPress}
              onChange={onSearchChange}
            />
            {locationDropdown}
            {keysDropdown}
            {topicsDropdown}
            {otherDropdown}
          </div>
        </div>
      </React.Fragment>
    );
  }

  renderDropdown(values, name, bg) {
    let options = values.map(v => ({
      value: v, label: v
    }));

    let customStyles = {
      container: (base) => ({...base, height: 30, minWidth: 130, marginLeft: 10, flexShrink: 0, transition: "width 150ms ease"}),
      control: (base) => ({...base, borderRadius: 25, backgroundColor: bg}),
      dropdownIndicator: (base, state) => {
        return state.hasValue ?
          { ...base, display: "none" } :
          base;
      },

      indicatorSeparator: (base, state) => {
        return { display: "none" };
      },
      placeholder: (base, state) => {
        return state.hasValue ?
          { ...base, whiteSpace: "nowrap", color: "rgba(255, 255, 255)" } :
          { ...base, whiteSpace: "nowrap", color: "rgba(255, 255, 255, 0.87)" };
      }
    }

    let onChange = (selected, action) => {
      this.setState({selectedOptions: {
        ...this.state.selectedOptions,
        [name]: selected
      }});
    }

    let text = name;
    let selected = this.state.selectedOptions[name];
    if (!_.isEmpty(selected)) {
      let lengthText = selected.length > 1 ? ` (+${selected.length-1})` : "";
      text = `${selected[0].label}${lengthText}`;
    }

    // TODO: make this fully controlled
    return (
      <Select 
        styles={customStyles}
        placeholder={text}
        isClearable
        isSearchable={false}
        isMulti 
        controlShouldRenderValue={false}
        closeMenuOnSelect={false}
        hideSelectedOptions={false}
        options={options} 
        onChange={onChange}
      />
    );
  } 

  filterSongs(songs) {
    let filteredSongs = songs;
    
    // search operates on the original corpus so this has to be first
    if (this.jsSearch && !_.isEmpty(this.state.currentSearch)) {
      filteredSongs = this.jsSearch.search(this.state.currentSearch);
    }

    _.forEach(this.state.selectedOptions, (selected, name) => {
      if (_.isEmpty(selected)) {
        return;
      }
      let validValues = selected.map(s => s.value);
      switch (name) {
        case "Location":
          filteredSongs = filteredSongs.filter(s => (
            s.location && 
            s.location.name &&
            validValues.indexOf(s.location.name) >= 0
          ));
          break;
        case "Key":
          filteredSongs = filteredSongs.filter(s => (
            s.inkey && 
            s.inkey.name &&
            validValues.indexOf(s.inkey.name) >= 0
          ));
          break;
        case "Topic":
          console.log(validValues);
          filteredSongs = filteredSongs.filter(s => (
            s.topic && 
            s.topic.name &&
            validValues.indexOf(s.topic.name) >= 0
          ));
          /*
          filteredSongs = filteredSongs.filter(s => {
            if (_.isEmpty(s.topic)) {
              return false;
            }
            let songInstruments = _.map(s.instruments, i => i.name);

            return _.intersection(
              songInstruments,
              validValues
            ).length > 0;
          });
          */
          break;
        case "Mood":
          filteredSongs = filteredSongs.filter(s => (
            s.mood && 
            s.mood.name &&
            validValues.indexOf(s.mood.name) >= 0
          ));
          break;
      }
    });

    if (this.props.filterBy === "tags") {
      let tagName = this.props.match.params.tagname;
      filteredSongs = filteredSongs.filter(song => song.tagNames.indexOf(tagName) >= 0);
    }
    return filteredSongs;
  }

  renderSizes() {
    let sizes = ["sm", "md", "lg"];
    let changeZoom = (size) => {
      let sizes = {sm: 50, md: 100, lg: 190};
      this.setState({ size, imageSize: sizes[size]});
    }
    let sizesDom = sizes.map(size => {
      let className = size === this.state.size ? "active" : "";
      return (
        <li key={size} className={className}>
          <a onClick={changeZoom.bind(this, size)}>{size}</a>
        </li>
      );
    });
    return sizesDom;
  }

  renderSongs(songs, sizeClass) {
    let songsByMonth = _.groupBy(songs, song => moment(song.date).format("MMMM"));
    return _.map(songsByMonth, (monthSongs, month) => {
      let songMarkup = monthSongs.map((song, key) => {
        return (
          <AlbumCanvas
            key={key}
            width={this.state.imageSize}
            height={this.state.imageSize}
            backgroundImage={"/" + song.imagePathSmall}
            song={song}
            songnumber={song.number}
            list={true}
          />
        );
      });
      return <div>
        <h2 style={{paddingLeft: 55}}>{month}</h2>
        <div style={{paddingTop: 10}} className={"song-list-container " + sizeClass}>
          {songMarkup}
        </div>
      </div>;
    });
  }

  render() {
    let songs = this.filterSongs(this.state.songs);
    let controlsMarkup = this.renderControls(this.state.songs);
    let sizeClass = "size-" + this.state.size;
    return (
      <Container
        style={{
          padding: "2px",
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
        }}>
        <PageHeader />
        <div className="filter-navigation">
          <div className="filter-navigation-inner" style={{paddingTop: 18}}>
            {controlsMarkup}
            <ul className="filter-size" style={{marginTop: 0}}>
              <li>Size</li>
              {this.renderSizes()}
            </ul>
          </div>
        </div>
        <div style={{paddingTop: 40, width: "100%"}}>
          <h4 style={{paddingLeft: 55, paddingBottom: 10}}>{songs.length} {songs.length === 1 ? "song" : "songs"}</h4>
          {this.renderSongs(songs, sizeClass)}
        </div>
      </Container>
    );
  }
}

module.exports = SearchBy;