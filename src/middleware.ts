import { defineMiddleware } from "astro:middleware";

const LOCALES = ["es", "en"];

export const onRequest = defineMiddleware(async (context, next) => {
  const { url, cookies, redirect } = context;
  const { pathname } = url;

  // 1️⃣ Ignorar assets y archivos internos
  if (
    pathname.startsWith("/_astro") ||
    pathname.startsWith("/favicon") ||
    pathname.endsWith(".svg") ||
    pathname.endsWith(".png") ||
    pathname.endsWith(".jpg") ||
    pathname.endsWith(".css") ||
    pathname.endsWith(".js")
  ) {
    return next();
  }

  // 2️⃣ Cookie de acceso
  const hasAccess = cookies.get("wedding_access")?.value === "true";

  // 3️⃣ Extraer idioma de la URL
  const parts = pathname.split("/").filter(Boolean);
  const lang = parts[0];

  const isLocale = LOCALES.includes(lang);
  const isPasswordPage = isLocale && parts[1] === "password";

  // 4️⃣ Si entra en "/" → dejar que Astro redirija a /es
  if (pathname === "/") {
    return next();
  }

  // 5️⃣ Si NO hay acceso y NO está en /{lang}/password
  if (!hasAccess && isLocale && !isPasswordPage) {
    return redirect(`/${lang}/password`);
  }

  return next();
});
