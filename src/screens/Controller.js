import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import Home from "./home/Home";

class Controller extends Component {
  constructor() {
    super();
    this.baseUrl = "http://localhost:8080/api/";
  }

  render() {
    return (
      <BrowserRouter>
        <div className="main-container">
          <Route
            exact
            path="/"
            render={props => <Home {...props} baseUrl={this.baseUrl} />}
          />
        </div>
      </BrowserRouter>
    );
  }
}

export default Controller;
