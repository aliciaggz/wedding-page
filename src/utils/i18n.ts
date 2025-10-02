import en from "../locales/en.json";
import es from "../locales/es.json";

export const languages = {
  en: 'English',
  es: 'Español',
};

const showDefaultLang = false;
const defaultLang = 'es';


const translations: Record<string, any> = { en, es };

export function getLocale(lang: string) {
  return (lang === "es" || lang === "en") ? lang : "en";
}
export function t(locale: "en" | "es", key: string) {
  return key.split(".").reduce((obj, i) => obj?.[i], translations[locale]) || key;
}

export function useTranslatedPath(lang: string) {
  return function translatePath(path: string, l: string = lang) {
    return !showDefaultLang && l === defaultLang ? path : `/${l}${path}`
  }
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split('/');
  if (lang) return lang as string;
  return defaultLang;
}
