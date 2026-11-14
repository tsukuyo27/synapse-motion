# Preset 07 — Governance Suite (`SISTEM`): Multi-Workspace RBAC & Master Config (`07-tata-kelola`)

> Status: **TERVERIFIKASI** — Pola referensi *admin & governance suite*: multi-workspace tab switching (`AdminHub`), manajemen pengguna RBAC, telemetry SLA, audit logs dengan redaksi snapshot JSON, generator nomor surat, EWS, dan panel konfigurasi multi-kategori.

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `07-tata-kelola` |
| **JS Config Export** | `tataKelolaPreset` (`src/presets/tataKelola.preset.js`) |
| **Arketipe Referensi** | Multi-Workspace Admin Suite + Redacted Audit Diff + Segmented Config Hub |
| **Status Verifikasi** | Terverifikasi (ESLint 0 error, Vitest pass, iOS Safari anti-auto-zoom & RBAC guards) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Skeletons & Hooks):**
  - `KpiSkeleton` & `CardSkeleton` (Bento metric / config hub initial load) + Dual `TableSkeleton` (`hidden md:block` & `block md:hidden mobile`) yang selalu dirender **di luar `<table>`** (`Users`, `ActivityLogs`, `LoginLogs`, `GeneratorNomor`, `EwsDashboard`, `KpiReliabilityTab`, `CronJobManager`).
  - `useBodyScrollLock` (*ref-counted*) dikelola terpusat oleh `<SynapseModal>` dengan `onExitComplete`.
- **Dari `motion-primitives/` (`framer-motion`):**
  - `AnimatedNumber` (`tabular-nums`) -> Bento Metric Tiles pada `Users`, `ActivityLogs`, `LoginLogs`, `GeneratorNomor`, `EwsDashboard`, `KpiReliabilityTab`, dan `MasterConfig` sidebar count.
  - `Disclosure` & `DisclosureContent` -> Accordion detail teknis peladen (`KpiReliabilityTab`), *inline visual diff* (`ActivityLogs`), detail node timeline 24 jam & DevSecOps Office Hours Guard (`CronJobManager`).
  - `motion.span layoutId` -> Pita spring indicator pada Sub-Ribbon Baris-2 (`subribbon-desktop-pill`, `subribbon-mobile-pill`), sub-switcher `DATA <-> LOGIN` (`audit-logs-subview-pill`), kategori `MasterConfig` (`master-config-category-pill`), filter kategori cron (`cron-category-filter-pill`), dan pemilih proyek BAST (`doc-template-project-pill`).
  - `SynapseDissolve` -> Transisi bersih antar-tab `AdminHub`, sub-view `ActivityLogs`, periode `KpiReliabilityTab`, kategori `MasterConfig`, serta proyek `DocumentTemplateManager`.
  - `SynapseStagger` -> Tabel bebas blur (`as="tr"`) & card grid/mobile stream bebas `StaggeredFade` / `animate-fade-in`.
  - `SynapseModal` (`tier="primary"`, `mobileSheet`) -> Tambah/Edit Pengguna & Reset Password (`Users`), Snapshot JSON Diff ter-redaksi (`ActivityLogs`), Terbit & Detail Arsip Nomor Surat (`GeneratorNomor`), Editor Jadwal Cron (`CronJobManager`), dengan deferred cleanup `260ms`.

---

## 3. Koreografi & Token Konfigurasi (Patokan Angka)

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Kontinuitas Refresh** | Memisahkan `showInitialSkeletons` vs `isRefreshing` (`Users`, `GeneratorNomor`, `KpiReliabilityTab`, `EwsDashboard`, `CronJobManager`) sehingga filter, pencarian, dan pergantian periode tidak mengedipkan ulang skeleton penuh. |
| **Navigasi & Auto-Scroll Tab** | `AdminHub.jsx` & `MasterConfig.jsx` melakukan `window.scrollTo({ top: 0, behavior: 'instant' })` saat tab/kategori berganti, disertai `scrollIntoView({ inline: 'center' })` + dynamic *right fade mask* pada pita filter horizontal mobile. |
| **Sub-Ribbon & RBAC AdminHub** | Tab `Kinerja SLA` (`SLA`) dan `Audit Logs` (`LOGS`) disembunyikan untuk role `admin` di `ResponsiveLayout.jsx` (`requireRole: ['superuser', 'manager']`) dan dijaga kartu fallback Pure Slate `Akses Terbatas` (403) di `AdminHub.jsx`. Role `manager` dipaksa read-only di seluruh modul CUD (`Users`, `GeneratorNomor`, & 6 sub-manager `MasterConfig`). |
| **Telemetri & Timeline `<Disclosure>`** | `KpiReliabilityTab` (Detail Teknis Server + periode WIB `Asia/Jakarta`), `ActivityLogs` (Visual Diff lama/baru ter-redaksi), dan `CronJobManager` (Node Timeline 24-Jam + DevSecOps Office Hours Warning 08:00–17:00 WIB) memakai `<Disclosure>` yang halus tanpa loncatan tinggi mendadak. |
| **Deferred Modal State Cleanup** | Penutupan modal di `Users`, `ActivityLogs`, `GeneratorNomor`, dan `CronJobManager` menunda reset payload modal (`260ms` via `useRef` timer + cleanup unmount) agar isi modal tidak berkedip kosong saat animasi spring keluar. |

