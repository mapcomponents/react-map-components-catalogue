import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter as Router } from "react-router-dom";

import DemoContextProvider from "./components/DemoContextProvider";

ReactDOM.render(
  <React.StrictMode>
    <Router>
      <ScrollToTop />
      <DemoContextProvider>
        <App />
      </DemoContextProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
