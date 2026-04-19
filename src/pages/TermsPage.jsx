export default function TermsPage() {
  return (
    <section
      className="section section--light legal-page-section"
      id="terms"
      aria-labelledby="terms-heading"
    >
      <div className="container narrow">
        <p className="section-eyebrow">מידע כללי</p>
        <h1 id="terms-heading" className="section-title">
          תנאי שימוש באתר
        </h1>
        <div className="about-text legal-page">
          <p>
            אתר האינטרנט של <strong>סאצ&apos;י ראמן וסושי</strong> (להלן: &quot;האתר&quot;)
            מיועד לספק מידע כללי בלבד לנוחות הגולשים. השימוש באתר מהווה הסכמה
            לתנאים המפורטים להלן.
          </p>
          <ul className="legal-page__list">
            <li>
              <strong>מידע בלבד:</strong> האתר מציג מידע כללי בלבד — לרבות תפריט,
              מחירים ושעות פעילות — כפי שהם ידועים למפעילי העסק בעת העדכון. אין
              באמור כדי ליצור התחייבות חוזית או אחרת מול הגולש.
            </li>
            <li>
              <strong>טעויות ושינויים:</strong> ייתכנו טעויות, אי־דיוקים או עיכובים
              בעדכון המידע. המחירים, התפריט, שעות הפעילות והפרטים האחרים עשויים
              להשתנות מעת לעת ללא הודעה מוקדמת באתר.
            </li>
            <li>
              <strong>זמינות מנות:</strong> אין התחייבות לזמינות של מנה מסוימת, לרכיבי
              מנה או למלאי במסעדה. הזמנה בפועל (כולל משלוחים) כפופה לאישור העסק
              ולמדיניות ספקי ההזמנה (למשל Wolt) בעת ההזמנה.
            </li>
            <li>
              <strong>תמונות:</strong> התמונות באתר מיועדות להמחשה בלבד. ייתכן הבדל
              בין התצוגה בתמונה לבין המנה המוגשת בפועל, לרבות מרכיבי הגשה, כלי הגשה
              וגודל המנה.
            </li>
          </ul>
          <h2 id="alcohol" className="legal-page__subhead">
            משקאות אלכוהוליים
          </h2>
          <ul className="legal-page__list">
            <li>
              <strong>מכירת אלכוהול:</strong> מכירת משקאות אלכוהוליים במסעדה מותרת{" "}
              <strong>מעל גיל 18 בלבד</strong>, בהתאם לחוק. העסק רשאי לדרוש הצגת
              תעודה מזהה.
            </li>
          </ul>
          <p className="legal-page__note">
            התנאים אינם מהווים ייעוץ משפטי. לשאלות משפטיות פנו לעורך דין המתמחה
            בתחום.
          </p>
        </div>
      </div>
    </section>
  );
}
