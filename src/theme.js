import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  typography: {
    fontFamily: 'Bai Jamjuree, sans-serif',
   },
  palette: {
    mode: 'dark',
    common: { black: "rgba(16, 16, 16, 1)", white: "#fafafa" },
    background: { paper: "rgba(247, 247, 247, 1)", default: "#f3f3f3" },
    primary: {
      main: "#009ee0", //"#e4e8eb",
      light: "#02d7f2" //"#05B2FB"
      //contrastText: "rgba(16, 16, 16, 1)",
    },
    secondary: {
      main: "#cbd300",
      light: "#dfe803",
      //dark: "#006691",
      //lighterDarkBackground: "#323645",
      //greyText: "#b1b1b8",
      //contrastText: "#fafafa",
    },
    background: {
      main: "#1c1e21"
    },
    grey: {
      main: "#cdcdcd" //"#757678"
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
