import {
  FACEBOOK_URL,
  GOOGLE_REVIEWS_URL,
  INSTAGRAM_URL,
  PHONE_TEL,
  WOLT_URL,
  googleReviewsSummary,
  hours,
} from "./siteContent.js";

/** כותרת מותג קצרה ל־title */
export const SITE_BRAND_HE = "סאצ'י ראמן וסושי";
export const SITE_BRAND_EN = "Sachi Ramen & Sushi";

/** תיאור ברירת מחדל — חיפושים: ראמן, סושי, תל אביב, דיזנגוף */
export const DEFAULT_DESCRIPTION =
  "סאצ'י ראמן וסושי — מסעדת ראמן וסושי בדיזנגוף 98 תל אביב. גלם טרי, משלוחים ב־Wolt, שעות פתיחה ויצירת קשר. חוויה יפנית איכותית בלב העיר.";

export const DEFAULT_TITLE = `${SITE_BRAND_HE} · ${SITE_BRAND_EN} · דיזנגוף תל אביב`;

/** תמונה ל־Open Graph (נתיב יחסי — מומר ל־URL מלא בדפדפן) */
export const OG_IMAGE_PATH = "/logo-sachi.webp";

/**
 * כתובת האתר ל־canonical / OG / JSON-LD.
 * בפרודקשן: הגדר ב־`.env` את `VITE_SITE_URL=https://www.example.com` (ללא סלאש בסוף).
 * בפיתוח / כשאין משתנה: fallback ל־`window.location.origin` (למשל http://localhost:5173).
 */
export function getSiteOrigin() {
  const env = typeof import.meta !== "undefined" ? import.meta.env?.VITE_SITE_URL : "";
  const envStr = typeof env === "string" ? env.trim() : "";
  const SITE_URL =
    envStr ||
    (typeof window !== "undefined" && window.location?.origin ? window.location.origin : "");
  return String(SITE_URL).replace(/\/$/, "");
}

/** מטא לפי נתיב (ללא פרמטרים) */
export const ROUTE_SEO = {
  "/": {
    title: DEFAULT_TITLE,
    description: DEFAULT_DESCRIPTION,
  },
  "/menu": {
    title: `תפריט ראמן וסושי | ${SITE_BRAND_HE}`,
    description:
      "תפריט סאצ'י: ראמן יפני, סושי, רולים, סשימי ועוד — דיזנגוף 98 תל אביב. הזמנות ב־Wolt וארוחה במסעדה.",
  },
  "/gallery": {
    title: `גלריה | ${SITE_BRAND_HE}`,
    description: `תמונות מהמסעדה, המנות והאווירה — ${SITE_BRAND_HE}, דיזנגוף תל אביב.`,
  },
  "/reviews": {
    title: `ביקורות אורחים | ${SITE_BRAND_HE}`,
    description: `מה אומרים האורחים על סאצ'י — ביקורות, המלצות ודירוגים. ${SITE_BRAND_HE} תל אביב.`,
  },
  "/contact": {
    title: `יצירת קשר והגעה | ${SITE_BRAND_HE}`,
    description:
      "כתובת דיזנגוף 98 תל אביב, טלפון, שעות פתיחה ומפה — סאצ'י ראמן וסושי.",
  },
  "/press": {
    title: `כתבו עלינו | ${SITE_BRAND_HE}`,
    description: "סאצ'י בעיתונות ובמגזיני אוכל — כתבות, ציטוטים וקישורים.",
  },
  "/terms": {
    title: `תנאי שימוש באתר | ${SITE_BRAND_HE}`,
    description:
      "תנאי שימוש כלליים באתר סאצ'י — מידע, מחירים ושעות ללא התחייבות; תמונות להמחשה בלבד.",
  },
  "/privacy": {
    title: `מדיניות פרטיות | ${SITE_BRAND_HE}`,
    description:
      "מדיניות פרטיות כללית — איסוף מידע, פניות בוואטסאפ וטלפון, צדדים שלישיים ובקשות מחיקה.",
  },
  "/allergens": {
    title: `הצהרת אלרגנים | ${SITE_BRAND_HE}`,
    description:
      "מידע על אלרגנים ורגישויות במטבח סאצ'י — עדכון הצוות, מגבלות והיעדר התחייבות להימנעות מוחלטת.",
  },
};

