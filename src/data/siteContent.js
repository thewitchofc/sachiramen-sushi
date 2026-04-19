/** קובץ לוגו מותג (ב־public) */
export const LOGO_SRC = "/logo-sachi.webp";

/** לוגו קרדיט פיתוח בפוטר (ב־public) */
export const DEVELOPER_CREDIT_LOGO_SRC = "/developer-credit-the-witch.webp";

/** אתר THE WITCH — לחיצה על לוגו הפיתוח בפוטר */
export const DEVELOPER_CREDIT_SITE = "https://thewitch.co.il";

const viteDeveloperSite =
  typeof import.meta !== "undefined" &&
  typeof import.meta.env?.VITE_DEVELOPER_CREDIT_URL === "string"
    ? import.meta.env.VITE_DEVELOPER_CREDIT_URL.trim()
    : "";

/** נטען מ־`.env` (`VITE_DEVELOPER_CREDIT_URL`) אם קיים, אחרת מ־`DEVELOPER_CREDIT_SITE` */
export const DEVELOPER_CREDIT_URL = (viteDeveloperSite || DEVELOPER_CREDIT_SITE).trim();

/** שורת משנה ב־Hero (עברית) */
export const heroTaglineHe =
  "משלוחים מהירים • גלם טרי • חוויה יפנית";

/** תמונת רקע Hero — מגוון מנות (1024×682, רוחב מלא) */
export const HERO_BG_SRC = "/hero-bg.jpg";

/** משפטי מותג — Sachi */
export const brandVoice = {
  hook: "Looks meow, tastes yammi!",
  line: "Eastern flavors, Tel Aviv style.",
  welcome: "Sachi — tradition meets taste.",
};

export const WOLT_URL =
  "https://wolt.com/he/isr/tel-aviv/restaurant/sachi-sushi-tlv";
export const INSTAGRAM_URL = "https://www.instagram.com/sachi_ramen_sushi/";
export const FACEBOOK_URL =
  "https://www.facebook.com/tlv.sachisushi/photos";
export const MAPS_SEARCH_URL =
  "https://www.google.com/maps/search/?api=1&query=Dizengoff+98+Tel+Aviv";
export const MAPS_EMBED_URL =
  "https://maps.google.com/maps?q=Dizengoff+Street+98,+Tel+Aviv-Yafo,+Israel&hl=he&z=17&ie=UTF8&iwloc=B&output=embed";
export const ADDRESS_MAP_URL =
  "https://maps.google.com/?q=Dizengoff+98+Tel+Aviv";

/**
 * ביקורות בגוגל — פותח ב־Google Maps על העסק (שם + כתובת; משם ניתן לעבור לביקורות).
 * לא משתמשים בקישורי חיפוש עם פרמטרי סשן — הם מתיישנים.
 */
export const GOOGLE_REVIEWS_URL = `https://www.google.com/maps/search/?api=1&hl=he&query=${encodeURIComponent(
  "סאצי ראמן וסושי דיזנגוף 98 תל אביב"
)}`;

/** דירוג כללי לתצוגה בסקשן לקוחות ממליצים — עדכן לפי גוגל */
export const googleReviewsSummary = {
  rating: "4.8",
  countLabel: "200+",
};

/**
 * מבחר קצר לסקשן הבית — ניסוח לפי נושאים שחוזרים בביקורות המומלצות בגוגל
 * (סושי טרי ומדויק, ראמן, שירות, אווירה, מנות מיוחדות).
 */
export const googleHighlightReviews = [
  {
    text: "הראמן פה ברמה אחרת — עמוק, עשיר ומרגיש אותנטי. כבר חוזרת בשבוע השני.",
    firstName: "נועה",
  },
  {
    text: "סושי מוקפד, דג טרי וחתיכות נדיבות. בדיוק האיזון עם האורז — מהטובים שטעמתי בעיר.",
    firstName: "אורי",
  },
  {
    text: "שירות מהיר וחייכני, אווירה נעימה בלי רעש מיותר. ארוחת צהריים בול במקום.",
    firstName: "שירה",
  },
  {
    text: "מנות מיוחדות וטעם חד — גם הראמן וגם הרולים עושים חשק לחזור. מומלץ בחום.",
    firstName: "דוד",
  },
];
export const PHONE_DISPLAY = "054-537-0076";
export const PHONE_TEL = "+972545370076";

/** וואטסאפ — ללא + במספר (כמו PHONE_TEL) */
export const WHATSAPP_URL = "https://wa.me/972545370076";

/** ניווט ראשי — React Router */
export const navLinks = [
  { to: "/", label: "בית", end: true },
  { to: "/menu", label: "תפריט" },
  { to: "/gallery", label: "גלריה" },
  { to: "/reviews", label: "ביקורות" },
  { to: "/contact", label: "צור קשר" },
];

