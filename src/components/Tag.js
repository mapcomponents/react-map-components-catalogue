import React from "react";

import { Chip } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';
import { IconButton } from "@mui/material";

import theme from "../theme";
import { lineHeight, textAlign } from "@mui/system";


const Tag = (props) => {

return (
    <>
    <div className="cutCornersTag" style={{
        backgroundColor: theme.palette.grey.main,
        height: "20px",
        display: "inline-block",
        margin: "10px 10px 10px 0px",
        color: "black",
        fontSize: "10pt",
        textAlign: "center",
        lineHeight: "20px",
        padding: props.clickable ? "5px 8px 5px 20px" : "5px 20px 5px 20px",
        fontWeight: "bold",
        display: "inline-flex"
    }}>

    {props.el}

    {props.clickable &&
    <IconButton
          onClick={(ev) => {
              //Remove tag from state
              //immutable by using slice function
              let newState = props.filterState.slice()
              const index = newState.indexOf(props.el)
              newState.splice(index, 1)
              props.setFilterState(newState)
          }}
          size="small"
          style={{justifySelf: "flex-end", color: "black"}}
        >
          <CloseIcon />
      </IconButton>
        }
    
    </div>

    </>
)

}

export default Tag;