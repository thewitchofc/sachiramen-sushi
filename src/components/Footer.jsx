import { Link } from "react-router-dom";
import {
  FACEBOOK_URL,
  INSTAGRAM_URL,
  LOGO_SRC,
  WOLT_URL,
} from "../data/siteContent.js";

export function Footer() {
  const year = new Date().getFullYear();

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
          <a href={WOLT_URL} target="_blank" rel="noopener noreferrer">
            Wolt
          </a>
          <Link to="/menu">תפריט</Link>
          <Link to="/gallery">גלריה</Link>
          <Link to="/reviews">ביקורות</Link>
          <Link to="/press">כתבו עלינו</Link>
          <Link to="/contact">יצירת קשר</Link>
        </nav>
        <p className="footer-copy">
          &copy; {year} Sachi Ramen &amp; Sushi. כל הזכויות שמורות.
        </p>
      </div>
    </footer>
  );
}
