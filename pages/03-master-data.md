# Preset 03 — Master Data CRUD Hub, Layered Portals & Mobile Sub-Ribbon (`03-master-data`)

> Status: **TERVERIFIKASI** — Pola referensi Master Data CRUD Hub, Sub-Ribbon Baris-2, dan modal bertumpuk multi-lapis (`primary` -> `nested` -> `lightbox`).

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `03-master-data` |
| **JS Config Export** | `masterDataPreset` (`src/presets/masterData.preset.js`) |
| **Arketipe Referensi** | Multi-Tab CRUD Hub, Stacked Modal Portals, & Mobile Sub-Ribbon |
| **Status Verifikasi** | Terverifikasi (ESLint 0 error, Vitest pass, & guardrail statis) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Hooks & Bento Skeletons):**
  - `TableSkeleton` + varian `mobile` → replika 1:1 di desktop (`hidden md:block`) dan mobile (`block md:hidden`) pada ke-5 tabel master, Broadcast Tab, PO Register Tab, dan Ledger Modal.
  - **Ref-counted `useBodyScrollLock`** (`activeScrollLocks`) → menjaga scroll `<body>` tetap terkunci selama modal induk masih aktif meski modal nested/lightbox baru saja ditutup.
- **Dari `motion-primitives/` (`framer-motion`):**
  - `SynapseModal` persisten (`<AnimatePresence onExitComplete>` + `data-synapse-tier={tier}` + *Layer-Aware `Escape` Guard*) → `MasterFormModal` (`tier="primary"`, `z-[100]`) dengan **sibling** `<DocumentScannerModal tier="nested">` (`z-[150]`), `PoRegisterModals` (`tier="nested"`), serta pratinjau foto/dokumen `z-[200]` (`tier="lightbox"`). Bebas keyframe CSS `.animate-pop-in` / `usePresence` agar animasi konsisten di desktop webview.
  - `motion.span layoutId` → `subribbon-desktop-pill` & `subribbon-mobile-pill` (`stiffness: 420, damping: 34`) pada Workspace Baris-2, serta `master-modal-tab` pada bilah tab modal induk.
  - `Disclosure` + `DisclosureContent` → filter proyek & depot SPBU yang terlipat default di mobile (`< 768px`) tanpa memicu *CLS* atau dominasi ruang vertikal.
  - `SynapseStagger` → menggantikan `StaggeredFade` lama untuk wrapper tabel, filter toolbar, Mobile Card Stream (`delayStep={30} maxIndex={9}`), dan daftar mutasi PO ledger modal.

---

## 3. Koreografi & Token Konfigurasi (Patokan Angka)

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Sub-Ribbon Workspace Baris-2** | Pill pegas terpisah desktop vs mobile (`layoutId="subribbon-desktop-pill"` vs `"subribbon-mobile-pill"`, `type: 'spring', stiffness: 420, damping: 34`) + `scrollIntoView({ inline: 'center', block: 'nearest' })` dan *right fade mask* kondisional di mobile. |
| **Filter SPBU Dual-Layer Mobile** | `<SynapseStagger><Disclosure>` dengan `isSpbuFilterOpen` default `window.innerWidth >= 768`, tombol toggle `min-h-[44px]` menampilkan badge jumlah filter aktif, & gradien pudar kanan pada barisan chip. |
| **Tabel & Mobile Card Stream** | `<TableSkeleton />` (`desktop`) + `<TableSkeleton mobile />` (`< md`) saat `isLoading`; kartu mobile memakai `<SynapseStagger delayStep={30} maxIndex={9}>` bebas `filter: blur()`. |
| **Modal Induk + Nested + Lightbox** | Hierarki layer: Topbar `z-50` → Modal Induk `z-[100]` (`role="dialog"`) → Nested (`DocumentScannerModal`, `PoRegisterModals`) `z-[150]` via `SynapseModal tier="nested"` → Lightbox (`MtTable` & `MasterFormModal`) `z-[200]`. Tab internal modal memakai `layoutId="master-modal-tab"`. |

---

## 4. Hardening Bugs, Portal Stacking & Mobile Constraints (~360px)

