import React, { Component } from "react";
import get from "lodash/get";
import { AppContext } from "../context/AppContext";
import Screen from "../components/Screen";
import Form from "../components/Form";
import Button from "../components/Button";
import services from "../services";
import Loading from "../components/Loading";
import { LOCAL_STORAGE_KEY_PREFIX } from "../core/consts";
import Errors from "../components/Errors";

@AppContext
export default class LoginScreen extends Component {
  state = {
    loading: false,
    serverErrors: [],
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

    await this.setState({loading: true, serverErrors: []});
    const res = await services.api.post('/api/auth/login', this.state.data);

    if (res.status === 401) {
      return this.setState({loading: false, serverErrors: res.errors});
    }

    localStorage.setItem(`${LOCAL_STORAGE_KEY_PREFIX}.jwt`, JSON.stringify({
      token: get(res.data, 'token', null),
      expires: get(res.data, 'expires', null),
    }));
    this.props.history.push('/');
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
          <Errors errors={this.state.serverErrors}/>
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
