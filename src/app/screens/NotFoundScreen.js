import React, { Component } from "react";
import { Link } from "react-router-dom";
import Screen from "../components/Screen";
import { AppContext } from "../context/AppContext";

@AppContext
export default class NotFoundScreen extends Component {
  render () {
    return (
      <Screen name="NotFound">
        <h1>Not Found</h1>
        <Link to="/">Return to the dashboard</Link>
      </Screen>
    );
  }
}
