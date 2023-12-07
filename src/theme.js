import { createTheme } from "@mui/material/styles";
import detectTheme from "./components/ThemeDetector";

const lightDefault = createTheme({
  palette: {
    mode: "light",
  },
});
const darkDefault = createTheme({
  palette: {
    mode: "dark",
  },
});

const getDesignTokens = (mode) => ({
  ...(mode === "light" ? lightDefault : darkDefault),
  palette: {
    mode,
    ...(mode === "light"
      ? {
          typography: {
            fontFamily: "Ubuntu, sans-serif",
          },

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
        }
      : {
          typography: {
            fontFamily: "Ubuntu, sans-serif",
          },

          common: { black: "#fff", white: "#fff" },
          background: {
            main: "#1c1e21",
          },
          primary: {
            main: "#009fe3", //"#e4e8eb",
            light: "#02d7f2", //"#05B2FB"
            //contrastText: "rgba(16, 16, 16, 1)",
          },
          secondary: {
            main: "#dcdcdc",
            //light: "#dfe803",
            dark: "#006691",
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
            primary: "rgba(255, 255, 255, 0.87)",
            secondary: "rgba(255, 255, 255, 0.54)",
            disabled: "rgba(255, 255, 255, 0.38)",
            hint: "rgba(255, 255, 255, 0.38)",
          },
          action: {
            disabledBackground: "#5a4b4b",
            disabled: "#fafafa",
          },
        }),
  },
});

const theme = (mode) => {
  mode = detectTheme()
  const theme = getDesignTokens(mode);
  return createTheme(theme);
};

export default theme();



//  const mediaInDarkMode = useMediaQuery('(prefers-color-scheme: dark)')

