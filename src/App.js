import React, { useState } from "react";
import logo from "./assets/WG-MapComponents-Logo_rgb-weisse-schrift.png";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import SettingsIcon from "@mui/icons-material/Settings";
import HamburgerMenu from "./components/HamburgerMenu";
import HamburgerMenuMobile from "./components/HamburgerMenuMobile";
import LanguageSelection from "./components/LanguageSelection";

import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

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
import Cart from "./components/Cart/Cart";
import MenuDrawer from "./components/MenuDrawer";
import StoryDetailView from "./components/StoryDetailView";
import LinkMaterial from '@mui/material/Link';
import DemoView from "./components/DemoView";

import useMediaQuery from "@mui/material/useMediaQuery";

import "./App.css";
import { useTranslation, Trans } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    fontWeight: "bold",
    color: "white",
    "&:hover": {
      //backgroundColor: "#a51b3b",
    },
  },
  header: {
    padding: "10px 0",
    backgroundColor: theme.palette.background.main //'#1c1e21' //"#f1f1f1",
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
  const { t, i18n } = useTranslation();

  const mediaIsMobile = useMediaQuery("(max-width:900px)");

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

  const HeaderMenuRight = () => (
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
      {!mediaIsMobile && <LanguageSelection ></LanguageSelection>}
      <div id="separator" style={{width: "30px"}}></div>

      {mediaIsMobile ? <HamburgerMenuMobile setMenuDrawerOpen={setMenuDrawerOpen}></HamburgerMenuMobile> : <HamburgerMenu setCartDrawerOpen={setCartDrawerOpen}/>}
    </Grid>
  );

  return (
    <Box
      bgcolor={theme.palette.background.main}
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column", color: "white" }}
    >
      <AppBar position="static" className={classes.header}>
        <Toolbar variant="dense">
          <Grid container>
            <Grid item md={2} xs={8} style={{display: "flex", alignItems: "center", }}>
            <Link to="/">
                <img src={logo} className="App-logo" alt="logo" />
             </Link>
            </Grid>
            {mediaIsMobile && <HeaderMenuRight />}
            <Grid
              item
              md={8}
              xs={12}
              style={{
                display: "flex",
                justifyContent: "center", 
                alignItems: "center",
              }}
            >
              {!mediaIsMobile && <ToggleButtonGroup
                variant="contained"
                color="primary"
                aria-label="contained primary button group"
                value={location.pathname}
              >
                <ToggleButton
                  to="/"
                  className={classes.menuButton}
                  component={Link}
                  value={"/"}
                >
                  MapComponents
                </ToggleButton>
                <ToggleButton
                  to="/list-apps"
                  className={classes.menuButton}
                  component={Link}
                  value={"/list-apps"}
                >
                  {t("sampleApplications")}
                </ToggleButton>
              </ToggleButtonGroup> }


            </Grid>
            {!mediaIsMobile && <HeaderMenuRight />}
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
      <div className="content" style={{ flexGrow: 1, paddingTop: "20px", fontFamily: 'Chakra Petch, sans-serif' }}>
        <Routes>
          <Route
            path={"/component-detail/:component_id"}
            element={
              <Container>
                <Spacer></Spacer>
                <StoryDetailView></StoryDetailView>
              </Container>
            }
          ></Route>
          <Route
            path={"/demo/:story_id"}
            element={
              <Container>
                <Spacer></Spacer>
                <DemoView></DemoView>
              </Container>
            }
          ></Route>
          <Route
            path={"/"}
            element={
              <Container>
                <StoryTeaserList type="component"></StoryTeaserList>
              </Container>
            }
          ></Route>
          <Route
            path={"/list-apps"}
            element={
              <Container>
                <StoryTeaserList type="application"></StoryTeaserList>
              </Container>
            }
          ></Route>
          <Route
            path={"/bookmarks"}
            element={
              <Container>
                <Cart         
                  open={cartDrawerOpen}
                  setOpen={setCartDrawerOpen}/>
              </Container>
            }
          ></Route>
        </Routes>
      </div>
      <Footer></Footer>
      <CartDrawer
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
      ></CartDrawer>
        <MenuDrawer
        open={menuDrawerOpen}
        setOpen={setMenuDrawerOpen}
      ></MenuDrawer>
    </Box>
  );
}

export default App;
