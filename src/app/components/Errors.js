import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Errors extends Component {
  static propTypes = {
    className: PropTypes.string,
    errors: PropTypes.array,
  };

  static defaultProps = {
    className: '',
    array: [],
  };

  render () {
    if (this.props.errors.length === 0) {
      return null;
    }

    return (
      <ul className={`Errors ${this.props.className}`}>
        {this.props.errors.map((error, index) => (
          <li className="Errors__error" key={`error-${index}`}>
            {error}
          </li>
        ))}
      </ul>
    );
  }
}
