import React, { useEffect, useState, useContext, useMemo } from "react";
import { Link, useLocation, useMatch } from "react-router-dom";
import { Grid, ToggleButtonGroup, ToggleButton } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useTheme } from "@mui/material/styles";
import DemoContext from "./DemoContext";

export default function CatalogueHeader() {
  const theme = useTheme();
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
      size={{xs: 10}}
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
          sx={{
            border: "none",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "initial",
              color: theme.palette.primary.main,
            },
          }}
          component={Link}
          value={i18n.language + "/"}
          selected={selectedType === "component"}
        >
          Components
        </ToggleButton>
        <ToggleButton
          to={i18n.language + "/list-apps"}
          sx={{
            border: "none",
            textTransform: "none",
            "&:hover": {
              backgroundColor: "initial",
              color: theme.palette.primary.main,
            },
          }}
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
