import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton } from "@mui/material";

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
