# 🌯 Shaormerie MVP — Documentație completă

## Ce este acest proiect

Website + PWA pentru o shaormerie locală, construit cu Next.js 14, TypeScript, Tailwind CSS și Supabase.

**Funcționalități MVP:**
- ✅ Homepage cu Hero, produse populare, program, locație, review-uri
- ✅ Meniu cu filtrare pe categorii
- ✅ Pagini individuale pentru produse
- ✅ Coș simplu cu comandă prin WhatsApp
- ✅ Admin panel (produse + categorii)
- ✅ PWA — instalabil pe telefon
- ✅ Mobile-first design

---

## 📁 Structura proiectului

```
shaormerie/
├── src/
│   ├── app/
│   │   ├── (public)/         ← Paginile site-ului public
│   │   │   ├── page.tsx      ← Homepage
│   │   │   ├── meniu/
│   │   │   │   ├── page.tsx  ← Meniu cu filtrare
│   │   │   │   └── [id]/     ← Pagina produs
│   │   │   ├── contact/      ← Contact + locație
│   │   │   └── cos/          ← Coș (opțional, e și ca drawer)
│   │   ├── (admin)/          ← Admin panel
│   │   │   └── admin/
│   │   │       ├── produse/  ← CRUD produse
│   │   │       ├── categorii/← CRUD categorii
│   │   │       └── setari/   ← Setări restaurant
│   │   ├── layout.tsx        ← Root layout cu fonts + Toaster
│   │   └── globals.css       ← Stiluri globale Tailwind
│   ├── components/
│   │   ├── layout/           ← Navbar, Footer
│   │   ├── menu/             ← ProductCard, CategoryFilter, AddToCartButton
│   │   ├── cart/             ← CartDrawer (coș + formular WhatsApp)
│   │   └── admin/            ← Componente admin
│   ├── hooks/
│   │   └── useCart.ts        ← Zustand store pentru coș
│   ├── lib/
│   │   ├── supabase.ts       ← Client Supabase
│   │   ├── data.ts           ← Funcții fetch + utilitare
│   │   └── utils.ts          ← cn() helper
│   └── types/
│       └── index.ts          ← Toate tipurile TypeScript
├── public/
│   ├── manifest.json         ← PWA manifest
│   └── icons/                ← Iconuri PWA (192px + 512px)
├── supabase-schema.sql       ← Schema + seed data
├── .env.example              ← Template variabile mediu
└── next.config.js            ← Config Next.js + PWA
```

---

## 🚀 Instalare locală (pas cu pas)

### 1. Clonează / copiază proiectul

```bash
cd ~/proiecte
# Dacă ai git:
git clone URL_REPO shaormerie
cd shaormerie

# Sau doar copiezi folderul primit
```

### 2. Instalează dependențele

```bash
npm install
```

### 3. Creează proiectul Supabase

