# NIKRMANA - Zavod za dvig zavesti

Spletna stran za NIKRMANA zavod za dvig zavesti z ločeno "Kmalu prihaja" stranjo.

## 🚀 Deployment na nov server

### Predpogoji
```bash
# Preveri če je Docker nameščen
docker --version

# Če Docker ni nameščen:
sudo apt update
sudo apt install docker.io docker-compose-plugin
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER
# Po tem se odjavi in ponovno prijavi
```

### 1. Kloniraj repozitorij
```bash
git clone https://github.com/Dzo4e2250/nikermanas-ancient-tome
cd nikermanas-ancient-tome
```

### 2. Pripravi logo za "Kmalu prihaja" stran
```bash
# Logo je že v projektu - samo preveri da obstaja
ls -la coming-soon/public/
# Če logo.png ne obstaja, uporabi placeholder ali kopiraj iz src/assets/
```

### 3. Poženi ustrezno aplikacijo

#### Za "Kmalu prihaja" stran (med razvojem)
```bash
# Build in zagon (novejša Docker verzija)
docker compose -f docker-compose.coming-soon.yml up -d --build

# ALI za starejše verzije Docker:
docker-compose -f docker-compose.coming-soon.yml up -d --build

# Preveri status
docker compose -f docker-compose.coming-soon.yml ps

# Oglej si loge
docker compose -f docker-compose.coming-soon.yml logs -f
```
**Dostop**: http://localhost:3001

#### Za glavno aplikacijo (ko je pripravljena)
```bash
# Ustavi "Kmalu prihaja" stran
docker compose -f docker-compose.coming-soon.yml down

# Build in zagon glavne aplikacije
docker compose up -d --build

# Preveri status
docker compose ps

# Oglej si loge
docker compose logs -f
```
**Dostop**: http://localhost:3000

## 🔄 Upravljanje

### Posodabljanje kode
```bash
# Povleci najnovejše spremembe
git pull origin main

# Obnovi ustrezno aplikacijo
# Za "Kmalu prihaja":
docker compose -f docker-compose.coming-soon.yml up -d --build

# Za glavno aplikacijo:
docker compose up -d --build
```

### Ustavitev aplikacij
```bash
# Ustavi "Kmalu prihaja" stran
docker compose -f docker-compose.coming-soon.yml down

# Ustavi glavno aplikacijo
docker compose down

# Ustavi vse in očisti
docker compose down --volumes --remove-orphans
docker compose -f docker-compose.coming-soon.yml down --volumes --remove-orphans
```

### Preverjanje statusa
```bash
# Oglej si tekoče kontejnerje
docker ps

# Oglej si loge
docker compose logs
docker compose -f docker-compose.coming-soon.yml logs
```

## 🛠️ Troubleshooting Docker Compose

### Če `docker compose` ne deluje:
```bash
# Preveri verzijo Docker
docker --version

# Poskusi z `docker-compose` (starejša verzija)
docker-compose --version

# Če docker-compose ni nameščen:
sudo apt install docker-compose

# ALI namesti novejšo verzijo:
sudo apt install docker-compose-plugin
```

### Če dobite permission error:
```bash
# Dodaj uporabnika v docker skupino
sudo usermod -aG docker $USER

# Odjavi se in ponovno prijavi, potem poskusi:
docker ps
```

## 📁 Struktura projekta

```
.
├── coming-soon/                    # Ločena "Kmalu prihaja" aplikacija
│   ├── src/
│   ├── public/logo.png            # Logo za coming-soon stran
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml             # Glavna aplikacija (port 3000)
├── docker-compose.coming-soon.yml # "Kmalu prihaja" stran (port 3001)
└── README.md
```

## 🎯 Hitri začetek (copy-paste komande)

### Celoten setup v eni sekvenci:
```bash
# 1. Kloniraj repozitorij
git clone https://github.com/Dzo4e2250/nikermanas-ancient-tome
cd nikermanas-ancient-tome

# 2. Zaženi "Kmalu prihaja" stran
docker compose -f docker-compose.coming-soon.yml up -d --build

# 3. Preveri ali deluje
docker ps
curl http://localhost:3001

# 4. Oglej si v brskalniku
echo "Odpri http://localhost:3001 v brskalniku"
```

### Ko je glavna aplikacija pripravljena:
```bash
# Preklapljanje na glavno aplikacijo
docker compose -f docker-compose.coming-soon.yml down
docker compose up -d --build
echo "Glavna aplikacija na http://localhost:3000"
```

## 🔧 Development (brez Docker)

### Glavna aplikacija
```bash
npm install
npm run dev
```

### "Kmalu prihaja" stran
```bash
cd coming-soon
npm install  
npm run dev
```

## 🛠️ Troubleshooting

### Preveri, ali se aplikacija izvaja
```bash
# Preveri odprt port
curl http://localhost:3001  # za coming-soon
curl http://localhost:3000  # za glavno aplikacijo

# Preveri Docker kontejnerje
docker ps -a
```

### Očisti Docker cache
```bash
docker system prune -a
docker compose -f docker-compose.coming-soon.yml build --no-cache
docker compose build --no-cache
```

### Oglej si podrobne loge
```bash
docker compose -f docker-compose.coming-soon.yml logs --tail=50 -f
docker compose logs --tail=50 -f
```

## 📞 Kontakt

- **E-pošta**: info@nikrmanapesnica.si
- **Telefon**: 051 358 273

---

*Projekt ustvarjen z [Lovable](https://lovable.dev)*