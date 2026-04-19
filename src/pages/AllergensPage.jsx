import { Link } from "react-router-dom";

export default function AllergensPage() {
  return (
    <section
      className="section section--light legal-page-section"
      id="allergens"
      aria-labelledby="allergens-heading"
    >
      <div className="container narrow">
        <p className="section-eyebrow">בריאות ובטיחות</p>
        <h1 id="allergens-heading" className="section-title">
          הצהרת אלרגנים ורגישויות
        </h1>
        <div className="about-text legal-page">
          <p>
            מטבח של <strong>סאצ&apos;י ראמן וסושי</strong> עשוי להשתמש במרכיבים
            המכילים או עלולים להכיל אלרגנים מזוהים ומרכיבים נוספים שעלולים לגרום
            לרגישות. המידע להלן נועד לשקיפות ובטיחות — ואינו מהווה ייעוץ רפואי או
            משפטי.
          </p>
          <ul className="legal-page__list">
            <li>
              <strong>נוכחות אלרגנים:</strong> המנות עשויות להכיל או לבוא במגע עם
              אלרגנים מזוהים, לרבות ולא רק: גלוטן, ביצים, חלב, סויה, דגים, רכיכות,
              בוטנים, אגוזים (למשל שקדים, אגוזי מלך, פיסטוק), שומשום, חרדל, סולפיטים
              ועוד — בהתאם לתפריט ולמטבח בפועל.
            </li>
            <li>
              <strong>עדכון הצוות:</strong> אם יש לכם אלרגיה, רגישות או דרישה תזונתית
              (כשרות, צמחוניות וכו׳) — יש לעדכן את הצוות <strong>לפני</strong> ההזמנה
              ובהקדם האפשרי. נשמח לסייע במידת האפשר, אך הסתמכות על מידע באתר בלבד אינה
              מספיקה.
            </li>
            <li>
              <strong>היעדר התחייבות:</strong> בשל אופי הכנת המזון במטבח משותף,
              שימוש בציוד משותף ומורכבות המרכיבים — <strong>אין התחייבות להימנעות
              מוחלטת</strong> מנגיעה או העברה של אלרגנים, ואין אחריות לתגובה אלרגית
              או רפואית כלשהי. במקרה של אלרגיה חמורה, שקלו הימנעות מאכילה במקום.
            </li>
          </ul>
          <p className="legal-page__note">
            לשאלות לפני הגעה או הזמנה ניתן{" "}
            <Link to="/contact">ליצור קשר</Link>. לייעוץ רפואי פנו לרופא או לאיש
            מקצוע מתאים.
          </p>
        </div>
      </div>
    </section>
  );
}
