<div align="center">

# Maulizar Nauval — Portfolio

**Immersive portfolio built with Next.js 16, React 19, and React Three Fiber.**

[![Live Demo](https://img.shields.io/badge/Live-maulizarnauval--portofolio.vercel.app-4A9EFF?style=for-the-badge&logo=vercel&logoColor=white)](https://maulizarnauval-portofolio.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.3.5-black?style=for-the-badge&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-98.7%25-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org)

[Live Demo](https://maulizarnauval-portofolio.vercel.app) · [Report Bug](https://github.com/atjehsupply/maulizar-portofolio/issues) · [Request Feature](https://github.com/atjehsupply/maulizar-portofolio/issues)

</div>

---

## About

Portofolio pribadi **Maulizar Nauval** — Software Engineer & Security Engineer dengan pengalaman 15 tahun dan 100+ project. Dibangun sebagai pengalaman interaktif, bukan sekadar website statis.

**Konsep utama:**
- iPhone 3D melayang di galaksi dengan bintang 3D dan nebula
- Icon di layar iPhone membuka halaman detail dengan transisi zoom
- Setiap halaman dirancang dengan identitas visual sendiri

---

## Features

### 📱 Immersive Home Screen
- iPhone 3D dengan CSS 3D transform
- Galaksi dengan 3,000 bintang 3D (React Three Fiber)
- Nebula 3-layer dengan additive blending
- Parallax mouse + floating animation
- Dynamic Island dengan animasi pulse

### 🎨 Interactive Workspace (Profile)
- Meja kerja 3D yang bisa di-drag (rotate)
- 8 objek interaktif: polaroid, notebook, laptop, kamera, kopi, sertifikat, keyboard, pena+kertas
- Setiap objek membuka panel detail dengan konten spesifik
- Responsif: meja di-scale otomatis di mobile

### 🛡️ Security Lab
- **Password Analyzer** — analisis kekuatan password dengan entropy calculation + pattern detection
- **Breach Checker** — cek email di database kebocoran (XposedOrNot API, gratis)
- **Security Stats** — statistik ancaman siber dari BSSN, IBM, Verizon DBIR
- **Security Tips** — 7 tips praktis dengan sumber terverifikasi

### 🎮 Breakout Game
- Game klasik breakout dengan tema neon nebula
- Kontrol: mouse drag (desktop) + jari (mobile)
- Level progression, high score, lives system
- Canvas-based rendering

### 🎭 Gallery
- 13 karya 3D art (dark fantasy, sci-fi, epic scale)
- Setiap karya punya judul + cerita
- Fullscreen viewer dengan navigasi
- Thumbnail optimization untuk performa

### 📊 Projects
- 5 aplikasi mobile multiplatform:
  - SigliAntar (Local Delivery)
  - Vantage (B2B Monitoring)
  - ShopZone (E-Commerce)
  - MedCare (Health Ecosystem)
  - FinTrack (Personal Finance)
- Detail tech stack + security implementation per project

### 📅 Journey
- Timeline 6 milestone (2020-2026)
- Workshop: proses di balik 3 project
- Responsive: horizontal scroll di desktop, vertikal di mobile

### 📷 Camera
- Selfie mode dengan `getUserMedia`
- Permission flow yang proper (user gesture)
- Hasil selfie tersimpan di Gallery
- Data tidak dikirim ke server

### 🎬 Entrance & Booting
- Entrance screen dengan tombol power + orbit rings
- Booting animation dengan logo Apple + progress bar
- Boot log terminal-style
- Transisi smooth ke home screen

---

## Tech Stack

### Core
| Package | Version | Purpose |
|---|---|---|
| [Next.js](https://nextjs.org) | 16.3.5 | Framework |
| [React](https://react.dev) | 19.2.8 | UI Library |
| [TypeScript](https://www.typescriptlang.org) | 5.x | Type Safety |

### UI & Animation
| Package | Version | Purpose |
|---|---|---|
| [Tailwind CSS](https://tailwindcss.com) | 4.x | Styling |
| [Motion](https://motion.dev) | 13.4.0 | Animations |
| [Zustand](https://zustand-demo.pmnd.rs) | 5.0.15 | State Management |

### 3D & Graphics
| Package | Version | Purpose |
|---|---|---|
| [Three.js](https://threejs.org) | 0.186.0 | 3D Engine |
| [@react-three/fiber](https://docs.pmnd.rs/react-three-fiber) | 9.7.0 | React renderer for Three.js |
| [@react-three/drei](https://github.com/pmndrs/drei) | 10.7.8 | Three.js helpers |

### Deploy & DevOps
- **Platform:** Vercel
- **Region:** Singapore (sin1)
- **Auto-deploy:** Yes (via GitHub)
- **HTTPS:** Auto (Let's Encrypt)

---

## Performance

Lighthouse scores di production:

| Category | Score |
|---|---|
| **Performance** | 🟢 **97** |
| **Accessibility** | 🟢 **100** |
| **Best Practices** | 🟢 **100** |
| **SEO** | 🟢 **100** |

**Optimizations applied:**
- Thumbnail generation (5-15 KB vs 100 KB original)
- Blur placeholder untuk image loading
- Lazy loading untuk non-critical images
- Debounce untuk navigasi cepat
- `prefers-reduced-motion` support
- Dynamic import untuk DetailOverlay
- AVIF/WebP image formats
- Immutable caching untuk static assets

---

## Security

**Grade A** on [securityheaders.com](https://securityheaders.com)

### Headers
- ✅ **Content-Security-Policy** — CSP dengan allowlist untuk API
- ✅ **Strict-Transport-Security** — HSTS 2 tahun + preload
- ✅ **X-Frame-Options** — DENY (anti-clickjacking)
- ✅ **X-Content-Type-Options** — nosniff (anti-MIME confusion)
- ✅ **Referrer-Policy** — strict-origin-when-cross-origin
- ✅ **Permissions-Policy** — camera only (untuk fitur selfie)

### Implementation
- CSP di-inject via `proxy.ts` (Next.js middleware)
- API calls dibatasi ke allowlist (`api.pwnedpasswords.com`, `api.xposedornot.com`)
- `worker-src blob:` untuk R3F WebGL workers
- `frame-ancestors 'none'` untuk anti-clickjacking

---

## Project Structure
maulizar-portofolio/
├── app/
│ ├── layout.tsx # Root layout, font setup
│ ├── page.tsx # Orchestrator screen state
│ ├── globals.css # Tailwind + custom variables
│ └── icon.png # Custom favicon (MN)
│
├── components/
│ ├── screens/ # Entrance, Boot, Home
│ ├── scene/ # Galaxy, Stars, Nebula (3D)
│ ├── phone/ # PhoneFrame, PhoneScreen, AppIcon
│ ├── desk/ # Interactive workspace
│ │ └── items/ # 8 desk objects
│ └── detail/ # Detail overlays
│ └── security/ # Security Lab modules
│
├── data/ # Static content
│ ├── profile.ts # Bio, skills, experience
│ ├── projects.ts # 5 mobile projects
│ ├── gallery.ts # 13 3D artworks
│ ├── contacts.ts # Contact info
│ ├── apps.ts # iPhone app definitions
│ ├── desk.ts # Desk object positions
│ └── journey.ts # Timeline + workshop
│
├── lib/
│ ├── store.ts # Zustand global state
│ ├── useCamera.ts # getUserMedia hook
│ └── useBreakout.ts # Game engine
│
├── public/
│ └── images/
│ ├── profile/ # Profile photo
│ ├── projects/ # Project screenshots + thumbs
│ └── 3d-art/ # 13 artworks + thumbs
│
├── proxy.ts # CSP middleware
├── vercel.json # Vercel config
├── next.config.ts # Next.js + security headers
└── LICENSE # MIT License

---

## Getting Started

### Prerequisites
- Node.js 20+
- npm / yarn / pnpm / bun

### Installation

```bash
# Clone repository
git clone https://github.com/atjehsupply/maulizar-portofolio.git
cd maulizar-portofolio

# Install dependencies
npm install

# Run development server
npm run dev