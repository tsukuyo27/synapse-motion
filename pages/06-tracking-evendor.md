# Preset 06 — Tracking & Reconciliation Hub: ERP Status, Burn-Down HUD, & Clearing Audit (`06-tracking-evendor`)

> Status: **TERVERIFIKASI** — Pola referensi untuk halaman pelacakan status tiket ERP, HUD *burn-down* pagu kontrak berbasis `<Disclosure>`, serta modal rincian ganda (`Dual-View SynapseModal`) + bukti audit kliring.

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `06-tracking-evendor` |
| **JS Config Export** | `trackingEvendorPreset` (`src/presets/trackingEvendor.preset.js`) |
| **Arketipe Referensi** | Tracking Feed, Collapsible Budget Burn-Down HUD, & Dual-View Audit Modal |
| **Status Verifikasi** | Terverifikasi (ESLint 0 error, Vitest pass, & mobile `~360px` bottom-sheet) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Skeletons & Hooks):**
  - `KpiSkeleton` (4 kartu KPI saat muat awal) + Dual `TableSkeleton` (`hidden md:block rows={5}` dan `block md:hidden rows={3} mobile`) yang dirender **di luar elemen `<table>`** untuk mencegah *invalid DOM nesting* di `<tbody>`.
  - `useBodyScrollLock` (*ref-counted* `activeScrollLocks`) yang dikelola otomatis oleh `<SynapseModal>` hingga animasi keluar tuntas (`onExitComplete`).
- **Dari `motion-primitives/` (`framer-motion`):**
  - `AnimatedNumber` (`tabular-nums`) -> Interpolasi angka halus pada 4 Bento KPI Tiles (`Total Tagihan`, `Selesai Dibayar`, `Verifikasi Bank MCM`, `Dalam Proses`) serta 4 Pilar Burn-Down PO (`Plafon`, `Available`, `Burn Rate`).
  - `Disclosure`, `DisclosureTrigger`, & `DisclosureContent` -> Header HUD PO Register tunggal dengan ekspansi mulus panel grafik `CASHFLOW`/`BURNDOWN` bebas *ghost gap*, serta accordion `Teks Forensik Email Asli` di dalam modal Bank MCM.
  - `motion.span layoutId` -> Spring indicator `trackingHudChartTab` (`stiffness: 380, damping: 32`) pada switcher grafik HUD, dan `tracking-detail-tab-indicator` (`stiffness: 420, damping: 34`) pada tab modal `E-Vendor SAP` <-> `Bank MCM`.
  - `SynapseDissolve` -> Crossfade konten antar-mode grafik Recharts dan antar-tab modal rincian.
  - `SynapseStagger` -> Jalur `as="tr"` bebas `filter: blur()` (`delayStep={35} maxIndex={8}`) untuk tabel desktop dan `delayStep={30} maxIndex={9} direction="up"` untuk Mobile Card Stream.
  - `SynapseModal` (`tier="primary"`, `mobileSheet`, `maxWidth="max-w-2xl"`) -> Portal persisten dengan Layer-Aware `Escape` Guard terhadap `.swal2-container`, *mobile bottom-sheet* (`rounded-t-2xl`), dan reset state tertunda pasca-exit (`260ms`).

---

## 3. Koreografi & Token Konfigurasi (Patokan Angka)

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Kontinuitas Refresh (`showInitialSkeletons` / `isRefreshing`)** | Skeleton (`4x KpiSkeleton` + `tracking-hud-skeleton` + Dual `TableSkeleton`) hanya tampil saat `loading && !hasLoadedOnce`. Perubahan filter, pencarian debounced, atau paginasi menjaga DOM lama tetap tampil (`opacity-65 pointer-events-none`) disertai badge `<Loader2>` dan interpolasi `<AnimatedNumber>`. |
| **Scope Filter Bar & 4 Bento KPI (~360px)** | Pasangan filter Pangkalan & Project memakai `grid grid-cols-2 sm:flex`, ikon input memakai `top-1/2 -translate-y-1/2 z-10`, dan kontrol sentuh mobile memakai `min-h-[44px] sm:min-h-0 sm:h-9`. Kartu KPI menempatkan ikon `shrink-0` di kanan atas agar judul `VERIFIKASI BANK MCM` tidak terpotong di `360px`. |
| **PO Burn-Down HUD & Recharts** | Header HUD tunggal (menghilangkan duplikasi pill PO) dengan *right fade mask* horizontal, mode switcher `layoutId="trackingHudChartTab"`, `<SynapseDissolve activeKey={chartMode}>`, sumbu `XAxis interval="preserveStartEnd"`, lebar `YAxis` kiri `46px` & kanan `42px` agar plot tetap lega di `360px`, serta placeholder empty-state bila `chartData.length === 0`. |
| **Tabel & Mobile Card Stream** | `<SynapseStagger as="tr" delayStep={35} maxIndex={8}>` di desktop; `<SynapseStagger delayStep={30} maxIndex={9} direction="up">` di `< md` dengan tombol aksi `min-h-[44px]` dan footer tanggal `flex-wrap`. |
| **Dual-View Detail Modal** | `<SynapseModal tier="primary" mobileSheet>` dengan tombol tutup `min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px]`, footer *safe-area* `env(safe-area-inset-bottom)`, tab indicator `layoutId="tracking-detail-tab-indicator"`, *deferred post-exit reset* `260ms` untuk `modalItem` & `bankAudit`, dan `<Disclosure>` untuk teks forensik email. |

