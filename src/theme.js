import { createTheme } from "@mui/material/styles";


/*
const mode = "light"
const theme =createTheme ({

  typography: {
    fontFamily: "Ubuntu, sans-serif",
  },
  ...mode("light" | "dark"),
  palette: {
    common: { black: "#282828", white: "#fff" },
    background: { main: mode === "light" ? "#fff" : "#121212" },
    primary: { main: "#009fe3", light: "#02d7f2" },
    secondary: {
      main: "#dcdcdc",
      light: "#dfe803",
      greyText: mode === "light" ? "#282828" : "#ffffff",
    },
    grey: { main: "#cdcdcd" },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fafafa",
    },
    text: {
      primary:
        mode === "light" ? "rgba(0, 0, 0, 0.87)" : "rgba(255, 255, 255, 0.87)",
      secondary:
        mode === "light" ? "rgba(0, 0, 0, 0.54)" : "rgba(255, 255, 255, 0.54)",
      disabled:
        mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.38)",
      hint:
        mode === "light" ? "rgba(0, 0, 0, 0.38)" : "rgba(255, 255, 255, 0.38)",
    },
    action: { disabledBackground: "#5a4b4b", disabled: "#fafafa" },
  },
});

export default theme;

*/
const theme = createTheme ({
  typography: {
    fontFamily: "Ubuntu, sans-serif",
  },
  palette: {
    mode: "light",
    common: { black: "#282828", white: "#fff" },
    background: {
      main: "#fff",
    },
    primary: {
      main: "#009fe3", //"#e4e8eb",
      light: "#02d7f2", //"#05B2FB"
      //contrastText: "rgba(16, 16, 16, 1)",
    },
    secondary: {
      main: "#dcdcdc",
      light: "#dfe803",
      //dark: "#006691",
      //lighterDarkBackground: "#323645",
      //greyText: "#b1b1b8",
      greyText: "#282828",
      //contrastText: "#fafafa",
    },
    grey: {
      main: "#cdcdcd", //"#757678"
    },
    error: {
      light: "#e57373",
      main: "#f44336",
      dark: "#d32f2f",
      contrastText: "#fafafa",
    },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
    action: {
      disabledBackground: "#5a4b4b",
      disabled: "#fafafa",
    },
  },
});

export default theme;

