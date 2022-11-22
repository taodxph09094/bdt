import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";

import { positions, transitions, Provider as AlertProvider } from "react-alert";
import AlertTemplate from "react-alert-template-basic";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/font-awesome.min.css";
import "./assets/css/elegant-icons.css";
import "./assets/css/jquery-ui.min.css";
import "./assets/css/nice-select.css";
import "./assets/css/owl.carousel.min.css";
import "./assets/css/slicknav.min.css";
import "./assets/css/style.css";
import "./assets/css/bootstrap.min.css";
const options = {
  timeout: 5000,
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
