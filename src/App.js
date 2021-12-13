import React, { useState } from "react";
import logo from "./assets/mapcomponents_logo.png";
import HamburgerMenu from "./components/HamburgerMenu";

import { Switch, Route, Link, useLocation } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import theme from "./theme.js";

import {
  ToggleButton,
  ToggleButtonGroup,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Box,
} from "@mui/material";

import Footer from "./components/Footer";

import StoryTeaserList from "./components/StoryTeaserList";
import CartDrawer from "./components/Cart/CartDrawer";
import StoryDetailView from "./components/StoryDetailView";
import DemoView from "./components/DemoView";

import useMediaQuery from "@mui/material/useMediaQuery";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    fontWeight: "bold",
    "&:hover": {
      //backgroundColor: "#a51b3b",
    },
  },
  header: {
    padding: "10px 0",
    backgroundColor: "#f1f1f1",
  },
  fullTeaser: {
    height: "100vh",
    backgroundImage: "url(https://placeskull.com/2000/1200)",
    width: "100%",
    backgroundPosition: "center",
    backgroundSize: "cover",
  },
  teaserItemImage: {
    maxWidth: "100%",
  },
  spacer: {
    height: "46px",
  },
}));

const Spacer = () => {
  const classes = useStyles();

  return <div className={classes.spacer}></div>;
};

function App() {
  const classes = useStyles(theme);
  const location = useLocation();

  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <Box
      bgcolor="background.default"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <Grid container spacing={2}>
            <Grid item md={2} xs={8}>
              <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
              </Link>
            </Grid>
            {mediaIsMobile && (
              <HamburgerMenu setCartDrawerOpen={setCartDrawerOpen} />
            )}
            <Grid
              item
              md={8}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingBottom: mediaIsMobile ? "15px" : 0,
              }}
            >
              <ToggleButtonGroup
                variant="contained"
                color="secondary"
                aria-label="contained primary button group"
                value={location.pathname}
              >
                <ToggleButton
                  to="/"
                  className={classes.menuButton}
                  component={Link}
                  value={"/"}
                >
                  Components
                </ToggleButton>
                <ToggleButton
                  to="/list-apps"
                  className={classes.menuButton}
                  component={Link}
                  value={"/list-apps"}
                >
                  Applications
                </ToggleButton>
              </ToggleButtonGroup>
            </Grid>
            {!mediaIsMobile && (
              <HamburgerMenu setCartDrawerOpen={setCartDrawerOpen} />
            )}
          </Grid>
        </Toolbar>
      </AppBar>
      {/*
        <Grid container>
          <Grid item className={classes.fullTeaser}>
            Teaser full-width
          </Grid>
        </Grid>
        */}
      <div className="content" style={{ flexGrow: 1, paddingTop: "20px" }}>
        <Switch>
          <Route path={"/component-detail/:component_id"}>
            <Container>
              <Spacer></Spacer>
              <StoryDetailView></StoryDetailView>
            </Container>
          </Route>
          <Route path={"/demo/:story_id"}>
            <Container>
              <Spacer></Spacer>
              <DemoView></DemoView>
            </Container>
          </Route>
          <Route path={"/list-apps"}>
            <Container>
              <Spacer></Spacer>
              <StoryTeaserList type="application"></StoryTeaserList>
            </Container>
          </Route>
          <Route path={"/"}>
            <Container>
              <Spacer></Spacer>
              <StoryTeaserList type="component"></StoryTeaserList>
            </Container>
          </Route>
        </Switch>
      </div>
      <Footer></Footer>
      <CartDrawer
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
      ></CartDrawer>
    </Box>
  );
}

export default App;
