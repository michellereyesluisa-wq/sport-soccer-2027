import { createContext, useContext, useState } from "react";

const BetsAccessContext = createContext(null);

// Valida el formato basico de un CURP mexicano:
// 4 letras + 6 digitos (AAMMDD nacimiento) + H/M + 5 letras + 2 alfanumericos
const CURP_REGEX = /^[A-Z]{4}\d{6}[HM][A-Z]{5}[A-Z0-9]{2}$/;

export function calculateAgeFromCurp(curp) {
  const yy = parseInt(curp.substring(4, 6), 10);
  const mm = parseInt(curp.substring(6, 8), 10);
  const dd = parseInt(curp.substring(8, 10), 10);

  // Heuristica de siglo: si el año de 2 digitos es mayor al año actual (2 digitos),
  // asumimos que la persona nacio en 1900s, si no, en 2000s.
  const currentYearFull = new Date().getFullYear(); // 2026
  const currentYear2 = currentYearFull % 100;
  const century = yy > currentYear2 ? 1900 : 2000;
  const birthDate = new Date(century + yy, mm - 1, dd);

  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
}

export function validateCurpFormat(curp) {
  return CURP_REGEX.test(curp.toUpperCase());
}

export function BetsAccessProvider({ children }) {
  const [unlocked, setUnlocked] = useState(false);

  // Intenta verificar contra el backend (MongoDB); si no hay backend disponible
  // (por ejemplo en la vista previa estatica) valida localmente el formato y edad.
  const verifyCurp = async (curp) => {
    const clean = curp.trim().toUpperCase();
    if (!validateCurpFormat(clean)) {
      return { ok: false, reason: "invalid" };
    }
    try {
      const res = await fetch("/api/bets/verify-curp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ curp: clean }),
      });
      if (res.ok) {
        const data = await res.json();
        if (data.isAdult) {
          setUnlocked(true);
          return { ok: true };
        }
        return { ok: false, reason: "underage" };
      }
    } catch (e) {
      // Backend no disponible: se valida localmente (modo vista previa)
    }
    const age = calculateAgeFromCurp(clean);
    if (age >= 18) {
      setUnlocked(true);
      return { ok: true };
    }
    return { ok: false, reason: "underage" };
  };

  return (
    <BetsAccessContext.Provider value={{ unlocked, verifyCurp }}>
      {children}
    </BetsAccessContext.Provider>
  );
}

export function useBetsAccess() {
  return useContext(BetsAccessContext);
}
