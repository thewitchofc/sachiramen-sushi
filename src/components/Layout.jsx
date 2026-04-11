import { Suspense, lazy } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { FloatingOrder } from "./FloatingOrder.jsx";
import { Header } from "./Header.jsx";
import { WhatsappManeki } from "./WhatsappManeki.jsx";

const Footer = lazy(() =>
  import("./Footer.jsx").then((m) => ({ default: m.Footer }))
);

export function Layout() {
  const { pathname } = useLocation();
  const showWhatsappCat = pathname === "/" || pathname === "/menu";

  return (
    <>
      <Header />
      <main className="main-content">
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
