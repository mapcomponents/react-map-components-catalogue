import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

i18n
  // detect user language
  // learn more: https://github.com/i18next/i18next-browser-languageDetector
  .use(LanguageDetector)
  // pass the i18n instance to react-i18next.
  .use(initReactI18next)
  // init i18next
  // for all options read: https://www.i18next.com/overview/configuration-options
  .init({
    debug: true,
    fallbackLng: "en",
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // toolbar
          sampleApplications: "Sample Applications",

          // footer
          imprint: "Imprint",
          dataProtection: "Data protection",
          cookieSettings: "Cookie settings",

          // detail view
          noDescription: "No description available.",
          addToBookmarks: "Add to bookmarks",
          usedComponents: "Used Components",
          includedIn: "Included in",
          description: "Description",

          // cart drawer
          bookmark: "Bookmarks",
          empty: "EMPTY",

          // teaser list
          search: "Search",
          introHeading: "What is MapComponents?",
          intro:
            "The next generation webGIS: a react component framework for GIS application development by WhereGroup GmbH",
          noMatches: "No results with given filters.",
        },
      },
      de: {
        translation: {
          // toolbar
          sampleApplications: "Beispielanwendungen",

          //footer
          imprint: "Impressum",
          dataProtection: "Datenschutz",
          cookieSettings: "Cookie Einstellungen",

          // detail view
          noDescription: "Keine Beschreibung gefunden.",
          addToBookmarks: "Zur Merkliste hinzufügen",
          usedComponents: "Verwendete Components",
          includedIn: "Enthalten in",
          description: "Beschreibung",

          // cart drawer
          bookmark: "Merkliste",
          empty: "LEER",

          // teaser list
          search: "Suche",
          introHeading: "Was ist MapComponents?",
          intro:
            "Die nächste Generation von webGIS: ein React Component Framework für GIS Applications entwickelt von der WhereGroup GmbH",
          noMatches: "Keine Treffer mit den gewählten Filtern.",
        },
      },
    },
  });

export default i18n;
