import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../context/FormContext";

@FormContext
export default class Label extends Component {
  static propTypes = {
    htmlFor: PropTypes.string,
    className: PropTypes.string,
  };

  static defaultProps = {
    className: '',
  };

  render () {
    return (
      <label
        {...this.props}
        form={undefined}
        className={`Form__label ${this.props.className}`}
        htmlFor={`form-${this.props.htmlFor}`}
      >
        {this.props.children}
      </label>
    );
  }
}
