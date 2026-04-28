import React, { useState } from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import LanguageSelection from "./LanguageSelection";

import { AppBar, Grid } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WebsiteHeader from "./WebsiteHeader";
import CatalogueHeader from "./CatalogueHeader";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faMastodon } from "@fortawesome/free-brands-svg-icons";

export default function Header() {
  const theme = useTheme();
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const [menuExpanded, setMenuExpanded] = useState(false);

  return (
    <AppBar
      position="static"
      sx={{
        margin: 0,
        backgroundColor: theme.palette.background["main"],
        boxShadow: "0 4px 16px rgb(0 0 0 / 16%)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        position: "fixed",
        width: "100%",
        zIndex: 1000
      }}
    >
      <Grid
        container
        sx={{
          height: "47px",
          maxWidth: "1200px",
          width: "100%"
        }}
      >
        <Grid
          size={{ xs: 12 }}
          sx={{
            display: "flex",
            flexDirection: "row",
            justify: mediaIsMobile ? "space-between" : "flex-end",
            placeContent: mediaIsMobile ? "space-between" : "flex-end",
          }}
          className="topbar"
        >
          {mediaIsMobile && (
            <div
              style={{
                height: "46px",
                display: "flex",
                marginTop: "7px"
              }}
            >
              <LanguageSelection />
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
                title="MapComponents auf Mastodon"
              >
                <FontAwesomeIcon icon={faMastodon} />
              </a>
            </li>
          </ul>
        </Grid>
      </Grid>
      <hr
        style={{
          margin: "0",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #dcdcdc"
        }}
      />
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
          width: "100%"
        }}
      >
        <Grid
          size={{
            md: 3,
            xs: 8
          }}

          style={{ display: "flex", alignItems: "center" }}
        >
          <a
            href="https://mapcomponents.org/"
            style={{
              lineHeight: 0
            }}
          >
            <img
              src="/logo.svg"
              width="480"
              height="82"
              className="logo"
              alt="logo"
              style={{ height: "40px", width: "auto" }}
            />
          </a>
        </Grid>
        <Grid
          size={{md: 9, xs:12}}

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
      <hr
        style={{
          margin: "0",
          width: "100%",
          border: "none",
          borderBottom: "1px solid #dcdcdc"
        }}
      />
      <Grid container sx={{ maxWidth: "1200px", justifyContent: "center", width: "100%" }}>
        <CatalogueHeader />
        {/*<HeaderMenuRight />*/}
        {!mediaIsMobile && <LanguageSelection/>}
      </Grid>
    </AppBar>
  );
}