import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./styles/global.css";

/** זמן מינימום שהלואדר נשאר גלוי לפני fade (גם אם load כבר קרה) */
const LOADER_MIN_VISIBLE_MS = 1200;
/** אם אירוע load לא מגיע (רשת איטית וכו׳) — מתחילים יציאה בכל זאת */
const LOADER_LOAD_FAILSAFE_MS = 4500;

function initPageLoader() {
  const loaderStartedAt = Date.now();

  const revealAfterLoader = () => {
    document.body.classList.add("is-app-revealed");
    document.querySelector(".hero")?.classList.add("loaded");
  };

  const el = document.getElementById("page-loader");
  if (!el) {
    revealAfterLoader();
    return;
  }

  let exitStarted = false;
  let fallbackAfterFade;
  let bootRevealed = false;
  let minVisibleTimer = null;

  const finishBoot = () => {
    if (bootRevealed) return;
    bootRevealed = true;
    window.clearTimeout(fallbackAfterFade);
    window.clearTimeout(minVisibleTimer);
    el.removeEventListener("transitionend", onLoaderFadeEnd);
    revealAfterLoader();
    el.remove();
  };

  const onLoaderFadeEnd = (e) => {
    if (e.target !== el || e.propertyName !== "opacity") return;
    finishBoot();
  };

  const startLoaderExit = () => {
    if (exitStarted) return;
    exitStarted = true;
    window.clearTimeout(loadFailsafeTimer);
    window.clearTimeout(minVisibleTimer);
    el.setAttribute("aria-busy", "false");
    el.classList.add("hide");
    fallbackAfterFade = window.setTimeout(finishBoot, 560);
    el.addEventListener("transitionend", onLoaderFadeEnd);
  };

  /** ממתין עד שעובר LOADER_MIN_VISIBLE_MS מההתחלה, ואז מתחיל fade */
  const scheduleLoaderExit = () => {
    if (exitStarted) return;
    const elapsed = Date.now() - loaderStartedAt;
    const wait = Math.max(0, LOADER_MIN_VISIBLE_MS - elapsed);
    window.clearTimeout(minVisibleTimer);
    minVisibleTimer = window.setTimeout(startLoaderExit, wait);
  };

  const loadFailsafeTimer = window.setTimeout(() => {
    if (!exitStarted) scheduleLoaderExit();
  }, LOADER_LOAD_FAILSAFE_MS);

  if (document.readyState === "complete") {
    window.requestAnimationFrame(() => scheduleLoaderExit());
  } else {
    window.addEventListener("load", () => scheduleLoaderExit(), { once: true });
  }
}

initPageLoader();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
