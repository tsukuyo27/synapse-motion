# Preset 01 — Auth & Login Choreography (`01-login-auth`)

> Status: **TERVERIFIKASI** — Pola referensi teruji pada halaman Login 3-Panel (`Login.jsx`, `test_Login.jsx` 5/5 passing, & guardrail statis).

---

## 1. Metadata & Sumber Evaluasi

| Atribut | Nilai |
| :--- | :--- |
| **Preset ID** | `01-login-auth` |
| **JS Config Export** | `loginAuthPreset` (`src/presets/loginAuth.preset.js`) |
| **Arketipe Referensi** | 3-Panel Auth Choreography (`Login.jsx` reference pattern) |
| **Kompatibilitas** | Desktop & Mobile (`100dvh`, Notch Safe Area, Dark Mode) |

---

## 2. Arsitektur Layer yang Dipakai

- **Dari `shadcn-synapse/` (0-KB Hooks & Timing):**
  - `useTimedNavigate` → menunda perpindahan rute setelah Panel Sambutan agar page fade-out selesai utuh tanpa kilatan putih (`400ms + 30ms buffer`).
- **Dari `motion-primitives/` (`framer-motion`):**
  - `TextScramble` → animasi boot pembuka (`Memuat...`) pada Panel 0.
  - `TransitionPanel` → perpindahan 3 tahap (`0: Boot` → `1: Form Login` → `2: Kartu Sambutan`).
  - `AnimatedGroup` (`preset="blur-slide"`) → entri bertahap elemen formulir di Panel 1.
  - `Disclosure` + `DisclosureContent` → ekspansi halus pesan error API, validasi kosong, & indikator Caps Lock.
  - `TextMorph` → perubahan teks tombol submit (`MASUK KE SISTEM` → `MEMVERIFIKASI...` → `BERHASIL`).
  - `AnimatedNumber` → angka latensi server (`ms`) di footer status ping.

---

## 3. Koreografi & Token Konfigurasi

| Fase | Mekanisme & Konfigurasi Baku |
| :--- | :--- |
| **Panel 0 (Boot Loader)** | `TextScramble duration={1.0} speed={0.04}` + **dwell buffer `350ms`** pada `onScrambleComplete` + bar progres `1.3s`. Wajib di-gate flag modul `hasLoginBootAnimated` agar saat SPA logout tidak memutar ulang boot screen. |
| **Panel 1 (Form Login)** | `TransitionPanel` horizontal (`0.45s`, `ease: [0.22, 1, 0.36, 1]`), anak form memakai `AnimatedGroup preset="blur-slide" stagger={0.06}`. |
| **Toggle Kata Sandi** | Ikon `Eye`/`EyeOff` pakai `AnimatePresence mode="wait"` (`0.18s`), input flash micro-blur `180ms`, dan `whileTap={{ scale: 0.84 }}`. |
| **Feedback Error** | `motion.div` kartu kaca bergetar horizontal `x: [0, -6, 5, -4, 3, -1, 0]` (`0.38s`) + `Disclosure` untuk menampilkan error di bawah field terkait. |
| **Panel 2 (Welcome & Exit)** | Kartu sambutan dinamis 1-baris ditahan `1210ms`, lalu seluruh halaman exit dissolve (`opacity: 0, scale: 0.985, filter: blur(4px)`, `0.4s`) dengan buffer `+30ms` sebelum `navigate('/dashboard')`. |

---

## 4. Hardening Bugs, Autofill & Mobile Constraints

1. **Bug Ikon Gembok Hilang Saat Browser Autofill (`z-10` Layering):**
   - **Penyebab:** Lapisan internal `:-webkit-autofill` Chrome/Edge dan kelas `blur-0` pada `<input>` menimpa ikon `User` / `Lock` yang berada di stacking context default (`z-0`).
   - **Aturan Wajib:** Pembungkus ikon kiri **dan** tombol toggle kanan **WAJIB** diberi `z-10`. Dilarang menaruh kelas `blur-0` saat idle pada `<input>`.
2. **Pemotongan Slide Panel di Layar HP (`overflow-hidden`):**
   - **Aturan Wajib:** Kartu pembungkus `TransitionPanel` wajib memiliki `overflow-hidden` agar animasi geser horizontal `±32px` tidak menembus sudut `rounded-3xl` atau menimbulkan *horizontal scroll* di mobile.
3. **Ergonomi Sentuh & Viewport Mobile:**
   - Gunakan `h-[100dvh] overscroll-none` pada shell luar dan `overflow-y-auto overscroll-contain` pada wrapper dalam.
   - Ukuran blob latar responsif (`w-64 h-64 sm:w-96 sm:h-96`), minimal area sentuh tombol `>= 44px` (`min-h-[44px]` / `w-11 h-11`).
4. **Morphing Glass Dialog Sekunder (Lupa Kata Sandi):**
   - Wajib dirender via `createPortal(..., document.body)` + `useBodyScrollLock`, menyertakan `role="dialog"`, tombol tutup (`w-9 h-9`), dan event listener keyboard `Escape`.
5. **Aksesibilitas `TextMorph` & Reduced Motion:**
   - Tombol pembungkus `TextMorph` wajib memiliki `aria-label` stabil agar tidak hilang dari `screen reader` dan test `getByRole`.
   - Dilarang memasang `* { animation-duration: 0.01ms !important }` di `@media (prefers-reduced-motion: reduce)` CSS.

---

## 5. Snippet Minimal Pemakaian Preset

```jsx
import {
  TextScramble,
  TransitionPanel,
  AnimatedGroup,
  Disclosure,
  DisclosureContent,
  TextMorph,
  useTimedNavigate,
  loginAuthPreset,
} from '@/components/ui/motion'; // atau dari synapse-motion
```

Gunakan nilai durasi dari `loginAuthPreset.boot.dwellBufferMs` (`350`), `loginAuthPreset.form.groupStaggerSec` (`0.06`), dan `loginAuthPreset.welcomeAndExit.welcomeHoldMs` (`1210`) agar konsisten lintas proyek.

---

## 6. Checklist Pengujian & Guardrail Wajib

- [ ] `waitFor` awal di Vitest menggunakan `{ timeout: 3500 }` untuk melewati fase boot `TextScramble` (`1.0s + 350ms`).
- [ ] Uji toggle kata sandi memverifikasi perubahan `type="password"` ↔ `"text"` serta keberadaan kelas `z-10` di pembungkus ikon input.
- [ ] Uji dialog bantuan memverifikasi pembukaan `role="dialog"` via portal dan penutupannya lewat tombol konfirmasi maupun `Escape`.
- [ ] Uji submit kosong memverifikasi error muncul di dalam `Disclosure` dan hilang saat input diketik ulang.
- [ ] Uji Guardrail statis memastikan keberadaan `hasLoginBootAnimated`, `overflow-hidden`, `z-10`, `createPortal`, dan bebas `blur-0 opacity-100` berlebih.

