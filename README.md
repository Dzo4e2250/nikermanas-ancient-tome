# Nikrmana — Zavod za dvig zavesti

Spletna stran zavoda Nikrmana (Pesnica pri Mariboru): energoterapije, meditacije in srečanja.

Frontend je React + Vite + TypeScript s Tailwind CSS in shadcn/ui. Podatki so v bazi PostgreSQL.

## Sestava

| Storitev | Opis |
|---|---|
| `web` | Zgrajena stran, ki jo servira Nginx (kontejner `nikrmana-web`) |
| `db`  | PostgreSQL 16 (kontejner `nikrmana-db`), shema in začetni podatki v `db/init/` |

Skripte v `db/init/` se izvedejo samo ob **prvem** zagonu prazne baze.

## Način »prihaja kmalu«

Dokler je `VITE_COMING_SOON=true` (privzeto), stran prikazuje samo obvestilo »Spletna stran prihaja kmalu«.
Ko bo lasten API povezan na bazo, nastavi v `.env` `VITE_COMING_SOON=false` in ponovno zgradi:

```sh
docker compose up -d --build web
```

## Zagon

```sh
cp .env.example .env    # nastavi POSTGRES_PASSWORD
docker compose up -d --build
```

Stran je na `http://127.0.0.1:5680`, baza na `127.0.0.1:55433` (samo lokalno). Na strežniku javni promet
na domeno usmerja Nginx Proxy Manager na kontejner `nikrmana-web:80`.

Dostop do baze s svojega računalnika:

```sh
ssh -L 55433:127.0.0.1:55433 root@148.230.109.77
psql postgresql://nikrmana@127.0.0.1:55433/nikrmana
```

## Razvoj

```sh
npm install
VITE_COMING_SOON=false npm run dev
```

## Kaj še manjka

- Lasten API (prijava, rezervacije, dogodki, nalaganje slik) nad bazo Postgres — nadomesti
  `src/integrations/supabase/`.
- Pošiljanje poročila brezplačne ocene (`server/send-assessment-report.ts`, prek Resend).
