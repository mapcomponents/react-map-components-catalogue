import React, { useEffect, useState, useContext } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useLocation, useParams } from "react-router-dom";
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
  const location = useLocation();
  const [type, setType] = useState();
  const { componentData } = useContext(DemoContext);
  // const { component_id } = useParams();

  useEffect(() => {
    if (!location.pathname && componentData) return;
    const pathSegments = location.pathname.split("/");
    const entryName = pathSegments[pathSegments.length - 1];

    const entry = componentData[entryName];
    if (entry) {
      setType(entry.type);
    } else {
      setType();
    }
  }, [location.pathname]);

  // useEffect(() => {
  //   if (!componentData && componentData) return;
  //   const entry = componentData[component_id];
  //   if (entry) {
  //     setType(entry.type);
  //   } else {
  //     setType();
  //   }
  // }, [component_id]);

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
        value={location.pathname}
        exclusive
      >
        <ToggleButton
          to={i18n.language + "/"}
          className={classes.menuButton}
          component={Link}
          value={i18n.language + "/"}
          selected={
            location.pathname === "/" + i18n.language + "/" ||
            type === "component"
          }
        >
          Components
        </ToggleButton>
        <ToggleButton
          to={i18n.language + "/list-apps"}
          className={classes.menuButton}
          component={Link}
          value={i18n.language + "/list-apps"}
          selected={
            location.pathname === "/" + i18n.language + "/list-apps" ||
            type === "application"
          }
        >
          {t("sampleApplications")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
