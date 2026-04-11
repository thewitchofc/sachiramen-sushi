import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  brandVoice,
  HERO_BG_SRC,
  heroTaglineHe,
  WOLT_URL,
} from "../data/siteContent.js";

export function Hero() {
  const heroRef = useRef(null);

  useLayoutEffect(() => {
    if (document.body.classList.contains("is-app-revealed")) {
      heroRef.current?.classList.add("loaded");
    }
  }, []);

  return (
    <section ref={heroRef} className="hero" aria-label="פתיחה">
      <div className="hero-bg" aria-hidden="true">
        <img
          src={HERO_BG_SRC}
          alt="תמונת רקע: אווירת המסעדה"
          width={1024}
          height={682}
          decoding="async"
          fetchPriority="high"
        />
      </div>
      <div className="hero-overlay" aria-hidden="true" />
      <div className="hero-content">
        <p className="hero-tag">תל אביב</p>
        <h1 className="hero-title">
          <span className="hero-title-en">Sachi Ramen & Sushi</span>
          <span className="hero-title-he">סאצ&apos;י ראמן &amp; סושי</span>
        </h1>
        <p className="hero-tagline-he">{heroTaglineHe}</p>
        <div className="hero-buttons">
          <a
            className="btn-hero-cta"
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הזמן עכשיו ב-Wolt"
          >
            הזמן עכשיו
          </a>
          <Link
            className="btn-hero-secondary"
            to="/menu"
            aria-label="צפה בתפריט המלא"
          >
            צפה בתפריט
          </Link>
        </div>
        <div
          className="hero-brand-secondary hero-subtitle"
          dir="ltr"
          lang="en"
          aria-label="Brand"
        >
          <p className="hero-brand-hook">{brandVoice.hook}</p>
          <p className="hero-brand-line">{brandVoice.line}</p>
          <p className="hero-brand-welcome">{brandVoice.welcome}</p>
        </div>
      </div>
      <div className="hero-scroll" aria-hidden="true" />
    </section>
  );
}
