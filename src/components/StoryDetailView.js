import React, {
  useState,
  useContext,
  useEffect,
  useMemo,
} from "react";
import { useResolvedPath, Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import theme from "../theme.js";

import DemoContext from "./DemoContext";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Button } from "@mui/material";
import ListItemSmall from "./ListItemSmall";
import Divider from "@mui/material/Divider";
import Tag from "./Tag.js";

import { useTranslation } from "react-i18next";

function StoryDetailView() {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const basepath = useResolvedPath("/");
  const { component_id } = useParams();
  const demoContext = useContext(DemoContext);

  const [componentData, setComponentData] = useState({});

  const [description, setDescription] = useState("");
  const [componentTitle, setComponentTitle] = useState("");

  //Retrieve all sample applications where this component is integrated
  const appsWhichImplement = useMemo(() => {
    let apps = [];
    let compData = demoContext.componentDataRef.current;

    for (var url in compData) {
      for (var comp in compData[url]) {
        if (
          compData[url][comp].components &&
          compData[url][comp].components.includes(componentData.name)
        ) {
          apps.push(comp);
        }
      }
    }

    return apps;
  }, [componentData, demoContext]);

  const { t, i18n } = useTranslation();

  useEffect(() => {
    if (
      demoContext?.componentData &&
      typeof demoContext.componentData[component_id] !== "undefined"
    ) {
      let currentLanguage = i18n.resolvedLanguage;
      let componentTitle = demoContext.componentData[component_id].i18n?.[
        currentLanguage
      ]?.title
        ? demoContext.componentData[component_id].i18n[currentLanguage].title
        : demoContext.componentData[component_id].title;
      setComponentTitle(componentTitle);
      let componentDescription = demoContext.componentData[component_id].i18n?.[
        currentLanguage
      ]?.description
        ? demoContext.componentData[component_id].i18n[currentLanguage]
            .description
        : demoContext.componentData[component_id].description;
      setDescription(componentDescription);
    }
  }, [
    component_id,
    demoContext.componentData,
    demoContext,
    i18n.resolvedLanguage,
  ]);

  useEffect(() => {
    if (!demoContext.componentData?.[component_id]) return;

    setComponentData(demoContext.componentData[component_id]);
  }, [demoContext.componentData, demoContext, component_id]);

  return (
    <>
      <Grid container>
        <Grid item xs={12} md={6}>
          <h1 style={{ marginTop: 0 }}>{componentTitle}</h1>
        </Grid>
      </Grid>

      <div style={{ marginBottom: "50px" }}>{description}</div>

      <Grid container spacing={4} key="contentContainer">
        <Grid
          item
          md={8}
          xs={12}
          style={{
            ...(mediaIsMobile
              ? {}
              : {
                  marginBottom: "80px",
                  paddingBottom: "20px",
                  minHeight: "500px",
                }),
          }}
          key="content"
        >
          <Grid container spacing={0} key="contentLeft">
            <Grid key="thumbnail" item xs={12}>
              <img
                style={{ width: "100%", maxHeight: "600px" }}
                className="roundCorners"
                src={
                  componentData.thumbnail ||
                  basepath.pathname + "placeholder.png"
                }
                onError={(ev) => {
                  ev.target.src = basepath.pathname + "placeholder.png";
                }}
                alt=""
              />
            </Grid>
            <Grid item xs={12} key="tags">
              {componentData.tags &&
                componentData.tags.map((el, idx) => (
                  <Tag el={el} key={idx}></Tag>
                ))}
            </Grid>
            <Grid key="description" item xs={12} style={{ marginTop: "30px" }}>
              <div
                className="content"
                //dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Grid>
          </Grid>
        </Grid>

        <Grid
          item
          md={4}
          xs={12}
          style={{ paddingTop: mediaIsMobile ? 0 : "0px" }}
          key="sidebar"
        >
          <Grid container spacing={0}>
            <Grid item xs={12} key="demo_link">
              <h3>Demos</h3>
              <Divider
                variant="fullWidth"
                sx={{ bgcolor: theme.palette.secondary.main }}
              ></Divider>

              <Grid container spacing={2} style={{ marginTop: "0px" }}>
                {componentData?.demos?.length &&
                  componentData.demos.map((demo, idx) => (
                    <Grid
                      item
                      xs={6}
                      style={{ marginTop: "16px", paddingTop: "0px" }}
                      key={demo.name + idx}
                    >
                      <Button
                        style={{
                          width: "100%",
                          height: "4.5em",
                          display: "flex",
                          flexDirection: "column",
                          alignContent: "center",
                          color: theme.palette.common.white,
                          borderRadius: "8px",
                        }}
                        component={Link}
                        variant="contained"
                        to={
                          "/" +
                          i18n.resolvedLanguage +
                          "/demo/" +
                          componentData.name +
                          "/" +
                          (demo.id ? demo.id : demo.name)
                        }
                        key={demo.name}
                      >
                        <span
                          className="twoLinesOfText"
                          style={{ textAlign: "center" }}
                        >
                          {demo.name}
                        </span>
                      </Button>
                    </Grid>
                  ))}
              </Grid>
            </Grid>
            {componentData?.components?.length > 0 && (
              <Grid
                item
                xs={12}
                key="component_list"
                style={{ marginTop: "30px" }}
              >
                <h3>{t("usedComponents")}</h3>
                <Divider
                  variant="fullWidth"
                  sx={{ bgcolor: theme.palette.secondary.main }}
                ></Divider>
                {componentData.components.map((el, idx) => (
                  <ListItemSmall component_id={el} key={el + idx} />
                ))}
              </Grid>
            )}
            {appsWhichImplement?.length > 0 && (
              <Grid item xs={12} key="apps_list" style={{ marginTop: "30px" }}>
                <h3>{t("includedIn")}</h3>
                <Divider
                  variant="fullWidth"
                  sx={{ bgcolor: theme.palette.secondary.main }}
                ></Divider>
                {appsWhichImplement.map((el, idx) => (
                  <ListItemSmall component_id={el} key={el.name + idx} />
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>

      {/*
      <Grid container spacing={0} key="descriptionContainer">
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <div
            style={{
              minHeight: "150px",
            }}
          >
            <h3>{t("description")}</h3>
            <Divider
              variant="fullWidth"
              sx={{ bgcolor: theme.palette.secondary.main }}
            ></Divider>
          </div>
        </Grid>
      </Grid>

          */}
    </>
  );
}

export default StoryDetailView;