1. Mergi la [supabase.com](https://supabase.com) → New Project
2. Alege o regiune apropiată (eu-central-1 pentru România)
3. Notează **URL** și **anon key** din Settings > API

### 4. Rulează schema SQL

1. În Supabase Dashboard → SQL Editor
2. Copiază conținutul din `supabase-schema.sql`
3. Rulează (butonul RUN)
4. Verifică în Table Editor că s-au creat tabelele + datele demo

### 5. Configurează variabilele de mediu

```bash
cp .env.example .env.local
```

Deschide `.env.local` și completează:

```
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
NEXT_PUBLIC_WHATSAPP_NUMBER=40712345678
```

### 6. Pornește development server

```bash
npm run dev
```

Deschide [http://localhost:3000](http://localhost:3000)

---

## 🖼️ Cum adaugi fotografii

### Opțiunea A: Supabase Storage (recomandat)

1. Supabase Dashboard → Storage → New Bucket → `images` (public: true)
2. Uploadează pozele (jpg/webp, max 2MB recomandat)
3. Copiază URL-ul public: `https://xxx.supabase.co/storage/v1/object/public/images/shaorma-pui.jpg`
4. Pune URL-ul în câmpul "URL Imagine" din admin

### Opțiunea B: Vercel Blob / Cloudinary / direct URL

Orice URL public funcționează. Adaugă domeniul în `next.config.js`:

```js
images: {
  remotePatterns: [
    { hostname: 'res.cloudinary.com' }, // dacă folosești Cloudinary
  ]
}
```

---

## 🌐 Deploy pe Vercel

### Pas 1: Pregătire repository

```bash
git init
git add .
git commit -m "Initial commit — Shaormerie MVP"
git remote add origin https://github.com/username/shaormerie.git
git push -u origin main
```

### Pas 2: Deploy pe Vercel

1. Mergi la [vercel.com](https://vercel.com) → New Project
2. Importă repository-ul de pe GitHub
3. Framework: **Next.js** (detectat automat)
4. **Environment Variables** — adaugă toate valorile din `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER`
5. Deploy!

### Pas 3: Conectare domeniu propriu

1. Vercel Dashboard → Settings → Domains → Add
2. Adaugă `shaormeria-ta.ro`
3. La registrar (ROTLD, GoDaddy etc.), adaugă înregistrările DNS:
   - **A record**: `@` → `76.76.21.21`
   - **CNAME**: `www` → `cname.vercel-dns.com`
4. Așteaptă propagarea DNS (5–60 min)
5. SSL automat prin Vercel

---

## 📱 PWA — Instalare pe telefon

Site-ul se poate instala ca aplicație pe Android și iOS.

### Android
- Deschide site-ul în Chrome
- Apare banner "Adaugă pe ecranul principal"
- Sau: meniu (⋮) → "Adaugă pe ecranul principal"

### iOS (Safari)
- Deschide site-ul în Safari
- Apasă butonul Share (□↑)
- "Adaugă pe ecranul principal"

### Iconuri necesare

Creează două fișiere PNG:
- `public/icons/icon-192.png` — 192×192px
- `public/icons/icon-512.png` — 512×512px

Poți folosi [PWA Builder](https://www.pwabuilder.com/imageGenerator) pentru a genera toate dimensiunile dintr-o singură imagine.

---

## 🛍️ Publicare în Google Play (TWA)

Dacă vrei să publici ca aplicație nativă Android:

1. Folosește [PWA Builder](https://www.pwabuilder.com/)
2. Introdu URL-ul site-ului
3. Descarcă pachetul Android (TWA — Trusted Web Activity)
4. Urmează instrucțiunile pentru Google Play Console
5. Necesită: cont Google Play Developer ($25 o singură dată)

### App Store (iOS)

- iOS nu suportă nativ TWA
- Alternativă: [Capacitor.js](https://capacitorjs.com/) — wrappezi PWA-ul
- Sau: publici ca PWA (Safari suportă instalare)

---

## ⚙️ Personalizare

### Schimbă datele restaurantului

1. Admin Panel → Setări: actualizează telefon, adresă, WhatsApp, program
2. Sau direct în Supabase: tabelul `settings`, primul rând

### Schimbă culorile brandului

Editează `tailwind.config.ts`:

```ts
colors: {
  brand: {
    red:     '#E8202A',  // ← schimbă cu culoarea ta
    orange:  '#F47C20',
    yellow:  '#F5C518',
    // ...
  }
}
```

### Schimbă fontul

În `src/app/layout.tsx`:

```ts
import { Oswald } from 'next/font/google'  // ← alt font

const myFont = Oswald({
  subsets: ['latin'],
  variable: '--font-body',
})
```

### Adaugă Google Maps embed

În `src/app/(public)/contact/page.tsx`, caută comentariul `<!-- ÎNLOCUIEȘTE -->` și pune iframe-ul real:

```tsx
<iframe
  src="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
  width="100%"
  height="200"
  style={{ border: 0 }}
  allowFullScreen
  loading="lazy"
  className="rounded-xl mb-4"
/>
```

---

## ✅ Checklist lansare

### Conținut
- [ ] Înlocuit toate datele demo cu date reale (nume, telefon, adresă, WhatsApp)
- [ ] Adăugat produsele reale cu prețuri corecte
- [ ] Uploadate fotografii profesionale pentru produse
- [ ] Configurat programul de lucru corect
- [ ] Adăugat link Google Maps real
- [ ] Completat link-uri social media (Instagram, Facebook, TikTok)

### Design & UX
- [ ] Testat pe telefon Android (Chrome)
- [ ] Testat pe iPhone (Safari)
- [ ] Testat pe desktop
- [ ] Verificat că PWA se instalează
- [ ] Verificat fluxul de comandă WhatsApp end-to-end
- [ ] Verificat că pozele se afișează corect

### Admin
- [ ] Schimbat parola admin în Supabase Authentication
- [ ] Verificat că CRUD produse funcționează
- [ ] Verificat că activarea/dezactivarea funcționează

### Deploy
- [ ] Variabilele de mediu setate în Vercel
- [ ] Domeniu conectat + SSL activ
- [ ] Testat site-ul live (nu localhost)
- [ ] Verificat Open Graph (preview link pe WhatsApp/Facebook)

### Opțional înainte de lansare
- [ ] Adăugat Google Analytics (GA4)
- [ ] Adăugat Google Search Console
- [ ] Adăugat favicon personalizat
- [ ] Creat iconuri PWA cu logo-ul restaurantului

---

## 🔮 Îmbunătățiri după MVP

**Prioritate mare (impact direct pe comenzi):**
1. **Google Maps embed real** — crește încrederea
2. **Fotografii profesionale** — cel mai mare impact vizual
3. **Google Analytics** — înțelegi de unde vin clienții
4. **WhatsApp Business** — mesaje automate, catalog integrat
5. **Notificări push PWA** — anunțuri promoții

**Prioritate medie:**
6. **Sistem de rezervări** — pentru livrări la ore fixe
7. **Upload imagini din admin** — direct în Supabase Storage
8. **Program dinamic** — editabil din admin
9. **Reviews reale** — integrare Google Business Profile API
10. **SEO îmbunătățit** — structured data (schema.org Restaurant)

**Prioritate mică (pentru mai târziu):**
11. **Cont client + istoric comenzi** — după ce volumul crește
12. **Plăți online** — Stripe sau Netopia Mobilpay
13. **Notificări admin** — email/SMS la comandă nouă
14. **Dashboard analytics** — număr comenzi, produse populare
15. **App Store (iOS)** — via Capacitor sau React Native

---

## 🛠️ Probleme frecvente

**Eroare: Cannot read properties of null (reading 'supabase')**
→ Verifică că `.env.local` există și are valorile corecte.

**Produsele nu se afișează**
→ Verifică în Supabase că RLS policies sunt active și că produsele au `is_active = true`.

**WhatsApp nu deschide**
→ Verifică că `NEXT_PUBLIC_WHATSAPP_NUMBER` este format corect: `40712345678` (fără +, fără spații).

**Imaginile nu se afișează**
→ Adaugă domeniul sursei în `next.config.js` → `images.remotePatterns`.

**PWA nu se instalează**
→ Verifică că `manifest.json` este accesibil la `/manifest.json` și că iconurile există la căile specificate.
