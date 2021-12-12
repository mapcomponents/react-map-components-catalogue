import React, { useCallback, useState, useContext, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";

import DemoContext from "./DemoContext";

import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";

function DemoView(props) {
  const { story_id } = useParams();
  const history = useHistory();

  const [demoViewerOpen, setDemoViewerOpen] = useState(false);
  const demoContext = useContext(DemoContext);

  const [demoUrl, setDemoUrl] = useState("");
  const [fadein, setFadein] = useState(false);


  const init = useCallback((story_id) => {
    if (demoUrl) return;
    if (!demoContext.storybookData || !story_id) return;

    setFadein(true);

    let sbData = demoContext.storybookDataRef.current;

    console.log(story_id)
    for (var url in sbData) {
      for (var story_key in sbData[url].stories) {
        if (story_key === story_id) {
          setDemoUrl(
            url + "/iframe.html?id=" + story_id + "&viewMode=story"
          );
          console.log(url + "/iframe.html?id=" + story_id + "&viewMode=story");

          setTimeout(() => {
            setDemoViewerOpen(true);
          },500);
          break;
        }
      }
    }
  }, [demoUrl, demoContext]);

  useEffect(() => {
    init(story_id);
  }, []);

  useEffect(() => {
    init(story_id);
  }, [demoContext.storybookData, init, story_id]);

  return (
    <div
      className={fadein ? "demoOverlay-fadein" : "demoOverlay-fadeout"}
      style={{
        position: "fixed",
        zIndex: 1000,
        top: 0,
        right: 0,
        left: 0,
        height: "100vh",
        backgroundColor: "#000",
      }}
    >
      <div
        className={fadein ? "" : "demoOverlayBlackscreen-fadein"}
        style={{
          position: "fixed",
          zIndex: 10000000,
          top: 0,
          right: 0,
          left: 0,
          height: "100vh",
          backgroundColor: "#000",
          display: fadein ? "none" : "block",
        }}
      ></div>
      <div
        className="closeDemo"
        style={{
          cursor: "pointer",
          position: "fixed",
          zIndex: 1020,
          bottom: 0,
        }}
      >
        <IconButton
          onClick={() => {
            setFadein(false);
            setTimeout(() => {
              history.goBack();
            }, 480);
          }}
          aria-label="delete"
          size="large"
        >
          <HighlightOffIcon style={{ fontSize: "3em" }}></HighlightOffIcon>
        </IconButton>
      </div>
      {demoViewerOpen && (
        <iframe
          title="component-demo-viewer"
          src={demoUrl}
          frameBorder="0"
          allow="geolocation 'self' https://www.mapcomponents.org"
          style={{
            position: "fixed",
            zIndex: 1010,
            width: "1px",
            minWidth: "100%",
            border: "none",
            top: 0,
            right: 0,
            left: 0,
            height: "100vh",
            overflow: "hidden",
          }}
        ></iframe>
      )}
    </div>
  );
}

export default DemoView;
