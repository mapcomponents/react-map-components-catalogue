import React, {useState} from "react";
import logo from "./assets/mapcomponents_logo.png";
import FormatListBulletedIcon from '@material-ui/icons/FormatListBulleted';
import SettingsIcon from '@material-ui/icons/Settings';

import { Switch, Route, Link, useLocation } from "react-router-dom";

import theme from "./theme.js"
import {
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

import {
  IconButton,
  Button,
  ButtonGroup,
  Container,
  Grid,
  AppBar,
  Toolbar,
  Box,
} from "@material-ui/core";

import Footer from "./components/Footer";

import StoryTeaserList from "./components/StoryTeaserList";
import CartDrawer from "./components/Cart/CartDrawer";
import StoryDetailView from "./components/StoryDetailView";
import DemoView from "./components/DemoView";

import "./App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    fontWeight: "bold",
    "&:hover": {
      backgroundColor: "#a51b3b",
    },
  },
  header: {
    padding: "10px 0",
    backgroundColor: '#e4e8eb',
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

  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);

  return (
    <ThemeProvider theme={theme}>
      <Box bgcolor="background.default">
        <AppBar position="static" className={classes.header}>
          <Toolbar variant="dense">
            <Grid container spacing={2}>
              <Grid item xs={2}>
                <Link to="/">
                  <img src={logo} className="App-logo" alt="logo" />
                </Link>
              </Grid>
              <Grid
                item
                xs={8}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <ButtonGroup
                  variant="contained"
                  color="secondary"
                  aria-label="contained primary button group"
                >
                  <Button
                    to="/list-components"
                    className={classes.menuButton}
                    component={Link}
                    disabled={location.pathname === "/list-components" ? true : false}
                  >
                    Map Components
                  </Button>
                  <Button
                    to="/"
                    className={classes.menuButton}
                    component={Link}
                    disabled={
                      location.pathname === "/" ? true : false
                    }
                  >
                    Beispielanwendungen
                  </Button>
                </ButtonGroup>
              </Grid>
              <Grid
                item
                xs={2}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  fontSize:'0.8em'
                }}
              >
                  <IconButton onClick={() => setCartDrawerOpen(true)} style={{ backgroundColor: "#636363" }}>
                  <FormatListBulletedIcon />
                </IconButton>
                <IconButton style={{ marginLeft: '10px', backgroundColor: "#636363" }}>
                  <SettingsIcon />
                </IconButton>
              </Grid>
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
        <div
          className="content"
          style={{  paddingTop: "80px" }}
        >
          <Switch>
            <Route path="/component-detail/:component_id">
              <Container>
                <Spacer></Spacer>
                <StoryDetailView></StoryDetailView>
              </Container>
            </Route>
            <Route path="/demo/:story_id">
              <Container>
                <Spacer></Spacer>
                <DemoView></DemoView>
              </Container>
            </Route>
            <Route path="/list-components">
              <Container>
                <Spacer></Spacer>
                <StoryTeaserList type="component"></StoryTeaserList>
              </Container>
            </Route>
            <Route path="/">
              <Container>
                <Spacer></Spacer>
                <StoryTeaserList type="application"></StoryTeaserList>
              </Container>
            </Route>
          </Switch>
        </div>
        <Footer></Footer>
        <CartDrawer open={cartDrawerOpen} setOpen={setCartDrawerOpen}></CartDrawer>
      </Box>
    </ThemeProvider>
  );
}

export default App;
