import { mostOrderedDishes } from "../data/siteContent.js";
import {
  isRemoteImageUrl,
  menuThumbDefaultSrc,
  menuThumbSrcSet,
} from "../utils/imageHelpers.js";

export function MenuMostOrdered() {
  return (
    <div className="menu-popular">
      <h2 className="menu-popular__title">המוזמנים ביותר</h2>
      <ul className="menu-popular__grid">
        {mostOrderedDishes.map((item) => (
          <li className="menu-card menu-popular-card" key={item.title}>
            <div className="menu-popular-card__media">
              <div className="menu-card__badge">פופולרי</div>
              <img
                src={
                  isRemoteImageUrl(item.image)
                    ? item.image
                    : menuThumbDefaultSrc(item.image)
                }
                srcSet={
                  isRemoteImageUrl(item.image)
                    ? undefined
                    : menuThumbSrcSet(item.image)
                }
                sizes="(min-width: 900px) 28vw, (min-width: 480px) 45vw, 46vw"
                alt={`מנה פופולרית: ${item.title}`}
                width={480}
                height={270}
                loading="eager"
                decoding="async"
              />
            </div>
            <p className="menu-popular-card__name">{item.title}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
