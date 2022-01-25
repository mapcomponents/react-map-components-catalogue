import React, { useState, useContext, useEffect, useCallback } from "react";
import { useResolvedPath, Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import DemoContext from "./DemoContext";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Button, Paper, Chip } from "@mui/material";
//import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//import ExtensionIcon from '@mui/icons-material/Extension';
//import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ComponentListItemSmall from "./ComponentListItemSmall";

import { useTranslation } from "react-i18next";

function StoryDetailView(props) {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const basepath = useResolvedPath("/");
  const { component_id } = useParams();
  const demoContext = useContext(DemoContext);

  const [componentData, setComponentData] = useState({});
  const [storybookData, setStorybookData] = useState({});

  const [url, setUrl] = useState("");
  const [demos, setDemos] = useState([]);

  const [description, setDescription] = useState("");
  const [componentTitle, setComponentTitle] = useState("");

  const { t, i18n } = useTranslation();

  const fetchDescription = useCallback(() => {
    if (!url || !componentData || (componentData && !componentData.name))
      return;

    let currentLanguage = i18n.resolvedLanguage;
    let componentTitle =
      currentLanguage !== "en"
        ? componentData.i18n[currentLanguage].title
        : componentData.title;
    setComponentTitle(componentTitle);
    fetch(
      url + "/catalogue/" + componentData.name + "." + currentLanguage + ".html"
    )
      .then((res) => {
        if (!res.ok) {
          return t("noDescription");
        }
        return res.text();
      })
      .then((text) => {
        setDescription(text);
      });
  }, [componentData, url, i18n.resolvedLanguage, componentTitle]);

  useEffect(() => {}, []);

  useEffect(() => {
    let compData = demoContext.componentDataRef.current;

    (async () => {
      for (var url in compData) {
        if (typeof compData[url][component_id] !== "undefined") {
          setUrl(url);
          await setComponentData(compData[url][component_id]);
          break;
        }
      }
    })();
  }, [component_id, demoContext.componentData, demoContext]);

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
  }, [demoContext.componentData, storybookData, demoContext]);

  useEffect(() => {
    fetchDescription();
  }, [fetchDescription]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          md={8}
          xs={12}
          style={{
            ...(mediaIsMobile
              ? {}
              : {
                  marginBottom: "80px",
                  paddingBottom: "120px",
                  minHeight: "500px",
                }),
          }}
          key="content"
        >
          <Grid container spacing={0}>
            <Grid key="title" item xs={12}>
              <h1 style={{ marginTop: 0 }}>{componentTitle}</h1>
            </Grid>
            <Grid key="thumbnail" item xs={12}>
              <Paper elevation={1} style={{ maxHeight: "600px" }}>
                <img
                  src={componentData.thumbnail || basepath + "placeholder.png"}
                  onError={(ev) => {
                    ev.target.src = basepath + "placeholder.png";
                  }}
                  style={{ width: "100%" }}
                  alt=""
                />
              </Paper>
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
          style={{ paddingTop: mediaIsMobile ? 0 : "89px" }}
          key="sidebar"
        >
          <Grid container spacing={2}>
            <Grid item xs={12} key="add_to_cart">
              <Button
                variant="contained"
                color="primary"
                onClick={() => {
                  demoContext.setCartItems([
                    ...demoContext.cartItems,
                    componentData.name,
                  ]);
                }}
              >
                {t("addToBookmarks")}
              </Button>
            </Grid>
            <Grid item xs={12} key="demo_link">
              <h3>Demos:</h3>
              {componentData &&
                componentData.stories &&
                componentData.stories.map((story) => (
                  <Button
                    style={{ width: "100%", marginBottom: "15px" }}
                    component={Link}
                    variant="contained"
                    to={"/demo/" + story.id}
                    key={story.id}
                  >
                    {story.name === "Example Config" ? "demo" : story.name}
                  </Button>
                ))}
            </Grid>
            <Grid item xs={12} key="tags">
              {componentData.tags &&
                componentData.tags.map((el, idx) => (
                  <Chip
                    size="small"
                    color="primary"
                    label={el}
                    style={{ margin: "5px 5px 0 0" }}
                    key={idx}
                  />
                ))}
            </Grid>
            {componentData.components && (
              <Grid item xs={12} key="component_list">
                <h3>{t("usedComponents")}</h3>
                {componentData.components.map((el) => (
                  <ComponentListItemSmall component_id={el} />
                ))}
              </Grid>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
}

export default StoryDetailView;
