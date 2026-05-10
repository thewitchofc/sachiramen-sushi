import { useEffect, useMemo, useState } from "react";

const STORAGE_KEY = "sachi_a11y_settings_v1";
const MIN_SCALE = 0.9;
const MAX_SCALE = 1.3;
const STEP = 0.1;

function clampScale(value) {
  return Math.max(MIN_SCALE, Math.min(MAX_SCALE, Number(value) || 1));
}

function readStoredSettings() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return { fontScale: 1, highContrast: false, grayscale: false };
    const parsed = JSON.parse(raw);
    return {
      fontScale: clampScale(parsed.fontScale),
      highContrast: Boolean(parsed.highContrast),
      grayscale: Boolean(parsed.grayscale),
    };
  } catch {
    return { fontScale: 1, highContrast: false, grayscale: false };
  }
}

export function AccessibilityWidget() {
  const [open, setOpen] = useState(false);
  const [fontScale, setFontScale] = useState(1);
  const [highContrast, setHighContrast] = useState(false);
  const [grayscale, setGrayscale] = useState(false);

  useEffect(() => {
    const stored = readStoredSettings();
    setFontScale(stored.fontScale);
    setHighContrast(stored.highContrast);
    setGrayscale(stored.grayscale);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty("--a11y-font-scale", String(fontScale));
    document.documentElement.classList.toggle("a11y-high-contrast", highContrast);
    document.documentElement.classList.toggle("a11y-grayscale", grayscale);
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ fontScale, highContrast, grayscale })
      );
    } catch {
      /* ignore storage failures */
    }
  }, [fontScale, highContrast, grayscale]);

  const scaleLabel = useMemo(() => `${Math.round(fontScale * 100)}%`, [fontScale]);

  return (
    <div className="a11y-widget" dir="rtl">
      <button
        type="button"
        className="a11y-fab"
        aria-expanded={open}
        aria-controls="a11y-panel"
        aria-label={open ? "סגור תפריט נגישות" : "פתח תפריט נגישות"}
        onClick={() => setOpen((v) => !v)}
      >
        <svg
          className="a11y-fab__icon"
          viewBox="0 0 24 24"
          aria-hidden="true"
          focusable="false"
        >
          <circle cx="12" cy="12" r="10.25" fill="#3D55B8" />
          <circle cx="12" cy="12" r="8.5" fill="none" stroke="#FFFFFF" strokeWidth="1.15" />
          <circle cx="12" cy="7.3" r="1.35" fill="#FFFFFF" />
          <path
            d="M7.9 10.2c1.25 0.45 2.7 0.7 4.1 0.7s2.85-0.25 4.1-0.7"
            stroke="#FFFFFF"
            strokeWidth="1.15"
            strokeLinecap="round"
          />
          <path d="M12 9.4v6.9" stroke="#FFFFFF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M12 16.3l-2.4 2.4" stroke="#FFFFFF" strokeWidth="1.15" strokeLinecap="round" />
          <path d="M12 16.3l2.4 2.4" stroke="#FFFFFF" strokeWidth="1.15" strokeLinecap="round" />
        </svg>
      </button>

      {open ? (
        <section className="a11y-panel" id="a11y-panel" aria-label="הגדרות נגישות">
          <p className="a11y-panel__title">נגישות</p>

          <div className="a11y-text-size">
            <span className="a11y-text-size__label">גודל טקסט: {scaleLabel}</span>
            <div className="a11y-text-size__actions">
              <button
                type="button"
                className="a11y-btn"
                onClick={() => setFontScale((v) => clampScale(v - STEP))}
                aria-label="הקטן טקסט"
              >
                A-
              </button>
              <button
                type="button"
                className="a11y-btn"
                onClick={() => setFontScale(1)}
                aria-label="איפוס גודל טקסט"
              >
                ↺
              </button>
              <button
                type="button"
                className="a11y-btn"
                onClick={() => setFontScale((v) => clampScale(v + STEP))}
                aria-label="הגדל טקסט"
              >
                A+
              </button>
            </div>
          </div>

          <button
            type="button"
            className={`a11y-toggle${highContrast ? " is-on" : ""}`}
            aria-pressed={highContrast}
            onClick={() => setHighContrast((v) => !v)}
          >
            ניגודיות גבוהה
          </button>

          <button
            type="button"
            className={`a11y-toggle${grayscale ? " is-on" : ""}`}
            aria-pressed={grayscale}
            onClick={() => setGrayscale((v) => !v)}
          >
            גווני אפור
          </button>
        </section>
      ) : null}
    </div>
  );
}
