import React from "react";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import { IconButton, Grid } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";

const HamburgerMenu = (props) => {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  return (
    <Grid
      item
      md={2}
      xs={mediaIsMobile ? 4 : 12}
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
