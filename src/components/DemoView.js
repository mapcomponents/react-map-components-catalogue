import React, { useCallback, useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";

import DemoContext from "./DemoContext";

function DemoView() {
  const { component_name, demo_id } = useParams();

  const [demoViewerOpen, setDemoViewerOpen] = useState(false);
  const demoContext = useContext(DemoContext);

  const [demoUrl, setDemoUrl] = useState("");

  const init = useCallback(
    (demo_id) => {
      if (!demoContext.componentData?.[component_name] || !demo_id) return;

      let _compData = demoContext.componentData?.[component_name];

      _compData.demos?.forEach((demo) => {
        if ((demo.id ? demo.id : demo.name) === demo_id) {
          setDemoUrl(demo.url);
          setTimeout(() => {
            setDemoViewerOpen(true);
          }, 500);
        }
      });
    },
    [demoContext, component_name]
  );

  useEffect(() => {
    init(demo_id);
  }, [init, demo_id]);

  useEffect(() => {
    init(demo_id);
  }, [demoContext.storybookData, init, demo_id]);

  return (
    <div
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