import React, {  useState, useContext, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import { useParams } from "react-router-dom";

import DemoContext from "./DemoContext";

import { Grid, Button, Paper, Chip } from "@material-ui/core";
//import HighlightOffIcon from "@material-ui/icons/HighlightOff";
//import ExtensionIcon from '@material-ui/icons/Extension';
//import ImportantDevicesIcon from '@material-ui/icons/ImportantDevices';
import ComponentListItemSmall from './ComponentListItemSmall';

function StoryDetailView(props) {
  const { component_id } = useParams();
  const demoContext = useContext(DemoContext);

  const [componentData, setComponentData] = useState({});
  const [storybookData, setStorybookData] = useState({});

  const [url, setUrl] = useState("");
  const [demos, setDemos] = useState([]);

  const [description, setDescription] = useState("");

  const fetchDescription = useCallback(() => {
    if (!url || !componentData || (componentData && !componentData.name)) return;

    fetch(url + "/catalogue/" + componentData.name + ".de.html")
      .then((res) => {
        if (!res.ok) {
          //throw new Error('No Description found');

          return "Keine Beschreibung gefunden.";
        }
        return res.text();
      })
      .then((text) => {
        setDescription(text);
      });
  }, [componentData, url]);

  useEffect(() => {
    let compData = demoContext.componentDataRef.current;
    console.log(component_id);
    console.log(demoContext.componentDataRef.current);

    (async () => {
    for (var url in compData) {
      if (typeof compData[url][component_id] !== 'undefined') {
        setUrl(url);
        await setComponentData(compData[url][component_id]);
        break;
      }
    }
    console.log(componentData)
    })()

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
  }, [componentData, fetchDescription]);

  return (
    <>
      <Grid container spacing={4}>
        <Grid
          item
          xs={8}
          style={{
            marginBottom: "80px",
            paddingBottom: "120px",
            minHeight: "500px",
          }}
          key="content"
        >
          <Grid container spacing={0}>
            <Grid key="title" item xs={12}>
              <h1 style={{ marginTop: 0 }}>{componentData.title}</h1>
            </Grid>
            <Grid key="thumbnail" item xs={12}>
              <Paper elevation={1} style={{maxHeight: '600px'}}>
                <img
                  src={componentData.thumbnail}
                  onError={(ev) => {
                    ev.target.src = "/placeholder.png";
                  }}
                  style={{width:'100%'}}
                  alt=""
                />
              </Paper>
            </Grid>
            <Grid key="description" item xs={12} style={{marginTop:'30px'}}>
              <div
                className="content"
                
                dangerouslySetInnerHTML={{ __html: description }}
              ></div>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={4} style={{ paddingTop: 0 }} key="sidebar">
          <Grid container spacing={2}>
            <Grid item xs={12} key="add_to_cart">
              <Button variant="contained" color="primary" onClick={() => {demoContext.setCartItems([...demoContext.cartItems, componentData.name])}}>
                Zur Merkliste hinzufügen
              </Button>
            </Grid>
            <Grid item xs={12} key="demo_link">
              <h3>
              Demos:
              </h3>
              { componentData && componentData.stories && componentData.stories.map((story) =>
              (<Button
                style={{width:'100%', marginBottom:'15px',}}
                component={Link}
                variant="contained"
                to={"/demo/" + story.id}
              >
                {story.name === 'Example Config' ? 'demo':story.name}
              </Button>))
              }
            </Grid>
            <Grid item xs={12} key="tags">
              {componentData.tags &&
                componentData.tags.map((el, idx) => (
                  <Chip size="small" color="primary" label={el} style={{margin:'5px 5px 0 0'}} key={idx} />
                ))}
            </Grid>
              { componentData.components && (
            <Grid item xs={12} key="component_list">
              <h3>Verwendete Components</h3>
              { componentData.components.map((el) => (
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