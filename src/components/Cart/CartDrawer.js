import React, { useContext } from "react";

import { Drawer, Grid, IconButton } from "@mui/material";

import CloseIcon from '@mui/icons-material/Close';

import makeStyles from "@mui/styles/makeStyles";

import Cart from "./Cart";

const useStyles = makeStyles((theme) => ({
  paper: {
    background: theme.palette.background.main,
  },
}));

function CartDrawer(props) {

  const classes = useStyles();

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.setOpen(!props.open)}
      classes={{ paper: classes.paper }}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
          color: "white"
        }}
      >

      <IconButton
          onClick={(ev) => {
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
