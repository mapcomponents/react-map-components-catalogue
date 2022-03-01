import React, { useState, useContext, useEffect, useCallback, useMemo } from "react";
import { useResolvedPath, Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import theme from "../theme.js";

import DemoContext from "./DemoContext";

import useMediaQuery from "@mui/material/useMediaQuery";
import { Grid, Button, Paper, Chip } from "@mui/material";
//import HighlightOffIcon from "@mui/icons-material/HighlightOff";
//import ExtensionIcon from '@mui/icons-material/Extension';
//import ImportantDevicesIcon from '@mui/icons-material/ImportantDevices';
import ListItemSmall from "./ListItemSmall";
import StarIcon from '@mui/icons-material/Star';
import Divider from '@mui/material/Divider';
import Tag from "./Tag.js";

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

  const [bookmarkSet, setBookmarkSet] = useState(false)

  //Retrieve all sample applications where this component is integrated
  const appsWhichImplement = useMemo(() => {
    let apps = []
    let compData = demoContext.componentDataRef.current;

    for (var url in compData) {
      for(var comp in compData[url]){
        if(compData[url][comp].components && compData[url][comp].components.includes(componentData.name)){
          apps.push(comp)
        }
      }
    }

    console.log(apps)
    return apps
  }, [componentData, demoContext])

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

  useEffect(() => {
    let compData = demoContext.componentDataRef.current;

    (async () => {
      for (var url in compData) {
        if (typeof compData[url][component_id] !== "undefined") {
          setUrl(url);
          console.log(compData[url][component_id])
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

  //Set state of the bookmark icon. Called when demoContext.cartItems changed
  useEffect(() => {
    setBookmarkSet(demoContext.cartItems.includes(componentData.name))
  }, [demoContext.cartItems, componentData.name])




  return (
    <>
      <h1 style={{ marginTop: 0 }}>{componentTitle}</h1>

      <div style={{
        display: "flex",
        justifyContent: "flex-end",
        marginBottom: "20px"
      }}>
        <Button
          variant={bookmarkSet ? "contained" : "outlined"}
          color="primary"
          onClick={() => {
            //add to cart but only if element not existing already
            if (!demoContext.cartItems.includes(componentData.name)) {
              demoContext.setCartItems([
                ...demoContext.cartItems,
                componentData.name,
              ]);
            }
          }}
        >
          <StarIcon></StarIcon>
          {/* {t("addToBookmarks")} */}
        </Button>
      </div>

      <Grid container spacing={4} style={{ color: "white" }}>
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
          <Grid container spacing={0}>
            <Grid key="thumbnail" item xs={12}>
              <Paper elevation={1} className="cutCorners" style={{ maxHeight: "600px" }}>
                <img
                  src={componentData.thumbnail || basepath.pathname + "placeholder.png"}
                  onError={(ev) => {
                    ev.target.src = basepath.pathname + "placeholder.png";
                  }}
                  style={{ width: "100%" }}
                  alt=""
                />
              </Paper>
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
          style={{ paddingTop: mediaIsMobile ? 0 : "20px" }}
          key="sidebar"
        >

          <Grid container spacing={0}>

            <Grid item xs={12} key="demo_link">
              <h3>Demos</h3>
              <Divider variant="fullWidth" sx={{ bgcolor: theme.palette.secondary.main }}></Divider>

              <Grid container spacing={4} style={{marginTop: "0px"}}>
              {componentData &&
                componentData.stories &&
                componentData.stories.map((story) => (
                  
                    <Grid item xs={6} style={{marginTop: "16px", paddingTop: "0px", }}>
                        <Button
                        style={{ width: "100%", color: "white", height: "4em", display: "flex", flexDirection: "column", alignContent: "center",}}
                        component={Link}
                        variant="outlined"
                        to={"/demo/" + story.id}
                        key={story.id}
                      >
                        <span className="twoLinesOfText" style={{}}>
                          {story.name === "Example Config" ? "demo" : story.name}
                        </span>

                      </Button>
                    </Grid>
                ))}
                  </Grid>
            </Grid>
            {componentData.components && (
              <Grid item xs={12} key="component_list" style={{ marginTop: "30px" }}>
                <h3>{t("usedComponents")}</h3>
                <Divider variant="fullWidth" sx={{ bgcolor: theme.palette.secondary.main }}></Divider>
                {componentData.components.map((el) => (
                  <ListItemSmall component_id={el} />
                ))}
              </Grid>
            )}
            {appsWhichImplement.length != 0 && (
              <Grid item xs={12} key="apps_list" style={{ marginTop: "30px" }}>
              <h3>{t("includedIn")}</h3>
              <Divider variant="fullWidth" sx={{ bgcolor: theme.palette.secondary.main }}></Divider>
              {appsWhichImplement.map((el) => (
                <ListItemSmall component_id={el} />
              ))}
            </Grid>
            )}

          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={0}>
        <Grid item xs={12} style={{ marginTop: "30px" }}>
          <div style={{
            color: "white",
            minHeight: "150px",

          }}>
            <h3>{t("description")}</h3>
            <Divider variant="fullWidth" sx={{ bgcolor: theme.palette.secondary.main }}></Divider>
            <div dangerouslySetInnerHTML={description} />
          </div>


        </Grid>

      </Grid>


    </>
  );
}

export default StoryDetailView;
