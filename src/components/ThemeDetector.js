function detectTheme() {
  if (window.matchMedia) {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      console.log("dark theme");
      return "dark";
    } else {
      console.log("light theme");
      return "light";
    }
  } else {
    console.log("Unable to detect theme.");
    return null;
  }
}

export default detectTheme;
