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

  const [componentData, setComponentData] = useState({});

  const { t, i18n } = useTranslation();



  useEffect(() => {
    if(!demoContext.componentData?.[component_id])return;

    setComponentData(demoContext.componentData[component_id]);
  }, [demoContext.componentData, demoContext]);

  return (
    <Link
      to={"/component-detail/" + component_id}
      style={{ color: "white", textDecoration: "none", marginTop: "10px" }}
      key={component_id}
    >
      <Grid
        container
        style={{ marginTop: "0px"}}
        spacing={2}
        onClick={props.onClick}
      >
        <Grid item xs={3} key="imgContainer" >
          <img
            className={`${classes.teaserItemImage} cutCorners`}
            src={componentData.thumbnail || "/placeholder.png"}
            onError={(ev) => {
              ev.target.src = "/placeholder.png";
            }}
            alt=""
          />
        </Grid>
        <Grid item xs={9} key="textContainer">
          <h4 className="twoLinesOfText" style={{ marginTop: "3px", marginBottom: "5px", color: theme.palette.primary.main }}>
            {componentData.i18n?.[i18n.resolvedLanguage]?.title &&
            i18n.resolvedLanguage !== "en"
              ? componentData.i18n[i18n.resolvedLanguage].title
              : componentData.title} 
          </h4>
        </Grid>
      </Grid>
    </Link>
  );
}

export default ListItemSmall;
