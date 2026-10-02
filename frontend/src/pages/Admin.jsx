import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";
import { flagUrl } from "../data/teams";

function AdminLogin() {
  const { t } = useLanguage();
  const { login } = useAdmin();
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const result = await login(password);
    setLoading(false);
    if (!result.ok) setError(t("admin_wrong_password"));
  };

  return (
    <div className="admin-gate-wrap">
      <div className="bets-gate">
        <div className="bets-gate-header">🛡️ {t("admin_title")}</div>
        <div className="bets-gate-body">
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>{t("admin_password")}</label>
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              {error && <div className="error-text">{error}</div>}
            </div>
            <button className="btn-verify" type="submit" disabled={loading}>{loading ? "..." : t("admin_login_btn")}</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function NewsForm({ initial, onCancel, onSaved }) {
  const { t } = useLanguage();
  const { adminHeaders } = useAdmin();
  const [form, setForm] = useState(initial || { title: "", summary: "", body: "", image: "" });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const method = form._id ? "PUT" : "POST";
    const url = form._id ? `/api/news/${form._id}` : "/api/news";
    await fetch(url, { method, headers: adminHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="admin-form-card">
      <div className="form-group">
        <label>{t("admin_news_title_label")}</label>
        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} />
      </div>
      <div className="form-group">
        <label>{t("admin_news_summary_label")}</label>
        <input value={form.summary} onChange={(e) => setForm({ ...form, summary: e.target.value })} />
      </div>
      <div className="form-group">
        <label>{t("admin_news_body_label")}</label>
        <textarea rows={5} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })} />
      </div>
      <div className="form-group">
        <label>{t("admin_news_image_label")}</label>
        <input value={form.image || ""} onChange={(e) => setForm({ ...form, image: e.target.value })} />
      </div>
      <div className="admin-form-actions">
        <button className="btn-add" onClick={save} disabled={saving || !form.title}>{saving ? "..." : t("admin_save")}</button>
        <button className="btn-ghost" onClick={onCancel}>{t("admin_cancel")}</button>
      </div>
    </div>
  );
}

