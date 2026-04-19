import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    /* שחזור גלילת תפריט ב־MenuSection — לא לאפס כאן */
    if (pathname === "/menu") return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}
