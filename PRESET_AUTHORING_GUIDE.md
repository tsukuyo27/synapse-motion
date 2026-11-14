# Panduan Penulisan Page Motion Preset (`PRESET_AUTHORING_GUIDE.md`)

Dokumen ini adalah **kontrak baku** untuk menambahkan konfigurasi halaman baru ke dalam kerangka **Synapse Motion**.  
Setiap kali Anda mengevaluasi/mengaudit sebuah halaman (misalnya Dashboard, Tabel Transaksi, Tracking, atau Master Config) lalu memanggil `/learn`, agen AI **WAJIB** membaca panduan ini terlebih dahulu dan menambahkan hasilnya dalam format yang sama persis.

---

## 1. Aturan Emas (Strict Verified-Only Rule)
- **Dilarang Menulis Preset Spekulatif**: Hanya halaman yang sudah benar-benar **dievaluasi, diimplementasikan, dan lolos pengujian nyata** (lint + test + review UI) yang boleh ditambahkan ke `pages/` dan `src/presets/`.
- **Penamaan Berurutan**:
  - Dokumen Markdown: `docs/synapse-motion/pages/<NN>-<slug>.md` (contoh berikutnya: `02-dashboard-kpi.md`, `03-data-table-crud.md`).
  - Objek JS Config: `docs/synapse-motion/src/presets/<camelCase>.preset.js` + diekspor di `src/presets/index.js`.

---

## 2. Struktur Wajib Dokumen `pages/<NN>-<slug>.md`

Setiap file resep halaman wajib memuat **6 bagian berurutan** berikut:

### Bagian 1 — Metadata & Sumber Evaluasi
Tabel ringkas berisi:
- `Preset ID` & `JS Export Name`
- `Halaman Referensi` (misal: `frontend/src/pages/Login.jsx`)
- `ADR / Audit Terkait` (jika ada)
- `Status Verifikasi` (Tanggal + hasil test & guardrail)

### Bagian 2 — Arsitektur Layer yang Dipakai
Pecah eksplisit komponen mana yang berasal dari masing-masing folder:
- **Dari `shadcn-synapse/`**: komponen CSS/Hooks/Skeletons apa yang digunakan.
- **Dari `motion-primitives/`**: komponen `framer-motion` apa yang digunakan.

### Bagian 3 — Koreografi & Token Konfigurasi (Patokan Angka)
Jelaskan alur masuk → interaksi → error → keluar, beserta angka durasi/easing/delay yang boleh dikopi langsung (sinkron dengan file `src/presets/<camelCase>.preset.js`).

### Bagian 4 — Hardening Bugs, Autofill & Mobile Constraints
Catat seluruh jebakan spesifik yang ditemukan saat audit halaman tersebut beserta solusi bakunya (misalnya: `z-10` untuk autofill, `overflow-hidden` di mobile, larangan `filter: blur()` di `<tr>`, tinggi minimum target sentuh `44px`, larangan `usePresence` pop-in pada lightbox/overlay dengan menggantinya ke `<SynapseModal tier="lightbox" mobileSheet={false}>`, `allowEscapeViewBox` untuk tooltip Recharts mobile, serta posisi popover topbar `fixed inset-x-3`).

### Bagian 5 — Contoh Snippet Minimal Siap Pakai
Potongan JSX ringkas yang langsung mengimpor preset & komponen dari barrel utama.

### Bagian 6 — Checklist Pengujian & Guardrail Wajib
Daftar apa yang wajib dites oleh Vitest / Guardrail untuk mencegah regresi pada halaman bertipe tersebut.

---

## 3. Langkah Eksekusi Saat `/learn` Menambah Halaman Baru

1. Buat `docs/synapse-motion/pages/<NN>-<slug>.md` mengikuti 6 bagian di atas.
2. Buat `docs/synapse-motion/src/presets/<camelCase>.preset.js` berisi objek token terverifikasi.
3. Ekspor preset baru di `docs/synapse-motion/src/presets/index.js`.
4. Tambahkan 1 baris baru di tabel **"Verified Page Presets"** serta perbarui pohon **`Repository Structure`** pada `docs/synapse-motion/README.md`.
5. Bila ada peningkatan pada komponen `frontend/src/components/ui/motion/` atau skeleton/scroll-lock hook selama audit, sinkronkan ke paket portabel `docs/synapse-motion/src/`.
6. Pastikan seluruh test suite dan linter tetap lolos 100%.

