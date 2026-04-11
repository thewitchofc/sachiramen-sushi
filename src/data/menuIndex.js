import { menuCategories } from "./menuCatalog.js";
import { getMenuItemId } from "../utils/menuIds.js";

/** @type {Map<string, object> | null} */
let cache = null;

function flattenCategories() {
  /** @type {Array<object & { id: string }>} */
  const out = [];

  for (const cat of menuCategories) {
    if (Array.isArray(cat.items)) {
      for (const item of cat.items) {
        const id = getMenuItemId(item);
        if (id) {
          out.push({
            ...item,
            id,
            categoryTitle: cat.title,
          });
        }
      }
    }
    if (Array.isArray(cat.subsections)) {
      for (const sub of cat.subsections) {
        if (!Array.isArray(sub.items)) continue;
        for (const item of sub.items) {
          const id = getMenuItemId(item);
          if (id) {
            out.push({
              ...item,
              id,
              categoryTitle: cat.title,
              subcategoryTitle: sub.title,
            });
          }
        }
      }
    }
  }
  return out;
}

export function getMenuItemsIndex() {
  if (cache) return cache;
  const map = new Map();
  for (const row of flattenCategories()) {
    if (!map.has(row.id)) {
      map.set(row.id, row);
    }
  }
  cache = map;
  return cache;
}

/** מנה מלאה לפי id מה־URL או null */
export function getMenuItemById(id) {
  if (!id || typeof id !== "string") return null;
  return getMenuItemsIndex().get(decodeURIComponent(id)) ?? null;
}
