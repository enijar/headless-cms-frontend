import React, { Component } from "react";
import { Link } from "react-router-dom";
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
export default class ForgotLoginScreen extends Component {
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
      <Screen name="ForgotLogin">
        {this.state.loading && <Loading>Sending account reset email...</Loading>}
        <Form
          data={this.state.data}
          onChange={this.#handleChange}
          onSubmit={this.#handleSubmit}
          validation={services.validation(rule => ({
            email: [rule.required, rule.email],
          }))}
        >
          <Errors errors={this.state.serverErrors}/>
          <Form.Group>
            <Form.Label htmlFor="email">Email</Form.Label>
            <Form.Input name="email" autoComplete="email"/>
          </Form.Group>
          <Form.Group>
            <Link to="/login">Back to login</Link>
          </Form.Group>
          <Button>Send Account Reset Email</Button>
        </Form>
      </Screen>
    );
  }
}
