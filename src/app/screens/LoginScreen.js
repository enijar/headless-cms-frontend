import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import Screen from "../components/Screen";
import Form from "../components/Form";
import Button from "../components/Button";
import services from "../services";

@AppContext
export default class LoginScreen extends Component {
  state = {
    data: {
      email: '',
      password: '',
    },
  };

  #handleChange = data => this.setState({data});

  #handleSubmit = () => {
    console.log('submit->data', this.state.data);
  };

  render () {
    return (
      <Screen name="Login">
        <Form
          data={this.state.data}
          onChange={this.#handleChange}
          onSubmit={this.#handleSubmit}
          validation={services.validation(rule => ({
            email: [rule.required, rule.email],
            password: [rule.required],
          }))}
        >
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input name="email" autoComplete="email"/>
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="password">Password</Form.Label>
            <Form.Input name="password" type="password" autoComplete="current-password"/>
          </Form.Group>
          <Button>Submit</Button>
        </Form>
      </Screen>
    );
  }
}
