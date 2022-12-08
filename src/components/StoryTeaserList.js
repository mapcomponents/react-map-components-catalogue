import React, { useContext, useState, useEffect } from "react";

import DemoContext from "./DemoContext";

import { Grid } from "@mui/material";

import theme from "../theme.js";

import { useTranslation } from "react-i18next";
import useMediaQuery from "@mui/material/useMediaQuery";

import StoryTeaserItem from "./StoryTeaserItem";
import Divider from "@mui/material/Divider";
import TextField from "@mui/material/TextField";
import SearchIcon from "@mui/icons-material/Search";
import FilterDropdown from "./FilterDropdown";
import Tag from "./Tag";

function StoryTeaserList(props) {
  const demoContext = useContext(DemoContext);
  const [search, setSearch] = useState("");
  const [filterState, setFilterState] = useState([]);
  const { t, i18n } = useTranslation();
  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  var atLeastOneItem = 0;

  return (
    <>
      <Grid container spacing={4} key="filterContainer">
        <Grid xs={6} key="filter" item>
          <FilterDropdown
            filterState={filterState}
            setFilterState={setFilterState}
          ></FilterDropdown>
        </Grid>
        <Grid xs={6} key="search" item>
          <TextField
            InputProps={{
              startAdornment: <SearchIcon color="primary" />,
            }}
            InputLabelProps={{ style: { } }}
            placeholder={t("search")}
            variant="outlined"
            onChange={(e) => setSearch(e.target.value)}
            size="small"
            color="primary"
            sx={{
              input: { paddingLeft: "10px" },
              display: "flex",
              alignItems: "flex-end",
            }}
          ></TextField>
        </Grid>
      </Grid>

      <Divider
        variant="fullWidth"
        sx={{
          bgcolor: theme.palette.secondary.main,
          marginBottom: "0px",
          marginTop: "10px",
        }}
      ></Divider>

      {filterState.map((tag) => {
        return (
          <Tag
            clickable
            el={tag}
            filterState={filterState}
            setFilterState={setFilterState}
          ></Tag>
        );
      })}

      <Grid
        container
        spacing={4}
        style={
          mediaIsMobile
            ? { paddingLeft: "30px", paddingRight: "30px", marginTop: "0px" }
            : { marginTop: "0px" }
        }
        key="componentContainer"
      >
        {Object.keys(demoContext.componentData).map((componentName) => {
          let _compData = demoContext.componentData[componentName];
          if (
            _compData.type === props.type &&
            _compData.title.toLowerCase().includes(search.toLowerCase())
          ) {
            let result = filterState.every((o) => _compData.tags.includes(o));
            if (result) {
              atLeastOneItem = true;
              return (
                <StoryTeaserItem
                  kind={componentName}
                  key={componentName}
                  compData={demoContext.componentData[componentName]}
                ></StoryTeaserItem>
              );
            }
          }
          return null;
        })}
        {demoContext.storybookUrls.map((url) => {
          return (
            demoContext.componentData[url] &&
            Object.keys(demoContext.componentData[url]).map((key) => {
              let title =
                i18n.resolvedLanguage !== "en"
                  ? demoContext.componentData[url][key].i18n[
                      i18n.resolvedLanguage
                    ].title
                  : demoContext.componentData[url][key].title;
              if (
                demoContext.componentData[url][key].type === props.type &&
                title.toLowerCase().includes(search.toLowerCase())
              ) {
                let result = filterState.every((o) =>
                  demoContext.componentData[url][key].tags.includes(o)
                );
                if (result) {
                  return (
                    <StoryTeaserItem
                      kind={key}
                      key={key}
                      compData={demoContext.componentData[url][key]}
                    ></StoryTeaserItem>
                  );
                }
              }
              return null;
            })
          );
        })}
        {!atLeastOneItem ? (
          <h3
            style={{
              textAlign: "center",
              width: "100%",
              margin: "200px 50px 200px 50px",
            }}
          >
            {t("noMatches")}
          </h3>
        ) : (
          ""
        )}
      </Grid>
    </>
  );
}

export default StoryTeaserList;
