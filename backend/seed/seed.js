import dotenv from "dotenv";
import mongoose from "mongoose";
import Team from "../models/Team.js";
import News from "../models/News.js";
import Match from "../models/Match.js";
import Sponsor from "../models/Sponsor.js";
import StarPlayer from "../models/StarPlayer.js";

dotenv.config();

const teamsData = [
  // Grupo A
  { teamId: "qat", name: "Qatar", iso: "qa", group: "A", pj: 3, dg: -4, pts: 3 },
  { teamId: "ecu", name: "Ecuador", iso: "ec", group: "A", pj: 3, dg: 2, pts: 6 },
  { teamId: "sen", name: "Senegal", iso: "sn", group: "A", pj: 3, dg: 0, pts: 4 },
  { teamId: "ned", name: "Netherlands", iso: "nl", group: "A", pj: 3, dg: 3, pts: 7 },
  // Grupo B
  { teamId: "eng", name: "England", iso: "gb-eng", group: "B", pj: 3, dg: 3, pts: 7 },
  { teamId: "irn", name: "Iran", iso: "ir", group: "B", pj: 3, dg: 2, pts: 6 },
  { teamId: "usa", name: "USA", iso: "us", group: "B", pj: 3, dg: -1, pts: 3 },
  { teamId: "wal", name: "Wales", iso: "gb-wls", group: "B", pj: 3, dg: -4, pts: 1 },
  // Grupo C
  { teamId: "arg", name: "Argentina", iso: "ar", group: "C", pj: 3, dg: 4, pts: 9 },
  { teamId: "ksa", name: "Saudi Arabia", iso: "sa", group: "C", pj: 3, dg: -1, pts: 4 },
  { teamId: "mex", name: "Mexico", iso: "mx", group: "C", pj: 3, dg: 0, pts: 4 },
  { teamId: "pol", name: "Poland", iso: "pl", group: "C", pj: 3, dg: -3, pts: 2 },
  // Grupo D
  { teamId: "fra", name: "France", iso: "fr", group: "D", pj: 3, dg: 4, pts: 9 },
  { teamId: "aus", name: "Australia", iso: "au", group: "D", pj: 3, dg: 0, pts: 4 },
  { teamId: "den", name: "Denmark", iso: "dk", group: "D", pj: 3, dg: -1, pts: 3 },
  { teamId: "tun", name: "Tunisia", iso: "tn", group: "D", pj: 3, dg: -3, pts: 2 },
  // Grupo E
  { teamId: "esp", name: "Spain", iso: "es", group: "E", pj: 3, dg: 5, pts: 7 },
  { teamId: "crc", name: "Costa Rica", iso: "cr", group: "E", pj: 3, dg: -3, pts: 3 },
  { teamId: "ger", name: "Germany", iso: "de", group: "E", pj: 3, dg: 1, pts: 4 },
  { teamId: "jpn", name: "Japan", iso: "jp", group: "E", pj: 3, dg: -3, pts: 3 },
  // Grupo F
  { teamId: "bel", name: "Belgium", iso: "be", group: "F", pj: 3, dg: 2, pts: 6 },
  { teamId: "can", name: "Canada", iso: "ca", group: "F", pj: 3, dg: -2, pts: 3 },
  { teamId: "mar", name: "Morocco", iso: "ma", group: "F", pj: 3, dg: 3, pts: 7 },
  { teamId: "cro", name: "Croatia", iso: "hr", group: "F", pj: 3, dg: -3, pts: 1 },
  // Grupo G
  { teamId: "bra", name: "Brazil", iso: "br", group: "G", pj: 3, dg: 5, pts: 9 },
  { teamId: "srb", name: "Serbia", iso: "rs", group: "G", pj: 3, dg: -2, pts: 3 },
  { teamId: "sui", name: "Switzerland", iso: "ch", group: "G", pj: 3, dg: 1, pts: 5 },
  { teamId: "cmr", name: "Cameroon", iso: "cm", group: "G", pj: 3, dg: -4, pts: 1 },
  // Grupo H
  { teamId: "por", name: "Portugal", iso: "pt", group: "H", pj: 3, dg: 4, pts: 7 },
  { teamId: "gha", name: "Ghana", iso: "gh", group: "H", pj: 3, dg: -1, pts: 4 },
  { teamId: "uru", name: "Uruguay", iso: "uy", group: "H", pj: 3, dg: 2, pts: 5 },
  { teamId: "kor", name: "South Korea", iso: "kr", group: "H", pj: 3, dg: -5, pts: 2 },
];

