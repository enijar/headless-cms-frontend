import React, { Component } from "react";
import PropTypes from "prop-types";

export default class Button extends Component {
  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['button', 'submit']),
  };

  static defaultProps = {
    className: '',
  };

  render () {
    return (
      <button {...this.props} className={`Button ${this.props.className}`} type={this.props.type}>
        {this.props.children}
      </button>
    );
  }
}
