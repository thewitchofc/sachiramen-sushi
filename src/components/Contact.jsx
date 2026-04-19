import {
  ADDRESS_MAP_URL,
  MAPS_EMBED_URL,
  MAPS_SEARCH_URL,
  PHONE_DISPLAY,
  PHONE_TEL,
  WOLT_URL,
} from "../data/siteContent.js";
import { OpeningHoursList } from "./OpeningHoursList.jsx";

export function Contact() {
  return (
    <section className="section contact-section section--dark" id="contact">
      <div className="container">
        <p className="section-eyebrow">בואו לבקר</p>
        <h1 className="section-title">יצירת קשר</h1>
        <div className="contact-layout">
          <div className="contact-info">
            <dl className="contact-list">
              <div>
                <dt>כתובת</dt>
                <dd>
                  <a
                    href={ADDRESS_MAP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    דיזנגוף 98, תל אביב
                  </a>
                </dd>
              </div>
              <div>
                <dt>טלפון</dt>
                <dd>
                  <a href={`tel:${PHONE_TEL}`}>{PHONE_DISPLAY}</a>
                </dd>
              </div>
              <div>
                <dt>שעות פעילות</dt>
                <dd>
                  <OpeningHoursList />
                </dd>
              </div>
            </dl>
            <a
              className="btn btn-outline contact-cta"
              href={WOLT_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="הזמן ב-Wolt"
              data-track-order="contact"
            >
              הזמן ב-Wolt
            </a>
          </div>
          <div className="map-column">
            <div className="map-wrap">
              <iframe
                title="מיקום סאצ'י ראמן וסושי — דיזנגוף 98 תל אביב"
                src={MAPS_EMBED_URL}
                width={600}
                height={450}
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="map-fallback-link">
              <a
                href={MAPS_SEARCH_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                פתיחה ב-Google Maps
              </a>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
