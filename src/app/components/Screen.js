import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import queryString from "query-string";
import Loading from "./Loading";
import services from "../services";
import { AUTH_ROUTES } from "../core/consts";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Content from "./Content";
import { AppContext } from "../context/AppContext";

@withRouter
@AppContext
export default class Screen extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
  };

  state = {
    authenticated: false,
    authenticating: true,
  };

  async componentDidMount () {
    const {pathname, search} = this.props.location;
    const user = await services.authenticate();

    this.props.app.setUser(user);

    // Redirect to login
    if (user === null && !AUTH_ROUTES.includes(pathname)) {
      return this.props.history.push(`/login?redirect=${encodeURI(pathname)}`);
    }

    // Redirect to requested route
    const {redirect} = queryString.parse(search);
    if (user !== null && redirect !== undefined && pathname !== redirect) {
      return this.props.history.push(redirect);
    }

    // Redirect to dashboard
    if (user !== null && AUTH_ROUTES.includes(pathname)) {
      return this.props.history.push('/');
    }

    this.setState({authenticating: false, authenticated: user !== null});
  }

  render () {
    if (this.state.authenticating) {
      return <Loading>Authenticating...</Loading>;
    }

    return (
      <div className={`
        Screen 
        Screen--${this.props.name} 
        ${this.state.authenticated ? 'Screen--authenticated' : ''}
      `}>
        <Content>
          {this.state.authenticated && <Sidebar/>}
          <Content.Main>
            {this.state.authenticated && <Header/>}
            {this.props.children}
          </Content.Main>
        </Content>
      </div>
    );
  }
}
