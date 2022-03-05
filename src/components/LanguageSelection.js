import React, { useState } from "react";

import makeStyles from "@mui/styles/makeStyles";

import LinkMaterial from "@mui/material/Link";

import { useTranslation, Trans } from "react-i18next";

const languages = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  let resolvedLanguage = i18n.resolvedLanguage;

  let buttons = Object.keys(languages).map((key, index) => (
    <div key={key}>
      <span style={{ whiteSpace: "pre", color: "white" }}>
        {index != 0 ? " | " : ""}
      </span>

      <LinkMaterial
        style={{ color: key == resolvedLanguage ? "primary" : "white" }}
        href="#"
        onClick={() => i18n.changeLanguage(key)}
        underline="hover"
        key={key}
      >
        {key.toUpperCase()}
      </LinkMaterial>
    </div>

    /*
      <ToggleButton
        value={key}
        key={key}
        onClick={() => i18n.changeLanguage(key)}
      >
        {key.toUpperCase()}
      </ToggleButton>
  */
  ));

  return buttons;

  /*
      <ToggleButtonGroup
        color="primary"
        children={buttons}
        exclusive
        size="small"
        aria-label="text button group"
        value={resolvedLanguage}
      ></ToggleButtonGroup>
      */
};

export default LanguageSelection;
