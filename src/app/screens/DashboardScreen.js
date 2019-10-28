import React, { Component } from "react";
import Screen from "../components/Screen";
import { AppContext } from "../context/AppContext";
import Content from "../components/Content";

@AppContext
export default class DashboardScreen extends Component {
  render () {
    return (
      <Screen name="Dashboard">
        <Content.Section>
          <h1>Dashboard</h1>
        </Content.Section>
      </Screen>
    );
  }
}
