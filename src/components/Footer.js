import React from "react";

import { Link } from "react-router-dom";

import theme from "../theme.js";

import { useTheme } from '@mui/styles';

import { Container, Grid } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Paper from "@mui/material/Paper";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from '@mui/icons-material/GitHub';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Divider } from '@mui/material';

import useMediaQuery from "@mui/material/useMediaQuery";

import { ReactComponent as Wglogo } from "../assets/wheregroup-logo-white.svg";

import { useTranslation, Trans } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  footer: {
    //backgroundColor: theme.palette.secondary.lighterDarkBackground,
    maxWidth: "100%",
  },
  link: {
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
      elevation={5}
      sx={{
        marginTop: "100px",
        backgroundColor: theme.palette.background.main,
      }}
    >
      <div
        style={{
          height: "10px",
          marginBottom: "20px",
          backgroundColor: theme.palette.primary.main,
        }}
      ></div>

      <Container className={classes.footer}>
        <div
          style={{
            display: "flex",
            justifyContent: mediaIsMobile ? "center" : "flex-start",
          }}
        >
          <a
            href="https://github.com/mapcomponents"
            style={{
              marginLeft: mediaIsMobile ? "0px" : "64px",
            }}
            target="_blank"
          >
            <GitHubIcon
              fontSize="medium"
              style={{
                color: theme.palette.primary.light,
              }}
            ></GitHubIcon>
          </a>

          <a
            href="https://twitter.com/mapcomponents"
            style={{
              marginLeft: "10px",
            }}
            target="_blank"
          >
            <TwitterIcon
              fontSize="medium"
              style={{
                color: theme.palette.primary.light,
              }}
            ></TwitterIcon>
          </a>
        </div>

        <Grid
          container
          style={{
            marginTop: "50px",
          }}
        >
          <Grid
            item
            md={6}
            xs={12}
            style={{
              display: "flex",
              marginTop: "10px",
              justifyContent: mediaIsMobile ? "center" : "flex-start",
            }}
          >
            <Wglogo
              className={classes.logo}
              style={{
                marginLeft: mediaIsMobile ? "0px" : "64px",
                marginTop: mediaIsMobile ? "40px" : "0",
                height: "85px",
              }}
            />
          </Grid>
          {/*
          <Grid
            item
            md={4}
       
            style={{
              ...(mediaIsMobile ? { paddingTop: "10px" } : {}),
            }}
          >
            {/*
            <List component="nav" aria-label="Kontakt">
              <ListItem className={classes.link}>
                <ListItemIcon>
                  <PhoneIcon className={classes.link} />
                </ListItemIcon>
                <ListItemText primary="+49 (0) 228 / 90 90 38 - 0" />
              </ListItem>
              <ListItem className={classes.link}>
                <ListItemIcon>
                  <EmailIcon className={classes.link} />
                </ListItemIcon>
                <ListItemText
                  style={{ wordBreak: "break-word" }}
                  primary="info@wheregroup.com"
                />
              </ListItem>
            </List>
          </Grid>
                      */}
          <Grid
            item
            md={6}
            xs={12}
            style={{
              ...(mediaIsMobile ? { paddingTop: "10px" } : {}),
            }}
          >
            <List
              component="nav"
              style={{
                display: "flex",
                justifyContent: mediaIsMobile ? "center" : "flex-end",
                marginRight: mediaIsMobile ? "0px" : "64px",
                marginBottom: "20px",
                flexDirection: "row",
                ...(mediaIsMobile ? {} : { marginTop: "20px" }),
              }}
            >
              <ListItem
                style={{
                  width: "initial",
                }}
              >
                <a
                  href={
                    i18n.resolvedLanguage !== "en"
                      ? "https://wheregroup.com/impressum/"
                      : "https://wheregroup.com/en/legalnotice/"
                  }
                  className={classes.link}
                >
                  {t("imprint")}
                </a>
              </ListItem>
              <ListItem
                style={{
                  width: "initial",
                }}
              >
                <a
                  href={
                    i18n.resolvedLanguage !== "en"
                      ? "https://wheregroup.com/datenschutz/"
                      : "https://wheregroup.com/en/privacypolicy/"
                  }
                  className={classes.link}
                >
                  {t("dataProtection")}
                </a>
              </ListItem>
              {/**
            <ListItem>
              <Link to="/" className={classes.link}>
                Cookie settings
              </Link>
            </ListItem>
             */}
            </List>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
}

export default Footer;
