import { useLanguage } from "../context/LanguageContext";
import { sponsors } from "../data/sponsors";

export default function Footer() {
  const { t } = useLanguage();
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div className="footer-brand">SPORT SOCCER 2027</div>
        <div className="footer-sponsors">
          {sponsors.map((s) => <span key={s.id}>{s.name}</span>)}
        </div>
        <div className="footer-legal">
          © 2027 Sport Soccer. {t("footer_rights")}<br />
          {t("footer_disclaimer")}
        </div>
      </div>
    </footer>
  );
}
