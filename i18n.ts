import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { getLocales } from "expo-localization";
import tr from "@/locales/tr";
import en from "@/locales/en";

const locales = { tr, en };

const deviceLocale = getLocales()[0].languageCode; // Cihaz dilini al

export const getCurrentLocale = () => i18n.language

i18n
    .use(initReactI18next)  // ✅ Bunu eklediğinden emin ol
    .init({
        resources: locales,
        lng: deviceLocale || "tr",
        fallbackLng: "tr",
        debug: false,
        supportedLngs: ["tr", "en"],
        interpolation: {
            escapeValue: false,
        },
        compatibilityJSON: "v4",
    });

export default i18n;