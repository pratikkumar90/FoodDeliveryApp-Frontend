import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Header from "../common/header/Header";

class Controller extends Component {
  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Route exact path="/" render={props => <Header {...props} />} />
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
