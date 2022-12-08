import React, { useState } from "react";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";

const languages = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const LanguageSelection = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  let resolvedLanguage = i18n.resolvedLanguage;

  const handleChangeLanguage = (code) => {
    let target = location.pathname;
    if (target === "/") {
      target = `/${code}${target}`;
    }
    if (resolvedLanguage !== code) {
      target = target.replace(`/${resolvedLanguage}`, `/${code}`);
      navigate(target);
    }
    localStorage.setItem("i18nextLng", code);
    i18n.changeLanguage(code);
  };

  let buttons = Object.keys(languages).map((key, index) => (
    <div key={key}>
      <span style={{ whiteSpace: "pre" }}>
        {index != 0 ? " | " : ""}
      </span>

      <Button
        style={{ color: key === resolvedLanguage ? "green" : "initial" }}
        onClick={() => handleChangeLanguage(key)}
        underline="hover"
        key={key}
      >
        {key.toUpperCase()}
      </Button>
    </div>
  ));

  return buttons;
};

export default LanguageSelection;
