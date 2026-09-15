import { useLanguage } from "../context/LanguageContext";
import { newsItems } from "../data/news";

export default function News() {
  const { t } = useLanguage();
  return (
    <section className="section" style={{ marginTop: 24 }}>
      <h2 className="section-title">📰 {t("news_title")}</h2>
      <div className="news-grid">
        {newsItems.map((n) => (
          <div key={n.id} className="news-card">
            <div className="news-image" style={{ backgroundImage: `url(${n.photo})` }} />
            <div className="news-body">
              <div className="news-time">
                🗓 {n.hoursAgo >= 24 ? t("day_ago", { n: Math.round(n.hoursAgo / 24) }) : t("hours_ago", { n: n.hoursAgo })}
              </div>
              <div className="news-headline">{t(n.titleKey)}</div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
