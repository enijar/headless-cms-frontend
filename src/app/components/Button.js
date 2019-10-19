import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit']),
    mode: PropTypes.oneOf(['default', 'primary', 'danger']),
  };

  static defaultProps = {
    className: '',
    mode: 'default',
  };

  render () {
    return (
      <button
        {...this.props}
        className={`Button Button--${this.props.mode} ${this.props.className}`}
        type={this.props.type}
      >
        {this.props.children}
      </button>
    );
  }
}
