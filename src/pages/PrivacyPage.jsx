import { Link } from "react-router-dom";
import { PHONE_DISPLAY, PHONE_TEL } from "../data/siteContent.js";

export default function PrivacyPage() {
  return (
    <section
      className="section section--light legal-page-section"
      id="privacy"
      aria-labelledby="privacy-heading"
    >
      <div className="container narrow">
        <p className="section-eyebrow">שקיפות</p>
        <h1 id="privacy-heading" className="section-title">
          מדיניות פרטיות
        </h1>
        <div className="about-text legal-page">
          <p>
            מסעדת <strong>סאצ&apos;י ראמן וסושי</strong> (להלן: &quot;העסק&quot;) מכבדת את
            פרטיותכם. מדיניות זו מתארת בקווים כלליים כיצד נוהגים ביחס למידע בעת
            שימוש באתר האינטרנט של העסק ובערוצי קשר נפוצים. המדיניות אינה מהווה ייעוץ
            משפטי.
          </p>
          <ul className="legal-page__list">
            <li>
              <strong>איסוף מידע:</strong> האתר אינו אוסף מידע אישי מזהה (כגון שם,
              טלפון או כתובת דוא״ל) ללא יוזמתכם — למשל בעת שליחת הודעה או ביצוע שיחה
              שאתם יוזמים.
            </li>
            <li>
              <strong>סטטיסטיקת שימוש (Google Analytics 4):</strong> בעת גלישה
              באתר עשוי לפעול כלי מדידה של Google (GA4) לצורך הבנת שימוש כללי
              (למשל עמודים שנצפו, מקור הגעה, סוג דפדפן ומכשיר), לרבות אירועים
              טכניים מותאמים (למשל לחיצה על כפתור הזמנה, פתיחת דף מנה, גלילה כמעט
              לתחתית העמוד) — ללא איסוף שם או פרטי זיהוי ישירים שלכם דרך GA. הנתונים מעובדים
              לפי{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
              >
                מדיניות הפרטיות של Google
              </a>
              . ניתן להיעזר גם ב־
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
              >
                תוסף הדפדפן לביטול שימוש ב־Google Analytics
              </a>
              . שימוש בפרסום ממוקד (עוגיות פרסום) אינו מופעל כברירת מחדל דרך כלי זה;
              באזורי שיפוט שבהם נדרשת הסכמה מפורשת לניטור — האחריות להטמעת מנגנון
              הסכמה חלה על מפעיל האתר.
            </li>
            <li>
              <strong>פניות בוואטסאפ ובטלפון:</strong> פניות שתשלחו בוואטסאפ או בשיחת
              טלפון לעסק עשויות להישמר במערכות התקשורת שלכם ושל העסק לצורך מתן מענה,
              תיאום ושירות בלבד — בהתאם לאפשרויות הטכניות והמדיניות של ספקי הצד
              (למשל וואטסאפ / Meta).
            </li>
            <li>
              <strong>צדדים שלישיים:</strong> העסק אינו מעביר מידע אישי שקיבל מכם
              לצדדים שלישיים לשיווק או לסחר. שימוש בשירותי צד ג׳ שאתם בוחרים
              (למשל הזמנה דרך Wolt, מעבר לרשתות חברתיות או מפות) כפוף למדיניות
              הפרטיות של אותם שירותים ואינו בשליטת העסק.
            </li>
            <li>
              <strong>מחיקת מידע:</strong> ניתן לפנות לעסק בבקשה למחוק או להגביל
              שימוש במידע שנמסר בערוצי הקשר של העסק, ככל שהדבר אפשרי טכנית וחוקית.
              ליצירת קשר:{" "}
              <Link to="/contact">עמוד יצירת קשר</Link>, טלפון{" "}
              <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>.
            </li>
          </ul>
          <p className="legal-page__note">
            לפרטים משפטיים מלאים או לעדכון מדיניות זו, מומלץ להיוועץ בעורך דין
            המתמחה בתחום הגנת הפרטיות.
          </p>
        </div>
      </div>
    </section>
  );
}
