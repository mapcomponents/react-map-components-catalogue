import {
  createMuiTheme,
} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    common: { black: "rgba(16, 16, 16, 1)", white: "#fafafa" },
    background: { paper: "rgba(247, 247, 247, 1)", default: "#f3f3f3" },
    primary: {
      light: "#7986cb",
      main: "#1c272d",
      dark: "#080808",
      contrastText: "#fafafa",
    },
    secondary: {
      light: "#b11e40",
      main: "#b11e40",
      dark: "rgba(162, 23, 30, 1)",
      lighterDarkBackground: "#323645",
      greyText: "#b1b1b8",
      contrastText: "#fafafa",
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
