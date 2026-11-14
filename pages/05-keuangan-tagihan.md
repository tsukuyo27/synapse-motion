# Preset 05 — Finance Workspace: Billing Generator, Reconciliation, Archive & A4 Print Lightbox (`05-keuangan-tagihan`)

> Status: **TERVERIFIKASI** — Pola referensi untuk workspace keuangan & pratinjau dokumen cetak (*billing generator*, *reconciliation stage*, arsip berpaginasi, & *print-safe A4/Landscape lightbox* dengan sibling dialog).

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `05-keuangan-tagihan` |
| **JS Config Export** | `keuanganTagihanPreset` (`src/presets/keuanganTagihan.preset.js`) |
| **Arketipe Referensi** | Billing Generator, File Reconciliation Wizard, Invoice Archive & Print-Safe Lightbox |
| **Status Verifikasi** | Terverifikasi (ESLint 0 error, Vitest pass, `@media print` safety & mobile `Fit Layar`) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Skeletons & Hooks):**
  - `TableSkeleton` (Dual desktop & mobile `mobile` prop) + `TagihanSummarySkeleton` -> Memisahkan status pemuatan awal vs penyegaran filter (`showInitialSkeletons` vs `isRefreshingHistory`) di Arsip Invoice, serta pratinjau skeleton saat `isUploading` pada Rekonsiliasi SOT.
  - `useBodyScrollLock` (*ref-counted* `activeScrollLocks`) -> Menahan scroll layar belakang di `#preview-modal` (`portalLocked`) maupun modal turunan (`showSAEditModal`, `ReLinkModal`) dan baru melepasnya di `onExitComplete`.
- **Dari `motion-primitives/` (`framer-motion`):**
  - `SynapseDissolve` -> Perpindahan antar-tab Grup Keuangan (`generator`, `rekonsiliasi`, `history`), Stage 1 <-> Stage 2 Rekonsiliasi SOT, dan kemunculan ringkasan kalkulasi BAST.
  - `AnimatedNumber` (`tabular-nums`) -> Interpolasi angka halus untuk metrik volume KL, DPP, DPP Net, Grand Total WAPU, dan 4 Bento tiles Rekonsiliasi SOT.
  - `Disclosure` & `DisclosureContent` -> Blok kondisional peringatan defisit PO (*Soft-Gate*) dan input keterangan penyesuaian nilai (`adjustment_plus`/`adjustment_minus`) tanpa *layout jump*.
  - `SynapseStagger` (`as="tr"` bebas blur & kartu mobile `delayStep={30} maxIndex={9}`) -> Menggantikan sepenuhnya legacy `StaggeredFade` di Arsip Invoice dan Kertas Kerja Rekonsiliasi.
  - `SynapseModal` -> `ReLinkModal` (`tier="primary"`, `mobileSheet`) dan dialog sibling `showSAEditModal` (`tier="lightbox-dialog"`, `z-[210]`, `mobileSheet`).
  - Persisten `<AnimatePresence onExitComplete>` + `motion.div` (`data-synapse-tier="lightbox"`) -> Lightbox `#preview-modal` (`z-[200]`) dengan `print:animate-none print:transform-none` mutlak agar ukuran kertas fisik A4 (`w-[210mm] min-h-[297mm]`) dan Lanskap (`w-[297mm] min-h-[210mm]`) serta `@media print` tetap 100% utuh.

---

## 3. Koreografi & Token Konfigurasi (Patokan Angka)

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Navigasi & Sub-Ribbon `?tab=`** | `window.scrollTo({ top: 0, behavior: "instant" })` saat `activeTab` berubah; `hideForRole: ['manager']` pada `generator` & `rekonsiliasi`; `isSubItemActive` mengunci highlight `/tagihan` `manager` ke `history`; pill sentuh mobile `min-h-[44px]`. |
| **Print Lightbox `#preview-modal`** | `<AnimatePresence onExitComplete>` membungkus `motion.div` backdrop (`opacity: 0 <-> 1`, `duration: 0.2`) & kontainer (`spring stiffness: 360, damping: 32, mass: 0.9`); seluruh kelas cetak memakai `print:static print:animate-none print:transform-none`. |
| **Sibling Dialog `Edit No. SA`** | `<SynapseModal tier="lightbox-dialog" mobileSheet maxWidth="max-w-md">` (`z-[210]`) dirender **di luar `</AnimatePresence>`** `#preview-modal`; *Layer-Aware Escape Guard* di `PreviewDokumen.jsx` mengabaikan `Escape` bila `.swal2-container` atau `[data-synapse-tier="lightbox-dialog"]` aktif. |
| **`ReLinkModal` (`Tagihan.jsx`)** | `<SynapseModal tier="primary" mobileSheet maxWidth="max-w-md">` dengan reset `selectedTagihanForReLink` tertunda `260ms` dan SweetAlert2 `buttonsStyling: false` Pure Slate. |
| **Ergonomi Mobile ~360px** | Filter status Rekonsiliasi memakai *right fade mask* (`showFilterRightFade`); tombol aksi, kontrol tab preview, unduh template, dan kartu Arsip Invoice memakai tinggi sentuh `min-h-[44px]`. |

