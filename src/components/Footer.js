import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Container } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";

import theme from "../theme.js";

const useStyles = makeStyles((theme) => ({
  footer: {
    maxWidth: "100%",
    padding: "40px 0",
  },
  link: {
    color: theme.palette.secondary.greyText,
    textDecoration: "none",
  },
  logo: {
    width: "230px",
  },
}));

function Footer() {
  const classes = useStyles(theme);
  // eslint-disable-next-line
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
        <div className="container">
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
            className="disclaimer"
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