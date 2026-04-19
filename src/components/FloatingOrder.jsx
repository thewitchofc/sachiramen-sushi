import { WOLT_URL } from "../data/siteContent.js";

export function FloatingOrder() {
  return (
    <div className="order-bar" role="region" aria-label="הזמנה מהירה">
      <a
        className="fab-order"
        href={WOLT_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="הזמן עכשיו ב-Wolt, משלוח ואיסוף"
        data-track-order="fab"
      >
        <span className="fab-order__label">הזמן עכשיו</span>
        <span className="fab-order__hint">Wolt · משלוח איסוף</span>
      </a>
    </div>
  );
}