1. **Kebocoran Scroll & Konflik `Escape` Saat Modal Bertumpuk:**
   - **Penyebab:** `useBodyScrollLock` naif menyetel `body.style.overflow = ''` setiap modal anak unmount; dan listener `Escape` di modal induk ikut menutup modal induk ketika menekan `Escape` pada modal nested / Swal.
   - **Aturan Wajib:** `useBodyScrollLock` WAJIB menggunakan penghitung modul `activeScrollLocks`. `SynapseModal` wajib merender `data-synapse-tier={tier}`, dan listener `Escape` di modal induk wajib mengabaikan event apabila ditemukan `[data-synapse-tier="nested"]`, `[data-synapse-tier="lightbox"]`, atau `.swal2-container`.
2. **Jebakan Tailwind `sticky` + `relative` pada Sub-Ribbon Mobile:**
   - **Aturan Wajib:** Jangan menaruh kelas `relative` pada kontainer yang memakai `sticky top-16`. Letakkan `relative` pada div pembungkus dalam agar efek `sticky` bar mobile tidak gugur dan *fade mask* tetap terposisi benar.
3. **Ergonomi Touch & Kliping Mobile `~360px`:**
   - Semua tombol aksi di kartu mobile tabel, modal footer, filter toggle, dan aksi PO wajib minimal `min-h-[44px]`.
   - Nama terminal panjang wajib diringkas via `formatSupplyPointName(...)`; grid tanggal berpasangan pada modal PO memakai `grid-cols-1 sm:grid-cols-2`; preview gambar OCR mobile dibatasi `h-[34vh] md:h-auto`; dan tombol tutup lightbox di `MasterFormModal` memakai `fixed top-4 right-4 z-[210]`.
   - Seluruh pembaruan API Broadcast wajib melalui `transportirService` (`masterService.js`), bebas `dark:bg-slate-850`, bebas `gray-*`, bebas emoji mentah (`0` Unicode emoji), dan SweetAlert2 wajib `buttonsStyling: false` dengan kelas Pure Slate.

---

## 5. Snippet Minimal Siap Pakai

```jsx
import {
  Disclosure,
  DisclosureContent,
  SynapseModal,
  SynapseStagger,
  masterDataPreset,
} from '@/components/ui/motion';
import { TableSkeleton } from '@/components/ui/Skeletons';

// Nested modal aman bertumpuk di atas MasterFormModal
<SynapseModal isOpen={isOpen} onClose={onClose} tier="nested" maxWidth="max-w-lg">
  {isLoading ? (
    <>
      <div className="hidden md:block"><TableSkeleton rows={4} /></div>
      <div className="block md:hidden"><TableSkeleton rows={4} mobile /></div>
    </>
  ) : (
    items.map((item, idx) => (
      <SynapseStagger
        key={item.id}
        index={idx}
        delayStep={masterDataPreset.tableAndCards.mobileCardStagger.delayStepMs}
        maxIndex={masterDataPreset.tableAndCards.mobileCardStagger.maxIndex}
      >
        {/* Mobile card item */}
      </SynapseStagger>
    ))
  )}
</SynapseModal>
```

---

## 6. Checklist Pengujian & Guardrail Wajib

- [ ] `useBodyScrollLock` tetap menjaga `document.body.classList.contains('overflow-hidden') === true` saat modal lapis kedua ditutup sementara modal induk masih terbuka (`test_MasterData_motion_and_modals.test.jsx`).
- [ ] Filter SPBU di `MasterData.jsx` terlipat default saat `window.innerWidth = 360`, membuka konten saat diklik, bebas emoji mentah & token `gray-*` (`test_MasterData_motion_and_modals.test.jsx`, `test_SpbuTable_filters.test.jsx`).
- [ ] Ketiga modal bersarang PO Register memakai `<SynapseModal tier="nested">` dari `PoRegisterModals.jsx` tanpa `z-[9999]` (`test_TransportirPoRegisterTab.test.jsx`).
- [ ] Broadcast Tab memanggil `transportirService.*Broadcast*` dan menjaga `BROADCAST_METADATA` serta `hidden md:block` / `block md:hidden` (`test_TransportirBroadcastTab.test.jsx`, `test_guardrail_broadcast_contract.py`).
- [ ] Guardrail #17 (`test_guardrail_motion_primitives.py`) lulus untuk seluruh modul Master Data, `useBodyScrollLock`, `SynapseModal`, dan `ResponsiveLayout`.

