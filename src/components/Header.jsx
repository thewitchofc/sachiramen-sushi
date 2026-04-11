import { useCallback, useEffect, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { LOGO_SRC, navLinks, WOLT_URL } from "../data/siteContent.js";

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("nav-is-open", menuOpen);
    return () => document.body.classList.remove("nav-is-open");
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (e) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  const closeMenu = useCallback(() => setMenuOpen(false), []);

  return (
    <header
      className={`site-header${scrolled ? " is-scrolled" : ""}`}
      id="top"
    >
      <button
        type="button"
        className="nav-backdrop"
        aria-hidden={!menuOpen}
        tabIndex={menuOpen ? 0 : -1}
        aria-label="סגור תפריט"
        onClick={closeMenu}
      />
      <div className="header-inner">
        <Link to="/" className="logo logo-wrapper" onClick={closeMenu}>
          <img
            className="header-logo"
            src={LOGO_SRC}
            alt="Sachi Ramen & Sushi — סאצ׳י ראמן וסושי"
            width={206}
            height={66}
            decoding="async"
          />
        </Link>
        <nav className="nav" aria-label="ניווט ראשי">
          <ul
            id="nav-menu"
            className={`nav-list${menuOpen ? " is-open" : ""}`}
          >
            {navLinks.map(({ to, label, end }) => (
              <li key={to}>
                <NavLink
                  to={to}
                  end={Boolean(end)}
                  onClick={closeMenu}
                  className={({ isActive }) => (isActive ? "is-active" : undefined)}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          className="nav-toggle"
          aria-expanded={menuOpen}
          aria-controls="nav-menu"
          aria-label={menuOpen ? "סגור תפריט" : "פתח תפריט"}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
        <a
          className="btn btn-outline btn-header"
          href={WOLT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="הזמן עכשיו ב-Wolt"
        >
          הזמן עכשיו
        </a>
      </div>
    </header>
  );
}
