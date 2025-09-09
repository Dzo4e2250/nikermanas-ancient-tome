# NIKRMANA - Zavod za dvig zavesti

Spletna stran za NIKRMANA zavod za dvig zavesti z ločeno "Kmalu prihaja" stranjo.

## 🚀 Deployment na nov server

### Predpogoji
- Docker in Docker Compose nameščena
- Git nameščen

### 1. Kloniraj repozitorij
```bash
git clone <URL-repozitorija>
cd <ime-repozitorija>
```

### 2. Pripravi logo za "Kmalu prihaja" stran
```bash
# Kopiraj logo iz glavne aplikacije v coming-soon direktorij
cp /lovable-uploads/7af9c884-5752-43f5-9688-cc74a903a9dd.png coming-soon/public/logo.png
```

### 3. Poženi ustrezno aplikacijo

#### Za "Kmalu prihaja" stran (med razvojem)
```bash
# Build in zagon
docker-compose -f docker-compose.coming-soon.yml up -d --build

# Preveri status
docker-compose -f docker-compose.coming-soon.yml ps

# Oglej si loge
docker-compose -f docker-compose.coming-soon.yml logs -f
```
**Dostop**: http://localhost:3001

#### Za glavno aplikacijo (ko je pripravljena)
```bash
# Ustavi "Kmalu prihaja" stran
docker-compose -f docker-compose.coming-soon.yml down

# Build in zagon glavne aplikacije
docker-compose up -d --build

# Preveri status
docker-compose ps

# Oglej si loge
docker-compose logs -f
```
**Dostop**: http://localhost:3000

## 🔄 Upravljanje

### Posodabljanje kode
```bash
# Povleci najnovejše spremembe
git pull origin main

# Obnovi ustrezno aplikacijo
# Za "Kmalu prihaja":
docker-compose -f docker-compose.coming-soon.yml up -d --build

# Za glavno aplikacijo:
docker-compose up -d --build
```

### Ustavitev aplikacij
```bash
# Ustavi "Kmalu prihaja" stran
docker-compose -f docker-compose.coming-soon.yml down

# Ustavi glavno aplikacijo
docker-compose down

# Ustavi vse in očisti
docker-compose down --volumes --remove-orphans
docker-compose -f docker-compose.coming-soon.yml down --volumes --remove-orphans
```

### Preverjanje statusa
```bash
# Oglej si tekoče kontejnerje
docker ps

# Oglej si loge
docker-compose logs
docker-compose -f docker-compose.coming-soon.yml logs
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

## 🎯 Workflow za produkcijo

### 1. Začetna faza (med razvojem glavne strani)
```bash
# Kloniraj in pripravi
git clone <URL-repozitorija>
cd <ime-repozitorija>
cp /lovable-uploads/7af9c884-5752-43f5-9688-cc74a903a9dd.png coming-soon/public/logo.png

# Zaženi "Kmalu prihaja" stran
docker-compose -f docker-compose.coming-soon.yml up -d --build
```

### 2. Ko je glavna aplikacija pripravljena
```bash
# Ustavi "Kmalu prihaja"
docker-compose -f docker-compose.coming-soon.yml down

# Zaženi glavno aplikacijo
docker-compose up -d --build
```

### 3. Za hitro preklapljanje nazaj na "Kmalu prihaja"
```bash
docker-compose down
docker-compose -f docker-compose.coming-soon.yml up -d
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
docker-compose -f docker-compose.coming-soon.yml build --no-cache
docker-compose build --no-cache
```

### Oglej si podrobne loge
```bash
docker-compose -f docker-compose.coming-soon.yml logs --tail=50 -f
docker-compose logs --tail=50 -f
```

## 📞 Kontakt

- **E-pošta**: info@nikrmanapesnica.si
- **Telefon**: 051 358 273

---

*Projekt ustvarjen z [Lovable](https://lovable.dev)*