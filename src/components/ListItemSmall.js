import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import theme from "../theme.js";

import DemoContext from "./DemoContext";
import makeStyles from '@mui/styles/makeStyles';
import { Grid } from "@mui/material";
import { useTranslation } from 'react-i18next';

const useStyles = makeStyles((theme) => ({
  teaserItemImage: {
    maxWidth: "100%",
  },
}));

function ListItemSmall(props) {
  const classes = useStyles();

  const component_id = props.component_id;

  const demoContext = useContext(DemoContext);

  const [componentOrApplicationData, setComponentOrApplicationData] = useState({});
  const [storybookData, setStorybookData] = useState({});

  const { t, i18n } = useTranslation();

  useEffect(() => {
    let sbData = demoContext.storybookDataRef.current;

    for (var url in sbData) {
      for (var story_id in sbData[url].stories) {
        if (sbData[url].stories[story_id].kind.indexOf(component_id) !== -1) {
          setStorybookData(sbData[url].stories[story_id]);
        }
      }
    }
  }, [demoContext.storybookData, component_id, demoContext]);

  useEffect(() => {
    if (!storybookData) return;

    let sbData = demoContext.storybookDataRef.current;

    for (var url in sbData) {
      for (var compName in demoContext.componentData[url]) {
        if (storybookData.kind && storybookData.kind.indexOf(compName) !== -1) {
          setComponentOrApplicationData(demoContext.componentData[url][compName]);
        }
      }
    }
  }, [demoContext.componentData, demoContext, storybookData]);

  return (
    <Link
      to={"/component-detail/" + component_id}
      style={{ color: "white", textDecoration: "none", marginTop: "10px" }}
    >
      <Grid
        container
        style={{ marginTop: "0px"}}
        spacing={2}
        onClick={props.onClick}
      >
        <Grid item xs={3} >
          <img
            className={`${classes.teaserItemImage} cutCorners`}
            src={componentOrApplicationData.thumbnail || "/placeholder.png"}
            onError={(ev) => {
              ev.target.src = "/placeholder.png";
            }}
            alt=""
          />
        </Grid>
        <Grid item xs={9}>
          <h4 className="twoLinesOfText" style={{ marginTop: "3px", marginBottom: "5px", color: theme.palette.primary.main }}>
            {componentOrApplicationData.i18n?.[i18n.resolvedLanguage]?.title &&
            i18n.resolvedLanguage !== "en"
              ? componentOrApplicationData.i18n[i18n.resolvedLanguage].title
              : componentOrApplicationData.title} 
          </h4>
        </Grid>
      </Grid>
    </Link>
  );
}

export default ListItemSmall;
