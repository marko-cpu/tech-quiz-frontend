import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '@fortawesome/fontawesome-free/css/all.min.css';
import i18n from "i18next";
import en_locale from "../src/localization/en.json"
import srb_locale from "../src/localization/srb.json"

import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en_locale },
      srb: { translation: srb_locale },
    },
    lng: localStorage.getItem("i18nextLng") || "en", // Postavi podrazumevani jezik
    fallbackLng: "en", // Ako ne postoji prevod, koristi engleski
    interpolation: {
      escapeValue: false
    }
  });
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
