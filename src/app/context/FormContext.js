import React, { Component, createContext } from "react";
import PropTypes from "prop-types";

const Context = createContext({});

export const FormContext = Component => props => (
  <Context.Consumer>
    {/* @var {Object} form */}
    {form => <Component {...props} form={form}/>}
  </Context.Consumer>
);

export default class FormContextProvider extends Component {
  static propTypes = {
    data: PropTypes.object,
    onChange: PropTypes.func,
  };

  #handleChange = (name, value) => {
    if (this.props.onChange) {
      const {data} = this.props;
      data[name] = value;
      this.props.onChange(data);
    }
  };

  #getContext = () => ({
    data: this.props.data,
    onChange: this.#handleChange,
  });

  render () {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
