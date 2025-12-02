import { ref } from "vue";

export const locale = ref("es");

export function setLocale(newLocale) {
  locale.value = newLocale;
}

// Detecta idioma de la URL al cargar en el cliente
if (typeof window !== "undefined") {
  const langFromUrl = window.location.pathname.split("/")[1];

  if (langFromUrl === "en" || langFromUrl === "es") {
    locale.value = langFromUrl;
  }
}
