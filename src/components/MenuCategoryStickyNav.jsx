import { useCallback, useEffect, useRef, useState } from "react";
import { menuCategories } from "../data/siteContent.js";

function categorySectionId(index) {
  return `menu-cat-${index}`;
}

function prefersReducedMotion() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
  );
}

/** גלילה לקטגוריה — מפצה על header קבוע + שורת קטגוריות דביקה (מובייל ודסקטופ) */
function scrollPageToCategoryEl(el, navEl) {
  if (!el) return;
  const headerEl = document.querySelector(".site-header");
  const headerH = headerEl?.getBoundingClientRect().height ?? 72;
  const navH = navEl?.offsetHeight ?? 52;
  const gap = 10;
  const y =
    el.getBoundingClientRect().top + window.scrollY - headerH - navH - gap;
  const top = Math.max(0, y);
  const behavior = prefersReducedMotion() ? "auto" : "smooth";
  window.scrollTo({ top, left: 0, behavior });
}

export function MenuCategoryStickyNav() {
  const trackRef = useRef(null);
  const navRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollSpyEnabledRef = useRef(true);

  const updateActiveFromScroll = useCallback(() => {
    const navH = navRef.current?.offsetHeight ?? 52;
    const headerEl = document.querySelector(".site-header");
    const headerH = headerEl?.offsetHeight ?? 72;
    const probe = window.scrollY + headerH + navH + 8;

    let next = 0;
    for (let i = 0; i < menuCategories.length; i++) {
      const el = document.getElementById(categorySectionId(i));
      if (!el) continue;
      const top = el.getBoundingClientRect().top + window.scrollY;
      if (top <= probe) next = i;
    }
    setActiveIndex(next);
  }, []);

  useEffect(() => {
    let ticking = false;
    const onScroll = () => {
      if (!scrollSpyEnabledRef.current) return;
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        updateActiveFromScroll();
      });
    };
    updateActiveFromScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [updateActiveFromScroll]);

  const onCategoryClick = (index) => {
    const id = categorySectionId(index);
    const el = document.getElementById(id);
    if (!el) return;

    scrollSpyEnabledRef.current = false;
    setActiveIndex(index);

    const navEl = navRef.current;
    // שני rAF — אחרי פריסה (בעיקר iOS) כדי שהמיקום יחושב נכון
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        scrollPageToCategoryEl(el, navEl);
      });
    });

    const btn = trackRef.current?.querySelector(
      `[data-menu-cat-index="${index}"]`
    );
    const tabBehavior = prefersReducedMotion() ? "auto" : "smooth";
    btn?.scrollIntoView({
      behavior: tabBehavior,
      inline: "center",
      block: "nearest",
    });

    window.setTimeout(() => {
      scrollSpyEnabledRef.current = true;
      updateActiveFromScroll();
    }, prefersReducedMotion() ? 80 : 900);
  };

  return (
    <nav
      ref={navRef}
      className="menu-cat-nav"
      aria-label="קפיצה לקטגוריה בתפריט"
    >
      <div ref={trackRef} className="menu-cat-nav__track">
        {menuCategories.map((cat, index) => (
          <button
            key={`${cat.title}-${index}`}
            type="button"
            data-menu-cat-index={index}
            className={`menu-cat-nav__btn${activeIndex === index ? " is-active" : ""}`}
            aria-label={`עבור לקטגוריה: ${cat.title}`}
            aria-current={activeIndex === index ? "true" : undefined}
            onClick={() => onCategoryClick(index)}
          >
            {cat.title}
          </button>
        ))}
      </div>
    </nav>
  );
}
