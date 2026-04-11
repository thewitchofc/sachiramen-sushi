/** תמונות תפריט מקומיות — ‎JPEG עם נגזרות ‎-480 / ‎-640 / ‎-960 */

export function isRemoteImageUrl(src) {
  return typeof src === "string" && /^https?:\/\//i.test(src);
}

function menuImageStem(fullPath) {
  const m = String(fullPath).match(/^(.+)\.(jpe?g)$/i);
  return m ? m[1] : null;
}

/** srcSet לרשת רספונסיבית: 640 / 960 / מקור (גלריה PNG) */
export function localPngSrcSet(fullPath) {
  if (!fullPath.endsWith(".png")) return undefined;
  const stem = fullPath.slice(0, -4);
  return `${stem}-640.png 640w, ${stem}-960.png 960w, ${fullPath} 1024w`;
}

export function localPngDefaultSrc(fullPath) {
  if (!fullPath.endsWith(".png")) return fullPath;
  return fullPath.replace(/\.png$/, "-960.png");
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
