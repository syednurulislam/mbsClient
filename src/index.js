import React from "react";
import ReactDOM from "react-dom";

import "antd/dist/antd.css";
import "./assets/scss/style.scss";

import App from "./App";
import * as serviceWorker from "./serviceWorker";

import GlobalContextProvider from "./context/GlobalContextProvider";

ReactDOM.render(
  <GlobalContextProvider>
    <App />
  </GlobalContextProvider>,
  document.getElementById("root")
);
serviceWorker.unregister();
