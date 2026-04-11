import { hours } from "../data/siteContent.js";

export function OpeningHoursList({ className = "" }) {
  const ulClass = ["hours-list", className].filter(Boolean).join(" ");
  return (
    <ul className={ulClass}>
      {hours.map((row) => (
        <li key={row.day} className="hours-list__item">
          <span className="hours-list__day">{row.day}</span>
          {row.closed ? (
            <span className="hours-list__range hours-list__range--closed">סגור</span>
          ) : (
            <span className="hours-list__range" dir="ltr" translate="no">
              {row.range}
            </span>
          )}
        </li>
      ))}
    </ul>
  );
}
