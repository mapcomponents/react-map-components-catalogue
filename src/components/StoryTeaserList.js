import React, { useContext } from "react";

import DemoContext from "./DemoContext";

import { Grid } from "@mui/material";

import StoryTeaserItem from "./StoryTeaserItem";

function StoryTeaserList(props) {
  const demoContext = useContext(DemoContext);

  return (
    <>
      <Grid container spacing={4}>
        {demoContext.storybookUrls.map(
          (url) => {
            return demoContext.componentData[url] &&
            Object.keys(demoContext.componentData[url]).map((key) => {
              if(demoContext.componentData[url][key].type === props.type){
                return <StoryTeaserItem kind={key} key={key} compData={demoContext.componentData[url][key]}></StoryTeaserItem>;
              }
              return null;
            });
          }
        )}
      </Grid>
      
    </>
  );
}

export default StoryTeaserList;
