import { galleryImages } from "../data/siteContent.js";
import {
  isRemoteImageUrl,
  localPngDefaultSrc,
  localPngSrcSet,
} from "../utils/imageHelpers.js";

function remoteGallerySrcSet(src) {
  const u = new URL(src);
  const line = (w) => {
    u.searchParams.set("w", String(w));
    return `${u.href} ${w}w`;
  };
  return [line(640), line(960), line(1200)].join(", ");
}

export function Gallery() {
  return (
    <section className="section gallery-section section--dark" id="gallery">
      <div className="container">
        <p className="section-eyebrow">רגעים מהמטבח</p>
        <h2 className="section-title">גלריה</h2>
        <div className="gallery-grid bleed-x">
          {galleryImages.map((img) => {
            const remote = isRemoteImageUrl(img.src);
            const src = remote
              ? img.src.replace(/w=\d+/, "w=960")
              : localPngDefaultSrc(img.src);
            return (
              <figure className="gallery-item" key={img.src}>
                <img
                  src={src}
                  srcSet={
                    remote
                      ? remoteGallerySrcSet(img.src)
                      : localPngSrcSet(img.src)
                  }
                  sizes="(min-width: 1024px) 33vw, (min-width: 769px) 50vw, 100vw"
                  alt={img.alt}
                  width={1024}
                  height={576}
                  loading="lazy"
                  decoding="async"
                />
                <span className="gallery-item-overlay" aria-hidden="true" />
              </figure>
            );
          })}
        </div>
      </div>
    </section>
  );
}
