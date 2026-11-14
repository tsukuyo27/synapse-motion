# Preset 02 — Dashboard KPI Bento & Mobile Anti-Clipping (`02-dashboard-kpi`)

> Status: **TERVERIFIKASI** — Pola referensi teruji pada Dashboard KPI Bento & Shell Responsif (`Dashboard.jsx`, `ResponsiveLayout.jsx`, Vitest & guardrail statis).

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `02-dashboard-kpi` |
| **JS Config Export** | `dashboardKpiPreset` (`src/presets/dashboardKpi.preset.js`) |
| **Arketipe Referensi** | Analytics KPI Bento Grid + Responsive Shell (`Dashboard.jsx` & `ResponsiveLayout.jsx`) |
| **Status Verifikasi** | Terverifikasi (`~360px` anti-clipping, ESLint 0 error, Vitest pass) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Hooks & Bento Skeletons):**
  - `KpiSkeleton` (`min-h-[136px] sm:min-h-[140px]`) → menyamai tinggi kartu KPI 2-baris mobile sehingga transisi muat awal bebas *layout jump*.
  - `ChartSkeleton` & `TableSkeleton` (`mobile` prop di bawah `< md`) → replika geometri grafik dan card stream mobile.
- **Dari `motion-primitives/` (`framer-motion`):**
  - `AnimatedNumber` (`formatValue` Rupiah & desimal KL/L, spring `stiffness: 200, damping: 24, mass: 0.6`) → interpolasi angka KPI mulus saat filter berubah tanpa reset ke skeleton.
  - `motion.span layoutId="dashboardChartTab"` (`stiffness: 380, damping: 32`) + `SynapseDissolve` → perpindahan tab *Grafik Area* / *Diagram Batang* disertai crossfade halus.
  - `Disclosure` + `DisclosureContent` → membuka/menutup panel *Filter Dashboard* mobile secara halus tanpa jarak kosong.
  - `SynapseStagger as="tr"` (`delayStep={35}`, `maxIndex={8}`) → entri bertahap baris tabel EWS & Daftar Pengiriman tanpa CSS `filter: blur()`.
  - `TextMorph` → perubahan label pill counter transaksi secara adaptif.

---

## 3. Koreografi & Token Konfigurasi

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Initial Load vs Refresh (`showInitialSkeletons` / `isRefreshing`)** | Render Skeleton HANYA saat `loading && !data`. Saat filter berubah (`loading && Boolean(data)`), pertahankan DOM grid dengan `transition-opacity duration-200` + `opacity-65 pointer-events-none`. |
| **6 Kartu KPI Bento** | `AnimatedNumber` memakai `stiffness: 200, damping: 24, mass: 0.6` dengan custom `formatValue` (`formatCurrency` / `formatNumber`). |
| **Switcher Grafik Area / Batang** | Floating pill `layoutId="dashboardChartTab"` (`type: 'spring', stiffness: 380, damping: 32`) + `<SynapseDissolve activeKey={chartMode} />`. |
| **Mobile Filter Panel (`< xl`)** | Slim Collapsible Header (`~42px`) + `<Disclosure open={isMobileFilterOpen}><DisclosureContent>` membungkus `renderFilterControls()` tunggal. |
| **Tabel EWS & Live Feed** | `<SynapseStagger as="tr" delayStep={35} maxIndex={8} />` di desktop dan Mobile Card Stream di `< md`. |

---

## 4. Hardening Bugs, Overflow & Mobile Constraints (~360px)

1. **Pencegahan Avatar Topbar Terpotong ke Kanan (`ResponsiveLayout.jsx`):**
   - **Penyebab:** Wrapper kiri (`FL` + nama perusahaan) dan grup 4 tombol kanan (`QuickCapture`, `Notification`, `Theme`, `UserDropdown`) sama-sama `shrink-0` sehingga total lebar (`> 430px`) melampaui viewport `360px`.
   - **Aturan Wajib:** Grup kiri memakai `min-w-0 flex-1 md:flex-initial`, chip perusahaan memakai `min-w-0 flex-1 sm:flex-initial max-w-[140px] sm:max-w-[200px]`, sementara tombol utilitas memakai ukuran kompak mobile (`w-9 h-9 sm:w-10` / `sm:w-11`, `gap-1.5 sm:gap-3`), dan popover notifikasi memakai `-right-[88px] sm:right-0`.
2. **Grid 2-Kolom KPI Mobile Anti-Wrap (`Dashboard.jsx`):**
   - **Aturan Wajib:** Nominal angka panjang (`Rp 47.360.000`) menggunakan skala bertahap `text-base min-[390px]:text-lg sm:text-2xl`.
   - Header kartu memakai `flex items-start justify-between gap-1.5` dengan kotak ikon `shrink-0` agar judul panjang tidak mendesak ikon.
   - Footer KPI menumpuk vertikal di mobile (`flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-1.5`), seluruh pill badge menyertakan `whitespace-nowrap shrink-0`, dan teks bulan/tanggal memakai `truncate max-w-full`.
3. **Sinkronisasi Tinggi Skeleton & Non-Interactive Refresh:**
   - `KpiSkeleton` wajib minimal `min-h-[136px] sm:min-h-[140px]` dan tabel mobile memuat `<TableSkeleton mobile />`.

---

## 5. Snippet Minimal Pemakaian Preset

```jsx
import {
  AnimatedNumber,
  Disclosure,
  DisclosureContent,
  SynapseDissolve,
  SynapseStagger,
  TextMorph,
  dashboardKpiPreset,
} from '@/components/ui/motion'; // atau dari synapse-motion
```

Gunakan konstanta `dashboardKpiPreset.kpi.spring`, `dashboardKpiPreset.chart.tabSpring`, dan `dashboardKpiPreset.table.delayStepMs` (`35`) agar irama refresh, tab pill, dan animasi baris tabel konsisten.

---

## 6. Checklist Pengujian & Guardrail Wajib

- [ ] `Dashboard.jsx` tetap mempertahankan 0 token `gray-*` (`pure-slate` theme check di `test_Dashboard_shadcn.test.jsx`).
- [ ] Pemisahan `showInitialSkeletons` vs `isRefreshing` terpasang sehingga perubahan filter tidak me-reset seluruh halaman ke skeleton.
- [ ] Seluruh pill badge footer KPI menyertakan `whitespace-nowrap shrink-0` dan header icon menyertakan `shrink-0`.
- [ ] `ResponsiveLayout.jsx` menjaga `min-w-0 flex-1` di wrapper identitas header kiri agar avatar `UserDropdown` kanan tetap utuh di ~360px.
- [ ] Uji statis Guardrail #17 (`test_guardrail_motion_primitives.py`) lulus untuk `ResponsiveLayout.jsx` dan `Dashboard.jsx`.

