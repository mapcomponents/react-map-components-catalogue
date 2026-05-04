import React from "react";
import { useTranslation } from "react-i18next";
import { Paper, Container } from "@mui/material";

import theme from "../theme.js";

function Footer() {
  // eslint-disable-next-line
  const { i18n } = useTranslation();

  return (
    <Paper
      elevation={0}
      sx={{
        backgroundColor: theme.palette.background["main"],
        fontSize: "0.75rem",
        color: "#282828",
        fontWeight: "500",
        maxWidth: "100%",
        padding: "40px 0",
      }}
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
                style={{
                  color: theme.palette.secondary["greyText"],
                  textDecoration: "none",
                }}
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
                style={{
                  color: theme.palette.secondary["greyText"],
                  textDecoration: "none",
                }}
              >
                Impressum
              </a>
            </li>
          </ul>
          <p
            className="disclaimer"
            style={{ margin: 0, textAlign: "center", fontWeight: 400 }}
          >
            ©&nbsp;2025&nbsp;WhereGroup GmbH. Alle Rechte vorbehalten.
          </p>
        </div>
      </Container>
    </Paper>
  );
}

export default Footer;