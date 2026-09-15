import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { languages } from "../i18n/translations";

export default function Header() {
  const { lang, setLang, t } = useLanguage();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav_home") },
    { to: "/noticias", label: t("nav_news") },
    { to: "/clasificaciones", label: t("nav_standings") },
    { to: "/calendario", label: t("nav_calendar") },
  ];

  return (
    <header className="site-header">
      <div className="header-inner">
        <NavLink to="/" className="brand">
          <div className="brand-badge">🏆</div>
          <div className="brand-text">
            <span className="name">SPORT SOCCER</span>
            <span className="year">2027</span>
          </div>
        </NavLink>

        <nav className="main-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} className={({ isActive }) => (isActive ? "active" : "")}>
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="header-actions">
          <NavLink to="/apuestas" className="bets-pill">🔒 {t("nav_bets")}</NavLink>
          <select className="lang-select" value={lang} onChange={(e) => setLang(e.target.value)}>
            {languages.map((l) => (
              <option key={l.code} value={l.code}>{l.label}</option>
            ))}
          </select>
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="menu">☰</button>
        </div>
      </div>

      {open && (
        <div className="mobile-nav">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.to === "/"} onClick={() => setOpen(false)}>
              {l.label}
            </NavLink>
          ))}
        </div>
      )}
    </header>
  );
}
