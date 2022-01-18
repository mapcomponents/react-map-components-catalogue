import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

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
    fallbackLng: 'en',
    keySeparator: false,
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    },
    resources: {
      en: {
        translation: {
          // toolbar
          sampleApplications: 'SAMPLE APPLICATIONS',
        
          // footer
          imprint: 'Imprint',
          dataProtection: 'Data protection',   
          cookieSettings: 'Cookie settings',

          // detail view
          noDescription: 'No description available.',
          addToBookmarks: 'Add to bookmarks',
          usedComponents: 'Used Components',

          // cart drawer
          bookmark: 'Bookmarks'
        } 
      },
      de: {
        translation: {
          // toolbar
          sampleApplications: 'BEISPIELANWENDUNGEN',

          //footer
          imprint: 'Impressum',
          dataProtection: 'Datenschutz',
          cookieSettings: 'Cookie Einstellungen',

          // detail view
          noDescription: 'Keine Beschreibung gefunden.',
          addToBookmarks: 'Zur Merkliste hinzufügen',
          usedComponents: 'Verwendete Components',

          // cart drawer
          bookmark: 'Merkliste'
        }
      }
    }
  });

export default i18n;