import React, {  useState } from "react";
import logo from "../logo.svg";
import useMediaQuery from "@mui/material/useMediaQuery";
import LanguageSelection from "./LanguageSelection";
import makeStyles from "@mui/styles/makeStyles";

import { Grid, AppBar } from "@mui/material";
import WebsiteHeader from "./WebsiteHeader";
import CatalogueHeader from "./CatalogueHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    fontWeight: "bold",
    "&:hover": {
      //backgroundColor: "#a51b3b",
    },
  },
  logo: {
    height: "40px",
    width: "auto",
  },
  header: {
    margin: 0,
    backgroundColor: theme.palette.background.main, //'#1c1e21' //"#f1f1f1",
    boxShadow: "0 4px 16px rgb(0 0 0 / 16%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    zIndex: 1000,
  },
  horizontalLine: {
    margin: "0",
    width: "100%",
    border: "none",
    borderBottom: "1px solid #dcdcdc",
  },
}));

export default function Header() {
  const classes = useStyles();
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <AppBar position="static" className={classes.header}>
      <Grid
        container
        sx={{
          height: "47px",
          maxWidth: "1200px",
        }}
      >
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: mediaIsMobile ? "space-between" : "flex-end",
          }}
          className="topbar"
        >
          {mediaIsMobile && (
            <div
              style={{
                height: "46px",
                display: "flex",
                marginTop: "7px",
              }}
            >
              <LanguageSelection></LanguageSelection>
            </div>
          )}
          <ul>
            <li>
              <a
                href="https://github.com/mapcomponents"
                title="MapComponents auf GitHub"
              >
                <FontAwesomeIcon icon={faGithub} />
              </a>
            </li>
            <li>
              <a
                href="https://fosstodon.org/@mapcomponents"
                title="MapComponents auf Mastodon - die Feinheiten mit Fediverse und Fosstodon"
              >
                <FontAwesomeIcon icon={faMastodon} />
              </a>
            </li>
          </ul>
        </Grid>
      </Grid>
      <hr className={classes.horizontalLine} />
      <Grid
        container
        sx={{
          maxWidth: "1200px",
          height: mediaIsMobile ? "64px" : "80px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignContent: "space-between",
          ...(mediaIsMobile ? { paddingLeft: "16px" } : {}),
        }}
      >
        <Grid
          item
          md={3}
          xs={8}
          style={{ display: "flex", alignItems: "center" }}
        >
          <a
            href="https://mapcomponents.org/"
            style={{
              lineHeight: 0,
            }}
          >
            <img
              src={logo}
              width="480"
              height="82"
              className="logo"
              alt="logo"
              style={{ height: "40px", width: "auto" }}
            />
          </a>
        </Grid>
        <Grid
          item
          md={9}
          xs={12}
          style={{ display: "flex", alignItems: "center" }}
        >
          <WebsiteHeader expanded={menuExpanded} />
        </Grid>
        {mediaIsMobile && (
          <button
            type="button"
            className={"navbar-toggle" + (menuExpanded ? " expanded" : "")}
            onClick={() => setMenuExpanded((val) => !val)}
          >
            <span className="sr-only">Toggle navigation</span>
            <span className="icon-bar"></span>
          </button>
        )}
      </Grid>
      <hr className={classes.horizontalLine} />
      <Grid container sx={{ maxWidth: "1200px", justifyContent: "center" }}>
        <CatalogueHeader />
        {/*<HeaderMenuRight />*/}
        {!mediaIsMobile && <LanguageSelection></LanguageSelection>}
      </Grid>
    </AppBar>
  );
}