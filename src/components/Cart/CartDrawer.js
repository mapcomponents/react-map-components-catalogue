import React, { useContext } from "react";

import DemoContext from "./../DemoContext";

import { Drawer, Grid, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

import useMediaQuery from "@mui/material/useMediaQuery";
import ComponentListItemSmall from "./../ComponentListItemSmall";

function CartDrawer(props) {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  const demoContext = useContext(DemoContext);

  return (
    <Drawer
      anchor="right"
      open={props.open}
      onClose={() => props.setOpen(!props.open)}
    >
      <div
        style={{
          width: "400px",
          maxWidth: "80vw",
          padding: "20px",
        }}
      >
        <div style={{ display: "flex" }}>
          <IconButton
            onClick={() => {
              props.setOpen(false);
            }}
            aria-label="close"
            size="small"
          >
            <ArrowForwardIosIcon
              style={{ fontSize: "2em" }}
            ></ArrowForwardIosIcon>
          </IconButton>
          <h3>Bookmarks</h3>
        </div>
        {demoContext.cartItems.map((el) => (
          <Grid container>
            <Grid item xs={10} key="item">
              <ComponentListItemSmall component_id={el} />
            </Grid>
            <Grid
              item
              xs={2}
              style={{
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "center",
              }}
              key="controls"
            >
              <IconButton
                onClick={(ev) => {
                  // remove item from cart
                  if (demoContext.cartItems.indexOf(el) !== -1) {
                    let tmpCartItems = [...demoContext.cartItems];
                    tmpCartItems.splice(tmpCartItems.indexOf(el), 1);
                    demoContext.setCartItems([...tmpCartItems]);
                  }
                }}
                size="large"
              >
                <HighlightOffIcon />
              </IconButton>
            </Grid>
          </Grid>
        ))}
      </div>
    </Drawer>
  );
}

export default CartDrawer;
