import { useEffect, useRef } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { trackDishPageEnter } from "../analytics/gaEvents.js";
import { getMenuItemById } from "../data/menuIndex.js";
import { WOLT_URL } from "../data/siteContent.js";
import { isRemoteImageUrl, menuThumbSrcSet } from "../utils/imageHelpers.js";

function remoteMenuHeroSrcSet(src) {
  const u = new URL(src);
  const line = (w) => {
    u.searchParams.set("w", String(w));
    return `${u.href} ${w}w`;
  };
  return [line(720), line(960), line(1280)].join(", ");
}

export default function DishPage() {
  const { dishId } = useParams();
  const item = dishId ? getMenuItemById(dishId) : null;
  const dishTrackedRef = useRef("");

  useEffect(() => {
    if (!dishId || !item?.name) return;
    const key = `${dishId}`;
    if (dishTrackedRef.current === key) return;
    dishTrackedRef.current = key;
    trackDishPageEnter(dishId, item.name);
  }, [dishId, item?.name]);

  if (!item) {
    return <Navigate to="/menu" replace />;
  }

  const longText = typeof item.description === "string" ? item.description.trim() : "";
  const shortText = typeof item.desc === "string" ? item.desc.trim() : "";
  const showText = longText || shortText;

  const priceLine =
    item.priceDisplay != null
      ? item.priceDisplay
      : item.price != null
        ? `${item.price} ₪`
        : null;

  return (
    <article className="dish-page section section--light">
      <div className="dish-page__inner">
        <nav className="dish-page__back" aria-label="ניווט משנה">
          <Link to="/menu" className="dish-page__back-link">
            ← חזרה לתפריט
          </Link>
        </nav>

        {item.image ? (
          <div className="dish-page__media">
            <img
              src={
                isRemoteImageUrl(item.image)
                  ? item.image.replace(/w=\d+/, "w=960")
                  : item.image
              }
              srcSet={
                isRemoteImageUrl(item.image)
                  ? remoteMenuHeroSrcSet(item.image)
                  : menuThumbSrcSet(item.image)
              }
              sizes="100vw"
              alt={item.name}
              width={1024}
              height={576}
              loading="lazy"
              decoding="async"
            />
          </div>
        ) : null}

        <div className="dish-page__body">
          <h1 className="dish-page__title">{item.name}</h1>
          {priceLine ? (
            <p className="dish-page__price" dir="ltr" translate="no">
              {priceLine}
            </p>
          ) : null}
          {showText ? <div className="dish-page__desc">{longText || shortText}</div> : null}

          <a
            className="btn btn-outline dish-page__order"
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הזמן עכשיו ב-Wolt"
            data-track-order="dish_page"
          >
            הזמן עכשיו
          </a>
        </div>
      </div>
    </article>
  );
}
