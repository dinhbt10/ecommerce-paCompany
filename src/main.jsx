import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { I18nextProvider } from "react-i18next";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import translationEN from "./locales/en/translation.json";
import translationVI from "./locales/vi/translation.json";
import AppProvider from "./context/app.context.jsx";

const locales = localStorage.getItem("lang");

if (!locales) {
  localStorage.setItem("lang", "vi");
}

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    vi: { translation: translationVI },
  },
  lng: locales,
  fallbackLng: "vi",
  interpolation: {
    escapeValue: false,
  },
});

createRoot(document.getElementById("root")).render(
  <AppProvider>
    <BrowserRouter>
      <I18nextProvider i18n={i18n}>
        <App />
      </I18nextProvider>
    </BrowserRouter>
  </AppProvider>
);
