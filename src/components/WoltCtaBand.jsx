import { WOLT_URL } from "../data/siteContent.js";

export function WoltCtaBand() {
  return (
    <section className="wolt-cta-band" aria-label="הזמנה ב-Wolt">
      <div className="container wolt-cta-band__inner">
        <a
          className="wolt-cta-band__btn"
          href={WOLT_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="הזמן עכשיו ב-Wolt"
          data-track-order="wolt_band"
        >
          הזמן עכשיו ב-Wolt
        </a>
      </div>
    </section>
  );
}
