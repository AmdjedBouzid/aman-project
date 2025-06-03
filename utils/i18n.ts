import * as Localization from "expo-localization";
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { I18nManager } from "react-native";

// استيراد ملفات اللغة
import ar from "../locales/ar.json";
import en from "../locales/en.json";
import fr from "../locales/fr.json";

type TranslationResources = {
  translation: Record<string, any>;
};

const resources: Record<string, TranslationResources> = {
  en: { translation: en },
  ar: { translation: ar },
  fr: { translation: fr },
};

const deviceLanguage = Localization.locale?.split("-")[0] as "en" | "ar" | "fr"; // تحديد النوع
const isRTL = deviceLanguage === "ar"; 

// ضبط اتجاه النص
I18nManager.forceRTL(isRTL);
I18nManager.allowRTL(isRTL);

// تهيئة i18next
i18n.use(initReactI18next).init({
  resources,
  lng: deviceLanguage, 
  fallbackLng: "en",
  interpolation: { escapeValue: false },
});

export default i18n;
