import { useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import { useBetsAccess } from "../context/BetsAccessContext";
import { useWallet } from "../context/WalletContext";
import { allTeams, matchDay, flagUrl } from "../data/teams";

function teamById(id) { return allTeams.find((t) => t.id === id); }

function CurpGate() {
  const { t } = useLanguage();
  const { verifyCurp } = useBetsAccess();
  const [curp, setCurp] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    const result = await verifyCurp(curp);
    setLoading(false);
    if (!result.ok) {
      setError(result.reason === "underage" ? t("curp_underage") : t("curp_invalid"));
    }
  };

  return (
    <div className="bets-gate-wrap">
      <div className="bets-gate">
        <div className="bets-gate-header">🛡️ {t("bets_title")}</div>
        <div className="bets-gate-body">
          <div className="gate-icon">👤➕</div>
          <p className="gate-desc">{t("bets_locked_desc")}</p>
          <form onSubmit={onSubmit}>
            <div className="form-group">
              <label>{t("curp_label")}</label>
              <input
                value={curp}
                onChange={(e) => setCurp(e.target.value.toUpperCase())}
                placeholder={t("curp_placeholder")}
                maxLength={18}
                required
              />
              {error && <div className="error-text">{error}</div>}
            </div>
            <button className="btn-verify" type="submit" disabled={loading}>
              {loading ? "..." : t("verify_btn")}
            </button>
          </form>
          <p className="gate-legal">{t("curp_legal")}</p>
        </div>
      </div>
    </div>
  );
}

function oddsFor(matchId) {
  const table = {
    g1: { teamA: 1.7, draw: 3.4, teamB: 4.8 },
    g2: { teamA: 2.1, draw: 3.1, teamB: 3.3 },
    g3: { teamA: 1.5, draw: 4.0, teamB: 6.5 },
    g4: { teamA: 3.2, draw: 3.3, teamB: 2.2 },
  };
  return table[matchId] || { teamA: 2.0, draw: 3.0, teamB: 3.5 };
}

function BetCard({ match }) {
  const { t } = useLanguage();
  const { balance, placeBet } = useWallet();
  const a = teamById(match.teamA), b = teamById(match.teamB);
  const odds = oddsFor(match.id);

  const [selected, setSelected] = useState(null);
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState(null);

  const options = [
    { key: "teamA", label: a.name, odd: odds.teamA },
    { key: "draw", label: t("draw"), odd: odds.draw },
    { key: "teamB", label: b.name, odd: odds.teamB },
  ];

  const onConfirm = () => {
    setMessage(null);
    const value = Number(amount);
    if (!selected) {
      setMessage({ type: "error", text: t("select_outcome_first") });
      return;
    }
    if (!value || value <= 0) {
      setMessage({ type: "error", text: t("enter_amount") });
      return;
    }
    if (value > balance) {
      setMessage({ type: "error", text: t("insufficient_funds") });
      return;
    }
    const chosen = options.find((o) => o.key === selected);
    const outcomeLabel = `${a.name} vs ${b.name} — ${chosen.label}`;
    const result = placeBet(match.id, outcomeLabel, chosen.odd, value);
    if (result.ok) {
      setMessage({ type: "success", text: t("bet_confirmed", { amount: value, payout: result.bet.potentialPayout }) });
      setAmount("");
      setSelected(null);
    }
  };

  return (
    <div className="odds-card">
      <div className="odds-teams" style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <img className="flag-icon sm" src={flagUrl(a.iso)} alt={a.name} /> {a.name} vs {b.name}
        <img className="flag-icon sm" src={flagUrl(b.iso)} alt={b.name} />
      </div>

      <div className="outcome-row">
        {options.map((o) => (
          <button
            key={o.key}
            type="button"
            className={`outcome-btn ${selected === o.key ? "selected" : ""}`}
            onClick={() => { setSelected(o.key); setMessage(null); }}
          >
            <span className="outcome-label">{o.label}</span>
            <span className="outcome-odd">{o.odd.toFixed(2)}</span>
          </button>
        ))}
      </div>

      <div className="bet-amount-row">
        <span className="amount-prefix">$</span>
        <input
          type="number"
          min="1"
          className="amount-input"
          placeholder={t("bet_amount_placeholder")}
          value={amount}
          onChange={(e) => { setAmount(e.target.value); setMessage(null); }}
        />
        <button className="btn-place" onClick={onConfirm}>{t("confirm_bet")}</button>
      </div>

      {message && (
        <div className={message.type === "error" ? "error-text" : "bet-success-text"}>{message.text}</div>
      )}
    </div>
  );
}

function OddsBoard() {
  const { t } = useLanguage();
  const { balance, bets } = useWallet();

  return (
    <section className="section" style={{ marginTop: 24 }}>
      <div className="bets-unlocked-banner">✅ {t("bets_welcome")}</div>

      <div className="balance-card">
        <span className="balance-label">{t("your_balance")}</span>
        <span className="balance-value">${balance.toLocaleString()}</span>
      </div>

      <div className="odds-grid">
        {matchDay.map((m) => <BetCard key={m.id} match={m} />)}
      </div>

      {bets.length > 0 && (
        <div className="my-bets">
          <h3 className="section-title" style={{ fontSize: 18, marginTop: 32 }}>🎟️ {t("my_bets")}</h3>
          <div className="my-bets-list">
            {bets.map((b) => (
              <div key={b.id} className="my-bet-row">
                <span>{b.outcomeLabel}</span>
                <span>${b.amount} @ {b.odds.toFixed(2)}</span>
                <span className="my-bet-payout">→ ${b.potentialPayout}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}

export default function Bets() {
  const { unlocked } = useBetsAccess();
  return unlocked ? <OddsBoard /> : <CurpGate />;
}