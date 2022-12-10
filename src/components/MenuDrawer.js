import React, { useContext } from "react";

import DemoContext from "./DemoContext";

import { Link, useLocation } from "react-router-dom";

import { Drawer, IconButton } from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { useTranslation } from "react-i18next";

import makeStyles from "@mui/styles/makeStyles";
import LanguageSelection from "./LanguageSelection";
import i18n from "../i18n/i18n";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.main,
  },
  link: {
    textDecoration: "none",
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
  const demoContext = useContext(DemoContext);
  const { t } = useTranslation();
  const location = useLocation();

  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={demoContext.menuDrawerOpen}
      onClose={() => demoContext.setMenuDrawerOpen(false)}
      classes={{ paper: classes.paper }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
        }}
      >
        <IconButton
          onClick={(ev) => {
            props.setOpen(!props.open);
          }}
          size="large"
          style={{ display: "flex", float: "right" }}
        >
          <CloseIcon />
        </IconButton>

        <br></br>
        <br></br>

        <List>
          <ListItem disablePadding>
            <ListItemButton
              className={
                location.pathname !== "/"
                  ? classes.listitem
                  : classes.listitemSelected
              }
              component={Link}
              to="/"
              onClick={() => {
                props.setOpen(!props.open);
              }}
            >
              MapComponents
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={
                location.pathname !== "/list-apps"
                  ? classes.listitem
                  : classes.listitemSelected
              }
              component={Link}
              to={"/" + i18n.resolvedLanguage + "/list-apps"}
              onClick={() => {
                props.setOpen(!props.open);
              }}
            >
              {t("sampleApplications")}
            </ListItemButton>
          </ListItem>
          <ListItem disablePadding>
            <ListItemButton
              className={
                location.pathname !== "/bookmarks"
                  ? classes.listitem
                  : classes.listitemSelected
              }
              component={Link}
              to={"/" + i18n.resolvedLanguage + "/bookmarks"}
              onClick={() => {
                props.setOpen(!props.open);
              }}
            >
              {t("bookmark")}
            </ListItemButton>
          </ListItem>
          <ListItem
            className={classes.listitem}
            onClick={() => {
              props.setOpen(!props.open);
            }}
          >
            <LanguageSelection></LanguageSelection>
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
}

export default MenuDrawer;
