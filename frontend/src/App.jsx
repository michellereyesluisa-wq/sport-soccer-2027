import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import News from "./pages/News";
import Standings from "./pages/Standings";
import Calendar from "./pages/Calendar";
import Bets from "./pages/Bets";
import Admin from "./pages/Admin";
import { LanguageProvider } from "./context/LanguageContext";
import { BetsAccessProvider } from "./context/BetsAccessContext";
import { AdminProvider } from "./context/AdminContext";
import "./styles/global.css";

export default function App() {
  return (
    <LanguageProvider>
      <AdminProvider>
        <BetsAccessProvider>
          <Header />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/noticias" element={<News />} />
              <Route path="/clasificaciones" element={<Standings />} />
              <Route path="/calendario" element={<Calendar />} />
              <Route path="/apuestas" element={<Bets />} />
              <Route path="/admin" element={<Admin />} />
            </Routes>
          </main>
          <Footer />
        </BetsAccessProvider>
      </AdminProvider>
    </LanguageProvider>
  );
}