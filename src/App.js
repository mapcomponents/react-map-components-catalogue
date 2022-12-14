import React from "react";

import { Routes, Route } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import theme from "./theme.js";

import { Container, Box } from "@mui/material";

import Footer from "./components/Footer";

import StoryTeaserList from "./components/StoryTeaserList";
import MenuDrawer from "./components/MenuDrawer";
import StoryDetailView from "./components/StoryDetailView";
import DemoView from "./components/DemoView";

import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import Header from "./components/Header";

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
  spacer: {
    height: "46px",
  },
}));

const Spacer = () => {
  const classes = useStyles();

  return <div className={classes.spacer}></div>;
};

function App() {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Header />
      <div
        className="content"
        style={{
          flexGrow: 1,
          paddingTop: mediaIsMobile?"200px":"280px",
          paddingBottom: '100px'
        }}
      >
        <Routes>
          <Route
            path={"/:locale/component-detail/:component_id"}
            element={
              <Container>
                <Spacer></Spacer>
                <StoryDetailView></StoryDetailView>
              </Container>
            }
          ></Route>
          <Route
            path={"/:locale/demo/:component_name/:demo_id"}
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
            path="/:locale"
            element={
              <Container>
                <StoryTeaserList type="component"></StoryTeaserList>
              </Container>
            }
          ></Route>
          <Route
            path={"/:locale/list-apps"}
            element={
              <Container>
                <StoryTeaserList type="application"></StoryTeaserList>
              </Container>
            }
          ></Route>
          {/*<Route
            path={"/:locale/bookmarks"}
            element={
              <Container>
                <Cart open={cartDrawerOpen} setOpen={setCartDrawerOpen} />
              </Container>
            }
          ></Route>*/}
        </Routes>
      </div>
      <Footer></Footer>
      {/*<CartDrawer
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
        ></CartDrawer>*/}
      <MenuDrawer></MenuDrawer>
    </Box>
  );
}

export default App;
