<div align="center">

# ⚡ Synapse Motion Framework v2.2 (Clean Modular Architecture)

**Hybrid fluid motion framework for React & Tailwind CSS — cleanly separated into `shadcn-synapse/` (0-KB CSS Engine), `motion-primitives/` (Framer Motion), and `presets/` (Verified Page Blueprints).**  
*Inspired by the rapid, organic signal transmission of biological synapses.*

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Version](https://img.shields.io/badge/Version-2.2.1-indigo.svg)](#)
[![React](https://img.shields.io/badge/React-18%20%7C%2019-61dafb.svg)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-3.4%2B%20%7C%204.0%2B-38bdf8.svg)](https://tailwindcss.com/)
[![Architecture](https://img.shields.io/badge/Folders-shadcn%20%2B%20motion--primitives%20%2B%20presets-emerald.svg)](#)
[![Flicker-Free](https://img.shields.io/badge/Route%20Handoff-Zero--Flicker-emerald.svg)](#)

</div>

---

## 🌟 3-Layer Modular Architecture

Modern web applications suffer when trivial loading skeletons pull heavy JS springs OR when complex form choreography breaks under CSS-only hacks (autofill overlays, mobile horizontal overflow, layout snaps).

**Synapse Motion v2.2** separates source code and configuration cleanly inside `src/`:

1. **`src/shadcn-synapse/` (Zero-Dependency CSS + Shadcn Style)**  
   Pure Tailwind preset, 1:1 geometry skeletons (`KpiSkeleton`, `ChartSkeleton`, `TableSkeleton`, `CardSkeleton`), dan timing/lock hooks (`usePresence`, `useTimedNavigate`, ref-counted `useBodyScrollLock`). **Zero Framer Motion dependency.**
2. **`src/motion-primitives/` (`framer-motion` Choreography & Modals Tier)**  
   Interactive physics, persistent portal modal (`SynapseModal` dengan desktop spring / `mobileSheet` / Layer-Aware `Escape` Guard), & composited primitives (`TextScramble`, `TransitionPanel`, `AnimatedGroup`, `Disclosure`, `TextMorph`, `AnimatedNumber`, `SynapseDissolve`, & table-safe `SynapseStagger`).
3. **`src/presets/` + `pages/` (Verified Page Configuration Matrix)**  
   Battle-tested page blueprints & exportable JS timing configs. **Only audited & tested page archetypes are listed here** — new pages are added incrementally via [`PRESET_AUTHORING_GUIDE.md`](./PRESET_AUTHORING_GUIDE.md).

---

## 📋 Verified Page Presets (Catat & Tambah Bertahap)

| Preset ID | Archetype | Folder Tiers Used | JS Token Export | Blueprint Doc |
| :--- | :--- | :--- | :--- | :--- |
| `01-login-auth` | Auth / Login 3-Panel Choreography (Boot + Form + Welcome + Dialog) | `shadcn-synapse` + `motion-primitives` | `loginAuthPreset` | [`pages/01-login-auth.md`](./pages/01-login-auth.md) |
| `02-dashboard-kpi` | Dashboard KPI Bento, Tab Pill (`layoutId`), & Mobile ~360px Anti-Clip | `shadcn-synapse` + `motion-primitives` | `dashboardKpiPreset` | [`pages/02-dashboard-kpi.md`](./pages/02-dashboard-kpi.md) |
| `03-master-data` | Reference Master Data CRUD Hub, Layered Modals, & Sub-Ribbon Baris-2 (`~360px`) | `shadcn-synapse` + `motion-primitives` | `masterDataPreset` | [`pages/03-master-data.md`](./pages/03-master-data.md) |
| `04-pengiriman-operasional` | Reference Dispatch Ops: Persistent Modal Portal, Popover Spring, & Zero Frame-0 Reflow | `shadcn-synapse` + `motion-primitives` | `pengirimanOperasionalPreset` | [`pages/04-pengiriman-operasional.md`](./pages/04-pengiriman-operasional.md) |
| `05-keuangan-tagihan` | Reference Finance Workspace: Billing Generator, Reconciliation, Archive & A4 Print Lightbox | `shadcn-synapse` + `motion-primitives` | `keuanganTagihanPreset` | [`pages/05-keuangan-tagihan.md`](./pages/05-keuangan-tagihan.md) |
| `06-tracking-evendor` | Reference Tracking Workspace: ERP Status, Budget Burn-Down HUD, & Bank Clearing Audit | `shadcn-synapse` + `motion-primitives` | `trackingEvendorPreset` | [`pages/06-tracking-evendor.md`](./pages/06-tracking-evendor.md) |
| `07-tata-kelola` | Reference Governance Suite: Multi-Workspace RBAC, SLA, Audit Logs, Archive, EWS & Config | `shadcn-synapse` + `motion-primitives` | `tataKelolaPreset` | [`pages/07-tata-kelola.md`](./pages/07-tata-kelola.md) |
| `08-portal-amt` | Reference Field/Driver Portal (`~360px`): KPI Bento, Mobile Entry, & Document Lightbox | `shadcn-synapse` + `motion-primitives` | `portalAmtPreset` | [`pages/08-portal-amt.md`](./pages/08-portal-amt.md) |

> [!NOTE]
> Ingin menambahkan patokan untuk halaman baru (mis. Dashboard, Data Table, Tracking)? Ikuti template baku di [`PRESET_AUTHORING_GUIDE.md`](./PRESET_AUTHORING_GUIDE.md) setelah halaman tersebut selesai dievaluasi dan teruji.

---

## 🚀 Quickstart (Installation)

Following the **Shadcn UI philosophy**, Synapse Motion is distributed via copy-paste scaffolding so Tailwind CSS can compile the utility classes directly within your project.

### Step 1: Copy Components to Your Project
In your project terminal (React + Vite + Tailwind CSS), run:

```bash
npx degit tsukuyo27/synapse-motion/src src/components/ui/motion
```

*(Optional for Tier 2 Motion Primitives)* Install `framer-motion`:

```bash
npm install framer-motion
```

### Step 2: Register the Tailwind Preset
Add the Synapse preset into your `tailwind.config.js`:

```javascript
// tailwind.config.js
import synapsePreset from './src/components/ui/motion/shadcn-synapse/config/tailwind.synapse-preset.js';

/** @type {import('tailwindcss').Config} */
export default {
  presets: [synapsePreset],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

---

## 💡 Usage Examples

> [!TIP]
> **Import Path**: Examples below use the standard `@/components/ui/motion` alias. If your project doesn't have path aliases configured, simply use relative paths, e.g. `import { ... } from './src/components/ui/motion';`.

### 1. Staggered Cascade Lists (`SynapseStagger`)
Create domino-style waterfall card entrances with sequential dynamic delays:

```jsx
import { SynapseStagger } from '@/components/ui/motion';

export function ProjectGrid({ projects }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      {projects.map((project, index) => (
        <SynapseStagger key={project.id} index={index} delayStep={65} direction="up">
          <ProjectCard data={project} />
        </SynapseStagger>
      ))}
    </div>
  );
}
```

---

### 2. Zero-Dependency Modal with Exit Transitions (`SynapseModal`)
An accessible dialog with backdrop-blur and spring scaling that smoothly animates both on **entrance and exit**:

```jsx
import { useState } from 'react';
import { SynapseModal } from '@/components/ui/motion';

export function SettingsDialog() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl active:scale-95 transition-transform"
      >
        Open Settings
      </button>

      <SynapseModal 
        isOpen={isOpen} 
        onClose={() => setIsOpen(false)} 
        title="Account Preferences"
      >
        <p className="text-slate-600 dark:text-slate-300">
          This modal animates in with pop-in and exits smoothly with zoom-out!
        </p>
      </SynapseModal>
    </>
  );
}
```

---

### 3. Custom Unmount Presence Engine (`usePresence`)
Need to animate your own custom drawer, banner, or popover on exit without `framer-motion`?

```jsx
import { usePresence } from '@/components/ui/motion';

export function CustomDrawer({ isOpen, onClose }) {
  const { shouldRender, isClosing } = usePresence(isOpen, 200);

  if (!shouldRender) return null;

  return (
    <aside className={`fixed right-0 top-0 h-full w-80 bg-white shadow-2xl transition-all ${
      isClosing ? 'animate-fade-out translate-x-full' : 'animate-fade-in translate-x-0'
    }`}>
      <button onClick={onClose}>Close</button>
      <p>Drawer Content</p>
    </aside>
  );
}
```

---

### 4. Zero-Flicker Route Transitions (`useTimedNavigate`)
Eliminates white flashes and mid-flight cutoffs when switching routes:

```jsx
import { useNavigate } from 'react-router-dom';
import { useTimedNavigate } from '@/components/ui/motion';

export function LoginCard() {
  const navigate = useNavigate();
  const { isDissolving, timedNavigate } = useTimedNavigate(navigate, 200, 20);

  const handleLoginSuccess = () => {
    // Fades out the current view smoothly, waits +20ms safety buffer, then navigates
    timedNavigate('/dashboard');
  };

  return (
    <div className={`transition-opacity duration-200 ${isDissolving ? 'opacity-0' : 'opacity-100'}`}>
      <button onClick={handleLoginSuccess}>Sign In</button>
    </div>
  );
}
```

---

### 5. Fluid Views & Tab Soft-Rise (`SynapseDissolve`)
Switch between tabs or views smoothly with vertical soft-rise and zero snap-cuts:

```jsx
import { useState } from 'react';
import { SynapseDissolve } from '@/components/ui/motion';

export function TabbedInterface() {
  const [activeTab, setActiveTab] = useState('overview');

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <button onClick={() => setActiveTab('overview')}>Overview</button>
        <button onClick={() => setActiveTab('analytics')}>Analytics</button>
      </div>

      <SynapseDissolve activeKey={activeTab}>
        {activeTab === 'overview' ? <OverviewPanel /> : <AnalyticsPanel />}
      </SynapseDissolve>
    </div>
  );
}
```

---

### 6. 1:1 Modular Atomic Skeletons
Eliminate Cumulative Layout Shift (CLS) by matching live content geometry 1:1:

```jsx
import { KpiSkeleton, ChartSkeleton, TableSkeleton, CardSkeleton } from '@/components/ui/motion';

export function AnalyticsDashboard({ isLoading, data }) {
  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          <KpiSkeleton /><KpiSkeleton /><KpiSkeleton /><KpiSkeleton />
        </div>
        <ChartSkeleton />
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return <ActualDashboardContent data={data} />;
}
```

---

## 🧩 7. v2.0 Hybrid Motion Primitives & Enterprise Recipes

### Motion Primitives Suite (`framer-motion` Peer)

| Primitive | Purpose | Built-in Safety Invariant |
| :--- | :--- | :--- |
| `TextScramble` | Progressive character reveal for boot screens / status headers | Use module-level session flag (e.g. `hasBootAnimated`) so repeat visits stay instant |
| `TransitionPanel` | Multi-step / 3-Panel Auth / wizard switcher (`AnimatePresence mode="popLayout"`) | Wrap container with `overflow-hidden` to block mobile horizontal bleed |
| `AnimatedGroup` | Staggered entrance (`fade`, `slide`, `scale`, `blur-slide`) | Avoid `filter: blur(...)` on `<tr>` table elements (use `SynapseStagger as="tr"`) |
| `Disclosure` | Smooth collapsible validation errors & inline alerts (`height: 0 <-> auto`) | Keeps zero CLS without layout snap |
| `TextMorph` | Character-by-character morphing labels inside action buttons | Wrap/apply stable `aria-label` so screen readers and Vitest `getByRole` stay deterministic |
| `AnimatedNumber` | Spring-interpolated numeric counters (`tabular-nums`) | Ideal for KPI cards & live financial balances |

### Battle-Tested Production Recipes (Lessons Learned)

1. **Autofill-Immune Input Icons (`z-10` Layering):**
   Chrome/Edge `:-webkit-autofill` paints its fill overlay above `z-0`, hiding absolute left/right icons inside `<input>` wrappers. Always add explicit `z-10` to left icon containers and right toggle buttons:
   ```jsx
   <div className="relative">
     <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none z-10">
       <Lock className="h-4 w-4 text-slate-400" />
     </div>
     <input type="password" className="w-full pl-10 pr-10 ..." />
     <button type="button" className="absolute inset-y-0 right-0 pr-3.5 z-10" aria-label="Toggle visibility">
       <Eye className="h-4 w-4" />
     </button>
   </div>
   ```

2. **3-Panel Auth Choreography (`TextScramble` + `TransitionPanel` + Morphing Dialog):**
   Combine `TransitionPanel` for `boot -> auth -> welcome`, `Disclosure` for validation feedback, `TextMorph` on the submit button, and a `createPortal(..., document.body)` dialog with `Escape` key handler + body scroll lock for secondary help modals.

3. **Reduced Motion Without Global `* { 0.01ms !important }` or Webview `0.01s` Modal Cutoffs:**
   Never inject `* { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }` inside `@media (prefers-reduced-motion: reduce)`, and avoid `useReducedMotion()` `0.01s` cutoffs or CSS keyframe modal shells (`usePresence` + `.animate-pop-in`) on primary modals & popovers — desktop webviews often report `reduce` and will silently kill modal transitions. Let `SynapseModal` (`<AnimatePresence onExitComplete>` persistent portal) deliver consistent spring motion.
4. **Sibling Multi-Layer Portals, Layer-Aware `Escape`, & Zero Frame-0 Stall:**
   Keep `nested` (`z-[150]`), `lightbox` (`z-[200]`), and `lightbox-dialog` (`z-[210]`) portals as **siblings** outside `<SynapseModal tier="primary">`, release ref-counted `useBodyScrollLock` only in `onExitComplete`, defer heavy form or read-only tab state resets (`bankAudit`, `modalItem`) until after modal exit (`~260ms`), and memoize large combobox option lists.
5. **Dual `<TableSkeleton />` Outside `<table>`, Burn-Down HUD, Recharts Mobile `YAxis`, & Bottom-Sheet Safe Area (`06-tracking-evendor`):**
   Never render `<div>`-based `<TableSkeleton />` inside `<tbody>` — place `<TableSkeleton rows={5} />` (`hidden md:block`) and `<TableSkeleton rows={3} mobile />` (`block md:hidden`) cleanly outside `<table>`. In collapsible `<Disclosure>` HUD hubs, expose a compact mobile summary strip (`< md`) when collapsed, prevent large-currency truncation with `grid-cols-1 min-[440px]:grid-cols-2`, tighten mobile dual `YAxis` widths (`38px`/`34px` via `matchMedia`), use `pb-[max(0.875rem,env(safe-area-inset-bottom))]` on `mobileSheet` footers, and bound scrollable `<pre>` JSON panels (`max-h-[44vh]`).
6. **Multi-Workspace Governance RBAC, Snapshot Secret Redaction, & iOS Safari Anti-Auto-Zoom (`07-tata-kelola`):**
   Lock admin sub-ribbon visibility cleanly via role guards + `403` fallback cards, redact sensitive JSON audit diff keys (`password`, `token`, `secret`, `pin`, `nik`) to `"[REDACTED]"`, use `text-base sm:text-xs` on interactive `<input>`/`<select>` filter/search bars to block iOS Safari auto-zoom, split 4-item preset grids (`grid-cols-2 sm:grid-cols-4 gap-2`), and ensure `<Info />` / modal close buttons maintain `min-h-[44px] min-w-[44px]` on mobile touch screens.
7. **Mobile-First Field Portal `~360px`, Interactive Status `<Disclosure>`, & Lightbox Portal (`08-portal-amt`):**
   Keep key metrics visible above the fold with a 2×2 mobile KPI grid (`grid-cols-2`), bind timezone-safe selectors with iOS anti-zoom `text-base sm:text-xs`, replace hover-only info tooltips with clickable `<Disclosure>` panels (`min-h-[44px]` trigger), render document previews via `<SynapseModal tier="lightbox" mobileSheet={false}>` with 260ms deferred state cleanup, and separate desktop vs bottom-thumb `layoutId` spring pills.
8. **Paired `<input type="date">` Grid `min-w-0`, Tooltip Clamp `~360px`, & Floating Dock Resize Clamp (`04-pengiriman-operasional`):**
   When placing two `<input type="date" className="text-base sm:text-xs ...">` fields inside `grid-cols-[1fr_auto_1fr]` or `flex-1` containers, always attach `min-w-0` to both the grid/flex wrappers and `<input type="date">` elements so browser intrinsic picker widths do not force horizontal overflow beyond `360px`. Clamp custom Recharts `<Tooltip>` panels with `allowEscapeViewBox={{ x: false, y: true }}`, `max-w-[200px] sm:max-w-xs whitespace-normal break-words`, and `wrapperStyle={{ maxWidth: 'calc(100vw - 2.5rem)', zIndex: 30 }}`. For draggable/modeless floating docks, share one `clampModalPosition` helper between pointer drag and a `window.resize` listener attached while `isOpen === true`.

---

## ⏱️ Mathematical Timing & Invariants

| Token Identifiers | Duration | Easing Curve | Target Visual Scenario |
| :--- | :--- | :--- | :--- |
| `SYNAPSE_PRESS` | 100 ms | `ease-out` | Tactile touch/click response (`active:scale-95`) |
| `SYNAPSE_POP` | 250 ms | `cubic-bezier(0.175, 0.885, 0.32, 1.275)` | Dialog pop-in entrance spring |
| `SYNAPSE_FADE_IN` | 200 ms | `cubic-bezier(0, 0, 0.2, 1)` | Elements entering the viewport |
| `SYNAPSE_FADE_OUT` | 180 ms | `cubic-bezier(0.4, 0, 1, 1)` | Elements unmounting / exiting |
| `SYNAPSE_DISSOLVE` | 200 ms | `cubic-bezier(0.4, 0, 0.2, 1)` | Skeleton to live content morph |
| `SYNAPSE_NAV_BUFFER` | 220 ms | `linear` | Route navigate timeout ($200\text{ms} + 20\text{ms}$) |
| `SYNAPSE_STAGGER_STEP`| 65 ms | `linear` | Incremental delay per child in waterfall |
| `SYNAPSE_SHAKE` | 380 ms | `cubic-bezier(0.36, 0.07, 0.19, 0.97)` | Input error feedback vibration |

---

## 📁 Repository Structure

```text
synapse-motion/
├── LICENSE                              # MIT License
├── PRESET_AUTHORING_GUIDE.md            # Standard template for adding audited pages via `/learn`
├── README.md                            # Architecture overview, Quickstart & Page Preset Index
├── package.json                         # v2.2.1 Metadata & Optional framer-motion Peer
├── pages/                               # Verified human+AI reference page blueprints
│   ├── 01-login-auth.md                 # Auth / Login 3-Panel Choreography recipe
│   ├── 02-dashboard-kpi.md              # Dashboard KPI Bento & Mobile ~360px recipe
│   ├── 03-master-data.md                # Master Data CRUD Hub & Stacked Portals recipe
│   ├── 04-pengiriman-operasional.md     # Dispatch Persistent Modal, Date Grid & Popover Spring recipe
│   ├── 05-keuangan-tagihan.md           # Billing Generator, Reconciliation, Archive & Print Lightbox recipe
│   ├── 06-tracking-evendor.md           # Tracking Status, Burn-Down HUD & Clearing Audit recipe
│   ├── 07-tata-kelola.md                # Governance Multi-Workspace, RBAC & Config recipe
│   └── 08-portal-amt.md                 # Mobile-First Field Portal ~360px & Lightbox recipe
└── src/
    ├── index.js                         # Unified barrel export (all 3 layers)
    ├── shadcn-synapse/                  # Tier 1: Zero-dependency CSS + Shadcn-style UI
    │   ├── config/
    │   │   └── tailwind.synapse-preset.js
    │   ├── hooks/
    │   │   ├── usePresence.js           # Lightweight non-modal unmount engine (0 KB)
    │   │   ├── useTimedNavigate.js      # Anti-flicker route handoff (+20ms/+30ms buffer)
    │   │   └── useBodyScrollLock.js     # Ref-counted multi-layer scroll lock (classList)
    │   └── skeletons/                   # Atomic 1:1 skeleton primitives
    │       ├── KpiSkeleton.jsx
    │       ├── ChartSkeleton.jsx
    │       ├── TableSkeleton.jsx        # Supports `mobile` card-stream mode
    │       └── CardSkeleton.jsx
    ├── motion-primitives/               # Tier 2: Framer Motion Physics, Modals & Choreography
    │   ├── AnimatedGroup.jsx
    │   ├── AnimatedNumber.jsx           # Spring counter (`tabular-nums`, optional `formatValue`)
    │   ├── Disclosure.jsx
    │   ├── SynapseDissolve.jsx
    │   ├── SynapseModal.jsx             # Persistent AnimatePresence 4-tier portal + mobileSheet + Esc guard
    │   ├── SynapseStagger.jsx           # Table-safe (`as="tr"` omits filter blur)
    │   ├── TextMorph.jsx
    │   ├── TextScramble.jsx
    │   └── TransitionPanel.jsx
    └── presets/                         # Tier 3: Exportable verified page config tokens
        ├── index.js
        ├── loginAuth.preset.js
        ├── dashboardKpi.preset.js
        ├── masterData.preset.js
        ├── pengirimanOperasional.preset.js
        ├── keuanganTagihan.preset.js
        ├── trackingEvendor.preset.js
        ├── tataKelola.preset.js
        └── portalAmt.preset.js
```

---

## 🤝 Contributing

Contributions, feedback, and star ratings are warmly welcome!
1. Fork this repository.
2. Create your feature branch (`git checkout -b feat/smooth-motion`).
3. Commit your changes (`git commit -m 'feat: add elastic spring preset'`).
4. Push to the branch (`git push origin feat/smooth-motion`).
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. Created with ❤️ by [tsukuyo27](https://github.com/tsukuyo27).