---

## 4. Hardening Bugs, Pure Slate, Anti-Single-Tenant, & Mobile `~360px`

1. **Anti-Single-Tenant Hardcoded Identity Leak:**
   - Hapus fallback identitas perusahaan statis dari komponen UI/generator dokumen; gunakan state dinamis yang diambil dari API/config service resmi disertai fallback netral generik.
2. **100% Service Layer Parity:**
   - Seluruh panggilan HTTP dipusatkan di service layer (`adminService`, `configService`, `kpiService`, dsb.) tanpa panggilan `api.*` langsung di komponen presentasi maupun store.
3. **Zero Legacy Motion, Zero Emoji, Zero Manual Spinner, Zero Invalid Class:**
   - Menyingkirkan seluruh `StaggeredFade`, `animate-fade-in`, `animate-pop-in`, `usePresence`, spinner CSS border manual (`<Loader2 className="animate-spin" />`), kelas invalid `dark:hover:bg-slate-750` / `py-0.2`, warna hex (`#...`), dan seluruh emoji mentah dari TSX/JSX/komentar.
   - Memperbaiki 4 broken route `/admin/transportir` di `CronJobManager.jsx` -> `/master?tab=TRANSPORTIR`, menyatukan membaca deskripsi `cfg.deskripsi || cfg.keterangan`, dan mengunci waktu ke `Asia/Jakarta` WIB.
4. **Ergonomi Sentuh & Ketahanan `~360px`:**
   - Minimum `min-h-[44px]` pada tombol aksi mobile, pill tab, input modal, serta tombol info metrik/config (`min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]` pada `FeatureToggles`, `FinanceConfig`, `OperationalConfig`, `DocumentTemplate`); `text-base sm:text-xs` pada input modal & toolbar filter/pencarian/periode (`Users`, `ActivityLogs`, `LoginLogs`, `EwsDashboard`, `KpiReliabilityTab`, `MasterConfig`) mencegah *auto-zoom* iOS Safari; `grid-cols-2 sm:grid-cols-4` pada preset toleransi MCM (`FinanceConfigManager`); `isMobileChart` adaptif pada sumbu `<YAxis>` grafik Recharts `KpiReliabilityTab`; `z-10` pada ikon pembungkus input untuk ketahanan autofill; serta `break-words whitespace-pre-wrap` pada Live Simulation Mockup BAST agar nol overflow horizontal di `360px`.

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
import { KpiSkeleton, CardSkeleton, TableSkeleton } from '@/components/ui/Skeletons';
```

Gunakan token dari `tataKelolaPreset.navigationAndTabs` dan `tataKelolaPreset.modalsAndFeedback` untuk sinkronisasi spring tab `layoutId`, jeda `260ms`, dan batas sentuh `min-h-[44px]`.

---

## 6. Checklist Pengujian & Guardrail Wajib

- [x] Seluruh 15 file Pilar Tata Kelola bebas `StaggeredFade`, `usePresence`, cutoff `0.01s`, `animate-fade-in`, `gray-*`, emoji mentah, manual CSS spinner, & panggilan Axios langsung (`api.*`).
- [x] Dual `<TableSkeleton />` dirender di luar `<table>` dan `<tbody>`.
- [x] `admin` terkunci dari `SLA`/`LOGS` (Sub-Ribbon + kartu 403 `AdminHub`), `manager` read-only across `Users`, `GeneratorNomor`, & `MasterConfig`, serta `secret`/password di `ActivityLogs` snapshot modal ter-redaksi (`[REDACTED]`).
- [x] Teruji di `test_AdminHub_shadcn.test.jsx`, `test_GeneratorNomor_shadcn.test.jsx`, `test_Fase4_MasterConfig_Sla_shadcn.test.jsx`, serta terkunci di Guardrail #17 (`test_guardrail_motion_primitives.py`).

