import { useEffect, useRef, useState } from "react";
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
  const [activeCategory, setActiveCategory] = useState(null);
  const activeCategoryRef = useRef(null);
  /** בזמן גלילה מלחיצה על טאב — לא לעדכן מ־IO כדי למנוע ריצוד */
  const ioSuspendedRef = useRef(false);
  /** בזמן שהמשתמש גולל אופקית בסרגל — לא לבצע auto-scroll של הכפתור הפעיל */
  const userNavScrollingRef = useRef(false);
  const userNavScrollingTimeoutRef = useRef(null);
  const pendingCategoryRef = useRef(null);
  const ioRafRef = useRef(null);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;

    const markUserScrolling = () => {
      userNavScrollingRef.current = true;
      if (userNavScrollingTimeoutRef.current != null) {
        window.clearTimeout(userNavScrollingTimeoutRef.current);
      }
      userNavScrollingTimeoutRef.current = window.setTimeout(() => {
        userNavScrollingRef.current = false;
      }, 220);
    };

    el.addEventListener("wheel", markUserScrolling, { passive: true });
    el.addEventListener("touchmove", markUserScrolling, { passive: true });
    el.addEventListener("pointermove", markUserScrolling, { passive: true });

    return () => {
      el.removeEventListener("wheel", markUserScrolling);
      el.removeEventListener("touchmove", markUserScrolling);
      el.removeEventListener("pointermove", markUserScrolling);
      if (userNavScrollingTimeoutRef.current != null) {
        window.clearTimeout(userNavScrollingTimeoutRef.current);
      }
    };
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-category]");
    const visibleRatios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        if (ioSuspendedRef.current) return;
        for (const entry of entries) {
          const cat = entry.target.dataset.category;
          if (cat == null || cat === "") continue;
          const ratio = entry.intersectionRatio ?? 0;
          if (entry.isIntersecting && ratio > 0) {
            visibleRatios.set(cat, ratio);
          } else {
            visibleRatios.delete(cat);
          }
        }

        let bestCat = null;
        let bestRatio = 0;
        for (const [cat, ratio] of visibleRatios.entries()) {
          if (ratio >= bestRatio) {
            bestRatio = ratio;
            bestCat = cat;
          }
        }

        if (!bestCat) return;
        if (bestCat === activeCategoryRef.current) return;

        pendingCategoryRef.current = bestCat;
        if (ioRafRef.current != null) return;
        ioRafRef.current = window.requestAnimationFrame(() => {
          ioRafRef.current = null;
          const next = pendingCategoryRef.current;
          pendingCategoryRef.current = null;
          if (!next) return;
          if (ioSuspendedRef.current) return;
          if (next === activeCategoryRef.current) return;
          activeCategoryRef.current = next;
          setActiveCategory(next);
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7],
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      observer.disconnect();
      if (ioRafRef.current != null) {
        window.cancelAnimationFrame(ioRafRef.current);
        ioRafRef.current = null;
      }
      pendingCategoryRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (
      activeCategory == null ||
      ioSuspendedRef.current ||
      userNavScrollingRef.current
    )
      return;
    const trackEl = trackRef.current;
    if (!trackEl) return;
    const activeBtn = trackEl.querySelector(".menu-cat-nav__btn.active");
    if (!(activeBtn instanceof HTMLElement)) return;

    // Avoid "stall" while fast-scrolling the page: only move the track if the
    // active button is actually out of view.
    const trackRect = trackEl.getBoundingClientRect();
    const btnRect = activeBtn.getBoundingClientRect();
    const pad = 20;
    const fullyVisible =
      btnRect.left >= trackRect.left + pad &&
      btnRect.right <= trackRect.right - pad;
    if (fullyVisible) return;

    const maxLeft = trackEl.scrollWidth - trackEl.clientWidth;
    if (maxLeft <= 0) return;
    const targetLeft =
      activeBtn.offsetLeft - trackEl.clientWidth / 2 + activeBtn.offsetWidth / 2;
    const left = Math.max(0, Math.min(maxLeft, targetLeft));
    trackEl.scrollTo({ left, behavior: "auto" });
  }, [activeCategory]);

  const onCategoryClick = (index, categoryId) => {
    const id = categorySectionId(index);
    const el = document.getElementById(id);
    if (!el) return;

    ioSuspendedRef.current = true;
    activeCategoryRef.current = categoryId;
    setActiveCategory(categoryId);

    const navEl = navRef.current;
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
      ioSuspendedRef.current = false;
    }, prefersReducedMotion() ? 80 : 900);
  };

  return (
    <nav
      ref={navRef}
      className="menu-cat-nav"
      aria-label="קפיצה לקטגוריה בתפריט"
    >
      <div ref={trackRef} className="menu-cat-nav__track">
        {menuCategories.map((category, index) => {
          const categoryId = category.id ?? String(index);
          const isActive = activeCategory === categoryId;
          return (
            <button
              key={`${category.title}-${index}`}
              type="button"
              data-menu-cat-index={index}
              className={`menu-cat-nav__btn ${
                isActive ? "active" : ""
              }`.trim()}
              aria-label={`עבור לקטגוריה: ${category.title}`}
              aria-current={isActive ? "true" : undefined}
              onClick={() => onCategoryClick(index, categoryId)}
            >
              {category.name ?? category.title}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
