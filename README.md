# Muchlis Portfolio

Portfolio landing page berbasis **Next.js App Router + TypeScript + Tailwind CSS** dengan desain card-centered, dark/light theme, tabs portfolio/skills, email obfuscation, dan dukungan PWA installable.

## Tech Stack

- Next.js 16 (App Router)
- React 19 canary (dipin agar sinkron dengan built-in React runtime Next 16) + TypeScript
- Tailwind CSS v4
- next-themes (dark/light theme persist)

## Fitur Utama

- Layout landing page card-centered, responsif desktop/mobile.
- Theme toggle dark/light (persist ke storage via `next-themes`).
- Social links: LinkedIn, Instagram, GitHub (tanpa Twitter/YouTube).
- Statistik dinamis:
  - Years of work experience = `new Date().getFullYear() - 2017`, format `X+`
  - Featured projects = `5`
  - Companies = `5`
- Tabs interaktif `Portfolio` dan `Skills`.
- Portfolio cards 5 project dengan image optimize via `next/image`.
- CTA:
  - `Download CV` mengunduh `/public/cv.pdf`
  - `Contact me` scroll ke section contact
- Email protection:
  - Email tidak dirender plain di SSR HTML
  - Decode via JavaScript char-code saat klik tombol `Email me`
- PWA installable:
  - `src/app/manifest.ts`
  - `public/sw.js` + register otomatis di production
  - Icon PWA di `public/icons` + fallback root icon (`/icon-192x192.png`, `/icon-512x512.png`)
- Aksesibilitas:
  - `aria-label` untuk icon sosial
  - focus ring yang jelas
  - elemen interaktif keyboard-friendly

## Struktur Folder

```text
.
|-- public
|   |-- avatar.jpg
|   |-- cv.pdf
|   |-- sw.js
|   |-- icon-192x192.png
|   |-- icon-512x512.png
|   |-- icons/
|   `-- projects/
|-- src
|   |-- app/
|   |   |-- globals.css
|   |   |-- layout.tsx
|   |   |-- manifest.ts
|   |   `-- page.tsx
|   |-- components/
|   |   |-- theme-provider.tsx
|   |   |-- theme-toggle.tsx
|   |   |-- portfolio-tabs.tsx
|   |   |-- project-card.tsx
|   |   |-- social-links.tsx
|   |   |-- stats-row.tsx
|   |   |-- email-button.tsx
|   |   `-- sw-register.tsx
|   `-- lib/
|       `-- data.ts
|-- tailwind.config.ts
|-- next.config.ts
`-- package.json
```

## Menjalankan Project

1. Install dependency:

```bash
npm install
```

2. Jalankan development server:

```bash
npm run dev
```

3. Buka:

```text
http://localhost:3000
```

## Build Production

```bash
npm run build
```

Setelah build sukses, output static ada di folder `out/`.

## Deploy Hemat Storage (Anymhost 2GB)

Untuk paket storage kecil, **jangan upload seluruh project**. Upload **isi folder `out/` saja** ke `public_html` hosting.

Langkah ringkas:

```bash
npm install
npm run build
```

Lalu upload:

```text
out/*
```

Tidak perlu upload:

- `node_modules/`
- `.next/`
- `src/`
- file development lainnya

## Verifikasi PWA

1. Jalankan mode production (`npm run build && npm run start`).
2. Buka website di browser Chromium.
3. Cek:
   - manifest terbaca (`/manifest.webmanifest`)
   - service worker aktif (`/sw.js`)
   - tombol install PWA tersedia (tergantung browser policy)

## Catatan Implementasi

- Data profil, project, skill, social tersentral di `src/lib/data.ts`.
- `app/page.tsx` dipertahankan sebagai Server Component (konten statis).
- Komponen interaktif dipisah ke Client Components:
  - `theme-toggle.tsx`
  - `portfolio-tabs.tsx`
  - `email-button.tsx`
  - `sw-register.tsx`

## Troubleshooting

- Error `Incompatible React versions`:
  - jalankan install bersih:
  - `Remove-Item -Recurse -Force node_modules,.next`
  - `npm install`
  - `npm run dev`
- Error `icon-192x192.png 404`:
  - file fallback sudah disediakan di `public/icon-192x192.png`
  - jika masih muncul, lakukan hard refresh dan clear site data/service worker browser
