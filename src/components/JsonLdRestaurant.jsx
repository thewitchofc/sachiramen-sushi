import { useLayoutEffect, useState } from "react";
import { buildRestaurantJsonLd, getSiteOrigin } from "../data/seo.js";

/**
 * מבנה נתונים Schema.org (Restaurant) — לחיפוש מקומי ותוצאות עשירות.
 */
export function JsonLdRestaurant() {
  const [payload, setPayload] = useState("");

  useLayoutEffect(() => {
    const origin = getSiteOrigin();
    const data = buildRestaurantJsonLd(origin);
    if (data) {
      setPayload(JSON.stringify(data));
    }
  }, []);

  if (!payload) return null;

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: payload }}
    />
  );
}
