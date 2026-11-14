# Preset 04 — Dispatch & Transactional Operations: Persistent Modal Portal, Popover Spring & Zero Frame-0 Reflow (`04-pengiriman-operasional`)

> Status: **TERVERIFIKASI** — Pola referensi halaman operasional & worksheet transaksional (*persistent portal modal*, *floating popover spring*, *paired date grid* `min-w-0`, *tooltip clamp*, dan *modeless floating dock resize clamp*).

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `04-pengiriman-operasional` |
| **JS Config Export** | `pengirimanOperasionalPreset` (`src/presets/pengirimanOperasional.preset.js`) |
| **Arketipe Referensi** | Transactional Table + Heavy Form Modal + Worksheet Charts + Modeless Quick-Capture Dock |
| **Status Verifikasi** | Terverifikasi (ESLint 0 error, Vitest pass, & live `360px` mobile runtime check) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Hooks & Bento Skeletons):**
  - `TableSkeleton` + `KpiSkeleton` -> Dual skeleton desktop & mobile (`hidden md:block` / `block md:hidden`).
  - `useBodyScrollLock` (*ref-counted* `activeScrollLocks`) -> Dikunci segera saat modal dibuka dan baru dilepas saat `onExitComplete` selesai.
- **Dari `motion-primitives/` (`framer-motion`):**
  - `SynapseModal` persisten (`<AnimatePresence onExitComplete>`, desktop spring vs mobile bottom-sheet `mobileSheet`, Layer-Aware `Escape` Guard) -> Modal entri utama (`tier="primary"`) dan modal konfirmasi sibling (`tier="nested"`).
  - `motion.div` + `<AnimatePresence>` -> Floating combobox (`SearchableCombobox`), menu aksi cepat, dan dropdown multi-select.
  - `Disclosure` + `DisclosureContent` -> Banner status validasi, peringatan ambang kapasitas, dan grafik analisis collapsible.
  - `SynapseStagger` (`as="tr"` bebas blur & mobile cards) + `motion.span layoutId` pada sub-tab worksheet.

---

## 3. Koreografi & Token Konfigurasi (Patokan Angka)

| Zona UI | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Modal Desktop (`SynapseModal`)** | Entrance `type: 'spring', stiffness: 320, damping: 28, mass: 0.85` (`y: 28 -> 0, scale: 0.95 -> 1`); Exit `duration: 0.22, ease: [0.22, 1, 0.36, 1]` (`y: 20, scale: 0.96`). |
| **Modal Mobile Bottom-Sheet** | Viewport `< 640px` (`mobileSheet={true}`): `stiffness: 360, damping: 30, mass: 0.85` (`y: 48 -> 0`); Exit `duration: 0.22` (`y: 40`). |
| **Floating Combobox / Popover** | Entrance `type: 'spring', stiffness: 420, damping: 30, mass: 0.75`; Exit `duration: 0.14, ease: [0.22, 1, 0.36, 1]`. |
| **Banner & Grafik `<Disclosure>`** | Tinggi `0 ↔ auto` dengan padding diletakkan di anak `<DisclosureContent>` untuk menghindari gap hantu saat tertutup. |

---

## 4. Hardening Bugs, Desktop Webview Parity & Zero Frame-0 Reflow

1. **Desktop Webview `prefers-reduced-motion: reduce` Cutoff:**
   - **Penyebab:** Memasang `useReducedMotion()` dengan `duration: 0.01` di `SynapseModal` dan floating popover membuat transisi mati instan di *desktop webview* sementara `Login.jsx` & `QuickCaptureModal.jsx` tetap beranimasi.
   - **Aturan Wajib:** **Dilarang** memasang *cutoff* `useReducedMotion()` `0.01s` di `SynapseModal` atau floating popover operasional, dan **dilarang** memakai portal CSS keyframe (`usePresence` + `.animate-pop-in`).
