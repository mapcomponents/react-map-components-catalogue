import React from "react";
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import theme from "../theme.js";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  selectItem: {
    color: "white"
  },
}));


const FilterDropdown = (props) => {
  const classes = useStyles(theme);

  return (
    <Box sx={{ minWidth: 120 }}>
    <FormControl fullWidth size="small">
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

      >
        <MenuItem className={classes.selectItem} value={10}>Ten</MenuItem>
        <MenuItem className={classes.selectItem} value={20}>Twenty</MenuItem>
        <MenuItem className={classes.selectItem} value={30}>Thirty</MenuItem>
      </Select>
    </FormControl>
  </Box>
  );
};

export default FilterDropdown;
