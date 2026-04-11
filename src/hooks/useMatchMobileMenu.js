import { useSyncExternalStore } from "react";

const QUERY = "(max-width: 768px)";

function subscribe(onChange) {
  const mq = window.matchMedia(QUERY);
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

function getServerSnapshot() {
  return false;
}

/** true במסכים עד 768px — תואם @media (max-width: 768px) */
export function useMatchMobileMenu() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
