import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { IconButton, Grid } from "@mui/material";

const HamburgerMenu = (props) => {
  return (
    <Grid
      item
      md={2}
      xs={12}
      style={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        fontSize: "0.8em",
      }}
    >
      <IconButton
        onClick={() => props.setCartDrawerOpen(true)}
        style={{}}
        size="large"
      >
        <FormatListBulletedIcon />
      </IconButton>
    </Grid>
  );
};

export default HamburgerMenu;
