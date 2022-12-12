import React, { useEffect, useRef } from "react";
import { Link, useResolvedPath } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Grid, Paper } from "@mui/material";
import { useTranslation } from "react-i18next";

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

const useStyles = makeStyles((theme) => ({
  teaserContainer: {
    borderRadius: "30px",
    overflow: "hidden",
    aspectRatio: "4/3",
    display: "flex",
    flexDirection: "row",
    boxShadow: "0 4px 40px rgb(0 0 0 / 8%)",
  },
  textContainer: {
    flex: "0 0 50%",
    maxWidth: "50%",
    padding: "32px 5px 32px 40px",
    boxSizing: "border-box",
    position: "relative",
    backgroundColor: theme.palette.background.default,
    wordBreak: "break-word",
  },
  imageContainer: {
    flex: "0 0 50%",
    maxWidth: "50%",
    flexGrow: 1,
    overflow: "hidden",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  teaserItemImage: {
    minWidth: "100%",
    minHeight: "100%",
    objectFit: "cover",
    position: "absolute",
    top: "16%",
    transform: "translateY(-35%) scale(0.5)",
    transition: "0.3s ease",
  },
  link: {
    textDecoration: "none",
    "&:hover": {
      "& $teaserItemImage": {
        transform: "translateY(-35%) scale(0.6)",
      },
      "& $plusIcon": {
        filter: "brightness(110%)",
      },
      "& $title": {
        //color: theme.palette.primary.main,
      },
    },
  },
  componentName: {
    color: theme.palette.primary.main,
    marginBottom: "8px",
    fontSize: ".7rem",
  },
  title: {
    marginTop: "auto",
    marginBottom: "10px",
    fontWeight: "600",
    fontSize: "clamp(1.2rem, 5vw, 1.2rem)",
    lineHeight: "150%",
    margin: "0 0 0.5rem",
    padding: "0",
    color: "#282828",
    transition: "0.3s ease",
  },
  plusIcon: {
    position: "absolute",
    left: "37px",
    bottom: "25px",
    fontSize: "2.5rem",
    transition: "0.3s ease",
  },
}));

function StoryTeaserItem(props) {
  const classes = useStyles();
  const basepath = useResolvedPath("/");
  const meta = props.meta || {};
  const { t, i18n } = useTranslation();

  const target = `/${i18n.resolvedLanguage}/component-detail/${props.kind}`;

  return (
    <Grid item xs={12} sm={6} md={4}>
      <Link to={target} className={`${classes.link}`}>
        <div className={`${classes.teaserContainer}`}>
          <div className={`${classes.textContainer}`}>
            <p className={`${classes.componentName}`}>{props.compData.name}</p>
            <h3 className={`${classes.title}`}>
              {i18n.resolvedLanguage !== "en"
                ? props.compData.i18n[i18n.resolvedLanguage].title
                : props.compData.title}
            </h3>
            <div className={`${classes.plusIcon}`}>
              <AddCircleOutlineIcon sx={{ fontSize: "48px" }} />
            </div>
          </div>

          <div className={`${classes.imageContainer}`}>
            <img
              className={`${classes.teaserItemImage}`}
              src={
                props.compData.thumbnail ||
                basepath.pathname + "placeholder.png"
              }
              onError={(ev) => {
                ev.target.src = basepath.pathname + "placeholder.png";
              }}
              alt=""
            />
          </div>
        </div>
      </Link>
    </Grid>
  );
}

export default StoryTeaserItem;
