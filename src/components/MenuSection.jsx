import { Link, useNavigate } from "react-router-dom";
import { menuCategories, WOLT_URL } from "../data/siteContent.js";
import { useMatchMobileMenu } from "../hooks/useMatchMobileMenu.js";
import { MenuCategoryStickyNav } from "./MenuCategoryStickyNav.jsx";
import { MenuMostOrdered } from "./MenuMostOrdered.jsx";
import { getMenuItemId } from "../utils/menuIds.js";
import {
  isRemoteImageUrl,
  menuThumbDefaultSrc,
  menuThumbSrcSet,
} from "../utils/imageHelpers.js";

function remoteMenuSrcSet(src) {
  const u = new URL(src);
  const line = (w) => {
    u.searchParams.set("w", String(w));
    return `${u.href} ${w}w`;
  };
  return [line(480), line(720), line(960)].join(", ");
}

function MenuItemRow({ item, dishTitleLevel = "category" }) {
  const navigate = useNavigate();
  const isMobile = useMatchMobileMenu();
  const dishId = getMenuItemId(item);
  const canOpenDish = Boolean(isMobile && dishId);
  const TitleTag = dishTitleLevel === "subsection" ? "h5" : "h4";

  const handleCardClick = (e) => {
    if (!canOpenDish) return;
    if (e.target.closest("button, a")) {
      e.stopPropagation();
      return;
    }
    navigate(`/dish/${dishId}`);
  };

  const handleCardKeyDown = (e) => {
    if (!canOpenDish) return;
    if (e.target !== e.currentTarget && e.target.closest("button, a")) return;
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      navigate(`/dish/${dishId}`);
    }
  };

  const tags = item.tags ?? [];
  const showVeg = tags.includes("veg");
  const showSpicy = tags.includes("spicy");
  const showPopular = tags.includes("popular");
  return (
    <li
      className={`menu-item${canOpenDish ? " menu-item--mobile-tap" : ""}`}
      onClick={handleCardClick}
      onKeyDown={handleCardKeyDown}
      tabIndex={canOpenDish ? 0 : undefined}
      role={canOpenDish ? "link" : undefined}
      aria-label={canOpenDish ? `מעבר לעמוד מנה: ${item.name}` : undefined}
    >
      <div
        className={
          item.image
            ? "menu-item-media"
            : "menu-item-media menu-item-media--placeholder"
        }
        {...(!item.image ? { "aria-hidden": true } : {})}
      >
        {item.image ? (
          <img
            src={
              isRemoteImageUrl(item.image)
                ? item.image.replace(/w=\d+/, "w=720")
                : menuThumbDefaultSrc(item.image)
            }
            srcSet={
              isRemoteImageUrl(item.image)
                ? remoteMenuSrcSet(item.image)
                : menuThumbSrcSet(item.image)
            }
            sizes="(min-width: 769px) 160px, 100vw"
            alt={canOpenDish ? "" : item.name}
            width={480}
            height={270}
            loading="lazy"
            decoding="async"
          />
        ) : null}
      </div>
      <div className="menu-item-text">
        <div className="menu-item-heading">
          <div className="menu-item-title-wrap">
            <TitleTag className="menu-item__title">{item.name}</TitleTag>
            {(showVeg || showSpicy) ? (
              <span className="menu-item-icon-tags" aria-hidden="true">
                {showVeg ? (
                  <span className="menu-item-tag-ico" title="צמחוני / טבעוני">
                    🌿
                  </span>
                ) : null}
                {showSpicy ? (
                  <span className="menu-item-tag-ico" title="חריף">
                    🌶️
                  </span>
                ) : null}
              </span>
            ) : null}
          </div>
          <div className="menu-item-price-wrap">
            {showPopular ? (
              <span className="menu-item-badge-popular">פופולרי</span>
            ) : null}
            {item.priceDisplay != null ? (
              <span className="menu-item-price" aria-label={`מחיר: ${item.priceDisplay}`}>
                {item.priceDisplay}
              </span>
            ) : item.price != null ? (
              <span className="menu-item-price" aria-label={`${item.price} שקלים`}>
                {item.price}&nbsp;₪
              </span>
            ) : null}
          </div>
        </div>
        <p className="menu-card-description">{item.desc}</p>
      </div>
    </li>
  );
}

export function MenuSection() {
  return (
    <section className="section menu-section section--light" id="menu">
      <div className="container">
        <h1 className="visually-hidden">
          תפריט — סאצ&apos;י ראמן וסושי, דיזנגוף 98 תל אביב
        </h1>
        <MenuMostOrdered />
        <p className="section-eyebrow">התפריט</p>
        <h2 className="section-title menu-section__title">תפריט מלא</h2>
        <p className="menu-allergen-note">
          <Link to="/allergens">
            הצהרת אלרגנים ורגישויות — חשוב לקרוא לפני הזמנה
          </Link>
        </p>

        <MenuCategoryStickyNav />

        <div className="menu-categories">
          {menuCategories.map((cat, index) => {
            const headingId = `menu-category-heading-${index}`;
            const sectionId = `menu-cat-${index}`;
            const subsections = cat.subsections;
            const hasSubsections = Array.isArray(subsections) && subsections.length > 0;
            const topItems = Array.isArray(cat.items) ? cat.items : [];
            const hasTopItems = topItems.length > 0;
            const hasSubItems =
              hasSubsections &&
              subsections.some((s) => Array.isArray(s.items) && s.items.length > 0);
            const hasContent = hasTopItems || hasSubItems;

            return (
              <section
                id={sectionId}
                className={`menu-category${hasContent ? "" : " menu-category--empty"}`}
                key={`${cat.title}-${index}`}
                aria-labelledby={headingId}
              >
                <h3 id={headingId} className="menu-category-title">
                  {cat.title}
                </h3>
                {!hasSubsections && cat.footnote ? (
                  <p className="menu-category-footnote">{cat.footnote}</p>
                ) : null}
                {hasSubsections ? (
                  <div className="menu-category-groups">
                    {subsections.map((sub, si) => {
                      const subItems = Array.isArray(sub.items) ? sub.items : [];
                      if (!subItems.length) return null;
                      const subHeadingId = `${headingId}-sub-${si}`;
                      return (
                        <div className="menu-subcategory" key={`${sub.title}-${si}`}>
                          <h4 id={subHeadingId} className="menu-subcategory-title">
                            {sub.title}
                          </h4>
                          {sub.footnote ? (
                            <p className="menu-category-footnote">{sub.footnote}</p>
                          ) : null}
                          <ul className="menu-list">
                            {subItems.map((item) => (
                              <MenuItemRow
                                key={`${cat.title}-${sub.title}-${item.name}-${item.price ?? item.priceDisplay ?? ""}-${(item.tags ?? []).join(",")}`}
                                dishTitleLevel="subsection"
                                item={item}
                              />
                            ))}
                          </ul>
                        </div>
                      );
                    })}
                  </div>
                ) : null}
                {!hasSubsections && hasTopItems ? (
                  <ul className="menu-list">
                    {topItems.map((item) => (
                      <MenuItemRow
                        key={`${cat.title}-${item.name}-${item.price ?? item.priceDisplay ?? ""}-${(item.tags ?? []).join(",")}`}
                        item={item}
                      />
                    ))}
                  </ul>
                ) : null}
              </section>
            );
          })}
        </div>

        <div className="menu-mid-cta">
          <a
            className="btn btn-outline btn-mid-order"
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="הזמן עכשיו ב-Wolt"
            data-track-order="menu_mid"
          >
            הזמן עכשיו
          </a>
        </div>
      </div>
    </section>
  );
}
