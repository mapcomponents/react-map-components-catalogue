import React from "react";

import { Routes, Route } from "react-router-dom";

import { Container, Box } from "@mui/material";

import Footer from "./components/Footer";

import StoryTeaserList from "./components/StoryTeaserList";
import MenuDrawer from "./components/MenuDrawer";
import StoryDetailView from "./components/StoryDetailView";
import DemoView from "./components/DemoView";

import useMediaQuery from "@mui/material/useMediaQuery";
import "./App.css";
import Header from "./components/Header";


const Spacer = () => {
  return <div style={{
    height: "46px",
  }}></div>;
};

function App() {
  const mediaIsMobile = useMediaQuery("(max-width:900px)");
  return (
    <Box
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        width: "100%"
      }}
    >
      <Header />
      <div
        className="content"
        style={{
          flexGrow: 1,
          paddingTop: mediaIsMobile?"200px":"280px",
          paddingBottom: '100px',
          width:"100%"
        }}
      >
        <Routes>
          <Route
            path={"/"}
            element={
              <Container>
                <StoryTeaserList type="component"/>
              </Container>
            }
          />
          <Route
            path={"/:locale/component-detail/:component_id"}
            element={
              <Container>
                <Spacer/>
                <StoryDetailView/>
              </Container>
            }
          />
          <Route
            path={"/:locale/demo/:component_name/:demo_id"}
            element={
              <Container>
                <Spacer/>
                <DemoView/>
              </Container>
            }
          />
          <Route
            path="/:locale"
            element={
              <Container>
                <StoryTeaserList type="component"/>
              </Container>
            }
          />
          <Route
            path={"/:locale/list-apps"}
            element={
              <Container>
                <StoryTeaserList type="application"/>
              </Container>
            }
          />
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
      <Footer/>
      {/*<CartDrawer
        open={cartDrawerOpen}
        setOpen={setCartDrawerOpen}
        ></CartDrawer>*/}
      <MenuDrawer/>
    </Box>
  );
}

export default App;
