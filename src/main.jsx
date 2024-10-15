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

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: translationEN },
    vi: { translation: translationVI },
  },
  lng: "en", // Ngôn ngữ mặc định
  fallbackLng: "en", // Ngôn ngữ dự phòng nếu không tìm thấy dịch
  interpolation: {
    escapeValue: false, // React đã bảo vệ chống XSS
  },
});

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <I18nextProvider i18n={i18n}>
      <App />
    </I18nextProvider>
  </BrowserRouter>
);
