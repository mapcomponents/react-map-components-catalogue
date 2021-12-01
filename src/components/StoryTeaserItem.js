import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Grid, Paper } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  teaserItemImage: {
    maxWidth: "100%",
  },
}));

function StoryTeaserItem(props) {
  const classes = useStyles();
  const meta = props.meta || {};

  useEffect(() => {
    console.log(props);
  },[]);

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
            src={props.compData.thumbnail || "/placeholder.png"}
            onError={(ev) => {
              ev.target.src = "/placeholder.png";
            }}
            alt=""
          />
        </Paper>
      </Link>
    </Grid>
  );
}

export default StoryTeaserItem;