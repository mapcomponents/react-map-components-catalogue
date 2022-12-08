import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

import DemoContext from "./DemoContext";
import theme from "../theme.js";
import makeStyles from "@mui/styles/makeStyles";

const useStyles = makeStyles((theme) => ({
  selectItem: {
  },
}));

const FilterDropdown = (props) => {
  const demoContext = useContext(DemoContext);
  const classes = useStyles(theme);

  const handleChange = (event) => {
    //Add tag to state
    //immutable by using slice function
    let newState = props.filterState.slice();
    newState =
      typeof event.target.value === "string"
        ? event.target.value.split(",")
        : event.target.value;
    props.setFilterState(newState);
  };

  return (
    <Box sx={{ minWidth: 120 }}>
      <FormControl size="small" style={{ width: "40vw", maxWidth: "250px" }}>
        <InputLabel
          id="inputlabel-filter"
          sx={{
          }}
        >
          FILTER
        </InputLabel>
        <Select
          multiple
          labelId="inputlabel-filter"
          label="FILTER"
          color="primary"
          variant="outlined"
          style={{
          }}
          value={props.filterState}
          onChange={handleChange}
        >
          {demoContext.tagList.map((tag) => (
            <MenuItem className={classes.selectItem} key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default FilterDropdown;
