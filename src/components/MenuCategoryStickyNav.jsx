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
  /** בזמן גלילה מלחיצה על טאב — לא לעדכן מ־IO כדי למנוע ריצוד */
  const ioSuspendedRef = useRef(false);

  useEffect(() => {
    const sections = document.querySelectorAll("[data-category]");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || ioSuspendedRef.current) return;
          const cat = entry.target.dataset.category;
          if (cat != null && cat !== "") {
            setActiveCategory(cat);
          }
        });
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: 0.1,
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (activeCategory == null || ioSuspendedRef.current) return;
    const activeBtn = document.querySelector(".menu-cat-nav__btn.active");
    if (!activeBtn) return;
    const behavior = prefersReducedMotion() ? "auto" : "smooth";
    activeBtn.scrollIntoView({
      behavior,
      inline: "center",
      block: "nearest",
    });
  }, [activeCategory]);

  const onCategoryClick = (index, categoryId) => {
    const id = categorySectionId(index);
    const el = document.getElementById(id);
    if (!el) return;

    ioSuspendedRef.current = true;
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
                activeCategory === category.id ? "active" : ""
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
