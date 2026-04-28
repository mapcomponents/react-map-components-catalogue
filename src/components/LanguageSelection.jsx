import React from "react";

import { useTranslation } from "react-i18next";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@mui/material";
import { useTheme } from "@mui/material/styles";

const languages = {
  en: { nativeName: "English" },
  de: { nativeName: "Deutsch" },
};

const LanguageSelection = () => {
  const theme = useTheme();
  const { i18n } = useTranslation();
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

  return Object.keys(languages).map((key, index) => (
    <div key={key} style={{display:'flex', alignContent:'center', alignItems:'center'}}>
      <div>
        {index !== 0 ? " | " : ""}
      </div>

      <Button
        sx={
          key === resolvedLanguage
            ? {
                color: theme.palette.primary.main,
                "&:hover": {
                  backgroundColor: "initial",
                },
              }
            : {
                color: theme.palette.secondary["greyText"],
                border: "none",
                textTransform: "none",
                "&:hover": {
                  backgroundColor: "initial",
                  color: theme.palette.primary.main,
                },
              }
        }
        onClick={() => handleChangeLanguage(key)}
        key={key}
        variant='text'
      >
        {key.toUpperCase()}
      </Button>
    </div>
  ));
};

export default LanguageSelection;
