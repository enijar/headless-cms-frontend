import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../context/FormContext";

@FormContext
export default class Error extends Component {
  static propTypes = {
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render () {
    return (
      <div
        {...this.props}
        form={undefined}
        className={`Form__error ${this.props.className}`}
      >
        {this.props.children}
      </div>
    );
  }
}
