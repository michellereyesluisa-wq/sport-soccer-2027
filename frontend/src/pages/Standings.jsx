import { useLanguage } from "../context/LanguageContext";
import { groups, flagUrl } from "../data/teams";

export default function Standings() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ marginTop: 24 }}>
      <h2 className="section-title">🏆 {t("standings_title")}</h2>
      <div className="groups-grid">
        {Object.entries(groups).map(([letter, teams]) => {
          const sorted = [...teams].sort((a, b) => b.pts - a.pts || b.dg - a.dg);
          return (
            <div key={letter} className="group-card">
              <div className="group-header">Grupo {letter}</div>
              <table className="standings-table">
                <thead>
                  <tr>
                    <th></th>
                    <th>{t("team")}</th>
                    <th>{t("played")}</th>
                    <th>{t("diff")}</th>
                    <th>{t("points")}</th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((team, i) => (
                    <tr key={team.id}>
                      <td><span className="rank">{i + 1}</span></td>
                      <td className="team-cell">
                        <img className="flag-icon sm" src={flagUrl(team.iso)} alt={team.name} /> {team.name}
                      </td>
                      <td>{team.pj}</td>
                      <td>{team.dg > 0 ? `+${team.dg}` : team.dg}</td>
                      <td className="pts">{team.pts}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        })}
      </div>
    </section>
  );
}
