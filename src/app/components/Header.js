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
        <div className="Header__user">
          Header {this.props.app.user.email}
        </div>
        <Button className="Header__logout" size="small" mode="danger" onClick={this.#logout}>
          Logout
        </Button>
      </div>
    );
  }
}
