import React, { useContext, useMemo } from "react";

import DemoContext from "./../DemoContext";

import { Drawer, Grid, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import ComponentListItemSmall from "./../ComponentListItemSmall";

function CartDrawer(props) {
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
          padding: "20px",
        }}
      >
        <h3>Merkliste</h3>
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
                size="large">
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
