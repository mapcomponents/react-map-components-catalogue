import React from "react";
import { Link, useResolvedPath } from "react-router-dom";

import { Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import useMediaQuery from "@mui/material/useMediaQuery";
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import { useTheme } from "@mui/material/styles";

function StoryTeaserItem(props) {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const basepath = useResolvedPath("/");
  const { i18n } = useTranslation();
  const theme = useTheme();

  const target = `/${i18n.resolvedLanguage}/component-detail/${props.kind}`;

  return (
    <Grid size={{xs:12, sm:6, md:4}}>
      <Link
        to={target}
        style={{
          textDecoration: "none",
          display: "block",
          group: "story-link",
          width: "100%"
        }}
      >
        <div
          style={{
            borderRadius: "30px",
            overflow: "hidden",
            aspectRatio: "4/3",
            display: "flex",
            flexDirection: "row",
            boxShadow: "0 4px 40px rgb(0 0 0 / 8%)",
            transition: "all 0.3s ease",
            width: "100%"
          }}
          onMouseEnter={(e) => {
            const img = e.currentTarget.querySelector("[data-teaser-image]");
            const icon = e.currentTarget.querySelector("[data-plus-icon]");
            if (img) img.style.transform = "translateY(-35%) scale(0.6)";
            if (icon) icon.style.filter = "brightness(110%)";
          }}
          onMouseLeave={(e) => {
            const img = e.currentTarget.querySelector("[data-teaser-image]");
            const icon = e.currentTarget.querySelector("[data-plus-icon]");
            if (img) img.style.transform = "translateY(-35%) scale(0.5)";
            if (icon) icon.style.filter = "brightness(100%)";
          }}
        >
          <div
            style={{
              flex: "0 0 50%",
              maxWidth: "50%",
              padding: "32px 5px 32px 40px",
              boxSizing: "border-box",
              position: "relative",
              backgroundColor: theme.palette.background.default,
              wordBreak: "break-word",
            }}
          >
            <p
              style={{
                color: theme.palette.primary.main,
                marginBottom: "8px",
                fontSize: mediaIsMobile ? ".5rem" : ".7rem",
              }}
            >
              {props.compData.name}
            </p>
            <h3
              style={{
                marginTop: "auto",
                marginBottom: "10px",
                fontWeight: "600",
                fontSize: "clamp(1.2rem, 5vw, 1.2rem)",
                lineHeight: "150%",
                margin: "0 0 0.5rem",
                padding: "0",
                color: "#282828",
                transition: "0.3s ease",
              }}
            >
              {i18n.resolvedLanguage !== "en"
                ? props.compData.i18n[i18n.resolvedLanguage].title
                : props.compData.title}
            </h3>
            <div
              data-plus-icon
              style={{
                position: "absolute",
                left: "37px",
                bottom: "25px",
                fontSize: mediaIsMobile ? "1rem" : "2.5rem",
                transition: "0.3s ease",
              }}
            >
              <AddCircleOutlineOutlinedIcon
                sx={{ fontSize: mediaIsMobile ? "30px" : "48px" }}
              />
            </div>
          </div>

          <div
            style={{
              flex: "0 0 50%",
              maxWidth: "50%",
              flexGrow: 1,
              overflow: "hidden",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
            }}
          >
            <img
              data-teaser-image
              style={{
                minWidth: "100%",
                minHeight: "100%",
                objectFit: "cover",
                position: "absolute",
                top: "16%",
                transform: "translateY(-35%) scale(0.5)",
                transition: "0.3s ease",
              }}
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
