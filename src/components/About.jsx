export function About({ id = "about" }) {
  return (
    <section className="section about section--light" id={id}>
      <div className="container narrow">
        <p className="section-eyebrow">על המקום</p>
        <h2 className="section-title">מסורת ודיוק בכל צלחת</h2>
        <div className="about-text">
          <p>
            בלב כיכר דיזנגוף שוכן סאצ׳י ראמן &amp; סושי – מקום יפני שמביא את טוקיו
            לתל אביב באווירה חמה, שמחה וקלילה. התפריט משלב בין קערות ראמן עשירות
            שמתבשלות שעות לבין מגוון סושי טרי ומנות ראשונות לחלוקה.
          </p>
          <p>
            לצד האוכל מחכות לכם בירות יפניות, קוקטיילים מרעננים ומוזיקה טובה –
            מושלם לערב עם חברים או לארוחה קלילה באמצע היום. בואו ליהנות מהטעמים של
            יפן בלב העיר – דיזנגוף 98, תל אביב.
          </p>
        </div>

        <aside className="about-happy-hour" aria-label="Happy Hour">
          <h3 className="about-happy-hour__title">
            <span dir="ltr" lang="en">
              💫 Happy Hour
            </span>
          </h3>
          <div className="about-happy-hour__text">
            <p>
              בימים שני עד חמישי, בין{" "}
              <span className="hours-range-ltr">12:00–15:00</span> ו־
              <span className="hours-range-ltr">17:00–20:00</span>, תוכלו ליהנות
              מ־20% הנחה על ראשונות, סושי, בירה ויין.
            </p>
            <p className="about-happy-hour__note">
              ה־Happy Hour לא יחול בחגים ובמועדים מיוחדים.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
