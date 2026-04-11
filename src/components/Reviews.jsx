import { reviews } from "../data/siteContent.js";

export function Reviews() {
  return (
    <section className="section reviews section--light" id="reviews">
      <div className="container">
        <p className="section-eyebrow">מה אומרים האורחים</p>
        <h2 className="section-title">ביקורות</h2>
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
      </div>
    </section>
  );
}
