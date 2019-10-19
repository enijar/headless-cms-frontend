import React, { Component } from "react";
import { createPortal } from "react-dom";

export default class Loading extends Component {
  #node = document.querySelector('#root-loading');

  render () {
    return createPortal((
      <div className="Loading">
        {this.props.children}
      </div>
    ), this.#node);
  }
}