---

## 4. Hardening Bugs, Print-Safety, & Service Layer Parity

1. **Larangan `StaggeredFade`, `usePresence`, & `useReducedMotion` Cutoff:**
   - Modal, tabel `<tr>`, dan kartu mobile Pilar Keuangan dilarang memakai legacy `StaggeredFade`, `usePresence` CSS keyframes, atau cutoff `useReducedMotion()` `0.01s`.
2. **Keutuhan Cetak Fisik, Tab Motion & Mobile ~360px (`PreviewDokumen.jsx`, `Tagihan.jsx`):**
   - Lightbox memakai `motion.div` berpelindung `print:animate-none print:transform-none print:bg-white print:p-0` tanpa mengubah elemen kertas (`210mm`/`297mm`), `DraftWatermark`, `SecureSignatureBox`, maupun struktur tabel cetak BA/Invoice/Kwitansi/Rekap.
   - Navigasi tab memakai spring indicator `layoutId="preview-dokumen-tab-indicator"` (`print:hidden`) + transisi kertas bebas blur `.paper-motion-frame` (`motion.div key={activeTab}`, durasi `0.24s`, `print:block print:transform-none print:opacity-100`).
   - Layar mobile (`< 640px`) dilengkapi control strip `Fit Layar` <-> `Zoom 1:1` (`mobileZoomMode`, kalkulasi skala via CSS `zoom` di `#print-area` dan reset `zoom: 1 !important` pada `@media print` / `handlePrint`), drawer opsi gear dengan ekspansi grid-rows + `flex-wrap`, serta target sentuh `min-h-[44px] sm:min-h-0 sm:h-9` pada kontrol form Workspace 1 `Tagihan.jsx`.
3. **Sibling Dialog Stacking `z-[200]` -> `z-[210]`:**
   - Memindahkan `showSAEditModal` keluar dari dalam container ber-transform Framer Motion milik `#preview-modal` menghindarkan jebakan *containing block* CSS `transform` dan menjamin urutan `Escape`: `.swal2-container` -> `lightbox-dialog` -> `lightbox`.
4. **Pure Slate, Zero Raw Emoji, & Strict Service Layer:**
   - Seluruh 22 token `gray-*` di `PreviewDokumen.jsx`, spinner CSS polos (`<Loader2>`), dan emoji mentah (`⚠️`, `✏️`, `⚡`) dibersihkan ke token Pure Slate + ikon `lucide-react`. Seluruh HTTP call dipindahkan ke `laporanService.getRekap` dan `financeService`.

---

## 5. Snippet Minimal Siap Pakai

```jsx
import { AnimatePresence, motion } from 'framer-motion';
import { SynapseModal } from '@/components/ui/motion';

<>
  <AnimatePresence onExitComplete={() => { setPortalLocked(false); onExitComplete?.(); }}>
    {isOpen && (
      <motion.div
        id="preview-modal"
        data-synapse-tier="lightbox"
        className="fixed inset-0 z-[200] flex items-center justify-center bg-slate-950/75 backdrop-blur-sm p-2 sm:p-4 print:static print:p-0 print:bg-white print:block print:animate-none"
      >
        <motion.div className="bg-slate-100 w-full max-w-[95vw] h-full max-h-[95vh] rounded-xl flex flex-col overflow-hidden print:w-full print:h-auto print:max-h-none print:shadow-none print:bg-white print:transform-none">
          {/* Paper A4 / Landscape Print Content */}
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>

  <SynapseModal isOpen={Boolean(isOpen && showSAEditModal)} onClose={() => setShowSAEditModal(false)} tier="lightbox-dialog" mobileSheet maxWidth="max-w-md">
    {/* Form Edit Nomor SA */}
  </SynapseModal>
</>
```

---

## 6. Checklist Pengujian & Guardrail Wajib

- [x] `PreviewDokumen` + sibling `showSAEditModal` mematuhi *Layer-Aware Escape Guard*, body scroll lock, serta tetap fungsional saat `prefers-reduced-motion: reduce` aktif (`test_Tagihan_bast_shadcn.test.jsx`).
- [x] `ReLinkModal` memakai `<SynapseModal tier="primary" mobileSheet>` dengan *Escape guard* terhadap `.swal2-container` dan role `manager` terkunci pada tab `history` (`test_Tagihan_bast_shadcn.test.jsx`).
- [x] `RekonsiliasiSot` Stage 1 -> Stage 2 dan filter status berjalan mulus di `prefers-reduced-motion: reduce` serta memblokir dropzone untuk role `manager` (`test_RekonsiliasiSot_shadcn.test.jsx`).
- [x] Guardrail #17 (`test_guardrail_motion_primitives.py`) mengunci `Tagihan.jsx`, `RekonsiliasiSot.jsx`, `PreviewDokumen.jsx`, `useTagihanStore.js`, `SynapseModal.jsx`, dan `ResponsiveLayout.jsx`.

