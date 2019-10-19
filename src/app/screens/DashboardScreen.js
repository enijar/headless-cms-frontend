import React, { Component } from "react";
import Screen from "../components/Screen";
import { AppContext } from "../context/AppContext";

@AppContext
export default class DashboardScreen extends Component {
  render () {
    return (
      <Screen name="Dashboard">
        <h1>Dashboard</h1>
      </Screen>
    );
  }
}
