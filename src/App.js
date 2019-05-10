import React, { Fragment } from "react";
import { BrowserRouter } from "react-router-dom";

import Routes from "./Routes";
import Layout from "./components/layout/Layout";

import "./App.css";

const App = () => {
  return (
    <Fragment>
      <Layout />
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </Fragment>
  );
};

export default App;
