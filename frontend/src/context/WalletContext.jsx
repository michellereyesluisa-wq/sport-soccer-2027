import { createContext, useContext, useState, useEffect } from "react";

const WalletContext = createContext(null);

const STARTING_BALANCE = 3000;
const STORAGE_KEY = "sportsoccer2027_wallet";

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (e) {}
  return { balance: STARTING_BALANCE, bets: [] };
}

export function WalletProvider({ children }) {
  const [wallet, setWallet] = useState(loadInitial);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(wallet));
    } catch (e) {}
  }, [wallet]);

  const placeBet = (matchId, outcomeLabel, odds, amount) => {
    if (amount <= 0 || amount > wallet.balance) {
      return { ok: false };
    }
    const bet = {
      id: `${matchId}-${Date.now()}`,
      matchId,
      outcomeLabel,
      odds,
      amount,
      potentialPayout: Math.round(amount * odds * 100) / 100,
      placedAt: new Date().toISOString(),
    };
    setWallet((w) => ({
      balance: Math.round((w.balance - amount) * 100) / 100,
      bets: [bet, ...w.bets],
    }));
    return { ok: true, bet };
  };

  const resetWallet = () => setWallet({ balance: STARTING_BALANCE, bets: [] });

  return (
    <WalletContext.Provider value={{ balance: wallet.balance, bets: wallet.bets, placeBet, resetWallet }}>
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  return useContext(WalletContext);
}