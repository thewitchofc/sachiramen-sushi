import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { OG_IMAGE_PATH, getRouteSeo, getSiteOrigin } from "../data/seo.js";

function upsertMetaByName(name, content) {
  let el = document.querySelector(`meta[name="${name}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertMetaByProperty(property, content) {
  let el = document.querySelector(`meta[property="${property}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("property", property);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function upsertLink(rel, href, extraAttrs = {}) {
  let el = document.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
  for (const [k, v] of Object.entries(extraAttrs)) {
    el.setAttribute(k, v);
  }
}

/**
 * עדכון title, meta description, canonical, Open Graph וטוויטר לפי הנתיב.
 */
export function SeoHead() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteSeo(pathname);
    const origin = getSiteOrigin();
    const path = pathname || "/";
    const canonical = origin ? `${origin}${path === "/" ? "/" : path}` : path;

    document.title = meta.title;
    upsertMetaByName("description", meta.description);
    upsertMetaByName("robots", "index, follow, max-image-preview:large, max-snippet:-1");
    upsertMetaByName("googlebot", "index, follow");

    if (origin) {
      upsertLink("canonical", canonical);
      upsertLink("alternate", canonical, { hreflang: "he-IL" });
      upsertMetaByProperty("og:type", "website");
      upsertMetaByProperty("og:locale", "he_IL");
      upsertMetaByProperty("og:site_name", meta.title.split("|")[0]?.trim() || meta.title);
      upsertMetaByProperty("og:title", meta.title);
      upsertMetaByProperty("og:description", meta.description);
      upsertMetaByProperty("og:url", canonical);
      upsertMetaByProperty("og:image", `${origin}${OG_IMAGE_PATH}`);
      upsertMetaByProperty("og:image:alt", meta.title);
      upsertMetaByName("twitter:card", "summary_large_image");
      upsertMetaByName("twitter:title", meta.title);
      upsertMetaByName("twitter:description", meta.description);
      upsertMetaByName("twitter:image", `${origin}${OG_IMAGE_PATH}`);
    }
  }, [pathname]);

  return null;
}
