import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import ScrollToTop from "./components/ScrollToTop";

import { BrowserRouter as Router } from "react-router-dom";

import DemoContextProvider from "./components/DemoContextProvider";
import { ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import theme from "./theme.js";

import { I18nextProvider } from "react-i18next";
import i18n from "./i18n/i18n";

import { createRoot } from 'react-dom/client';

const container = document.getElementById('root');
const root = createRoot(container); // createRoot(container!) if you use TypeScript
root.render(
  <React.StrictMode>
    <I18nextProvider i18n={i18n}>
      <Router basename={"/"}>
        <ScrollToTop />

        <StyledEngineProvider injectFirst>
          <ThemeProvider theme={theme}>
            <DemoContextProvider>
              <App />
            </DemoContextProvider>
          </ThemeProvider>
        </StyledEngineProvider>
      </Router>
    </I18nextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
