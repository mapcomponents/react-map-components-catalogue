import React, { useEffect, useState, useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useLocation } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import DemoContext from "./DemoContext";

const useStyles = makeStyles((theme) => ({
  menuButton: {
    border: "none",
    textTransform: "none",
    "&:hover": {
      backgroundColor: "initial",
      color: theme.palette.primary.main,
    },
  },
  logo: {
    height: "40px",
    width: "auto",
  },
  header: {
    padding: "10px 0",
    backgroundColor: theme.palette.background.main, //'#1c1e21' //"#f1f1f1",
    boxShadow: "0 4px 16px rgb(0 0 0 / 16%)",
  },
}));

export default function CatalogueHeader() {
  const classes = useStyles();
  const { t, i18n } = useTranslation();
  const [alignment, setAlignment] = useState(window.location.pathname);
  const { componentData } = useContext(DemoContext);
  const location = useLocation();

  const handleAlignment = (event, newAlignment) => {
    setAlignment(newAlignment);
  };

  const getTypeFromUrl = (url) => {
    console.log("URL hat sich geändert, neue URL:", location.pathname);
    const entry = Object.values(componentData).find(
      (entry) => entry.url === url
    );
    if (entry) {
      console.log(entry.type);
      return entry.type;
    }
    return null;
  };

  useEffect(() => {
    getTypeFromUrl();
  }, [location.pathname]);

  return (
    <Grid
      item
      xs={10}
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ToggleButtonGroup
        variant="contained"
        color="primary"
        aria-label="contained primary button group"
        value={alignment}
        exclusive
        onChange={handleAlignment}
      >
        <ToggleButton
          to={i18n.language + "/"}
          className={classes.menuButton}
          component={Link}
          value={i18n.language + "/"}
          selected={alignment === i18n.language + "/"}
        >
          Components
        </ToggleButton>
        <ToggleButton
          to={i18n.language + "/list-apps"}
          className={classes.menuButton}
          component={Link}
          value={i18n.language + "/list-apps"}
          selected={
            alignment === i18n.language + "/list-apps" &&
            componentData.type === "application"
          }
        >
          {t("sampleApplications")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
