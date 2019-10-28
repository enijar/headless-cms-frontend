import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { LOCAL_STORAGE_KEY_PREFIX } from "../core/consts";
import Button from "./Button";

@AppContext
@withRouter
export default class Header extends Component {
  #logout = () => {
    localStorage.removeItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`);
    this.props.history.push('/login');
  };

  render () {
    return (
      <div className="Header">
        <h2>
          Welcome, {this.props.app.user.name}
        </h2>
        <Button size="small" mode="danger" onClick={this.#logout}>
          Logout
        </Button>
      </div>
    );
  }
}
