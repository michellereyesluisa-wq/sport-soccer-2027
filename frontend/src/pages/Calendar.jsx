import { useLanguage } from "../context/LanguageContext";
import { allTeams, knockoutRound16, stadiums, flagUrl } from "../data/teams";

function teamById(id) { return allTeams.find((t) => t.id === id); }

export default function Calendar() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ marginTop: 24 }}>
      <h2 className="section-title">📅 {t("calendar_title")}</h2>

      <div className="bracket-title">{t("round16")}</div>
      <div className="bracket-grid">
        {knockoutRound16.map((m, i) => {
          const a = teamById(m.teamA), b = teamById(m.teamB);
          return (
            <div key={m.id} className="bracket-match">
              <div className="bracket-teams">
                <div className="bracket-team"><img className="flag-icon" src={flagUrl(a.iso)} alt={a.name} /> {a.name}</div>
                <div className="bracket-team"><img className="flag-icon" src={flagUrl(b.iso)} alt={b.name} /> {b.name}</div>
              </div>
              <div className="bracket-vs-line" />
              <div className="bracket-winner">🏆 {t("winner")} {i + 1}</div>
            </div>
          );
        })}
      </div>

      <h2 className="section-title" style={{ marginTop: 40 }}>🏟️ {t("stadiums_title")}</h2>
      <div className="stadium-grid">
        {stadiums.map((s) => (
          <div key={s.id} className="stadium-card">
            <div className="stadium-photo" style={{ backgroundImage: `url(${s.photo})` }} />
            <div className="stadium-card-body">
              <div>
                <div className="stadium-name">{s.name}</div>
                <div className="stadium-city">📍 {s.city}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
