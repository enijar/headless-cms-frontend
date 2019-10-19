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
    validation: PropTypes.func,
  };

  static defaultProps = {
    data: {},
  };

  static Group = Group;
  static Label = Label;
  static Input = Input;

  state = {
    errors: [],
    focusedElement: null,
  };

  #handleChange = data => {
    this.props.onChange && this.props.onChange(data);
  };

  #handleSubmit = async event => {
    event.preventDefault();
    if (this.props.validation) {
      const errors = this.props.validation(this.props.data);
      await this.setState({errors});
      if (errors.length > 0) return;
    }

    if (this.state.focusedElement !== null) {
      this.state.focusedElement.blur();
      await this.setState({focusedElement: null});
    }

    this.props.onSubmit && this.props.onSubmit(this.state.errors);
  };

  #handleElementFocus = focusedElement => this.setState({focusedElement});

  render () {
    return (
      <FormContextProvider
        onChange={this.#handleChange}
        onElementFocus={this.#handleElementFocus}
        data={this.props.data}
        errors={this.state.errors}
      >
        <form className="Form" onSubmit={this.#handleSubmit}>
          {this.props.children}
        </form>
      </FormContextProvider>
    );
  }
}
