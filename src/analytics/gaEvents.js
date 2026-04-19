const GA_ID =
  typeof import.meta !== "undefined" &&
  typeof import.meta.env?.VITE_GA_MEASUREMENT_ID === "string"
    ? import.meta.env.VITE_GA_MEASUREMENT_ID.trim()
    : "";

function isValidGa4Id(id) {
  return /^G-[A-Z0-9]+$/i.test(id);
}

function sendEvent(name, params = {}) {
  if (!isValidGa4Id(GA_ID)) return;
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", name, params);
}

/** לחיצה על קישור הזמנה (Wolt) — מזהה מקור לפי data-track-order */
export function trackOrderNowClick(source) {
  sendEvent("order_now_click", { cta_source: String(source || "unknown") });
}

/** לחיצה על וואטסאפ */
export function trackWhatsAppClick(source = "maneki") {
  sendEvent("whatsapp_click", { cta_source: String(source) });
}

/** כניסה לדף מנה (מעבר מותאם ל־SPA) */
export function trackDishPageEnter(dishId, dishName) {
  sendEvent("dish_page_enter", {
    dish_id: String(dishId || ""),
    dish_name: String(dishName || "").slice(0, 120),
  });
}

/** גלילה כמעט לתחתית העמוד (פעם אחת לכל נתיב) */
export function trackScrollToBottom() {
  sendEvent("scroll_bottom", {});
}
