import { useLayoutEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  brandVoice,
  heroTaglineHe,
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
        <video
          src="/media/sachi-hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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
          aria-label="סלוגן המותג Sachi באנגלית"
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
