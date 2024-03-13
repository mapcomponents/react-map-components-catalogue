import React, { useEffect, useState, useContext, useMemo } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Link, useLocation, useMatch } from "react-router-dom";
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
  let match = useMatch("/:locale/component-detail/:component_id");

  const selectedType = useMemo(() => {
    if (
      location.pathname === "/" ||
      location.pathname === "/" + i18n.language ||
      location.pathname === "/" + i18n.language + "/"
    )
      return "component";
    if (location.pathname === "/" + i18n.language + "/list-apps")
      return "application";
    return type;
  }, [location.pathname, i18n.language, type]);

  useEffect(() => {
    if (!componentData || !match?.params?.component_id) {
      setType(undefined);
      return;
    }
    const entry = componentData[match.params.component_id];
    setType(entry?.type);
  }, [match?.params?.component_id, componentData]);

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
          selected={selectedType === "component"}
        >
          Components
        </ToggleButton>
        <ToggleButton
          to={i18n.language + "/list-apps"}
          className={classes.menuButton}
          component={Link}
          value={i18n.language + "/list-apps"}
          selected={selectedType === "application"}
        >
          {t("sampleApplications")}
        </ToggleButton>
      </ToggleButtonGroup>
    </Grid>
  );
}