/** כתבות עיתונות — סקשן «כתבו עלינו» */
export const pressArticles = [
  {
    outlet: "TimeOut תל אביב",
    quote: "הנה הסושי שהיה חסר בכיכר הכי חמה בעיר",
    excerpt:
      "מסעדת סאצ׳י מציגה שילוב מדויק של מטבח יפני ותאילנדי בלב דיזנגוף.",
    href: "https://timeout.co.il/%D7%A1%D7%90%D7%A6%D7%99-%D7%A1%D7%95%D7%A9%D7%99/",
    ctaLabel: "לקריאת הכתבה",
  },
  {
    outlet: "הארץ",
    quote: "ראמן איכותי, מספק ונהדר במיקום מפתיע",
    excerpt:
      "התפריט עבר חידוד עם דגש על ראמן עשיר ומנות מדויקות יותר.",
    href: "https://www.haaretz.co.il/food/street-food-review/2025-10-15/ty-article-review/.highlight/00000199-e256-d54a-abfb-f7d6d6870000",
    ctaLabel: "לקריאת הכתבה",
  },
];

/** תמונת תפריט מודפס מהמסעדה (אופציונלי לתצוגה) */
export const MENU_PRINT_SRC = "/menu/sachi-menu-print.jpg";

/** מנות פופולריות — כרטיסים בראש דף התפריט */
export const mostOrderedDishes = [
  {
    title: "ראמן עוף",
    image: "/media/menu/menu-ramen-chicken.jpg",
  },
  {
    title: "ראמן חזיר",
    image: "/media/menu/menu-ramen-pork.jpg",
  },
  {
    title: "גיוזת עוף",
    image: "/media/menu/menu-starter-gyoza-chicken.jpg",
  },
];

export { menuCategories } from "./menuCatalog.js";

/** גלריה — ‎WebP + נגזרות ‎-640 / ‎-960 (+‎-480 ל־11) */
export const galleryImages = [
  { src: "/gallery/gallery-01.webp", alt: "אורמאקי שומשום וטונה" },
  { src: "/gallery/gallery-02.webp", alt: "מגש סושי על שיש" },
  { src: "/gallery/gallery-03.webp", alt: "קערת ראמן" },
  { src: "/gallery/gallery-04.webp", alt: "מגשי סושי" },
  { src: "/gallery/gallery-05.webp", alt: "מנה מהמטבח" },
  { src: "/gallery/gallery-06.webp", alt: "סושי סלמון וטמפורה" },
  { src: "/gallery/gallery-07.webp", alt: "גיוזה ורוטב" },
  { src: "/gallery/gallery-08.webp", alt: "ראמן צ׳אשו וביצה" },
  { src: "/gallery/gallery-09.webp", alt: "סשימי סלמון" },
  { src: "/gallery/gallery-10.webp", alt: "מסעדה בערב" },
  { src: "/gallery/gallery-11.webp", alt: "מגש סושי" },
  { src: "/gallery/gallery-12.webp", alt: "ראמן על שיש" },
  { src: "/gallery/gallery-13.webp", alt: "גיוזה בצלחת" },
  { src: "/gallery/gallery-14.webp", alt: "שף מכין ניגירי" },
];

export const reviews = [
  {
    starsLabel: "5 מתוך 5 כוכבים",
    stars: "★★★★★",
    text: "«ראמן עשיר, שירות שקט ומקצועי.»",
    author: "— נועה, תל אביב",
  },
  {
    starsLabel: "5 מתוך 5 כוכבים",
    stars: "★★★★★",
    text: "«סשימי טרי, מרגישים כמו בטוקיו.»",
    author: "— דניאל, רמת גן",
  },
  {
    starsLabel: "4 מתוך 5 כוכבים",
    stars: "★★★★☆",
    text: "«אווירה פרימיום, מנות מדויקות.»",
    author: "— מיכל, הרצליה",
  },
  {
    starsLabel: "5 מתוך 5 כוכבים",
    stars: "★★★★★",
    text: "«ב־Wolt עדיין מעולה. טונקוטסו חובה.»",
    author: "— עומר, תל אביב",
  },
  {
    starsLabel: "5 מתוך 5 כוכבים",
    stars: "★★★★★",
    text: "«ערב רומנטי: סאקה וסושי מנצחים.»",
    author: "— ליאור ושירה",
  },
];

/** טווח שעות ב־range — תמיד מוצג ב־LTR כדי שלא יתהפך ב־RTL (12:00–23:30) */
export const hours = [
  { day: "יום ראשון", closed: true },
  { day: "יום שני", range: "12:00–23:30" },
  { day: "יום שלישי", range: "12:00–23:30" },
  { day: "יום רביעי", range: "12:00–23:30" },
  { day: "יום חמישי", range: "12:00–23:30" },
  { day: "יום שישי", range: "12:00–23:30" },
  { day: "יום שבת", range: "12:00–23:30" },
];
