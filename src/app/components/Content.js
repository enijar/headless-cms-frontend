import React, { Component } from "react";

export default class Content extends Component {
  static Main = props => (
    <div className="Content__main">
      {props.children}
    </div>
  );

  static Section = props => (
    <div className="Content__section">
      {props.children}
    </div>
  );

  render () {
    return (
      <div className="Content">
        {this.props.children}
      </div>
    );
  }
}
