import React from "react";

import { Chip } from "@mui/material";

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
        padding: "5px 20px 5px 20px",
        fontWeight: "bold",
    }}>

    {props.el}
    
    </div>

    </>
)

}

export default Tag;