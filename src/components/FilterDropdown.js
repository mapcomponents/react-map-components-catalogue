import React, { useContext } from "react";
import Box from "@mui/material/Box";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import theme from "../theme";

import DemoContext from "./DemoContext";
import { styled } from "@mui/material/styles";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

const MccSelect = styled(Select)({
  ".MuiOutlinedInput-notchedOutline": { border: 0 },
});

const FilterDropdown = (props) => {
  const demoContext = useContext(DemoContext);

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
    <Box sx={{ minWidth: 120, ...props.sx }}>
      <FormControl size="small" style={{ width: "40vw", maxWidth: "250px" }}>
        <InputLabel id="inputlabel-filter" sx={{}}>
          <FilterAltIcon
            sx={{
              color: theme.palette.primary.main,
              fontSize: "1rem",
              marginBottom: "-2px",
            }}
          />{" "}
          FILTER
        </InputLabel>
        <MccSelect
          multiple
          labelId="inputlabel-filter"
          label="FILTER"
          //color="primary"
          value={props.filterState}
          onChange={handleChange}
        >
          {demoContext.tagList.map((tag) => (
            <MenuItem key={tag} value={tag}>
              {tag}
            </MenuItem>
          ))}
        </MccSelect>
      </FormControl>
    </Box>
  );
};

export default FilterDropdown;
