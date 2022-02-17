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
          sampleApplications: "APPLICATIONS",

          // footer
          imprint: "Imprint",
          dataProtection: "Data protection",
          cookieSettings: "Cookie settings",

          // detail view
          noDescription: "No description available.",
          addToBookmarks: "Add to bookmarks",
          usedComponents: "Used Components",
          description: "Description",

          // cart drawer
          bookmark: "Bookmarks",

          // teaser list
          search: "Search",
          intro: "A MapComponent is a react component that accepts at least 1 attribute \"mapId\" (there are some exceptions) and is expected to retrieve a maplibre-gl instance from mapContext.",
        },
      },
      de: {
        translation: {
          // toolbar
          sampleApplications: "ANWENDUNGEN",

          //footer
          imprint: "Impressum",
          dataProtection: "Datenschutz",
          cookieSettings: "Cookie Einstellungen",

          // detail view
          noDescription: "Keine Beschreibung gefunden.",
          addToBookmarks: "Zur Merkliste hinzufügen",
          usedComponents: "Verwendete Components",
          description: "Beschreibung",

          // cart drawer
          bookmark: "Merkliste",

           // teaser list
           search: "Suche",
           intro: "Ein MapComponent ist ein React Component, das mindestens ein Attribut \"mapId\" akzeptiert (mit ein paar Ausnahmen) und erwartet eine maplibre-gl-Instanz vom mapContext.",
        },
      },
    },
  });

export default i18n;
