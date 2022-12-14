import React from "react";
import useMediaQuery from "@mui/material/useMediaQuery";
import makeStyles from "@mui/styles/makeStyles";
import { Link } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTranslation } from "react-i18next";

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
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const classes = useStyles();
  const { t, i18n } = useTranslation();

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
          value={window.location.pathname}
        >
          <ToggleButton
            to={i18n.language + "/"}
            className={classes.menuButton}
            component={Link}
            value={i18n.language + "/"}
          >
            Components
          </ToggleButton>
          <ToggleButton
            to={i18n.language + "/list-apps"}
            className={classes.menuButton}
            component={Link}
            value={i18n.language + "/list-apps"}
          >
            {t("sampleApplications")}
          </ToggleButton>
        </ToggleButtonGroup>
    </Grid>
  );
}
