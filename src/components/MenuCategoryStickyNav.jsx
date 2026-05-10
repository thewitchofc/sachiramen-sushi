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

function isMobileMenuViewport() {
  return (
    typeof window !== "undefined" &&
    window.matchMedia?.("(max-width: 768px)").matches
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
  const pendingActiveCategoryRef = useRef(null);
  const pendingActiveTimeoutRef = useRef(null);
  const lastActiveSetAtRef = useRef(0);
  const lastTrackAutoScrollAtRef = useRef(0);
  const pendingTrackScrollTimeoutRef = useRef(null);
  const scrollSettleTimeoutRef = useRef(null);

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
    const sections = Array.from(document.querySelectorAll("[data-category]"));
    if (!sections.length) return;

    let rafId = null;
    const updateActiveCategory = () => {
      if (ioSuspendedRef.current) return;

      const headerEl = document.querySelector(".site-header");
      const headerH = headerEl?.getBoundingClientRect().height ?? 72;
      const navH = navRef.current?.offsetHeight ?? 52;
      const markerY = headerH + navH + 10;

      let nextCat = sections[0]?.dataset.category ?? null;
      for (const section of sections) {
        const cat = section.dataset.category;
        if (!cat) continue;
        const top = section.getBoundingClientRect().top;
        if (top <= markerY) {
          nextCat = cat;
        } else {
          break;
        }
      }

      if (!nextCat) return;
      if (nextCat === activeCategoryRef.current) {
        pendingActiveCategoryRef.current = null;
        if (pendingActiveTimeoutRef.current != null) {
          window.clearTimeout(pendingActiveTimeoutRef.current);
          pendingActiveTimeoutRef.current = null;
        }
        return;
      }

      if (pendingActiveCategoryRef.current === nextCat) return;
      pendingActiveCategoryRef.current = nextCat;
      if (pendingActiveTimeoutRef.current != null) {
        window.clearTimeout(pendingActiveTimeoutRef.current);
      }
      const mobile = isMobileMenuViewport();
      const activeSetCooldownMs = mobile ? 220 : 0;
      const activeSettleMs = mobile ? 120 : 0;
      // Small stabilization window prevents flicker near section boundaries.
      pendingActiveTimeoutRef.current = window.setTimeout(() => {
        pendingActiveTimeoutRef.current = null;
        const candidate = pendingActiveCategoryRef.current;
        if (!candidate || ioSuspendedRef.current) return;
        if (candidate === activeCategoryRef.current) return;
        const now = performance.now();
        // Prevent rapid back-and-forth updates while fast scrolling.
        if (now - lastActiveSetAtRef.current < activeSetCooldownMs) return;
        lastActiveSetAtRef.current = now;
        activeCategoryRef.current = candidate;
        setActiveCategory(candidate);
      }, activeSettleMs);
    };

    const onScrollOrResize = () => {
      if (rafId != null) return;
      rafId = window.requestAnimationFrame(() => {
        rafId = null;
        updateActiveCategory();
      });
    };

    const onScroll = () => {
      // Update only after scrolling settles to avoid jitter on fast flicks.
      if (scrollSettleTimeoutRef.current != null) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
      const mobile = isMobileMenuViewport();
      if (!mobile) {
        onScrollOrResize();
        return;
      }
      const settleDelayMs = 170;
      scrollSettleTimeoutRef.current = window.setTimeout(() => {
        scrollSettleTimeoutRef.current = null;
        onScrollOrResize();
      }, settleDelayMs);
    };

    const onResize = () => {
      onScrollOrResize();
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);
    onScrollOrResize();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      if (rafId != null) window.cancelAnimationFrame(rafId);
      if (pendingActiveTimeoutRef.current != null) {
        window.clearTimeout(pendingActiveTimeoutRef.current);
      }
      if (scrollSettleTimeoutRef.current != null) {
        window.clearTimeout(scrollSettleTimeoutRef.current);
      }
      pendingActiveCategoryRef.current = null;
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
    const pad = 24;
    const fullyVisible =
      btnRect.left >= trackRect.left + pad &&
      btnRect.right <= trackRect.right - pad;
    if (fullyVisible) return;

    const now = performance.now();
    const mobile = isMobileMenuViewport();
    const trackCooldownMs = mobile ? 420 : 20;
    if (now - lastTrackAutoScrollAtRef.current < trackCooldownMs) return;
    lastTrackAutoScrollAtRef.current = now;

    if (pendingTrackScrollTimeoutRef.current != null) {
      window.clearTimeout(pendingTrackScrollTimeoutRef.current);
    }
    // Delay a touch so rapid active changes settle before moving the track.
    const trackDelayMs = mobile ? 140 : 0;
    pendingTrackScrollTimeoutRef.current = window.setTimeout(() => {
      pendingTrackScrollTimeoutRef.current = null;
      const behavior = prefersReducedMotion() ? "auto" : "smooth";
      // scrollIntoView handles RTL/LTR differences better than manual scrollLeft math.
      activeBtn.scrollIntoView({
        behavior,
        inline: "nearest",
        block: "nearest",
      });
    }, trackDelayMs);
  }, [activeCategory]);

  useEffect(
    () => () => {
      if (pendingTrackScrollTimeoutRef.current != null) {
        window.clearTimeout(pendingTrackScrollTimeoutRef.current);
      }
    },
    []
  );

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
