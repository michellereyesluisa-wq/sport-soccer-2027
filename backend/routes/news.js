import { useState, useEffect } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useAdmin } from "../context/AdminContext";
import { newsItems as fallbackNews } from "../data/news";

function timeAgoLabel(publishedAt, t) {
  const hours = Math.max(1, Math.round((Date.now() - new Date(publishedAt).getTime()) / 3600000));
  return hours >= 24 ? t("day_ago", { n: Math.round(hours / 24) }) : t("hours_ago", { n: hours });
}

function NewsModal({ item, onClose }) {
  const { t } = useLanguage();
  if (!item) return null;
  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <div style={{ position: "relative" }}>
          {item.image && <div className="modal-image" style={{ backgroundImage: `url(${item.image})` }} />}
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        <div className="modal-body">
          <div className="modal-title">{item.title}</div>
          <div className="modal-meta">{t("source_label")}: {item.source} · {timeAgoLabel(item.publishedAt, t)}</div>
          <div className="modal-text">{item.isExternal ? item.summary : (item.body || item.summary)}</div>
          {item.isExternal && item.link && (
            <a className="modal-link-btn" href={item.link} target="_blank" rel="noopener noreferrer">📰 {t("read_more")}</a>
          )}
        </div>
      </div>
    </div>
  );
}

export default function News() {
  const { t } = useLanguage();
  const { isAdmin, adminHeaders } = useAdmin();
  const [news, setNews] = useState([]);
  const [selected, setSelected] = useState(null);

  const load = () => {
    fetch("/api/news")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then((data) => setNews(data.length ? data : fallbackNews))
      .catch(() => setNews(fallbackNews));
  };

  useEffect(() => { load(); }, []);

  const onDelete = async (e, id) => {
    e.stopPropagation();
    if (!confirm(t("admin_confirm_delete"))) return;
    await fetch(`/api/news/${id}`, { method: "DELETE", headers: adminHeaders() });
    load();
  };

  return (
    <section className="section" style={{ marginTop: 24 }}>
      <h2 className="section-title">📰 {t("news_title")}</h2>
      <div className="news-grid">
        {news.map((n) => (
          <button key={n._id || n.id} className="news-card" onClick={() => setSelected(n)}>
            <div className="news-image" style={{ backgroundImage: n.image ? `url(${n.image})` : undefined }} />
            <div className="news-body">
              <div className="news-time">
                <span>🗓 {timeAgoLabel(n.publishedAt || Date.now(), t)}</span>
                {n.source && <span className="news-source">{n.source}</span>}
              </div>
              <div className="news-headline">{n.title}</div>
              {isAdmin && n._id && (
                <div className="news-admin-actions">
                  <button className="btn-small btn-delete" onClick={(e) => onDelete(e, n._id)}>🗑 {t("admin_delete")}</button>
                </div>
              )}
            </div>
          </button>
        ))}
      </div>
      <NewsModal item={selected} onClose={() => setSelected(null)} />
    </section>
  );
}