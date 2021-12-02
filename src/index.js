import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter as Router } from "react-router-dom";

import DemoContextProvider from "./components/DemoContextProvider";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme.js";

ReactDOM.render(
  <React.StrictMode>
    <Router basename={"/react-map-components-catalogue"}>
      <ScrollToTop />

      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
          <DemoContextProvider>
            <App />
          </DemoContextProvider>
        </ThemeProvider>
      </StyledEngineProvider>
    </Router>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
