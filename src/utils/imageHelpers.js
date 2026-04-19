/** תמונות תפריט מקומיות — ‎JPEG עם נגזרות ‎-480 / ‎-640 / ‎-960 */

export function isRemoteImageUrl(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

function menuImageStem(fullPath) {
  const m = String(fullPath).match(/^(.+)\.(jpe?g)$/i);
  return m ? m[1] : null;
}

function galleryWebpStem(fullPath) {
  if (!String(fullPath).endsWith(".webp")) return null;
  return fullPath.replace(/\.webp$/i, "");
}

/** גלריה — ‎WebP + נגזרות ‎-640 / ‎-960 (+‎-480 ל־gallery-11) */
export function localGalleryWebpSrcSet(fullPath) {
  const stem = galleryWebpStem(fullPath);
  if (!stem) return undefined;
  const parts = [];
  if (/\/gallery-11$/i.test(stem)) {
    parts.push(`${stem}-480.webp 480w`);
  }
  parts.push(
    `${stem}-640.webp 640w`,
    `${stem}-960.webp 960w`,
    `${fullPath} 1024w`
  );
  return parts.join(", ");
}

export function localGalleryWebpDefaultSrc(fullPath) {
  const stem = galleryWebpStem(fullPath);
  if (!stem) return fullPath;
  return `${stem}-960.webp`;
}

/** תמונות תפריט: ברירת מחדל ‎480px, מקור לרזולוציה גבוהה */
export function menuThumbSrcSet(fullPath) {
  const stem = menuImageStem(fullPath);
  if (!stem) return undefined;
  return `${stem}-480.jpg 480w, ${fullPath} 1024w`;
}

export function menuThumbDefaultSrc(fullPath) {
  const stem = menuImageStem(fullPath);
  if (!stem) return fullPath;
  return `${stem}-480.jpg`;
}
