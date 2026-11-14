# Preset 08 — Mobile-First Field / Driver Portal: Dashboard, Mobile Entry, & Profil Dokumen (`08-portal-amt`)

> **Status**: Verified Production Preset (Synapse Motion v2.2 Hybrid)  
> **Cakupan Arketipe**: Portal Performa, Form Entri Lapangan Mobile, & Lightbox Profil Dokumen  
> **Referensi Preset Token**: `src/presets/portalAmt.preset.js`

---

## Metadata Preset

| Atribut | Nilai |
| --- | --- |
| **Preset ID** | `08-portal-amt` |
| **Target Layar Utama** | Ponsel Lapangan `~360px` (Portrait), iOS Safari, & Desktop |
| **Tema Warna** | Pure Slate (`slate-50` .. `slate-950`) |
| **Lapisan API** | Service Layer terdedikasi (tanpa panggilan Axios langsung di UI) |

---

## Arsitektur Koreografi & Ergonomi Mobile

### 1. Navigasi Portal AMT (`ResponsiveLayout.jsx`, `NotificationDropdown.jsx`, `UserDropdown.jsx`)
- Pemisahan ketat `layoutId` spring pill agar DOM desktop dan bottom thumb-bar mobile tidak saling menarik:
  - Desktop Navbar: `layoutId="amt-desktop-nav-pill"`
  - Mobile Bottom Bar (`< 768px`, `min-h-[48px]`): `layoutId="amt-mobile-nav-pill"`
- Utilitas global topbar (`NotificationDropdown`, tema, `UserDropdown`) menjaga target sentuh `min-h-[44px] min-w-[44px]`. Popover notifikasi di viewport sempit diposisikan lewat `fixed inset-x-3 top-[4.25rem] sm:inset-x-auto sm:top-auto sm:absolute sm:right-0 sm:mt-3 sm:w-96` beranimasi `<AnimatePresence>` (`0.18s`), dengan tautan CTA sadar-peran (`isAmt ? '/amt/profile' : '/admin'`).
- Hydrasi profil pengemudi memakai `amtService.getAll()`, zero direct `api.get('/amt/')`.

### 2. Dashboard Pengemudi (`/amt/dashboard`)
- **Kontinuitas Refresh (`showInitialSkeletons` vs `isRefreshing`)**: Penggantian filter bulan/tahun mempertahankan KPI & tabel sebelumnya dalam keadaan redup (`opacity-65 pointer-events-none`) dengan badge `<Loader2 />`, mencegah kedipan putih.
- **2×2 Bento KPI Mobile (`grid-cols-2 gap-2.5 sm:gap-4`)**: Memastikan 4 metrik utama (Total Ritase, Volume Angkut KL, Jarak Tempuh KM, Hari Aktif) langsung terlihat tanpa gulir panjang di layar `~360px`, menggunakan `<AnimatedNumber />` (`tabular-nums`).
- **Temporal WIB & Anti-Zoom iOS Safari**: Filter periode memakai `getWibCurrentMonth()`, `getWibCurrentYear()`, `buildWibYearOptions()`, dan `getWibDateParts()`. `<select>` menerapkan `text-base sm:text-xs` & `min-h-[44px]`.
- **Recharts Adaptif Mobile & Tooltip Containment**: Sumbu `<YAxis>` adaptif (`32px` mobile vs `42px` desktop via `window.matchMedia('(max-width: 639px)')`), `<XAxis interval="preserveStartEnd" />`, `<Tooltip allowEscapeViewBox={{ x: false, y: true }} wrapperStyle={{ maxWidth: isMobileChart ? '210px' : '280px', zIndex: 20, pointerEvents: 'none' }} />`, root halaman `mt-0 md:-mt-4` agar aman dari topbar di ponsel, strip chip legenda produk horizontal dengan *right fade mask*, SSOT warna `getProdColor()`, dan *Empty-State Chart Guard*.
- **Anti-Truncate Header & Interactive EWS `<Disclosure>`**: Header kartu mobile menghindari `truncate` pada judul/tanggal (`leading-snug` + `flex-wrap`), sementara ikon info `(i)` memakai `<DisclosureTrigger>` (`min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]`) agar terbaca lewat ketukan jari tanpa `:hover`.
- **Dual Skeleton & Tabel Blur-Free**: Dual `<TableSkeleton />` dirender di luar `<table>`, baris desktop memakai `<SynapseStagger as="tr">`, dan kartu mobile mengganti emoji mentah ke ikon `<MapPin />`.

### 3. Profil & Dokumen Driver (`/amt/profile`)
- **Driver Header Anti-Overflow**: Nama panjang driver memakai `min-w-0 truncate` serta `text-xl sm:text-3xl`.
- **Spring Tab Switcher**: Perpindahan tab `PERSONAL` <-> `ARMADA` menggunakan `layoutId="amt-profile-doc-tab-pill"` di atas `<SynapseDissolve activeKey={activeTab}>`.
- **Lightbox & Sheet Ergonomics**:
  - Pratinjau dokumen memakai `<SynapseModal tier="lightbox" mobileSheet={false}>` dengan *deferred post-exit reset* `260ms` (menghapus `usePresence`, `animate-pop-in`/`animate-zoom-out`, dan manual `useBodyScrollLock`).
  - Modal Update Dokumen & Ganti Password memakai `<SynapseModal tier="primary" mobileSheet>` dengan *safe-area* footer `pb-[max(1rem,env(safe-area-inset-bottom))]`, pesan error/sukses dibungkus `<Disclosure>`, dan `Swal.fire` Pure Slate (`buttonsStyling: false`).
  - Indikator proses foto memakai `<Loader2 />`, `<Cpu />`, `<CloudUpload />`, `<Sparkles />` (zero border CSS spinner, zero emoji).

### 4. Input Surat Jalan AMT (`/amt/transaksi`)
- Wrapper tipis `<Transaksi />` mewarisi seluruh pengaman `04-pengiriman-operasional`, dengan pengujian khusus penguncian akun `amt_1_aktual_id` untuk role `amt`.

