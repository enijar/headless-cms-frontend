import React, { Component } from "react";
import PropTypes from "prop-types";
import { FormContext } from "../../context/FormContext";

@FormContext
export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  #handleChange = event => {
    this.props.form.onChange(this.props.name, event.target.value);
  };

  render () {
    return (
      <div className={`Form__input Form__input--${this.props.type}`}>
        <input
          {...this.props}
          form={undefined}
          type={this.props.type}
          id={`form-${this.props.name}`}
          name={this.props.name}
          onChange={this.#handleChange}
        />
      </div>
    );
  }
}
