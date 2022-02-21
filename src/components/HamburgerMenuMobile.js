import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const HamburgerMenuMobile = (props) => {
  return (
    <IconButton
      onClick={() => props.setMenuDrawerOpen(true)}
      style={{}}
      size="large"
    >
      <MenuIcon />
    </IconButton>
  );
};

export default HamburgerMenuMobile;
