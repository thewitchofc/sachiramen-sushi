import { Suspense, lazy, useEffect, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import {
  trackOrderNowClick,
  trackScrollToBottom,
  trackWhatsAppClick,
} from "../analytics/gaEvents.js";
import { trackGaPageView } from "../analytics/trackGaPageView.js";
import { FloatingOrder } from "./FloatingOrder.jsx";
import { Header } from "./Header.jsx";
import { JsonLdRestaurant } from "./JsonLdRestaurant.jsx";
import { SeoHead } from "./SeoHead.jsx";
import { WhatsappManeki } from "./WhatsappManeki.jsx";

const Footer = lazy(() =>
  import("./Footer.jsx").then((m) => ({ default: m.Footer }))
);

export function Layout() {
  const { pathname, search } = useLocation();
  const showWhatsappCat = pathname === "/" || pathname === "/menu";
  const prevPathRef = useRef(null);
  const scrollDepthSentRef = useRef(false);

  useEffect(() => {
    scrollDepthSentRef.current = false;
  }, [pathname]);

  useEffect(() => {
    const onClickCapture = (e) => {
      const orderEl = e.target.closest("[data-track-order]");
      if (orderEl instanceof HTMLElement) {
        trackOrderNowClick(orderEl.dataset.trackOrder || "unknown");
      }
      const waEl = e.target.closest("[data-track-whatsapp]");
      if (waEl instanceof HTMLElement) {
        trackWhatsAppClick(waEl.dataset.trackWhatsapp || "whatsapp");
      }
    };
    document.addEventListener("click", onClickCapture, true);
    return () => document.removeEventListener("click", onClickCapture, true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      if (scrollDepthSentRef.current) return;
      const el = document.documentElement;
      const maxScroll = el.scrollHeight - el.clientHeight;
      if (maxScroll <= 0) return;
      const nearBottom =
        window.scrollY + window.innerHeight >= el.scrollHeight - 80;
      const deepEnough = window.scrollY >= maxScroll * 0.88;
      if (nearBottom || deepEnough) {
        scrollDepthSentRef.current = true;
        trackScrollToBottom();
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.requestAnimationFrame(onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [pathname]);

  useEffect(() => {
    const key = `${pathname}${search}`;
    if (prevPathRef.current === null) {
      prevPathRef.current = key;
      return;
    }
    if (prevPathRef.current === key) return;
    prevPathRef.current = key;
    trackGaPageView(pathname, search);
  }, [pathname, search]);

  return (
    <>
      <SeoHead />
      <JsonLdRestaurant />
      <a href="#main-content" className="skip-link">
        דלג לתוכן
      </a>
      <Header />
      <main id="main-content" className="main-content">
        <Outlet />
      </main>
      <Suspense fallback={null}>
        <Footer />
      </Suspense>
      <FloatingOrder />
      {showWhatsappCat ? <WhatsappManeki /> : null}
    </>
  );
}