---

## 4. Hardening Bugs, Pure Slate, & Mobile Constraints (~360px)

1. **Invalid DOM Nesting `TableSkeleton` di Dalam `<tbody>`:**
   - **Penyebab:** Merender `<TableSkeleton />` (elemen `<div>`) langsung di dalam `<tbody>` memicu peringatan HTML/React DOM nesting.
   - **Solusi:** Dual `<TableSkeleton />` (`hidden md:block` + `block md:hidden mobile`) wajib dirender **sebelum** blok `<table>` ketika `showInitialSkeletons === true`.
2. **Kedipan Isi Modal Saat Exit & Race Scroll Lock:**
   - **Penyebab:** `usePresence` + `useBodyScrollLock(!!selectedItem)` melepas kunci scroll sebelum animasi exit selesai, dan mengosongkan `bankAudit` saat `closeDetailModal()` membuat tab Bank MCM berkedip menjadi *"Belum Ada Mutasi..."* selama 260ms animasi keluar.
   - **Solusi:** Migrasi ke `<SynapseModal>` (`onExitComplete` scroll unlock) serta tunda pembersihan `modalItem`, `bankAudit`, dan `showForensicText` selama `260ms` (dengan pembatalan timer jika modal dibuka kembali cepat).
3. **Zero Raw Emoji & Invalid Tailwind Tokens:**
   - Menghapus emoji/simbol mentah (`⚠️`, `✓`) pada pilar status buffer siaga dan menggantinya dengan `<AlertTriangle />` & `<CheckCircle2 />` (`lucide-react`), serta menyingkirkan token tidak valid `dark:hover:bg-slate-750` dan `py-0.2`.
4. **Strict Service Layer & Pure Slate:**
   - Seluruh HTTP call tetap murni lewat `evendorService` & `poRegisterService` tanpa direct Axios, dengan `0` token `gray-*` dan `Swal.fire` `buttonsStyling: false`.

---

## 5. Snippet Minimal Siap Pakai

```jsx
import {
  AnimatedNumber,
  Disclosure,
  DisclosureTrigger,
  DisclosureContent,
  SynapseDissolve,
  SynapseStagger,
  SynapseModal,
} from '@/components/ui/motion';
import { KpiSkeleton, TableSkeleton } from '@/components/ui/Skeletons';
```

Gunakan `trackingEvendorPreset.detailModal.deferredPostExitResetMs` (`260`), `trackingEvendorPreset.poHudAndCharts.chartTabLayoutId` (`'trackingHudChartTab'`), serta `trackingEvendorPreset.dataViews.desktopRowTransition` untuk menjaga paritas antar modul pelacakan.

---

## 6. Checklist Pengujian & Guardrail Wajib

- [x] `Tracking.jsx`, `TrackingHudSection.jsx`, & `TrackingDetailModal.jsx` memiliki `0` token `gray-*`, `0` emoji mentah, `0` legacy `StaggeredFade`/`usePresence`/`useReducedMotion`, dan `0` panggilan `api.*` langsung.
- [x] Dual `<TableSkeleton />` dirender di luar `<table>` hanya pada `showInitialSkeletons`; perubahan filter/search mempertahankan DOM lama (`isRefreshing`).
- [x] `<Disclosure>` HUD, `<SynapseModal>` tab switching (`Bank MCM` <-> `E-Vendor`), Layer-Aware `Escape` Guard terhadap `.swal2-container`, `prefers-reduced-motion: reduce`, role `manager` read-only, dan tampilan mobile `~360px` bottom-sheet teruji di `test_Tracking_shadcn.test.jsx`.
- [x] Guardrail #17 (`test_guardrail_motion_primitives.py`) mengunci `Tracking.jsx`, `TrackingHudSection.jsx`, `TrackingDetailModal.jsx`, `evendorService.js`, dan grup `TRACKING` pada `ResponsiveLayout.jsx`.

