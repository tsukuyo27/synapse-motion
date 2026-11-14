/**
 * Verified Page Preset #04: Pilar Pengiriman Operasional (Persistent Modal, Popover Spring & Zero Frame-0 Reflow)
 * Source audit: FleetLink V2 `Transaksi.jsx`, `TransaksiFormModal.jsx`, `OwnUseWorksheet.jsx`,
 * `Keekonomian.jsx`, `LaporanRekap.jsx`, `GenerateOwnUseTab.jsx`, `SearchableCombobox.jsx`, & `SynapseModal.jsx`
 *
 * Exportable timing, stacking, and mobile ~360px invariants for transactional dispatch & modal forms.
 */
export const pengirimanOperasionalPreset = {
  id: '04-pengiriman-operasional',
  title: 'Pilar Pengiriman: Persistent Modal Portal, Popover Spring & Zero Frame-0 Reflow',
  sourceRef: 'docs/synapse-motion/pages/04-pengiriman-operasional.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['TableSkeleton', 'KpiSkeleton', 'useBodyScrollLock'],
    motionPrimitives: ['SynapseModal', 'SynapseStagger', 'Disclosure', 'DisclosureContent', 'SynapseDissolve', 'motion.div'],
  },

  // Persistent Framer-Motion SynapseModal choreography
  modal: {
    persistentAnimatePresence: true,
    unlockScrollOnExitComplete: true,
    reduceMotionCutoffForbidden: true,
    desktopSpring: { type: 'spring', stiffness: 320, damping: 28, mass: 0.85, initialY: 28, initialScale: 0.95 },
    mobileSheetSpring: { type: 'spring', stiffness: 360, damping: 30, mass: 0.85, initialY: 48 },
    exitTransition: { duration: 0.22, ease: [0.22, 1, 0.36, 1] },
    backdropEase: { durationIn: 0.22, durationOut: 0.2, ease: [0.22, 1, 0.36, 1] },
    siblingNestingRequired: true,
    escapeGuards: ['.swal2-container', '[data-synapse-tier="nested"]', '[data-synapse-tier="lightbox"]'],
  },

  // Floating combobox & action dropdown popovers
  popover: {
    enterSpring: { type: 'spring', stiffness: 420, damping: 30, mass: 0.75 },
    exitTransition: { duration: 0.14, ease: [0.22, 1, 0.36, 1] },
    reduceMotionCutoffForbidden: true,
  },

  // Frame-0 modal performance invariants
  frameZeroPerformance: {
    deferredFormResetMs: 260,
    memoizeComboboxOptions: true,
  },

  // Conditional alert banners & collapsible analytics charts
  disclosure: {
    banners: ['isScanningOcr', 'qtyOverThresholdWarning', 'multiDropCrossRef'],
    mobileFilterCollapsedBelowMd: true,
  },

  // Table rows & mobile cards
  tableAndCards: {
    desktopSkeletonClass: 'hidden md:block',
    mobileSkeletonClass: 'block md:hidden',
    mobileTouchMinHeightClass: 'min-h-[44px]',
    zeroRawEmoji: true,
  },

  // Runtime mobile ~360px & floating dock hardening (ADR-041)
  liveRuntimeHardening: {
    pairedDateGridMinWidthZero: true,
    customTooltipClampClass: 'max-w-[200px] sm:max-w-xs whitespace-normal break-words',
    customTooltipWrapperMaxWidth: 'calc(100vw - 2.5rem)',
    modelessDockResizeClamp: true,
  },
};

export default pengirimanOperasionalPreset;

