import React, { useCallback, useState, useContext, useEffect, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";

import DemoContext from "./DemoContext";

import IconButton from "@mui/material/IconButton";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { useTranslation } from "react-i18next";

function DemoView(props) {
  const { component_name, demo_id } = useParams();
  const navigate = useNavigate();

  const [demoViewerOpen, setDemoViewerOpen] = useState(false);
  const demoContext = useContext(DemoContext);

  const [demoUrl, setDemoUrl] = useState("");
  const [closeButtonPosition, setCloseButtonPosition] = useState("bottom_left");
  const [fadein, setFadein] = useState(false);
  const { i18n } = useTranslation();

  const detailViewPath = `/${i18n.resolvedLanguage}/component-detail/${component_name}`;

  const init = useCallback(
    (demo_id) => {
      if (!demoContext.componentData?.[component_name] || !demo_id) return;

      setFadein(true);

      let _compData = demoContext.componentData?.[component_name];

      _compData.demos?.forEach((demo) => {
        if ((demo.id ? demo.id : demo.name) === demo_id) {
          setDemoUrl(demo.url);
          if (typeof demo.closeButtonPosition !== "undefined") {
            setCloseButtonPosition(demo.closeButtonPosition);
          }
          setTimeout(() => {
            setDemoViewerOpen(true);
          }, 500);
        }
      });
    },
    [demoContext, component_name]
  );

  const closeButtonCss = useMemo(() => {
    switch (closeButtonPosition) {
      case "top_left":
        return {
          top: 0,
          left: 0,
        };
      case "top_right":
        return {
          top: 0,
          right: 0,
        };
      case "bottom_right":
        return {
          bottom: 0,
          right: 0,
        };
      case "bottom_left":
      default:
        return {
          bottom: 0,
          left: 0,
        };
    }
  }, [closeButtonPosition]);

  useEffect(() => {
    init(demo_id);
  }, [init, demo_id]);

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
          ...closeButtonCss,
        }}
      >
        <IconButton
          onClick={() => {
            setFadein(false);
            setTimeout(() => {
              navigate(detailViewPath);
            }, 480);
          }}
          aria-label="close"
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
          allow="geolocation"
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
