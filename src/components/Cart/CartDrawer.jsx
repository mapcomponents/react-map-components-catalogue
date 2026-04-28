import React from "react";

import { Drawer, IconButton } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import CloseIcon from '@mui/icons-material/Close';

import Cart from "./Cart";

function CartDrawer(props) {

  const theme = useTheme();

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.setOpen(!props.open)}
      sx={{
        "& .MuiDrawer-paper": {
          background: theme.palette.background["main"],
        },
      }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
        }}
      >

      <IconButton
          onClick={() => {
            props.setOpen(!props.open)
          }}
          size="large"
          style={{display: "flex", float: "right"}}
        >
          <CloseIcon />
      </IconButton>

      <Cart open={props.open} setOpen={props.setOpen}></Cart>
        
      </div>
    </Drawer>
  );
}

export default CartDrawer;
