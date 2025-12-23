import en from "../locales/en.json";
import es from "../locales/es.json";

export const languages = {
  en: "English",
  es: "Español",
};

const defaultLang = "es";

const translations: Record<string, any> = { en, es };

export function getLocale(lang: string) {
  return lang === "es" || lang === "en" ? lang : "en";
}
export function t(locale: "en" | "es", key: string) {
  return (
    key.split(".").reduce((obj, i) => obj?.[i], translations[locale]) || key
  );
}

export function useTranslatedPath(lang: string) {
  return function translatePath(path: string, l: string = lang) {
    // 1. Asegurarnos de que el path siempre empiece por /
    const cleanPath = path.startsWith("/") ? path : `/${path}`;

    // 3. Evitar la doble barra al concatenar: /en + /rsvp = /en/rsvp
    // Usamos una limpieza simple para asegurar que solo hay una barra entre el idioma y el path
    const normalizedPath = cleanPath === "/" ? "" : cleanPath;
    return `/${l}${normalizedPath}`;
  };
}

export function getLangFromUrl(url: URL) {
  const [, lang] = url.pathname.split("/");
  if (lang) return lang as string;
  return defaultLang;
}
