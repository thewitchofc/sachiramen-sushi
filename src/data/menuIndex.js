import { menuCategories } from "./menuCatalog.js";
import { getMenuItemId } from "../utils/menuIds.js";

/** @type {Map<string, object> | null} */
let dishesMap = null;
/** @type {Array<object & { id: string }> | null} */
let dishesList = null;

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

function ensureMenuCaches() {
  if (dishesMap) return;
  const rows = flattenCategories();
  dishesList = rows;
  dishesMap = new Map();
  for (const row of rows) {
    if (!dishesMap.has(row.id)) {
      dishesMap.set(row.id, row);
    }
  }
}

/** כל המנות השטוחות (עם id) — לשימוש ב־find וכו׳ */
export function getAllDishes() {
  ensureMenuCaches();
  return dishesList;
}

/** מנה לפי id — כמו getMenuItemById, דרך allDishes.find */
export function getDishById(id) {
  if (!id || typeof id !== "string") return null;
  const norm = decodeURIComponent(id);
  const allDishes = getAllDishes();
  return allDishes.find((dish) => dish.id === norm) ?? null;
}

export function getMenuItemsIndex() {
  ensureMenuCaches();
  return dishesMap;
}

/** מנה מלאה לפי id מה־URL או null */
export function getMenuItemById(id) {
  if (!id || typeof id !== "string") return null;
  return getMenuItemsIndex().get(decodeURIComponent(id)) ?? null;
}