const sponsorsData = [
  { name: "Coca-Cola", tier: "official" },
  { name: "Nike", tier: "official" },
  { name: "Adidas", tier: "gold" },
  { name: "Visa", tier: "gold" },
];

const starPlayersData = [
  { name: "L. Messi", country: "Argentina", iso: "ar", goals: 7, rating: 9.8 },
  { name: "K. Mbappé", country: "France", iso: "fr", goals: 8, rating: 9.7 },
  { name: "Neymar Jr", country: "Brazil", iso: "br", goals: 3, rating: 9.2 },
  { name: "H. Kane", country: "England", iso: "gb-eng", goals: 5, rating: 9.1 },
  { name: "C. Gakpo", country: "Netherlands", iso: "nl", goals: 4, rating: 9.0 },
];

const newsData = [
  { title: {
      es: "¡Histórico! Argentina avanza a la siguiente ronda tras un dramático empate.",
      en: "Historic! Argentina advances to the next round after a dramatic draw.",
      fr: "Historique ! L'Argentine avance au tour suivant après un match nul spectaculaire.",
      zh: "历史性时刻!阿根廷在一场戏剧性的平局后晋级下一轮。",
      pt: "Histórico! Argentina avança de fase após um empate dramático.",
    }, image: "https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=500&q=80" },
  { title: {
      es: "Mbappé rompe récord de goleo en fase de grupos con un Hat-Trick.",
      en: "Mbappé breaks group-stage scoring record with a hat-trick.",
      fr: "Mbappé bat le record de buts en phase de groupes avec un triplé.",
      zh: "姆巴佩帽子戏法打破小组赛进球纪录。",
      pt: "Mbappé quebra recorde de gols na fase de grupos com um hat-trick.",
    }, image: "https://images.unsplash.com/photo-1511886929837-354d827aae26?w=500&q=80" },
  { title: {
      es: "Estadios listos: así lucen las sedes rumbo a los octavos de final.",
      en: "Stadiums ready: here's how the venues look ahead of the Round of 16.",
      fr: "Stades prêts : voici à quoi ressemblent les sites avant les huitièmes de finale.",
      zh: "体育场准备就绪:十六强赛前各赛场风貌。",
      pt: "Estádios prontos: veja como estão as sedes rumo às oitavas de final.",
    }, image: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=500&q=80" },
];

const stadiumsInfo = [
  { name: "Lusail Stadium", city: "Lusail, Qatar", photo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
  { name: "Al Bayt Stadium", city: "Al Khor, Qatar", photo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80" },
  { name: "Khalifa International", city: "Doha, Qatar", photo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80" },
  { name: "Education City", city: "Al Rayyan, Qatar", photo: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80" },
];

const matchesData = [
  { teamA: "qat", teamB: "ecu", scoreA: 2, scoreB: 1, stadium: stadiumsInfo[0].name, city: stadiumsInfo[0].city, date: new Date(), time: "13:00", status: "live", minute: 65 },
  { teamA: "arg", teamB: "mex", scoreA: 0, scoreB: 0, stadium: stadiumsInfo[1].name, city: stadiumsInfo[1].city, date: new Date(), time: "16:00", status: "live", minute: 65 },
  { teamA: "fra", teamB: "tun", scoreA: 3, scoreB: 1, stadium: stadiumsInfo[2].name, city: stadiumsInfo[2].city, date: new Date(), time: "19:00", status: "live", minute: 65 },
  { teamA: "bra", teamB: "sui", scoreA: 1, scoreB: 2, stadium: stadiumsInfo[3].name, city: stadiumsInfo[3].city, date: new Date(), time: "22:00", status: "live", minute: 65 },
];

async function seed() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    console.error("❌ Define MONGODB_URI en tu archivo .env antes de correr el seed.");
    process.exit(1);
  }
  await mongoose.connect(uri);
  console.log("Conectado a MongoDB. Limpiando colecciones...");

  await Promise.all([
    Team.deleteMany({}),
    News.deleteMany({}),
    Match.deleteMany({}),
    Sponsor.deleteMany({}),
    StarPlayer.deleteMany({}),
  ]);

  await Team.insertMany(teamsData);
  await News.insertMany(newsData);
  await Sponsor.insertMany(sponsorsData);
  await StarPlayer.insertMany(starPlayersData);
  await Match.insertMany(matchesData);

  console.log("✅ Base de datos poblada con 32 equipos, noticias, patrocinadores, jugadores estrella y partidos.");
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
