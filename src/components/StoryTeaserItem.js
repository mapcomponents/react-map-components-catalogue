import React, { useEffect, useRef } from "react";
import { Link, useResolvedPath } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  teaserItemImage: {
    maxWidth: "100%",
  },
}));

function StoryTeaserItem(props) {
  const classes = useStyles();
  const basepath = useResolvedPath("/");
  const meta = props.meta || {};
  const { t, i18n } = useTranslation();

  useEffect(() => {
    //console.log(props);
  }, []);

  return (
    <Grid item xs={12} sm={6} md={3}>
      <div style={{ height: "4em", display: "flex", alignContent: "center", flexDirection: "column", alignContent: "center"}}>
      <h3 className="twoLinesOfText" style={{ color: "white", marginTop: "auto", marginBottom: "auto" }}>
          {i18n.resolvedLanguage !== "en"
              ? props.compData.i18n[i18n.resolvedLanguage].title
              : props.compData.title}
        </h3>
      </div>
        
      <Link
        to={"/component-detail/" + props.kind}
        style={{ textDecoration: "none" }}
      >

          <img
            className={`${classes.teaserItemImage} cutCorners`}
            src={props.compData.thumbnail || basepath + "placeholder.png"}
            onError={(ev) => {
              ev.target.src = basepath + "placeholder.png";
            }}
            alt=""
          />
      </Link>
    </Grid>
  );
}

export default StoryTeaserItem;
