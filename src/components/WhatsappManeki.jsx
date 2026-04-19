import { WHATSAPP_URL } from "../data/siteContent.js";

export function WhatsappManeki() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-maneki"
      aria-label="שליחת הודעה בוואטסאפ"
      data-track-whatsapp="maneki"
    >
      <img
        src="/cat.webp"
        className="wa-maneki__img"
        alt=""
        width={120}
        height={120}
        decoding="async"
        loading="lazy"
      />
    </a>
  );
}
