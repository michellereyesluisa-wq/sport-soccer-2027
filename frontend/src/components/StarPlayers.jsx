import { useLanguage } from "../context/LanguageContext";
import { starPlayers } from "../data/starPlayers";
import { flagUrl } from "../data/teams";

export default function StarPlayers() {
  const { t } = useLanguage();
  return (
    <section className="section">
      <h2 className="section-title">⭐ {t("star_players")}</h2>
      <p className="section-sub">{t("star_players_sub")}</p>
      <div className="player-list">
        {starPlayers.map((p) => (
          <div key={p.id} className="player-card">
            <div className="player-left">
            {p.photo ? (
              <img className="player-avatar-photo" src={p.photo} alt={p.name} />
             ) : (
              <div className="player-avatar">{p.name.split(" ").map(w => w[0]).slice(0,2).join("")}</div>
            )}
              <div>
                <div className="player-name">{p.name}</div>
                <div className="player-country">
                  <img className="flag-icon sm" src={flagUrl(p.iso)} alt={p.country} /> {p.country}
                </div>
              </div>
            </div>
            <div className="player-right">
              <span className="player-goals">{p.goals} {t("goals")}</span>
              <span className="player-rating">★ {p.rating}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
