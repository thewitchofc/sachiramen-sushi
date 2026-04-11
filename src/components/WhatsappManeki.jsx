import { WHATSAPP_URL } from "../data/siteContent.js";

export function WhatsappManeki() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="wa-maneki"
      aria-label="שליחת הודעה בוואטסאפ"
    >
      <img
        src="/cat.png"
        className="wa-maneki__img"
        alt="חתול מניאקי נימא — פתיחת צ'אט בוואטסאפ"
        decoding="async"
      />
    </a>
  );
}
