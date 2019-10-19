import React, { Component } from "react";
import PropTypes from "prop-types";
import FormContextProvider from "../../context/FormContext";
import Group from "./Group";
import Label from "./Label";
import Input from "./Input";

export default class Form extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
    onSubmit: PropTypes.func,
  };

  static defaultProps = {
    data: {},
  };

  static Group = Group;
  static Label = Label;
  static Input = Input;

  #handleChange = data => {
    this.props.onChange && this.props.onChange(data);
  };

  #handleSubmit = event => {
    event.preventDefault();
    console.log('submit');
    this.props.onSubmit && this.props.onSubmit();
  };

  render () {
    return (
      <FormContextProvider onChange={this.#handleChange} data={this.props.data}>
        <form className="Form" onSubmit={this.#handleSubmit}>
          {this.props.children}
        </form>
      </FormContextProvider>
    );
  }
}
