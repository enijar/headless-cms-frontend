import React, { Component, lazy, Suspense } from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import AppContextProvider from "../context/AppContext";
import Loading from "./Loading";

const DashboardScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "DashboardScreen" */ '../screens/DashboardScreen'));
const LoginScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "LoginScreen" */ '../screens/LoginScreen'));
const ForgotLoginScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "ForgotLoginScreen" */ '../screens/ForgotLoginScreen'));
const NotFoundScreen = lazy(() => import(/* webpackPrefetch: true, webpackChunkName: "NotFoundScreen" */ '../screens/NotFoundScreen'));

const Screen = ScreenComponent => props => <ScreenComponent {...props}/>;

export default class App extends Component {
  render () {
    return (
      <Router>
        <AppContextProvider>
          <Suspense fallback={<Loading>Loading...</Loading>}>
            <Switch>
              <Route exact path="/" render={Screen(DashboardScreen)}/>
              <Route exact path="/login" render={Screen(LoginScreen)}/>
              <Route exact path="/forgot-login" render={Screen(ForgotLoginScreen)}/>
              <Route render={Screen(NotFoundScreen)}/>
            </Switch>
          </Suspense>
        </AppContextProvider>
      </Router>
    );
  }
}
