# Houwaart Leeft — website

De website voor **houwaartleeft.be**, gebouwd met dezelfde stack als het
Atlas-website project:

- **Next.js 14** (app router) + **TypeScript**
- **Tailwind CSS** voor styling
- **next-intl** voor internationalisatie (voorlopig enkel `nl`, makkelijk uit te breiden)
- **Docker** (standalone output) voor deployment op de VPS

## Projectstructuur

```
website/
├── src/
│   ├── app/
│   │   ├── layout.tsx           # root layout
│   │   ├── [locale]/
│   │   │   ├── layout.tsx       # fonts, header, footer, i18n provider
│   │   │   └── page.tsx         # homepage (stelt de secties samen)
│   │   ├── globals.css
│   │   ├── icon.svg             # favicon
│   │   └── sitemap.ts
│   ├── components/
│   │   ├── layout/              # Header, Footer
│   │   └── ui/                  # Hero, Program-, Food-, Sponsor-, ContactSection ...
│   ├── i18n/                    # routing, request, navigation (next-intl)
│   ├── types/
│   └── middleware.ts
├── messages/nl.json            # alle teksten en het programma
├── public/                     # robots.txt, img/ (affiche)
├── Dockerfile
├── docker-compose.yml
└── tailwind.config.ts          # kleuren van de affiche
```

## Inhoud aanpassen

- **Alle teksten + het programma** → `messages/nl.json`.
- **Countdown-datum** → `src/components/ui/Hero.tsx`, constante `EVENT_START`
  (maand is 0-gebaseerd: `8` = september).
- **Kleuren / lettertypes** → `tailwind.config.ts` (prefix `hl-`).
- **Facebook-link & e-mail** → onder `contact` in `messages/nl.json`.
- **Een extra taal toevoegen** → voeg de locale toe in `src/i18n/routing.ts`
  en maak een `messages/<locale>.json`.

## Quizinschrijvingen (e-mail)

De pagina `/quiz-inschrijven` stuurt bij het invullen twee e-mails via SMTP:
één melding naar `info@houwaartleeft.be` en een bevestiging naar de inschrijver.
De API-route staat in `src/app/api/quiz/route.ts`; spam wordt tegengehouden met
een honeypot-veld.

Configureer SMTP via omgevingsvariabelen (zie `.env.example`):

```
SMTP_HOST, SMTP_PORT, SMTP_SECURE, SMTP_USER, SMTP_PASS
```

Lokaal: kopieer `.env.example` naar `.env`. In productie staan ze al in
`docker-compose.yml` (lees je `.env` automatisch in).

## Lokaal ontwikkelen

```bash
cd website
npm install
npm run dev
# open http://localhost:3000
```

## Productiebuild

```bash
npm run build
npm run start
```

## Deployen op de VPS (Docker)

```bash
cd website
docker compose up -d --build
# de app draait nu op poort 3003 → http://<vps-ip>:3003
```

Op de VPS draait al **Nginx Proxy Manager** (poorten 80/81/443). Voeg daar een
*Proxy Host* toe in plaats van handmatig nginx te configureren:

1. Open de NPM-admin (poort 81) en maak een nieuwe **Proxy Host** aan.
2. Domain Names: `houwaartleeft.be`, `www.houwaartleeft.be`.
3. Forward Hostname/IP: het IP van de host (bv. `172.17.0.1`) of de containernaam
   als je NPM en deze app in hetzelfde docker-netwerk zet — Forward Port: `3003`
   (of `3000` bij een gedeeld netwerk).
4. Tab **SSL** → "Request a new SSL Certificate" + "Force SSL" voor gratis HTTPS.

Zorg dat het DNS A-record van `houwaartleeft.be` naar het IP van je VPS wijst.

> Tip: wil je NPM rechtstreeks met de container laten praten (i.p.v. via de
> gepubliceerde poort), zet beide in hetzelfde externe docker-netwerk en verwijs
> in NPM naar `houwaart-leeft-web-1:3000`.
