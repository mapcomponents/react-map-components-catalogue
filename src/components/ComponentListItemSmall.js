import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import DemoContext from "./DemoContext";
import { makeStyles } from "@material-ui/core/styles";
import { Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  teaserItemImage: {
    maxWidth: "100%",
  },
}));

function ComponentListItemSmall(props) {
  const classes = useStyles();

  const component_id = props.component_id;

  const demoContext = useContext(DemoContext);

  const [componentData, setComponentData] = useState({});
  const [storybookData, setStorybookData] = useState({});

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
          setComponentData(demoContext.componentData[url][compName]);
        }
      }
    }
  }, [demoContext.componentData, demoContext, storybookData]);

  return (
    <Link
      to={"/component-detail/" + storybookData.id}
      style={{ color: "black", textDecoration: "none", marginTop: "10px" }}
    >
      <Grid container style={{ marginTop: "0px" }} spacing={2}>
        <Grid item xs={4}>
          <img
            className={classes.teaserItemImage}
            src={storybookData.thumbnail || "/placeholder.png"}
            onError={(ev) => {
              ev.target.src = "/placeholder.png";
            }}
            alt=""
          />
        </Grid>
        <Grid item xs={8}>
          <h4 style={{ marginTop: "3px", marginBottom: "5px" }}>
            {componentData.title}
          </h4>
        </Grid>
      </Grid>
    </Link>
  );
}

export default ComponentListItemSmall;
