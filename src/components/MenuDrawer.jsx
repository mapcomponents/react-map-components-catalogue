import React, { useContext } from "react";

import DemoContext from "./DemoContext";

import { Link, useLocation } from "react-router-dom";

import { Drawer, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CloseIcon from "@mui/icons-material/Close";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";

import { useTranslation } from "react-i18next";

import LanguageSelection from "./LanguageSelection";
import i18n from "../i18n/i18n";

function MenuDrawer(props) {
  const demoContext = useContext(DemoContext);
  const { t } = useTranslation();
  const location = useLocation();
  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={demoContext.menuDrawerOpen}
      onClose={() => demoContext.setMenuDrawerOpen(false)}
      sx={{
        "& .MuiDrawer-paper": {
          background: theme.palette.background["main"],
        },
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
        }}
      >
        <IconButton
          onClick={() => {
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
               sx={{
                 fontSize: "17pt",
                 justifyContent: "center",
                 ...(location.pathname === "/" ? {
                   color: theme.palette.primary.main,
                 } : {}),
               }}
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
               sx={{
                 fontSize: "17pt",
                 justifyContent: "center",
                 ...(location.pathname === "/list-apps" ? {
                   color: theme.palette.primary.main,
                 } : {}),
               }}
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
               sx={{
                 fontSize: "17pt",
                 justifyContent: "center",
                 ...(location.pathname === "/bookmarks" ? {
                   color: theme.palette.primary.main,
                 } : {}),
               }}
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
             sx={{
               fontSize: "17pt",
               justifyContent: "center",
             }}
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
