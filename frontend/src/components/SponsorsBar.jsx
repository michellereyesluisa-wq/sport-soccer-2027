import { useLanguage } from "../context/LanguageContext";
import { sponsors } from "../data/sponsors";

export default function SponsorsBar() {
  const { t } = useLanguage();
  return (
    <div className="sponsors-box">
      <div className="sponsors-title">⭐ {t("sponsors_title")} ⭐</div>
      <div className="sponsors-row">
        {sponsors.map((s) => (
          <div key={s.id} className="sponsor-badge">
            {s.logo ? <img className="sponsor-logo-img" src={s.logo} alt={s.name} /> : s.name}
          </div>
        ))}
      </div>
    </div>
  );
}