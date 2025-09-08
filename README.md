# Nikermanas Ancient Tome

To repozitorij vsebuje izvorno kodo za **Nikermanas Ancient Tome**, enostransko spletno aplikacijo (SPA), zgrajeno z [React](https://reactjs.org/) in [Vite](https://vitejs.dev/) z uporabo TypeScript-a, Tailwind CSS in [shadcn/ui](https://ui.shadcn.com/). Projekt je bil prvotno ustvarjen in objavljen preko [Lovable](https://lovable.dev), zdaj pa je konfiguriran tako, da teče v Dockerju za enostavno namestitev na vaš strežnik.

Aplikacija je statična; Vite pripravi datoteke v mapo `dist` in jih nato serviramo z Nginxom. Vsa strežniška funkcionalnost (podatkovna baza, avtentikacija) je urejena preko Supabase, zato ni Node backend-a.

## 🚀 Hiter začetek

Če želite aplikacijo preprosto zagnati na svojem računalniku ali strežniku brez nameščanja odvisnosti, uporabite Docker:

1. **Namestite Docker**  
   Prenesite in namestite [Docker Desktop](https://www.docker.com/products/docker-desktop/) za vaš operacijski sistem ali sledite [uradnim navodilom](https://docs.docker.com/get-docker/) za Linux. Poskrbite, da imate ukaza `docker` in `docker compose` na voljo v terminalu.

2. **Klonirajte ta repozitorij**
   ```sh
   git clone https://github.com/Dzo4e2250/nikermanas-ancient-tome.git
   cd nikermanas-ancient-tome
   ```

3. **Zgradite in zaženite kontejner**
   Na voljo sta dve možnosti:
   - **Z Docker Compose** (priporočeno):
     ```sh
     # zgradi sliko in zažene kontejner v ozadju (detached)
     docker compose up -d --build
     ```
     Storitev je definirana v [`docker-compose.yml`](docker-compose.yml). Ta zgradi sliko s priloženim [`Dockerfile`](Dockerfile) in na hostu izpostavi vrata **5678**.

   - **Z enim ukazom docker**:
     ```sh
     # zgradi sliko
     docker build -t nikermanas-ancient-tome .
     # zažene kontejner in preslika vrata 5678 na 80
     docker run -dp 5678:80 nikermanas-ancient-tome
     ```

4. **Odprite aplikacijo**  
   V brskalniku obiščite [http://localhost:5678](http://localhost:5678) (ali `http://<ip-strežnika>:5678` na oddaljenem strežniku). Prikazala se bo začetna stran Nikermanas Ancient Tome.

### Samodejne posodobitve kontejnerja

Če aplikacijo poganjate na strežniku in želite, da se samodejno posodobi ob vsaki posodobitvi repozitorija, lahko uporabite opcijski servis [Watchtower](https://containrrr.dev/watchtower/). V datoteki `docker-compose.yml` odstranite komentarje v razdelku `watchtower` in ponovno zaženite `docker compose up -d`. Watchtower bo vsakih 60 sekund preverjal ali obstaja nova slika in ob posodobitvi kontejner ponovno zagnal.

Če uporabljate Portainer, lahko namesto Watchtowerja nastavite *Webhook* v Portainerju in ga pokličete iz CI-ja ob objavi nove slike.

### Spremenljivke okolja

Vse spremenljivke, ki jih potrebuje Vite med buildom (npr. URL in anon ključ Supabase), morajo imeti predpono `VITE_` in biti definirane v datoteki `.env.production`. V GitHub Actions lahko te ključe shranite kot *Secrets*, ter bo workflow sam ustvaril datoteko. Če gradite lokalno, ustvarite `.env.production` ročno:

```env
VITE_SUPABASE_URL=https://your-instance.supabase.co
VITE_SUPABASE_ANON_KEY=public-anon-key
```

## 🤖💼 Razvoj

Za razvoj brez Dockerja:

1. Namestite [Node.js](https://nodejs.org/) (verzija 20+). Uporabite lahko `npm` ali `bun`.
2. Namestite odvisnosti in zaženite dev strežnik:
   ```sh
   npm install
   npm run dev
   # ali z bun
   bun install
   bun run dev
   ```
3. Vite bo zagnal razvojni strežnik (privzeto na portu 5173). Odprite URL v brskalniku. Vsaka sprememba v mapi `src/` bo samodejno osvežila stran.

> **Opomba**: Občutljive ključe hranite v datotekah `.env` in kot Secrets v repozitoriju. Ne dodajajte jih v git.

## 🛠️ Neprekinjena integracija / namestitev

Repou vključuje GitHub Actions workflow (`.github/workflows/docker.yml`), ki ob vsakem pushu na vejo `main` zgradi Docker sliko in jo potisne v [GitHub Container Registry](https://docs.github.com/en/packages/working-with-a-github-packages-registry/working-with-the-container-registry).

Za aktivacijo:

1. Odprite *Settings → Secrets and variables → Actions* v vašem repozitoriju in dodajte potrebne spremenljivke (`VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`, itd.).
2. Po Želji dodajte uporabniško ime in token za Docker Hub, če želite slike objavljati tja.
3. Potisnite spremembe na `main`. Workflow se bo samodejno zagnal, zgradil sliko in jo označil kot `latest`.
4. Na strežniku zaženite `docker compose up -d` (in omogočite Watchtower ali webhook), da prejmete posodobitev.

---

Ta README vas vodi skozi uporabo, razvoj in namestitev **Nikermanas Ancient Tome**. Če ste v svetu Dockerja ali GitHub Actions novi in se zataknete, odprite *issue* v tem repozitoriju in pomagali vam bomo. 💡
