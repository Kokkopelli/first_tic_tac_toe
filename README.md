# Tic-Tac-Toe Game

En enkel tic-tac-toe web-applikasjon bygget med React og TypeScript.

## Funksjoner
- 3x3 spillebrett
- To-spiller modus (sort vs hvit)
- AI-motstander med minimax-algoritme
- Responsive design med Tailwind CSS
- Full-stack Node.js/Express backend

## Teknologier
- **Frontend**: React 18, TypeScript, Tailwind CSS, Vite
- **Backend**: Node.js, Express, TypeScript
- **Database**: In-memory storage (PostgreSQL-klar)
- **UI**: shadcn/ui komponenter
- **State Management**: TanStack Query

## Utvikling lokalt

### Forutsetninger
- Node.js 18+
- npm

### Installasjon
```bash
npm install
```

### Kjør i utviklingsmodus
```bash
npm run dev
```
Åpner på http://localhost:5000

### Bygg for produksjon
```bash
npm run build
npm start
```

## Docker Deployment

### Bygg container
```bash
docker build -t tic-tac-toe .
```

### Kjør container
```bash
docker run -p 5000:5000 tic-tac-toe
```

## Kubernetes Deployment

Applikasjonen er konfigurert for deployment til Kubernetes med:
- Dockerfile for containerisering
- Konfigurasjon via JSON-fil (følger retningslinjer)
- Health checks på port 5000
- Egne arbeidsmappe og cache-katalog

### Konfigurasjon
Opprett `config/secrets.json`:
```json
{
  "database_url": "your-database-url",
  "session_secret": "your-session-secret",
  "app_port": "5000"
}
```

## Arkitektur

### Frontend (client/)
- React-komponenter i `src/components/`
- Sider i `src/pages/`
- Felles logikk i `src/lib/`

### Backend (server/)
- Express routes i `routes.ts`
- Hovedserver i `index.ts` 
- Storage abstraction i `storage.ts`

### Delt (shared/)
- TypeScript typer og skjemaer

## Scripts
- `npm run dev` - Start utviklingsserver
- `npm run build` - Bygg produksjonsversjon
- `npm start` - Kjør produksjonsserver
- `npm run check` - TypeScript type-checking