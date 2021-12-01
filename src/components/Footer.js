import React from "react";

import { Link } from "react-router-dom";

import theme from "../theme.js";

import { Container, Grid, makeStyles } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import PhoneIcon from "@material-ui/icons/Phone";
import EmailIcon from "@material-ui/icons/Email";

import { ReactComponent as Wglogo } from "../wglogo.svg";

const useStyles = makeStyles((theme) => ({
  footer: {
    backgroundColor: theme.palette.secondary.lighterDarkBackground,
    marginTop: "100px",
  },
  link: {
    textDecoration: "none",
    color: theme.palette.secondary.greyText,
    "&:hover": {
      color: theme.palette.secondary.contrastText + ' !important',
    },
    "&:visited": {
      color: theme.palette.secondary.greyText,
    },
  },
  logo: {
    fill: theme.palette.secondary.greyText,
    width:'230px',
    opacity:.6
  },
}));
function Footer() {
  const classes = useStyles(theme);

  return (
    <Container className={classes.footer} maxWidth="xl">
      <Grid container spacing={6}>
        <Grid
          item
          xs={4}
          style={{ display: "flex", justifyContent: "flex-end" }}
        >
          <Wglogo className={classes.logo} />
        </Grid>
        <Grid item xs={4}>
          <List component="nav" style={{ display: "flex" }}>
            <ListItem>
              <Link to="/" className={classes.link}>
                Impressum
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/" className={classes.link}>
                Datenschutz
              </Link>
            </ListItem>
            <ListItem>
              <Link to="/" className={classes.link}>
                Cookie Einstellungen
              </Link>
            </ListItem>
          </List>
        </Grid>
        <Grid item xs={4}>
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
              <ListItemText primary="infowheregroup.com" />
            </ListItem>
          </List>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Footer;
