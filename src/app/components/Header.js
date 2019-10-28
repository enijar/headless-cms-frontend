import React, { Component } from "react";
import { AppContext } from "../context/AppContext";

@AppContext
export default class Header extends Component {
  render () {
    return (
      <div className="Header">
        Header {this.props.app.user.email}
      </div>
    );
  }
}
