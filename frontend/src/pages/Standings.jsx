import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";
import { groups as fallbackGroups, flagUrl } from "../data/teams";

export default function Standings() {
  const { t } = useLanguage();
  const { isAdmin, adminHeaders } = useAdmin();
  const [groups, setGroups] = useState(null);

  const load = () => {
    fetch("/api/teams/groups")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setGroups(Object.keys(data).length ? data : fallbackGroups))
      .catch(() => setGroups(fallbackGroups));
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm(t("admin_confirm_delete"))) return;
    await fetch(`/api/teams/${id}`, { method: "DELETE", headers: adminHeaders() });
    load();
  };

  if (!groups) return null;

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
                    <th></th><th>{t("team")}</th><th>{t("played")}</th><th>{t("diff")}</th><th>{t("points")}</th>
                    {isAdmin && <th></th>}
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((team, i) => (
                    <tr key={team._id || team.id}>
                      <td><span className="rank">{i + 1}</span></td>
                      <td className="team-cell"><img className="flag-icon sm" src={flagUrl(team.iso)} alt={team.name} /> {team.name}</td>
                      <td>{team.pj}</td>
                      <td>{team.dg > 0 ? `+${team.dg}` : team.dg}</td>
                      <td className="pts">{team.pts}</td>
                      {isAdmin && team._id && (
                        <td><div className="standings-admin-cell"><button className="btn-small btn-delete" onClick={() => onDelete(team._id)}>🗑</button></div></td>
                      )}
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