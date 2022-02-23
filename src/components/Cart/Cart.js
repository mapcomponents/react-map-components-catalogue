import React, { useContext } from "react";

import DemoContext from "./../DemoContext";

import { Drawer, Grid, IconButton } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

import ComponentListItemSmall from "./../ComponentListItemSmall";

import { useTranslation } from "react-i18next";


function Cart(props) {
  const demoContext = useContext(DemoContext);
  const { t } = useTranslation();



  return(
      <>
      <h1>{t("bookmark")}</h1>
      {demoContext.cartItems.length == 0 && <h3 style={{textAlign: "center", margin: "200px 50px 200px 50px"}}>{t("empty")}</h3>}
      {demoContext.cartItems.map((el) => (
        <Grid container key={"cli_" + el.id}>
          <Grid item xs={10} key="item">
            <ComponentListItemSmall
              component_id={el}
              onClick={() => {
                props.setOpen(false);
              }}
            />
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
              color="secondary"
            >
              <HighlightOffIcon />
            </IconButton>
          </Grid>
        </Grid>
      ))}
      </>
    
  );
                
}

export default Cart;    
