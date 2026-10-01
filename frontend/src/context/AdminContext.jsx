import { createContext, useContext, useState } from "react";

const AdminContext = createContext(null);
const STORAGE_KEY = "sportsoccer2027_admin_pw";

export function AdminProvider({ children }) {
  const [password, setPassword] = useState(() => sessionStorage.getItem(STORAGE_KEY) || null);

  const login = async (pw) => {
    try {
      const res = await fetch("/api/admin/login", {
        method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ password: pw }),
      });
      if (res.ok) {
        setPassword(pw);
        sessionStorage.setItem(STORAGE_KEY, pw);
        return { ok: true };
      }
      return { ok: false };
    } catch (e) {
      return { ok: false };
    }
  };

  const logout = () => { setPassword(null); sessionStorage.removeItem(STORAGE_KEY); };

  const adminHeaders = () => ({ "Content-Type": "application/json", "x-admin-password": password || "" });

  return (
    <AdminContext.Provider value={{ isAdmin: !!password, login, logout, adminHeaders }}>
      {children}
    </AdminContext.Provider>
  );
}
export function useAdmin() { return useContext(AdminContext); }