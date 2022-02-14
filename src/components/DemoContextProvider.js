import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DemoContextProviderCore } from "./DemoContext";

function camelCaseToDash(str) {
  if (typeof str === "string") {
    return str.replace(/([a-zA-Z])(?=[A-Z])/g, "$1-").toLowerCase();
  }
  return "";
}

function storiesJsonElToComponentId(el) {
  return camelCaseToDash(el.kind + el.name)
    .replace("/", "-")
    .replaceAll(" ", "-");
}

const hostname_ = window.location.hostname;

let storybookUrls = [
  "https://mapcomponents.github.io/react-map-components-maplibre", // MapLibre
  "https://mapcomponents.github.io/react-map-components-maplibre-lab", // MapLibre-Lab
  //"http://" + hostname_ + ":4080", // OpenLayers
];

/**
if (window.location.host.indexOf("mapcomponents.org") === -1) {
  storybookUrls = [
    "http://" + window.location.hostname + ":6006", // MapLibre
  ];
}
 */

const DemoContextProvider = ({ children }) => {
  const [componentData, setComponentData] = useState({});
  const componentDataRef = useRef({});

  const [storybookData, setStorybookData] = useState({});
  const storybookDataRef = useRef({});

  // restore cart from localstorage
  const [cartItems, setCartItems] = useState(
    localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : []
  );

  /**
   * Retrieve the component metadata object stored in *.meta.json aside the component
   */
  const getComponentDataByName = (name) => {
    for (let url in componentData) {
      if (componentData[url][name]) {
        return componentData[url][name];
      }
    }

    return null;
  };

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    let promises = [];

    for (var r = 0, len = storybookUrls.length; r < len; r++) {
      promises.push(
        ((url) =>
          fetch(url + "/catalogue/mc_meta.json")
            .then((res) => {
              if (!res.ok) {
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then((data) => {
              let tmpData = {};
              tmpData[url] = data;

              componentDataRef.current = {
                ...componentDataRef.current,
                ...tmpData,
              };
            })
            .catch((msg) => {
              console.log("error");
              console.log(msg);
            }))(storybookUrls[r])
      );
      
      promises.push(
        ((url) =>
          fetch(url + "/stories.json")
            .then((res) => {
              if (!res.ok) {
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then((data) => {
              let tmpData = {};
              tmpData[url] = data;

              storybookDataRef.current = {
                ...storybookDataRef.current,
                ...tmpData,
              };
            })
            .catch((msg) => {
              console.log("error");
              console.log(msg);
            }))(storybookUrls[r])
      );
    }

    Promise.all(promises).then(() => {
      for (var url in componentDataRef.current) {
        let _compObj = componentDataRef?.current[url];
        for (var compId in _compObj) {
          let _compData = _compObj[compId];
          _compData.stories = [];

          for (var storyId in storybookDataRef.current[url].stories) {
            let _storyData = storybookDataRef.current[url].stories[storyId];
            let _compName = _storyData.kind.split("/");
            if (
              typeof _compName[1] !== "undefined" &&
              _compName[1] === compId
            ) {
              _compData.stories.push(_storyData);
              _compData.thumbnail =
                url + "/thumbnails/" + _compName[1] + ".png";
            }
          }
          componentDataRef.current[url][compId] = _compData;
        }
      }
      setComponentData(componentDataRef.current);
    });
  }, []);

  const value = {
    storybookData: storybookData,
    setStorybookData: setStorybookData,
    storybookDataRef: storybookDataRef,
    storybookUrls: storybookUrls,
    componentDataRef: componentDataRef,
    componentData: componentData,
    cartItems: cartItems,
    setCartItems: setCartItems,
    getComponentDataByName: getComponentDataByName,
  };

  return (
    <DemoContextProviderCore value={value}>{children}</DemoContextProviderCore>
  );
};

DemoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContextProvider;
