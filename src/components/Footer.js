import React from "react";

import { Link } from "react-router-dom";

import theme from "../theme.js";

import { useTheme } from "@mui/styles";

import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import TwitterIcon from "@mui/icons-material/Twitter";
import { Divider } from "@mui/material";

import useMediaQuery from "@mui/material/useMediaQuery";

import { ReactComponent as Wglogo } from "../assets/wheregroup-logo-white.svg";

import { useTranslation, Trans } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  footer: {
    //backgroundColor: theme.palette.secondary.lighterDarkBackground,
    maxWidth: "100%",
    padding: "40px 0",
  },
  link: {
    color: theme.palette.secondary.greyText,
    textDecoration: "none",
    /**color: theme.palette.secondary.greyText,
    "&:hover": {
      color: theme.palette.secondary.contrastText + " !important",
    },
    "&:visited": {
      color: theme.palette.secondary.greyText,
    },*/
  },
  logo: {
    //fill: theme.palette.secondary.greyText,
    width: "230px",
    //opacity: 0.6,
  },
}));

function Footer() {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const classes = useStyles(theme);
  const { t, i18n } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background.main,
        fontSize: "0.75rem",
        color: "#282828",
        fontWeight: "500",
      }}
      className={classes.footer}
    >
      <Container>
        <div class="container">
          <ul
            style={{
              margin: "0 0 1rem",
              padding: "0",
              listStyle: "none",
              display: "flex",
              justifyContent: "center",
              gap: "24px",
            }}
          >
            <li>
              <a
                href={
                  i18n.resolvedLanguage !== "en"
                    ? "https://wheregroup.com/datenschutz/"
                    : "https://wheregroup.com/en/privacypolicy/"
                }
                title="Datenschutz"
                className={classes.link}
              >
                Datenschutz
              </a>
            </li>
            <li>
              <a
                href={
                  i18n.resolvedLanguage !== "en"
                    ? "https://wheregroup.com/impressum/"
                    : "https://wheregroup.com/en/legalnotice/"
                }
                title="Impressum"
                className={classes.link}
              >
                Impressum
              </a>
            </li>
          </ul>
          <p
            class="disclaimer"
            style={{ margin: 0, textAlign: "center", fontWeight: 400 }}
          >
            ©&nbsp;2022&nbsp;WhereGroup GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </Paper>
  );
}

export default Footer;
