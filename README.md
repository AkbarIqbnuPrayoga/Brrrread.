# Brrrread.

<div align="center">
  <p><strong>A Little Bread. A Lot of Happiness.</strong></p>
  <p>Website e-commerce modern dengan karakter fresh, playful, modern, dan premium untuk toko roti artisan.</p>
</div>

---

## 🥐 Tentang Brrrread

**Brrrread** berasal dari permainan kata *"bread"* dengan tambahan *"Brrr"*—terinspirasi dari proses *cold fermentation* (fermentasi dingin) 36 jam yang menjadi inti kelezatan roti artisan kami. Website ini menghadirkan pengalaman digital sinematik layaknya melangkah langsung ke dalam bakery artisan hangat di Senopati, Jakarta.

---

## ✨ Fitur Utama

- **🎬 Cinematic Intro Screen (Typewriter Effect)**:
  - Layar pembuka berlatar espresso gelap dengan animasi mesin tik headline: *"GOOD THINGS TAKE A LITTLE DOUGH."*
  - Dilengkapi garis kemasan minimalis, indikator progress oven hangat, dan tombol *Skip Intro*.
  - Mengulang otomatis setiap kali website di-refresh / reload.
- **🚪 Horizontal Entrance Reveal (Left-to-Right)**:
  - Efek tirai dinamis membuka etalase toko roti dari kiri ke kanan saat intro selesai.
- **🫧 Glassmorphism Floating Navbar**:
  - Navbar kapsul melayang dengan efek blur dinamis yang menyesuaikan densitas saat di-scroll.
  - Micro-interaksi bounce pada logo dan badge keranjang saat item ditambahkan.
  - Quick Search Modal interaktif dengan pencarian live berbasis nama, rasa, dan bahan.
- **🥖 Katalog Produk & Filter Dinamis**:
  - Filter kategori (*Croissants & Pastries*, *Artisan Bread*, *Sweet Bakes*, *Savory Bakes*, *Bakery Boxes*).
  - Sorting berdasarkan popularitas, harga (rendah ke tinggi, tinggi ke rendah), dan alfabet.
  - Filter ketersediaan stok roti (*ready-to-bake*).
- **🔎 Halaman Detail Produk Editorial**:
  - Galeri multi-foto sudut dekat dengan thumbnail switcher.
  - Pemilihan varian potongan/kemasan (*Standard*, *Box of 3*, *Baker's Dozen*, *Thick Cut*).
  - Informasi alergen aktual, instruksi penyimpanan & pemanggangan ulang, serta jadwal keluar oven.
- **🛒 Shopping Bag Drawer & Tracking Ongkir Gratis**:
  - Drawer geser dari kanan dengan visual progress bar menuju *Free Jakarta Delivery*.
  - Pengaturan kuantitas (+/-) dan penghapusan item dengan kalkulasi subtotal instan.
  - Persistensi keranjang menggunakan `localStorage`.
- **📦 Checkout Lengkap & Fleksibel**:
  - Pilihan metode penerimaan: **Instant Delivery (Jakarta)** atau **Store Pickup (Senopati Flagship)** dengan slot tanggal dan jam pengambilan.
  - Formulir validasi data pemesan dan catatan khusus untuk baker (misal: potongan tebal / kartu ucapan).
  - Metode pembayaran: QRIS Instant, Virtual Account (BCA / Mandiri), dan Credit Card.
- **🎉 Order Confirmation & Status Pemanggangan**:
  - Halaman konfirmasi pesanan dengan nomor referensi unik (`#BRD-xxxxx`).
  - Animasi perayaan *confetti burst* interaktif.
  - Live timeline status pemanggangan di tungku batu (*Hearth Oven Queue*).
  - Fitur cetak struk / receipt.
- **📖 Storytelling & Find Us**:
  - Halaman kisah ragi alami 8 tahun *"Dough-lilah"* dan komitmen 100% French AOP Charentes butter.
  - Halaman lokasi toko Senopati dengan jam operasional, peta interaktif, dan informasi fasilitas (pet-friendly courtyard, specialty coffee, Wi-Fi).

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) dengan custom typography & color tokens
- **Animations & Transitions**: [Framer Motion](https://www.framer.com/motion/)
- **State Management**: [Zustand](https://github.com/pmndrs/zustand) (dengan sinkronisasi `localStorage`)
- **Routing**: [React Router DOM v6](https://reactrouter.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Visual Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🎨 Palet Warna Brand

| Warna | Hex | Penggunaan |
| :--- | :--- | :--- |
| **Warm Cream** | `#FFF6E8` | Background utama website |
| **Butter Yellow** | `#F6D98B` | Aksen tombol, sorotan, & badge |
| **Toasted Caramel** | `#C98752` | Aksen sekunder, divider, & link |
| **Bread Brown** | `#75452D` | Teks sekunder & deskripsi |
| **Espresso** | `#2D1B15` | Teks utama, judul, intro, & footer |
| **Soft White** | `#FFFCF7` | Kartu produk & kontainer elevated |
| **Muted Sage** | `#A8B49A` | Aksen alami & badge organik |

---

## 📁 Struktur Direktori

```text
Brrrread/
├── src/
│   ├── components/
│   │   ├── cart/            # CartDrawer & CartItemRow
│   │   ├── home/            # Hero, Marquee, BestSellers, Story, Bundles, Newsletter
│   │   ├── intro/           # CinematicIntro (Typewriter effect)
│   │   ├── layout/          # Navbar, MobileMenu, SearchModal, Footer
│   │   ├── products/        # ProductCard, ProductFilters
│   │   └── ui/              # Button, Badge
│   ├── data/
│   │   └── products.ts      # Data produk artisan, varian, alergen, & harga
│   ├── hooks/
│   │   ├── useReducedMotionPreference.ts
│   │   └── useScrollState.ts
│   ├── pages/
│   │   ├── HomePage.tsx
│   │   ├── MenuPage.tsx
│   │   ├── ProductDetailPage.tsx
│   │   ├── OurStoryPage.tsx
│   │   ├── FindUsPage.tsx
│   │   ├── CheckoutPage.tsx
│   │   └── OrderConfirmationPage.tsx
│   ├── store/
│   │   └── cartStore.ts     # Global state cart & intro lifecycle
│   ├── types/
│   │   └── index.ts         # TypeScript definitions
│   ├── utils/
│   │   └── formatters.ts    # IDR currency formatter & Order ID generator
│   ├── App.tsx
│   ├── index.css
│   └── main.tsx
├── index.html
├── package.json
├── tailwind.config.js
└── vite.config.ts
```

---

## 🚀 Menjalankan Proyek Secara Lokal

1. **Clone repositori**:
   ```bash
   git clone https://github.com/AkbarIqbnuPrayoga/Brrrread..git
   cd Brrrread.
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Jalankan development server**:
   ```bash
   npm run dev
   ```
   Buka peramban di `http://127.0.0.1:5173/`

4. **Build untuk produksi**:
   ```bash
   npm run build
   ```

---

<div align="center">
  <p>Dikembangkan dengan ❤️ untuk pencinta roti artisan.</p>
  <p>© 2024 Brrrread Bakery Artisan Indonesia. All rights reserved.</p>
</div>
