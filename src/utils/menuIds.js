/** תואם קבצי ‎/media/menu/menu-*.(jpg|jpeg|png|webp) */
const MENU_IMAGE_ID_RE = /\/menu-([^/.]+)\.(png|jpe?g|webp)$/i;

/**
 * מזהה יציב ל־URL ‎/dish/:id — מ־item.id, או משם קובץ התמונה, או חובה שיהיה item.id.
 */
export function getMenuItemId(item) {
  if (!item) return null;
  if (item.id) return item.id;
  if (item.image) {
    const m = String(item.image).match(MENU_IMAGE_ID_RE);
    if (m) return m[1];
  }
  return null;
}
