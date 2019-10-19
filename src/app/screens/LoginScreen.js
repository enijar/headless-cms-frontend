import React, { Component } from "react";
import Screen from "../components/Screen";
import { AppContext } from "../context/AppContext";

@AppContext
export default class LoginScreen extends Component {
  render () {
    return (
      <Screen name="Login">
        <h1>Login</h1>
      </Screen>
    );
  }
}
