import React, { useContext, useState, useEffect} from "react";

import DemoContext from "./DemoContext";

import { Grid } from "@mui/material";

import theme from "../theme.js";

import { useTranslation } from "react-i18next";

import StoryTeaserItem from "./StoryTeaserItem";
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import FilterDropdown from "./FilterDropdown";
import { fontSize } from "@mui/system";

function StoryTeaserList(props) {
  const demoContext = useContext(DemoContext);
  const [filter, setFilter] = useState("");
  const { t, i18n } = useTranslation();

  useEffect(() => {
    //console.log(demoContext);
  }, );

  return (
    <>

    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      margin: "20px"
    }}>
    <p style={{
      width: "50%",
      fontSize: "15pt",
      fontFamily: 'Bai Jamjuree, sans-serif'
    }}>{t("intro")}</p>
    </div>

    <Grid container spacing={4}>
      <Grid xs={6} key="filter" item>
      <FilterDropdown></FilterDropdown>
      </Grid>
      <Grid xs={6} key="search" item>
      <TextField InputProps={{
          startAdornment: (
            <SearchIcon color="primary" />
          ),
        }}InputLabelProps={{style: {color: 'white', }}} placeholder={t("search")} variant="outlined" 
        onChange={(e) => setFilter(e.target.value)} size="small" color="primary" sx={{ 
          input: { color: 'white', paddingLeft: "10px"}, 
          display: "flex",
          alignItems: "flex-end",
          }}>
    </TextField>
      </Grid>
    </Grid>
        
    <Divider variant="fullWidth" sx={{
      bgcolor: theme.palette.secondary.main,
      marginBottom: "40px",
      marginTop: "10px"
      }}>
    </Divider>

      <Grid container spacing={4}>
        {demoContext.storybookUrls.map(
          (url) => {
            return demoContext.componentData[url] &&
            Object.keys(demoContext.componentData[url]).map((key) => {
              let title = i18n.resolvedLanguage !== "en" ? 
              demoContext.componentData[url][key].i18n[i18n.resolvedLanguage].title : 
              demoContext.componentData[url][key].title
              if(demoContext.componentData[url][key].type === props.type && title.toLowerCase().includes(filter.toLowerCase())){
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
