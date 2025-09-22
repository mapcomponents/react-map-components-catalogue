import React, { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DemoContextProviderCore } from "./DemoContext";

let storybookUrls = [
  "https://mapcomponents.github.io/mapcomponents/react-maplibre", // MapLibre
  "https://mapcomponents.github.io/react-map-components-maplibre-lab", // MapLibre-Lab
  //"http://" + hostname_ + ":4080", // OpenLayers
];

let demoProviderUrls = [
  "https://mapcomponents.github.io/react-map-components-apps/mc_meta.json",
  "https://mapcomponents.github.io/react-admin-demo-apps/mc_meta.json",
  "https://mapcomponents.github.io/european_wolves_app/mc_meta.json",
  "https://raw.githubusercontent.com/mapcomponents/pwa-demo/main/mc_meta.json"
];

const DemoContextProvider = ({ children }) => {
  const [menuDrawerOpen, setMenuDrawerOpen] = useState(false);

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

    let mcMetaUrls = [
      ...demoProviderUrls,
      ...storybookUrls.map((el) => el + "/catalogue/mc_meta.json"),
    ];
    for (var r = 0, len = mcMetaUrls.length; r < len; r++) {
      promises.push(
        ((url) =>
          fetch(url)
            .then((res) => {
              if (!res.ok) {
                throw Error(res.statusText);
              }
              return res.json();
            })
            .then((data) => {
              let tmpData = {};
              tmpData[url.replace("/catalogue/mc_meta.json", "")] = data;

              componentDataRef.current = {
                ...componentDataRef.current,
                ...tmpData,
              };
            })
            .catch((msg) => {
              console.log("error");
              console.log(msg);
            }))(mcMetaUrls[r])
      );
    }

    Promise.all(promises).then(() => {
      let componentData = {};
      // process mc_meta.json & storybook data
      for (var url in componentDataRef.current) {
        let _compObj = componentDataRef?.current[url];
        for (var compId in _compObj) {
          let _compData = _compObj[compId];
          _compData.stories = [];
          componentDataRef.current[url][compId] = _compData;
          componentData[compId] = _compData;
        }
      }
      setComponentData(componentData);
    });
  }, []);

  const tagList = useMemo(() => {
    let tags = [];
    // alle vorhandenen Tags aus componentData ermitteln und zum tags array hinzufügen
    for (let componentName in componentData) {
      for (let tag of componentData[componentName].tags) {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      }
    }
    return tags;
  }, [componentData]);

  const value = {
    storybookData: storybookData,
    setStorybookData: setStorybookData,
    storybookDataRef: storybookDataRef,
    storybookUrls: [...storybookUrls, ...demoProviderUrls],
    componentDataRef: componentDataRef,
    componentData: componentData,
    cartItems: cartItems,
    setCartItems: setCartItems,
    getComponentDataByName: getComponentDataByName,
    tagList: tagList,
    menuDrawerOpen,
    setMenuDrawerOpen,
  };

  return (
    <DemoContextProviderCore value={value}>{children}</DemoContextProviderCore>
  );
};

DemoContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default DemoContextProvider;
