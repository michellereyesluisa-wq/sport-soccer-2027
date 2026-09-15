# Sport Soccer 2027 ⚽🏆

Proyecto escolar: sitio web de una copa mundial de fútbol con 32 equipos reales,
noticias, clasificaciones, calendario/eliminatorias, sedes/estadios, patrocinadores,
jugadores estrella y una zona de apuestas restringida a mayores de edad (validación por CURP).

## Stack
- **Frontend:** React + Vite + React Router (sin dependencias pesadas, CSS propio)
- **Backend:** Node.js + Express + Mongoose
- **Base de datos:** MongoDB (Atlas recomendado)
- **Idiomas:** Español, Inglés, Francés, Mandarín (中文), Portugués

## Estructura
```
sport-soccer-2027/
├── frontend/        # App de React (Vite)
│   └── src/
│       ├── components/   Header, Footer, SponsorsBar, StarPlayers
│       ├── pages/         Home, News, Standings, Calendar, Bets
│       ├── context/       LanguageContext, BetsAccessContext (validación CURP)
│       ├── data/           Datos de ejemplo (32 equipos, noticias, etc.)
│       ├── i18n/            Traducciones a 5 idiomas
│       └── styles/global.css
└── backend/          # API REST (Express + MongoDB)
    ├── models/        Team, News, Match, Sponsor, StarPlayer, User
    ├── routes/         /api/teams, /api/news, /api/matches, /api/sponsors,
    │                    /api/star-players, /api/bets
    └── seed/seed.js    Script para poblar MongoDB con los 32 equipos
```

## 1. Backend (API + MongoDB)

```bash
cd backend
npm install
cp .env.example .env
```

Edita `.env` y coloca tu cadena de conexión de **MongoDB Atlas**:
```
MONGODB_URI=mongodb+srv://usuario:contrasena@cluster0.mongodb.net/sportsoccer2027
PORT=4000
```

Poblar la base de datos con los 32 equipos, noticias, patrocinadores y jugadores estrella:
```bash
npm run seed
```

Levantar la API:
```bash
npm run dev
```
La API queda disponible en `http://localhost:4000/api/...`

## 2. Frontend (React)

```bash
cd frontend
npm install
npm run dev
```
Se abre en `http://localhost:5173`. Durante el desarrollo, las peticiones a `/api/...`
se redirigen automáticamente al backend en el puerto 4000 (configurado en `vite.config.js`).

> **Nota:** el frontend funciona con datos de ejemplo locales (`src/data/`) aunque el
> backend no esté corriendo — así puedes ver la interfaz inmediatamente. En cuanto el
> backend con MongoDB esté activo, la zona de apuestas usará `/api/bets/verify-curp`
> en lugar de la validación local, y puedes reemplazar los imports de `src/data/` por
> `fetch()` a los endpoints (`/api/teams`, `/api/news`, `/api/matches`,
> `/api/sponsors`, `/api/star-players`) para leer todo desde MongoDB.

## 3. Zona de apuestas (18+)

- El apartado `/apuestas` está bloqueado detrás de un formulario que pide **CURP oficial**.
- Se valida el formato del CURP (4 letras + fecha de nacimiento + sexo + 5 consonantes + homoclave).
- Con la fecha de nacimiento incluida en el CURP se calcula la edad; si es **menor de 18 años**
  se le niega el acceso a las apuestas.
- El backend (`POST /api/bets/verify-curp`) repite esta validación del lado del servidor
  y solo guarda un **hash** del CURP (nunca el CURP en texto plano) para no exponer datos sensibles.

## 4. Despliegue rápido
- Frontend: `npm run build` dentro de `frontend/` genera la carpeta `dist/` lista para
  subir a Vercel, Netlify o GitHub Pages.
- Backend: se puede desplegar en Render, Railway o cualquier servicio Node, apuntando
  `MONGODB_URI` a tu clúster de MongoDB Atlas.

## Colores del proyecto
- Verde: `#0f6b3d` / `#0b4d2e`
- Blanco: `#ffffff`
- Rojo: `#c0392b`
- Dorado: `#e8b400`

## Aviso
Sitio con fines escolares. El módulo de apuestas es una simulación educativa;
no procesa pagos reales ni apuestas reales.
