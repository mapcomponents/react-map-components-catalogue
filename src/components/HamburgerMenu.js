import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import StarsIcon from '@mui/icons-material/Stars';
import { IconButton, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const HamburgerMenu = (props) => {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  return (
    <IconButton
      onClick={() => props.setCartDrawerOpen(true)}
      style={{}}
      size="large"
    >
      <StarsIcon />
    </IconButton>
  );
};

export default HamburgerMenu;