2. **Stall Frame-0 Saat Membuka Form Kompleks:**
   - **Aturan Wajib:** Tunda reset seluruh state form hingga `~260ms` pasca-penutupan (atau sinkronkan hanya saat `isOpen` menjadi `true`) serta gunakan `useMemo` pada transformasi array opsi (`amtOptions`, `spbuOptions`, `produkOptions`) agar klik `+ ENTRI BARU` tidak memicu *main-thread jank* saat animasi spring dimulai.
3. **Sibling Stacking & Layer-Aware `Escape`:**
   - Modal konfirmasi (`tier="nested"`) wajib dirender **setelah penutup `</SynapseModal>` utama** sebagai *sibling portal*. `SynapseModal` pusat otomatis memblokir `Escape` modal induk jika `.swal2-container` atau layer `[data-synapse-tier="nested"|"lightbox"]` terbuka.
4. **Zero Raw Emojis & Timezone Date Helpers:**
   - Seluruh indikator memakai ikon vektor (`lucide-react`) / token Pure Slate (`0` emoji Unicode mentah), dan tanggal default selalu mengacu pada timezone bisnis aplikasi.
5. **Paired `<input type="date">` Grid `min-w-0` & Recharts Tooltip Clamp (`~360px`):**
   - Pasangan dua `<input type="date" className="text-base sm:text-xs ...">` di dalam `grid-cols-[1fr_auto_1fr]` atau `flex-1` WAJIB menyematkan `min-w-0` di wrapper maupun di kedua `<input>` agar lebar intrinsik *date picker* browser tidak melebarkan grid melewati `360px`.
   - Custom `<Tooltip>` pada grafik kategori/single-bar WAJIB memakai `allowEscapeViewBox={{ x: false, y: true }}`, `max-w-[200px] sm:max-w-xs whitespace-normal break-words`, serta `wrapperStyle={{ maxWidth: 'calc(100vw - 2.5rem)', zIndex: 30 }}`.
6. **Floating Modeless Dock Resize Clamp (`window.resize`):**
   - Floating/draggable modeless palette wajib berbagi satu helper `clampModalPosition` antara handler *pointer drag* dan listener `window.resize` (aktif saat `isOpen === true` dengan cleanup bersih) agar dock tidak tertinggal di luar viewport ketika lebar layar mengecil dari desktop ke `~360px`.

---

## 5. Snippet Minimal Siap Pakai

```jsx
import { SynapseModal, Disclosure, DisclosureContent, pengirimanOperasionalPreset } from '@/components/ui/motion';

<>
  <SynapseModal isOpen={isOpen} onClose={onClose} tier="primary" mobileSheet maxWidth="max-w-3xl">
    <Disclosure open={isScanning}>
      <DisclosureContent>
        <div className="mb-3 p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs">
          Memindai dokumen lampiran...
        </div>
      </DisclosureContent>
    </Disclosure>
    {/* Isi form memoized */}
  </SynapseModal>

  {/* Sibling Nested Confirm Modal */}
  <SynapseModal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)} tier="nested" maxWidth="max-w-md">
    {/* Konfirmasi akhir */}
  </SynapseModal>
</>
```

---

## 6. Checklist Pengujian & Guardrail Wajib

- [x] `SynapseModal` tetap terbuka, mengunci scroll, dan menutup bersih (termasuk melepas `overflow-hidden` di `onExitComplete`) meski `window.matchMedia('(prefers-reduced-motion: reduce)')` bernilai `true`.
- [x] Menekan `Escape` saat modal `primary` + `nested` (atau `.swal2-container`) terbuka hanya menutup lapisan teratas.
- [x] `SearchableCombobox` membuka dan menutup popover floating secara bersih menggunakan `AnimatePresence` tanpa `useReducedMotion` cutoff.
- [x] Grid filter tanggal berpasangan dan custom tooltip grafik bebas overflow horizontal pada viewport `~360px`, serta floating modeless dock melakukan re-clamp saat `window.resize`.

