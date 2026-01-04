# MEME MARKETPLACE PRO

Plně funkční React aplikace pro prohlížení, filtrování a nákup meme obrázků s moderním dashboardem a robustním uživatelským systémem.

## Funktionalita

### 1. Přihlášovací Systém
- Stránka `/login` s formulářem pro přihlášení (mock)
- Validace vstupů (username: min. 3 znaky, password: min. 5 znaků)
- Uložení uživatele do localStorage
- Private routes - ochrana všech stránek kromě loginu

### 2. Dashboard
Po přihlášení si uživatel prohlédne:
- Počet dostupných meme obrázků
- Počet kategorií
- Počet položek v košíku
- Nejoblíbenější meme (podle ratingu)
- Tlačítko na přechod do katalogu

### 3. Katalog Memů (/memes)
- Načítání memů z API (imgflip.com)
- Responzivní mřížka (1 sloupec mobil, 2 tablet, 4+ PC)
- Zobrazení kartiček s:
  - Obrázkem
  - Názvem
  - Kategorií
  - Ratingem (1-5 *)
  - Tlačítky Detail/Přidat do košíku

**Filtrování a třídění:**
- Vyhledávání podle názvu (case-insensitive, debouncing 300ms)
- Filtr podle kategorie (animals, celebrities, gaming, school, random)
- Třídění: abecedně, podle ratingu, podle velikosti
- Loading stavy (skeleton loader)
- Error handling

### 4. Detail Meme (/memes/:id)
- Velký obrázek meme
- Jméno, rating, kategorie, rozměry
- Tlačítko "Přidat do košíku"
- Tlačítko "Zpět na seznam"
- Doporučené memy ze stejné kategorie (3 položky)

### 5. Nákupní Košík
- Globální stav přes React Context
- Funkce:
  - Přidání/odebrání položek
  - Zvýšení/snížení počtu kusů
  - Smazání košíku
  - Výpočet celkové ceny (cena = rating × 25)
- Persistentní uložení v localStorage

### 6. Navigace
```
/login              - veřejná stránka
/dashboard          - privátní
/memes              - privátní
/memes/:id          - privátní
/cart               - privátní
/*                  - 404 stránka
```

### 7. Tmavý Režim (Dark Mode)
- Přepínač světlého/tmavého režimu v navigační liště
- Automatická detekce preference systému při prvním načtení
- Persistentní uložení výběru v localStorage
- Plynulá změna barev napříč celou aplikací
- Ikona 🌓 pro přepínání mezi režimy
- Implementováno pomocí CSS proměnných a ThemeContext
- Funguje na všech stránkách aplikace

## Technologický Stack

- **React** 19.2.0
- **React Router DOM** 7.11.0
- **Vite** - build tool
- **CSS Modules** - stylování
- **Context API** - správa stavu

## Instalace a Spuštění

### Předpoklady
- Node.js (14+)
- npm nebo yarn

### Instalace
```bash
npm install
```

### Spuštění dev serveru
```bash
npm run dev
```

### Build pro produkci
```bash
npm run build
```

### Preview buildu
```bash
npm run preview
```

### Linting
```bash
npm run lint
```

## API Zdroj

Data memů jsou načítána z:
```
https://api.imgflip.com/get_memes
```

Každý meme obsahuje:
- `id` - unikátní identifikátor
- `name` - název meme
- `url` - URL obrázku
- `width` - šířka obrázku
- `height` - výška obrázku
- `box_count` - počet textových polí

K API datům jsou přidány:
- Náhodný rating 1-5
- Náhodná kategorie

## Bezpečnost

- Přihlášení je mock systém (pouze frontend)
- Hesla jsou uložena v localStorage (pouze pro demo)
- V produkci by mělo být implementováno backend ověření

## Responzivita

Aplikace je plně responzivní:
- **Mobil** (< 768px): 1 sloupec
- **Tablet** (768px - 1024px): 2 sloupce  
- **Desktop** (> 1024px): 4+ sloupce

## Vlastní Hooky

### `useFetch(url)`
Vrací stav načítání dat z API.

### `useLocalStorage(key, initial)`
Umožňuje persistentní ukládání dat.

### `useCart()`
Spravuje globální stav košíku s Context API.

## Poznámky

- Ceny jsou vypočítávány fiktivně (rating × 25)
- Všechny údaje o mémech jsou z veřejného API
- Aplikace slouží pouze k edukačním účelům

---

**Autor**: Michal Němec 
**Rok**: 2025
