/** מזהה GA4 — זמין בקליינט רק עם קידומת VITE_ */
const GA_ID =
  typeof import.meta !== "undefined" &&
  typeof import.meta.env?.VITE_GA_MEASUREMENT_ID === "string"
    ? import.meta.env.VITE_GA_MEASUREMENT_ID.trim()
    : "";

function isValidGa4Id(id) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

/**
 * עדכון צפייה בעמוד בניווט SPA (אחרי טעינה ראשונית שמטופלת ע״י gtag config).
 */
export function trackGaPageView(pathname, search = "") {
  if (!isValidGa4Id(GA_ID)) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  const pagePath = `${pathname || "/"}${search || ""}`;
  window.gtag("config", GA_ID, { page_path: pagePath });
}
