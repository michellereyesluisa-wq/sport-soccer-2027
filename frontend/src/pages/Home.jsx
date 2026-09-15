import { useLanguage } from "../context/LanguageContext";
import { NavLink } from "react-router-dom";
import SponsorsBar from "../components/SponsorsBar";
import StarPlayers from "../components/StarPlayers";
import { allTeams, matchDay, flagUrl } from "../data/teams";
import { useLanguage as useLang } from "../context/LanguageContext";

function teamById(id) { return allTeams.find(t => t.id === id); }

function MatchDay() {
  const { t } = useLang();
  return (
    <section className="section">
      <div className="matchday-card">
        <div className="matchday-header">
          <h2 className="section-title" style={{ marginBottom: 0 }}>📈 {t("matchday")}</h2>
          <span className="live-badge">{t("live")}</span>
        </div>
        <div className="matchday-grid">
          {matchDay.map((m) => {
            const a = teamById(m.teamA), b = teamById(m.teamB);
            return (
              <div key={m.id} style={{ padding: "12px 4px" }}>
                <div style={{ color: "var(--text-muted)", fontSize: 12, marginBottom: 6 }}>
                  📍 {m.stadium.name} · ⏱ {m.minute}'
                </div>
                <div className="team-row">
                  <div className="team-row-left"><img className="flag-icon" src={flagUrl(a.iso)} alt={a.name} /> {a.name}</div>
                  <div className="team-score">{m.scoreA}</div>
                </div>
                <div className="team-row">
                  <div className="team-row-left"><img className="flag-icon" src={flagUrl(b.iso)} alt={b.name} /> {b.name}</div>
                  <div className="team-score">{m.scoreB}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  const { t } = useLanguage();
  return (
    <>
      <div className="container">
        <div className="hero">
  <div className="hero-ball" aria-hidden="true">
    <svg viewBox="0 0 100 100" width="70" height="70">
      <circle cx="50" cy="50" r="48" fill="#fff" stroke="#1a2e22" strokeWidth="2" />
      <g fill="#1a2e22">
        <polygon points="50,20 62,29 57,44 43,44 38,29" />
        <polygon points="50,20 38,29 27,22 33,10 50,8" />
        <polygon points="50,20 62,29 73,22 67,10 50,8" />
        <polygon points="27,22 33,10 22,5 12,15 15,28" />
        <polygon points="73,22 67,10 78,5 88,15 85,28" />
        <polygon points="43,44 38,29 27,22 15,28 20,42 30,50" />
        <polygon points="57,44 62,29 73,22 85,28 80,42 70,50" />
        <polygon points="43,44 30,50 33,65 50,70 47,55" />
        <polygon points="57,44 70,50 67,65 50,70 53,55" />
      </g>
    </svg>
  </div>
  <span className="hero-badge">🏆 {t("hero_badge")}</span>
          <h1>{t("hero_title")}</h1>
          <p>{t("hero_subtitle")}</p>
          <div className="hero-actions">
            <NavLink to="/apuestas" className="btn-gold">📈 {t("hero_bets")}</NavLink>
            <NavLink to="/calendario" className="btn-outline">📅 {t("hero_calendar")}</NavLink>
          </div>
        </div>
        <SponsorsBar />
      </div>
      <MatchDay />
      <StarPlayers />
    </>
  );
}
