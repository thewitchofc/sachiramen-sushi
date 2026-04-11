#!/usr/bin/env node
/**
 * יוצר קבצי JPG לתפריט תחת public/media/menu/
 * — כל קובץ פלט ≤ ‎300KB (עד כמה שאפשר עם איכות מינימלית סבירה)
 * — נגזרות: ‎-480, ‎-640, ‎-960 + קובץ ראשי (עד רוחב ‎1024)
 *
 * שימוש: שים קבצי מקור ‎menu-*.png בלבד (בלי ‎-480/-640/-960 בשם)
 * והרץ: npm run optimize:menu-images
 */

import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_BYTES = 300 * 1024;
const MENU_DIR = path.join(process.cwd(), "public", "media", "menu");
const DERIVATIVE_WIDTHS = [480, 640, 960];
const MAIN_MAX_W = 1024;

/** רק PNG כקלט — לא לקודד מחדש JPG שכבר נוצר */
const BASE_RE = /^menu-.+\.png$/i;
const SKIP_RE = /-(480|640|960)\.png$/i;

async function jpegFitBudget(input, width) {
  let quality = 86;
  let buf = null;
  while (quality >= 38) {
    buf = await sharp(input)
      .rotate()
      .resize({
        width,
        withoutEnlargement: true,
      })
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (buf.length <= MAX_BYTES) {
      return buf;
    }
    quality -= 5;
  }
  if (buf && buf.length > MAX_BYTES) {
    console.warn(
      `  אזהרה: קובץ עדיין ${(buf.length / 1024).toFixed(1)} KB (מעל 300KB) ברוחב ${width}px`
    );
  }
  return buf;
}

async function main() {
  if (!existsSync(MENU_DIR)) {
    await mkdir(MENU_DIR, { recursive: true });
    console.log("נוצרה תיקייה:", MENU_DIR);
    console.log("הוסף קבצי מקור והרץ שוב.");
    return;
  }

  const names = await readdir(MENU_DIR);
  const bases = names.filter(
    (n) => BASE_RE.test(n) && !SKIP_RE.test(n) && !n.startsWith(".")
  );

  if (!bases.length) {
    console.log("לא נמצאו קבצי מקור תחת", MENU_DIR);
    console.log("צפוי שם קובץ כמו menu-ramen-chicken.png (מקור PNG בלבד, ללא -480/-640/-960).");
    return;
  }

  for (const file of bases) {
    const abs = path.join(MENU_DIR, file);
    const raw = await readFile(abs);
    const stem = file.replace(/\.png$/i, "");

    const mainPath = path.join(MENU_DIR, `${stem}.jpg`);
    const mainBuf = await jpegFitBudget(raw, MAIN_MAX_W);
    await writeFile(mainPath, mainBuf);
    console.log(
      `${path.basename(mainPath)} — ${(mainBuf.length / 1024).toFixed(1)} KB`
    );

    for (const w of DERIVATIVE_WIDTHS) {
      const outPath = path.join(MENU_DIR, `${stem}-${w}.jpg`);
      const buf = await jpegFitBudget(raw, w);
      await writeFile(outPath, buf);
      console.log(
        `  ${path.basename(outPath)} — ${(buf.length / 1024).toFixed(1)} KB`
      );
    }
  }

  console.log("\nסיום. ודא שהנתיבים בקטלוג מסתיימים ב־.jpg");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
