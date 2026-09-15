// 32 selecciones reales, agrupadas en 8 grupos de 4
// "iso" es el codigo ISO 3166-1 alpha-2, usado para pedir la bandera real a flagcdn.com
export const groups = {
  A: [
    { id: "qat", name: "Qatar", iso: "qa", pj: 3, dg: -4, pts: 3 },
    { id: "ecu", name: "Ecuador", iso: "ec", pj: 3, dg: 2, pts: 6 },
    { id: "sen", name: "Senegal", iso: "sn", pj: 3, dg: 0, pts: 4 },
    { id: "ned", name: "Netherlands", iso: "nl", pj: 3, dg: 3, pts: 7 },
  ],
  B: [
    { id: "eng", name: "England", iso: "gb-eng", pj: 3, dg: 3, pts: 7 },
    { id: "irn", name: "Iran", iso: "ir", pj: 3, dg: 2, pts: 6 },
    { id: "usa", name: "USA", iso: "us", pj: 3, dg: -1, pts: 3 },
    { id: "wal", name: "Wales", iso: "gb-wls", pj: 3, dg: -4, pts: 1 },
  ],
  C: [
    { id: "arg", name: "Argentina", iso: "ar", pj: 3, dg: 4, pts: 9 },
    { id: "ksa", name: "Saudi Arabia", iso: "sa", pj: 3, dg: -1, pts: 4 },
    { id: "mex", name: "Mexico", iso: "mx", pj: 3, dg: 0, pts: 4 },
    { id: "pol", name: "Poland", iso: "pl", pj: 3, dg: -3, pts: 2 },
  ],
  D: [
    { id: "fra", name: "France", iso: "fr", pj: 3, dg: 4, pts: 9 },
    { id: "aus", name: "Australia", iso: "au", pj: 3, dg: 0, pts: 4 },
    { id: "den", name: "Denmark", iso: "dk", pj: 3, dg: -1, pts: 3 },
    { id: "tun", name: "Tunisia", iso: "tn", pj: 3, dg: -3, pts: 2 },
  ],
  E: [
    { id: "esp", name: "Spain", iso: "es", pj: 3, dg: 5, pts: 7 },
    { id: "crc", name: "Costa Rica", iso: "cr", pj: 3, dg: -3, pts: 3 },
    { id: "ger", name: "Germany", iso: "de", pj: 3, dg: 1, pts: 4 },
    { id: "jpn", name: "Japan", iso: "jp", pj: 3, dg: -3, pts: 3 },
  ],
  F: [
    { id: "bel", name: "Belgium", iso: "be", pj: 3, dg: 2, pts: 6 },
    { id: "can", name: "Canada", iso: "ca", pj: 3, dg: -2, pts: 3 },
    { id: "mar", name: "Morocco", iso: "ma", pj: 3, dg: 3, pts: 7 },
    { id: "cro", name: "Croatia", iso: "hr", pj: 3, dg: -3, pts: 1 },
  ],
  G: [
    { id: "bra", name: "Brazil", iso: "br", pj: 3, dg: 5, pts: 9 },
    { id: "srb", name: "Serbia", iso: "rs", pj: 3, dg: -2, pts: 3 },
    { id: "sui", name: "Switzerland", iso: "ch", pj: 3, dg: 1, pts: 5 },
    { id: "cmr", name: "Cameroon", iso: "cm", pj: 3, dg: -4, pts: 1 },
  ],
  H: [
    { id: "por", name: "Portugal", iso: "pt", pj: 3, dg: 4, pts: 7 },
    { id: "gha", name: "Ghana", iso: "gh", pj: 3, dg: -1, pts: 4 },
    { id: "uru", name: "Uruguay", iso: "uy", pj: 3, dg: 2, pts: 5 },
    { id: "kor", name: "South Korea", iso: "kr", pj: 3, dg: -5, pts: 2 },
  ],
};

export const allTeams = Object.values(groups).flat();

// Genera la URL de la bandera real (SVG) desde flagcdn.com — servicio publico y gratuito
export function flagUrl(iso, width = 80) {
  return `https://flagcdn.com/w${width}/${iso}.png`;
}

// Emparejamientos de octavos de final
export const knockoutRound16 = [
  { id: "m1", teamA: "qat", teamB: "irn", label: "Partido 1" },
  { id: "m2", teamA: "arg", teamB: "aus", label: "Partido 2" },
  { id: "m3", teamA: "esp", teamB: "jpn", label: "Partido 3" },
  { id: "m4", teamA: "bra", teamB: "sui", label: "Partido 4" },
  { id: "m5", teamA: "ned", teamB: "eng", label: "Partido 5" },
  { id: "m6", teamA: "fra", teamB: "tun", label: "Partido 6" },
  { id: "m7", teamA: "bel", teamB: "mar", label: "Partido 7" },
  { id: "m8", teamA: "por", teamB: "uru", label: "Partido 8" },
];

// Fotos reales de referencia (banco gratuito, libres de uso) para estadios/noticias.
// Reemplazalas por tus propias fotos oficiales cuando publiques el sitio.
export const stadiums = [
  { id: "st1", name: "Lusail Stadium", city: "Lusail, Qatar", photo: "https://images.unsplash.com/photo-1522778119026-d647f0596c20?w=600&q=80" },
  { id: "st2", name: "Al Bayt Stadium", city: "Al Khor, Qatar", photo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80" },
  { id: "st3", name: "Khalifa International", city: "Doha, Qatar", photo: "https://images.unsplash.com/photo-1517927033932-b3d18e61fb3a?w=600&q=80" },
  { id: "st4", name: "Education City", city: "Al Rayyan, Qatar", photo: "https://images.unsplash.com/photo-1459865264687-595d652de67e?w=600&q=80" },
  { id: "st5", name: "974 Stadium", city: "Doha, Qatar", photo: "https://images.unsplash.com/photo-1550881111-7cfde14b8073?w=600&q=80" },
  { id: "st6", name: "Al Janoub Stadium", city: "Al Wakrah, Qatar", photo: "https://images.unsplash.com/photo-1489944440615-453fc2b6a9a9?w=600&q=80" },
];

export const matchDay = [
  { id: "g1", stadium: stadiums[0], teamA: "qat", teamB: "ecu", scoreA: 2, scoreB: 1, minute: 65, status: "live", time: "13:00" },
  { id: "g2", stadium: stadiums[1], teamA: "arg", teamB: "mex", scoreA: 0, scoreB: 0, minute: 65, status: "live", time: "16:00" },
  { id: "g3", stadium: stadiums[2], teamA: "fra", teamB: "tun", scoreA: 3, scoreB: 1, minute: 65, status: "live", time: "19:00" },
  { id: "g4", stadium: stadiums[3], teamA: "bra", teamB: "sui", scoreA: 1, scoreB: 2, minute: 65, status: "live", time: "22:00" },
];
