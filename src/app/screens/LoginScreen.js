import React, { Component } from "react";
import { AppContext } from "../context/AppContext";
import Screen from "../components/Screen";
import Form from "../components/Form";
import Button from "../components/Button";
import services from "../services";
import Loading from "../components/Loading";

@AppContext
export default class LoginScreen extends Component {
  state = {
    loading: false,
    data: {
      email: '',
      password: '',
    },
  };

  #handleChange = data => this.setState({data});

  #handleSubmit = async () => {
    if (this.state.loading) {
      return;
    }

    await this.setState({loading: true});
    const res = await services.api.post('/api/auth/login', this.state.data);
    console.log('res', res);
    setTimeout(() => {
      this.setState({loading: false});
    }, 2000);
  };

  render () {
    return (
      <Screen name="Login">
        {this.state.loading && <Loading>Authenticating...</Loading>}
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
