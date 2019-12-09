import React, { Component } from "react";
import history from "./history";

export default class App extends Component {
  constructor() {
    super();
    //history.replace('/login');
  }

  render() {
    return (
      <div className="container-fluid">
        <p>please redirect to /login</p>
      </div>
    );
  }
}
