# NIKRMANA - Zavod za dvig zavesti

Spletna stran za NIKRMANA zavod za dvig zavesti.

## Struktura projekta

Projekt vsebuje dve aplikaciji:

### 1. Glavna aplikacija (/)
Glavna React aplikacija z vsemi funkcionalnostmi zavoda.

### 2. "Kmalu prihaja" stran (/coming-soon)
Minimalna stran, ki se prikaže med razvozom glavne aplikacije.

## Docker Compose opcije

### Zagon glavne aplikacije
```bash
docker-compose up -d
```
Aplikacija bo dostopna na http://localhost:3000

### Zagon "Kmalu prihaja" strani
```bash
docker-compose -f docker-compose.coming-soon.yml up -d
```
Stran bo dostopna na http://localhost:3001

### Ustavitev
```bash
# Glavna aplikacija
docker-compose down

# "Kmalu prihaja" stran
docker-compose -f docker-compose.coming-soon.yml down
```

## Development

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

## Workflow za produkcijo

1. **Med razvozom**: Zaženite "Kmalu prihaja" stran
   ```bash
   docker-compose -f docker-compose.coming-soon.yml up -d
   ```

2. **Ko je glavna aplikacija pripravljena**: Ustavite "Kmalu prihaja" in zaženite glavno
   ```bash
   docker-compose -f docker-compose.coming-soon.yml down
   docker-compose up -d
   ```

## Uporaba logoov

- **Glavna aplikacija**: Logo morate ručno kopirati iz `/lovable-uploads/7af9c884-5752-43f5-9688-cc74a903a9dd.png`
- **"Kmalu prihaja" stran**: Logo je že vključen v `/coming-soon/public/logo.png`

## Kontakt

- **E-pošta**: info@nikrmanapesnica.si
- **Telefon**: 051 358 273

---

*Projekt prvotno ustvarjen in objavljen preko [Lovable](https://lovable.dev)*