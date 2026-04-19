import { GOOGLE_REVIEWS_URL, reviews } from "../data/siteContent.js";

export function Reviews() {
  return (
    <section className="section reviews section--light" id="reviews">
      <div className="container">
        <p className="section-eyebrow">מה אומרים האורחים</p>
        <h1 className="section-title">ביקורות</h1>
        <div className="reviews-grid">
          {reviews.map((r, i) => (
            <blockquote className="review-card" key={`${i}-${r.author}`}>
              <div className="stars" aria-label={r.starsLabel}>
                {r.stars}
              </div>
              <p>{r.text}</p>
              <footer>{r.author}</footer>
            </blockquote>
          ))}
        </div>
        <div className="testimonials-cta reviews-google-cta">
          <a
            className="btn btn-outline testimonials-cta__btn"
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="לפתיחת עמוד העסק והביקורות בגוגל מפות"
          >
            לצפייה בכל הביקורות בגוגל
          </a>
        </div>
      </div>
    </section>
  );
}
