import React, { useContext, useEffect } from "react";

import DemoContext from "./DemoContext";

import { Link,  useLocation } from "react-router-dom";

import { Drawer, Grid, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useMediaQuery from "@mui/material/useMediaQuery";
import ListItemSmall from "./ListItemSmall";
import Box from '@mui/material/Box';
import CloseIcon from '@mui/icons-material/Close';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

import { useTranslation } from "react-i18next";

import makeStyles from "@mui/styles/makeStyles";
import LanguageSelection from "./LanguageSelection";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.main,
  },
  link: {
    textDecoration: "none",
    color: "white",
  },
  listitem: {
    fontSize: "17pt",
    justifyContent: "center",
  },
  listitemSelected: {
    fontSize: "17pt",
    justifyContent: "center",
    color: theme.palette.primary.main,
  },
}));

function MenuDrawer(props) {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const demoContext = useContext(DemoContext);
  const { t } = useTranslation();
  const location = useLocation();

  const classes = useStyles();


  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.setOpen(!props.open)}
      classes={{ paper: classes.paper }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
          color: "white",
          fontFamily: 'Chakra Petch, sans-serif'
        }}
      >

      <IconButton
          onClick={(ev) => {
            props.setOpen(!props.open)
          }}
          size="large"
          style={{display: "flex", float: "right"}}
        >
          <CloseIcon />
      </IconButton>

      <br></br><br></br>

      <List>
          <ListItem disablePadding>
            <ListItemButton className={location.pathname != '/' ? classes.listitem : classes.listitemSelected} component={Link} to="/" onClick={() => {props.setOpen(!props.open)}}>
              MapComponents
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={location.pathname != '/list-apps' ? classes.listitem : classes.listitemSelected} component={Link} to="/list-apps" onClick={() => {props.setOpen(!props.open)}}>
              {t("sampleApplications")}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton className={location.pathname != '/bookmarks' ? classes.listitem : classes.listitemSelected} component={Link} to="/bookmarks" onClick={() => {props.setOpen(!props.open)}}>
              {t("bookmark")}
            </ListItemButton>
          </ListItem>
          <ListItem className={classes.listitem} onClick={() => {props.setOpen(!props.open)}}>
            <LanguageSelection></LanguageSelection>
          </ListItem>
      </List>
          
      </div>
    </Drawer>
  );
}

export default MenuDrawer;
