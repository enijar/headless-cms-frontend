import "core-js/stable";
import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import "./index.scss";
import App from "./app/components/App";

render(<App/>, document.querySelector('#root-app'));
