import { pressArticles } from "../data/siteContent.js";

export function Press() {
  return (
    <section className="section press-section" id="press" aria-labelledby="press-heading">
      <div className="container">
        <p className="section-eyebrow">בתקשורת</p>
        <h1 className="section-title" id="press-heading">
          כתבו עלינו
        </h1>
        <div className="press-grid">
          {pressArticles.map((article) => (
            <article className="press-card" key={article.href}>
              <p className="press-card__outlet">{article.outlet}</p>
              <blockquote className="press-card__quote">
                <p>«{article.quote}»</p>
              </blockquote>
              <p className="press-card__excerpt">{article.excerpt}</p>
              <a
                className="btn btn-outline press-card__cta"
                href={article.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${article.ctaLabel} — ${article.outlet}`}
              >
                {article.ctaLabel}
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
