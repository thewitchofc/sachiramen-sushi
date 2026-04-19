#!/usr/bin/env node
/**
 * ממיר PNGים ב־public ל־WebP/JPEG עד ‎≤300KB (לפי איכות).
 * — לוגו, קרדיט מפתח, חתול וואטסאפ, גלריה (+נגזרות ‎640/960, ו־480 ל־11)
 * — תפריט להדפסה: ‎JPEG
 *
 * הרצה: npm run optimize:public-rasters
 */
import { existsSync } from "node:fs";
import { mkdir, readdir, readFile, writeFile, unlink } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const MAX_BYTES = 300 * 1024;
const PUBLIC = path.join(process.cwd(), "public");
const GALLERY_DIR = path.join(PUBLIC, "gallery");
const MENU_DIR = path.join(PUBLIC, "menu");

async function webpFitBudget(input, resizeOpts, label) {
  let quality = 88;
  let buf = null;
  while (quality >= 45) {
    let pipeline = sharp(input).rotate();
    if (resizeOpts) {
      pipeline = pipeline.resize({
        ...resizeOpts,
        withoutEnlargement: true,
      });
    }
    buf = await pipeline.webp({ quality, effort: 4 }).toBuffer();
    if (buf.length <= MAX_BYTES) {
      console.log(`  ${label} — ${(buf.length / 1024).toFixed(1)} KB (q${quality})`);
      return buf;
    }
    quality -= 6;
  }
  console.warn(`  ${label} — ${(buf.length / 1024).toFixed(1)} KB (מעל 300KB)`);
  return buf;
}

async function jpegFitBudget(input, resizeOpts, label) {
  let quality = 86;
  let buf = null;
  while (quality >= 40) {
    let pipeline = sharp(input).rotate();
    if (resizeOpts) {
      pipeline = pipeline.resize({ ...resizeOpts, withoutEnlargement: true });
    }
    buf = await pipeline
      .jpeg({ quality, mozjpeg: true, chromaSubsampling: "4:2:0" })
      .toBuffer();
    if (buf.length <= MAX_BYTES) {
      console.log(`  ${label} — ${(buf.length / 1024).toFixed(1)} KB (q${quality})`);
      return buf;
    }
    quality -= 5;
  }
  console.warn(`  ${label} — ${(buf.length / 1024).toFixed(1)} KB`);
  return buf;
}

async function convertOnePngToWebp(relPath, { maxWidth = 1024, label } = {}) {
  const abs = path.join(PUBLIC, relPath);
  if (!existsSync(abs)) {
    console.warn("חסר:", relPath);
    return;
  }
  const raw = await readFile(abs);
  const outRel = relPath.replace(/\.png$/i, ".webp");
  const outAbs = path.join(PUBLIC, outRel);
  const buf = await webpFitBudget(
    raw,
    maxWidth ? { width: maxWidth } : null,
    label || outRel
  );
  await writeFile(outAbs, buf);
}

async function galleryBaseToWebp(baseName) {
  const stem = baseName.replace(/\.png$/i, "");
  const fullPng = path.join(GALLERY_DIR, `${stem}.png`);
  if (!existsSync(fullPng)) return;

  const rawFull = await readFile(fullPng);
  const outFull = path.join(GALLERY_DIR, `${stem}.webp`);
  await writeFile(
    outFull,
    await webpFitBudget(rawFull, { width: 1024 }, `${stem}.webp`)
  );

  for (const w of [640, 960]) {
    const der = path.join(GALLERY_DIR, `${stem}-${w}.png`);
    if (!existsSync(der)) continue;
    const raw = await readFile(der);
    await writeFile(
      path.join(GALLERY_DIR, `${stem}-${w}.webp`),
      await webpFitBudget(raw, null, `${stem}-${w}.webp`)
    );
  }

  const der480 = path.join(GALLERY_DIR, `${stem}-480.png`);
  if (existsSync(der480)) {
    const raw = await readFile(der480);
    await writeFile(
      path.join(GALLERY_DIR, `${stem}-480.webp`),
      await webpFitBudget(raw, null, `${stem}-480.webp`)
    );
  }
}

async function removeMatchingPngs(dir, re) {
  const names = await readdir(dir);
  for (const n of names) {
    if (!re.test(n)) continue;
    await unlink(path.join(dir, n));
    console.log("  נמחק:", path.join(path.relative(PUBLIC, dir), n));
  }
}

async function main() {
  const prune = process.argv.includes("--prune");
  const printPng = path.join(MENU_DIR, "sachi-menu-print.png");
  console.log("לוגו וקרדיט…");
  await convertOnePngToWebp("logo-sachi.png", { maxWidth: 512, label: "logo-sachi.webp" });
  await convertOnePngToWebp("developer-credit-the-witch.png", {
    maxWidth: 400,
    label: "developer-credit-the-witch.webp",
  });

  console.log("חתול וואטסאפ (מוקטן)…");
  const catAbs = path.join(PUBLIC, "cat.png");
  if (existsSync(catAbs)) {
    const raw = await readFile(catAbs);
    const buf = await webpFitBudget(
      raw,
      { width: 360, height: 360, fit: "inside" },
      "cat.webp"
    );
    await writeFile(path.join(PUBLIC, "cat.webp"), buf);
  }

  if (existsSync(printPng)) {
    console.log("תפריט להדפסה → JPEG…");
    if (!existsSync(MENU_DIR)) await mkdir(MENU_DIR, { recursive: true });
    const raw = await readFile(printPng);
    const jpgBuf = await jpegFitBudget(
      raw,
      { width: 1600, withoutEnlargement: true },
      "sachi-menu-print.jpg"
    );
    await writeFile(path.join(MENU_DIR, "sachi-menu-print.jpg"), jpgBuf);
  }

  if (existsSync(GALLERY_DIR)) {
    console.log("גלריה…");
    const names = await readdir(GALLERY_DIR);
    const bases = new Set();
    for (const n of names) {
      const m = n.match(/^(gallery-\d+)\.png$/i);
      if (m) bases.add(`${m[1]}.png`);
    }
    for (const base of [...bases].sort()) {
      await galleryBaseToWebp(base);
    }
  }

  if (prune) {
    console.log("מוחק PNGים ישנים (--prune)…");
    if (existsSync(GALLERY_DIR)) {
      await removeMatchingPngs(GALLERY_DIR, /^gallery-\d+(-(480|640|960))?\.png$/i);
    }
    for (const f of ["logo-sachi.png", "cat.png", "developer-credit-the-witch.png"]) {
      const p = path.join(PUBLIC, f);
      if (existsSync(p)) {
        await unlink(p);
        console.log("  נמחק:", f);
      }
    }
    if (existsSync(printPng)) {
      await unlink(printPng);
      console.log("  נמחק: menu/sachi-menu-print.png");
    }
  } else {
    console.log("\n(לא נמחקו PNGים — הרץ עם ‎--prune לאחר שבדקת את ה־WebP/JPEG)");
  }

  console.log("\nסיום.");
}

main().catch((e) => {
  console.error(e);
  process.exit(1);
});
