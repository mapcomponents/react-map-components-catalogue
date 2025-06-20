import React, { useMemo, useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import { DemoContextProviderCore } from "./DemoContext";

let storybookUrls = [
  "https://mapcomponents.github.io/react-map-components-maplibre", // MapLibre
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

  /**
   * enrich storybook mc_meta.json data with thumbnail URL and demo URLs from stories.json
   */

  const applyStorybookDataToMcMeta = ({
                                        componentData,
                                        storybookData,
                                        compId,
                                        url,
                                      }) => {
    let catalogueDemoExists = false;
    for (var storyId in storybookData.stories) {
      let _compName = storybookData.stories[storyId].kind.split("/");
      if (
        typeof _compName[1] !== "undefined" &&
        _compName[1] === compId &&
        storybookData.stories[storyId].name === "Catalogue Demo"
      ) {
        catalogueDemoExists = true;
      }
    }

    for (storyId in storybookData.stories) {
      let _storyData = storybookData.stories[storyId];
      let _compName = _storyData.kind.split("/");
      if (typeof _compName[1] !== "undefined" && _compName[1] === compId) {
        if (
          _storyData.name === "Catalogue Demo" ||
          (!catalogueDemoExists && _storyData.name === "Example Config")
        ) {
          componentData.url = url;
          componentData.demos = [];
          componentData.demos.push({
            name: "demo",
            url: url + "/iframe.html?id=" + _storyData.id + "&viewMode=story",
            id: _storyData.id,
          });
          componentData.thumbnail =
            url + "/thumbnails/" + _compName[1] + ".png";
        }
      }
    }
    return componentData;
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
    for (r = 0, len = storybookUrls.length; r < len; r++) {
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
      let componentData = {};
      // process mc_meta.json & storybook data
      for (var url in componentDataRef.current) {
        let _compObj = componentDataRef?.current[url];
        for (var compId in _compObj) {
          let _compData = _compObj[compId];
          _compData.stories = [];

          if (typeof storybookDataRef.current[url] !== "undefined") {
            _compData = applyStorybookDataToMcMeta({
              componentData: _compData,
              storybookData: storybookDataRef.current[url],
              compId,
              url,
            });
          }
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