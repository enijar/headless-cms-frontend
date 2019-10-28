import React, { Component, createContext } from "react";

const Context = createContext({});

export const AppContext = Component => props => (
  <Context.Consumer>
    {/* @var {Object} app */}
    {app => <Component {...props} app={app}/>}
  </Context.Consumer>
);

export default class AppContextProvider extends Component {
  state = {
    user: null,
  };

  #setUser = user => this.setState({user});

  #getContext = () => ({
    ...this.state,
    setUser: this.#setUser,
  });

  render () {
    return (
      <Context.Provider value={this.#getContext()}>
        {this.props.children}
      </Context.Provider>
    );
  }
}
