import { Link } from "react-router-dom";
import {
  DEVELOPER_CREDIT_LOGO_SRC,
  DEVELOPER_CREDIT_URL,
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LOGO_SRC,
  WOLT_URL,
} from "../data/siteContent.js";

export function Footer() {
  const year = new Date().getFullYear();
  const developerHref = DEVELOPER_CREDIT_URL.trim();

  const developerLogo = (
    <img
      className="footer-credit__logo"
      src={DEVELOPER_CREDIT_LOGO_SRC}
      alt="THE WITCH — Web &amp; App Development"
      width={120}
      height={120}
      decoding="async"
      loading="lazy"
    />
  );

  return (
    <footer className="site-footer site-footer--light">
      <div className="container footer-inner">
        <div className="footer-brand">
          <img
            className="footer-logo"
            src={LOGO_SRC}
            alt="לוגו Sachi"
            width={240}
            height={80}
            decoding="async"
            loading="lazy"
          />
          <p className="footer-tagline">
            סאצ&apos;י ראמן &amp; סושי · תל אביב
          </p>
        </div>
        <nav className="footer-nav" aria-label="קישורים תחתונים">
          <a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer">
            אינסטגרם
          </a>
          <a href={FACEBOOK_URL} target="_blank" rel="noopener noreferrer">
            פייסבוק
          </a>
          <a
            href={WOLT_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-track-order="footer"
          >
            Wolt
          </a>
          <Link to="/menu">תפריט</Link>
          <Link to="/gallery">גלריה</Link>
          <Link to="/reviews">ביקורות</Link>
          <Link to="/press">כתבו עלינו</Link>
          <Link to="/contact">יצירת קשר</Link>
          <Link to="/terms">תנאי שימוש</Link>
          <Link to="/privacy">מדיניות פרטיות</Link>
          <Link to="/allergens">הצהרת אלרגנים</Link>
        </nav>
        <p className="footer-copy">
          &copy; {year} Sachi Ramen &amp; Sushi. כל הזכויות שמורות.
        </p>
        <p className="footer-updated">עודכן לאחרונה: 2026</p>
        <p className="footer-alcohol" role="note">
          מכירת אלכוהול מעל גיל 18 בלבד ·{" "}
          <Link to="/terms#alcohol">פרטים בתנאי השימוש</Link>
        </p>
        <div className="footer-credit" dir="rtl">
          <span className="footer-credit__label">תכנות ופיתוח ע״י</span>
          {developerHref ? (
            <a
              className="footer-credit__logo-link"
              href={developerHref}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="THE WITCH — מעבר לאתר התכנות והפיתוח"
            >
              {developerLogo}
            </a>
          ) : (
            developerLogo
          )}
        </div>
      </div>
    </footer>
  );
}
