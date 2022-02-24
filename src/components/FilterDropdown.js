import React, {useContext} from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import DemoContext from "./DemoContext";
import theme from "../theme.js";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  selectItem: {
    color: "white"
  },
}));


const FilterDropdown = (props) => {
  
  const demoContext = useContext(DemoContext);
  const classes = useStyles(theme);

  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl size="small" style={{width: "40vw", maxWidth: "250px"}}>
      <InputLabel id="inputlabel-filter" sx={{ 
          color: 'white', 
          }}>FILTER</InputLabel>
      <Select
        labelId="inputlabel-filter"
        label="FILTER"
        color="primary"
        variant="outlined"
        /*InputLabelProps={{style: {color: 'white',}}}   */
        style={{
          color: "white",
        }}
        value={props.filterState}
        onChange={props.setFilterState}
      >
        {demoContext.tagList.map(tag => <MenuItem className={classes.selectItem} value={tag}>{tag}</MenuItem>)}
      </Select>
    </FormControl>
  </Box>
  );
};

export default FilterDropdown;