function NewsAdminPanel() {
  const { t } = useLanguage();
  const { adminHeaders } = useAdmin();
  const [news, setNews] = useState([]);
  const [editing, setEditing] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [refreshMsg, setRefreshMsg] = useState(null);

  const load = () => fetch("/api/news").then((r) => r.json()).then(setNews).catch(() => setNews([]));
  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm(t("admin_confirm_delete"))) return;
    await fetch(`/api/news/${id}`, { method: "DELETE", headers: adminHeaders() });
    load();
  };

  const onRefreshLive = async () => {
    setRefreshing(true);
    setRefreshMsg(null);
    try {
      const res = await fetch("/api/news/refresh-live", { method: "POST" });
      const data = await res.json();
      setRefreshMsg(data.ok ? `+${data.nuevas}` : "error");
      load();
    } catch (e) {
      setRefreshMsg("error");
    }
    setRefreshing(false);
  };

  return (
    <div>
      <div className="admin-topbar">
        <button className="btn-add" onClick={() => setEditing({})}>+ {t("admin_new_news_title")}</button>
        <button className="btn-ghost" onClick={onRefreshLive} disabled={refreshing}>
          {refreshing ? "..." : `🔄 ${t("admin_refresh_live")}`} {refreshMsg ? `(${refreshMsg})` : ""}
        </button>
      </div>
      {editing && (
        <NewsForm
          initial={editing._id ? editing : null}
          onCancel={() => setEditing(null)}
          onSaved={() => { setEditing(null); load(); }}
        />
      )}
      {news.map((n) => (
        <div key={n._id} className="admin-list-item">
          <div>
            <strong>{n.title}</strong>
            <div style={{ fontSize: 12, color: "var(--text-muted)" }}>{n.source} {n.isExternal ? "· feed" : "· manual"}</div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            {!n.isExternal && <button className="btn-small btn-edit" onClick={() => setEditing(n)}>✏️ {t("admin_edit")}</button>}
            <button className="btn-small btn-delete" onClick={() => onDelete(n._id)}>🗑 {t("admin_delete")}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function TeamForm({ initial, onCancel, onSaved }) {
  const { t } = useLanguage();
  const { adminHeaders } = useAdmin();
  const [form, setForm] = useState(initial || { teamId: "", name: "", iso: "", group: "A", pj: 0, dg: 0, pts: 0 });
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    const method = form._id ? "PUT" : "POST";
    const url = form._id ? `/api/teams/${form._id}` : "/api/teams";
    await fetch(url, { method, headers: adminHeaders(), body: JSON.stringify(form) });
    setSaving(false);
    onSaved();
  };

  return (
    <div className="admin-form-card">
      {!form._id && (
        <div className="form-group">
          <label>ID corto (ej. "arg")</label>
          <input value={form.teamId} onChange={(e) => setForm({ ...form, teamId: e.target.value })} />
        </div>
      )}
      <div className="form-group">
        <label>{t("admin_team_name")}</label>
        <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="form-group">
        <label>{t("admin_team_iso")}</label>
        <input value={form.iso} onChange={(e) => setForm({ ...form, iso: e.target.value })} placeholder="ej. ar, fr, mx" />
      </div>
      <div className="form-group">
        <label>{t("admin_team_group")}</label>
        <select value={form.group} onChange={(e) => setForm({ ...form, group: e.target.value })}>
          {["A","B","C","D","E","F","G","H"].map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label>{t("admin_team_pj")}</label>
        <input type="number" value={form.pj} onChange={(e) => setForm({ ...form, pj: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label>{t("admin_team_dg")}</label>
        <input type="number" value={form.dg} onChange={(e) => setForm({ ...form, dg: Number(e.target.value) })} />
      </div>
      <div className="form-group">
        <label>{t("admin_team_pts")}</label>
        <input type="number" value={form.pts} onChange={(e) => setForm({ ...form, pts: Number(e.target.value) })} />
      </div>
      <div className="admin-form-actions">
        <button className="btn-add" onClick={save} disabled={saving || !form.name}>{saving ? "..." : t("admin_save")}</button>
        <button className="btn-ghost" onClick={onCancel}>{t("admin_cancel")}</button>
      </div>
    </div>
  );
}

function StandingsAdminPanel() {
  const { t } = useLanguage();
  const { adminHeaders } = useAdmin();
  const [teams, setTeams] = useState([]);
  const [editing, setEditing] = useState(null);

  const load = () => fetch("/api/teams").then((r) => r.json()).then(setTeams).catch(() => setTeams([]));
  useEffect(() => { load(); }, []);

  const onDelete = async (id) => {
    if (!confirm(t("admin_confirm_delete"))) return;
    await fetch(`/api/teams/${id}`, { method: "DELETE", headers: adminHeaders() });
    load();
  };

  return (
    <div>
      <div className="admin-topbar">
        <button className="btn-add" onClick={() => setEditing({})}>+ {t("admin_new_team")}</button>
      </div>
      {editing && (
        <TeamForm initial={editing._id ? editing : null} onCancel={() => setEditing(null)} onSaved={() => { setEditing(null); load(); }} />
      )}
      {teams.map((team) => (
        <div key={team._id} className="admin-list-item">
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <img className="flag-icon" src={flagUrl(team.iso)} alt={team.name} />
            <div>
              <strong>{team.name}</strong>
              <div style={{ fontSize: 12, color: "var(--text-muted)" }}>Grupo {team.group} · PJ {team.pj} · DG {team.dg} · {team.pts} pts</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn-small btn-edit" onClick={() => setEditing(team)}>✏️ {t("admin_edit")}</button>
            <button className="btn-small btn-delete" onClick={() => onDelete(team._id)}>🗑 {t("admin_delete")}</button>
          </div>
        </div>
      ))}
    </div>
  );
}

function AdminPanel() {
  const { t } = useLanguage();
  const { logout } = useAdmin();
  const [tab, setTab] = useState("news");

  return (
    <section className="section" style={{ marginTop: 24 }}>
      <div className="admin-topbar">
        <h2 className="section-title" style={{ marginBottom: 0 }}>🛠️ {t("admin_title")}</h2>
        <button className="btn-ghost" onClick={logout}>{t("admin_logout")}</button>
      </div>
      <div className="admin-tabs">
        <button className={`admin-tab-btn ${tab === "news" ? "active" : ""}`} onClick={() => setTab("news")}>📰 {t("admin_tab_news")}</button>
        <button className={`admin-tab-btn ${tab === "standings" ? "active" : ""}`} onClick={() => setTab("standings")}>🏆 {t("admin_tab_standings")}</button>
      </div>
      {tab === "news" ? <NewsAdminPanel /> : <StandingsAdminPanel />}
    </section>
  );
}

export default function Admin() {
  const { isAdmin } = useAdmin();
  return isAdmin ? <AdminPanel /> : <AdminLogin />;
}