const HEB_DAY_TO_SCHEMA = {
  "יום ראשון": "https://schema.org/Sunday",
  "יום שני": "https://schema.org/Monday",
  "יום שלישי": "https://schema.org/Tuesday",
  "יום רביעי": "https://schema.org/Wednesday",
  "יום חמישי": "https://schema.org/Thursday",
  "יום שישי": "https://schema.org/Friday",
  "יום שבת": "https://schema.org/Saturday",
};

function parseOpensCloses(range) {
  const parts = String(range).split(/\u2013|-/).map((s) => s.trim());
  if (parts.length < 2) return null;
  return { opens: parts[0], closes: parts[1] };
}

function openingHoursFromSiteHours() {
  const specs = [];
  for (const row of hours) {
    if (row.closed || !row.range) continue;
    const day = HEB_DAY_TO_SCHEMA[row.day];
    if (!day) continue;
    const oc = parseOpensCloses(row.range);
    if (!oc) continue;
    specs.push({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: day,
      opens: oc.opens,
      closes: oc.closes,
    });
  }
  return specs;
}

/**
 * JSON-LD Restaurant / LocalBusiness — לגוגל ומנועי חיפוש מקומיים.
 * @param {string} baseUrl — מקור מלא ללא סלאש בסוף
 */
export function buildRestaurantJsonLd(baseUrl) {
  const base = baseUrl.replace(/\/$/, "");
  if (!base) return null;

  const sameAs = [INSTAGRAM_URL, FACEBOOK_URL, WOLT_URL, GOOGLE_REVIEWS_URL].filter(
    Boolean
  );

  const ratingValue = Number.parseFloat(
    String(googleReviewsSummary.rating).replace(",", ".")
  );
  const aggregateRating =
    Number.isFinite(ratingValue) && ratingValue > 0
      ? {
          "@type": "AggregateRating",
          ratingValue,
          bestRating: 5,
          worstRating: 1,
          reviewCount: 200,
        }
      : undefined;

  const data = {
    "@context": "https://schema.org",
    "@type": "Restaurant",
    "@id": `${base}/#restaurant`,
    name: `${SITE_BRAND_HE} (${SITE_BRAND_EN})`,
    alternateName: [SITE_BRAND_EN, SITE_BRAND_HE],
    description: DEFAULT_DESCRIPTION,
    url: `${base}/`,
    image: [`${base}/logo-sachi.webp`, `${base}/hero-bg.jpg`],
    logo: `${base}/logo-sachi.webp`,
    telephone: PHONE_TEL,
    priceRange: "$$",
    servesCuisine: ["Japanese", "Sushi", "Ramen"],
    address: {
      "@type": "PostalAddress",
      streetAddress: "דיזנגוף 98",
      addressLocality: "תל אביב-יפו",
      addressRegion: "מחוז תל אביב",
      addressCountry: "IL",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 32.0807,
      longitude: 34.7746,
    },
    openingHoursSpecification: openingHoursFromSiteHours(),
    menu: `${base}/menu`,
    sameAs,
    ...(aggregateRating ? { aggregateRating } : {}),
  };

  return data;
}

export function getRouteSeo(pathname) {
  const path = pathname.replace(/\/$/, "") || "/";
  if (path.startsWith("/dish/")) {
    return {
      title: `מנה מהתפריט | ${SITE_BRAND_HE}`,
      description: DEFAULT_DESCRIPTION,
    };
  }
  return ROUTE_SEO[path] ?? ROUTE_SEO["/"];
}
