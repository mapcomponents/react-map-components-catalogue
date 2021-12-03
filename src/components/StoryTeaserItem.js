import React, { useEffect, useRef } from "react";
import { useHistory, Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  teaserItemImage: {
    maxWidth: "100%",
  },
}));

function StoryTeaserItem(props) {
  const history = useHistory();
  const classes = useStyles();
  const basepath = useRef("/");
  const meta = props.meta || {};

  useEffect(() => {
    basepath.current = history.createHref({ pathname: "/" });
    console.log(props);
  }, []);

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link
        to={"/component-detail/" + props.kind}
        style={{ textDecoration: "none" }}
      >
        <Paper style={{ padding: "15px" }}>
          <h4 style={{ marginTop: "0" }}>{props.compData.title}</h4>
          <img
            className={classes.teaserItemImage}
            src={
              props.compData.thumbnail || basepath.current + "placeholder.png"
            }
            onError={(ev) => {
              ev.target.src = basepath.current + "placeholder.png";
            }}
            alt=""
          />
        </Paper>
      </Link>
    </Grid>
  );
}

export default StoryTeaserItem;
