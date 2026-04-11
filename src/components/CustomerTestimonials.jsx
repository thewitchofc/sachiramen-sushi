import {
  GOOGLE_REVIEWS_URL,
  googleHighlightReviews,
  googleReviewsSummary,
} from "../data/siteContent.js";

export function CustomerTestimonials() {
  return (
    <section
      className="section testimonials section--dark"
      id="testimonials"
      aria-labelledby="testimonials-heading"
    >
      <div className="container">
        <p className="section-eyebrow">מתוך ביקורות בגוגל</p>
        <h2
          id="testimonials-heading"
          className="section-title testimonials-title"
        >
          <span className="testimonials-title__inner">
            לקוחות ממליצים
            <svg
              className="testimonials-title__google"
              viewBox="0 0 24 24"
              width={24}
              height={24}
              role="img"
              aria-label="לוגו Google"
            >
              <path
                fill="#4285F4"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="#34A853"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="#FBBC05"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="#EA4335"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
          </span>
        </h2>
        <p
          className="testimonials-rating-summary"
          role="status"
          aria-label={`דירוג ממוצע ${googleReviewsSummary.rating} מתוך 5, ${googleReviewsSummary.countLabel} ביקורות בגוגל`}
        >
          <span className="testimonials-rating-summary__inner">
            <span className="testimonials-rating-summary__score" dir="ltr" translate="no">
              <span className="testimonials-rating-summary__num">
                {googleReviewsSummary.rating}
              </span>
              <span className="testimonials-rating-summary__star" aria-hidden="true">
                ★
              </span>
            </span>
            <span className="testimonials-rating-summary__tail">
              מתוך {googleReviewsSummary.countLabel} ביקורות בגוגל
            </span>
          </span>
        </p>
        <div className="testimonials-grid">
          {googleHighlightReviews.map((r, i) => {
            const featured = i === 0;
            return (
              <blockquote
                className={`testimonial-card${featured ? " testimonial-card--featured" : ""}`}
                key={`${i}-${r.firstName}`}
              >
                {featured ? (
                  <span className="testimonial-card__badge">מומלץ</span>
                ) : null}
                <div
                  className="testimonial-card__stars"
                  aria-label="5 מתוך 5 כוכבים"
                >
                  ★★★★★
                </div>
                <p className="testimonial-card__text">{r.text}</p>
                <footer className="testimonial-card__name">{r.firstName}</footer>
              </blockquote>
            );
          })}
        </div>
        <div className="testimonials-cta">
          <a
            className="btn btn-outline testimonials-cta__btn"
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="לצפייה בכל הביקורות בגוגל"
          >
            לצפייה בכל הביקורות
          </a>
        </div>
      </div>
    </section>
  );
}
