import React, { Component, createRef } from "react";
import PropTypes from "prop-types";
import get from "lodash/get";
import { FormContext } from "../../context/FormContext";
import Error from "./Error";

@FormContext
export default class Input extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
  };

  static defaultProps = {
    type: 'text',
  };

  #node = createRef();

  #handleChange = event => {
    this.props.form.onChange(this.props.name, event.target.value);
  };

  #toggleFocus = focused => () => {
    if (!focused) {
      return this.props.form.onFocus(null);
    }

    if (this.#node.current) {
      this.props.form.onFocus(this.#node.current);
    }
  };

  render () {
    const error = get(this.props.form.errors.find(error => error.name === this.props.name), 'message');
    return (
      <div className={`Form__input Form__input--${this.props.type}`}>
        <input
          {...this.props}
          ref={this.#node}
          form={undefined}
          type={this.props.type}
          id={`form-${this.props.name}`}
          name={this.props.name}
          onChange={this.#handleChange}
          onFocus={this.#toggleFocus(true)}
          onBlur={this.#toggleFocus(false)}
        />
        {error && <Error>{error}</Error>}
      </div>
    );
  }
}
