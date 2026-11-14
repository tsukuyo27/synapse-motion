/**
 * Verified Page Preset #05: Pilar Keuangan (BAST Generator, Rekonsiliasi SOT, Arsip Invoice, & Lightbox Cetak)
 * Source audit: FleetLink V2 `Tagihan.jsx`, `RekonsiliasiSot.jsx`, `PreviewDokumen.jsx`, `useTagihanStore.js`, & `ResponsiveLayout.jsx`
 *
 * Exportable motion, lightbox stacking, print-safety, and ~360px mobile ergonomics tokens for billing & document preview workspaces.
 */
export const keuanganTagihanPreset = {
  id: '05-keuangan-tagihan',
  title: 'Pilar Keuangan: BAST Generator, Rekonsiliasi SOT, Arsip Invoice & Lightbox Cetak A4',
  sourceRef: 'docs/synapse-motion/pages/05-keuangan-tagihan.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['TableSkeleton', 'TagihanSummarySkeleton', 'useBodyScrollLock'],
    motionPrimitives: ['SynapseDissolve', 'SynapseStagger', 'SynapseModal', 'Disclosure', 'DisclosureContent', 'AnimatedNumber', 'AnimatePresence', 'motion.div'],
  },

  // Print-safe persistent Lightbox + sibling Lightbox-Dialog choreography
  lightboxAndModals: {
    previewLightbox: {
      tier: 'lightbox',
      zIndexClass: 'z-[200]',
      persistentAnimatePresence: true,
      unlockScrollOnExitComplete: true,
      printSafetyClasses: 'print:static print:inset-auto print:p-0 print:bg-white print:block print:h-auto print:overflow-visible print:animate-none print:transform-none',
      preservedPaperSizes: {
        portraitA4: 'w-[210mm] min-h-[297mm]',
        landscape: 'w-[297mm] min-h-[210mm]',
      },
      tabBarRightFadeMask: true,
      tabTransition: {
        indicatorLayoutId: 'preview-dokumen-tab-indicator',
        spring: { stiffness: 420, damping: 34 },
        paperMotionClass: 'paper-motion-frame',
        paperMotionDurationSec: 0.24,
        omitBlurOnPaper: true,
        printResetClasses: 'print:block print:transform-none print:opacity-100',
      },
      mobilePreviewZoom: {
        breakpointMaxPx: 639,
        modes: ['fit', 'actual'],
        minScale: 0.26,
        printStylesheetReset: '#print-area, .paper-motion-frame { zoom: 1 !important; opacity: 1 !important; transform: none !important; }',
      },
      singleDomGridRowDrawer: true,
    },
    saEditSiblingDialog: {
      tier: 'lightbox-dialog',
      zIndexClass: 'z-[210]',
      mobileSheet: true,
      siblingOutsideLightbox: true,
    },
    reLinkPoModal: {
      tier: 'primary',
      zIndexClass: 'z-[100]',
      mobileSheet: true,
      deferredStateResetMs: 260,
    },
    escapeGuards: ['.swal2-container', '[data-synapse-tier="lightbox-dialog"]'],
    reduceMotionCutoffForbidden: true,
  },

  // Live financial HUD & collapsible adjustment blocks
  generatorHud: {
    summaryDissolve: true,
    animatedNumbers: ['total_kl', 'previewDpp', 'previewDppNet', 'previewGrandTotal'],
    disclosureBlocks: ['is_over_limit', 'keterangan_adjustment'],
    autofillSafeIconZIndex: 'z-10',
  },

  // Reconciliation SOT Stage 1 -> 2 & History ledger continuity
  dataTablesAndCards: {
    desktopSkeletonClass: 'hidden md:block',
    mobileSkeletonClass: 'block md:hidden',
    initialVsRefreshSeparation: ['showInitialSkeletons', 'isRefreshingHistory'],
    desktopRowTransition: { as: 'tr', delayStep: 30, maxIndex: 8, omitFilterBlur: true },
    mobileCardTransition: { delayStep: 30, maxIndex: 9 },
    mobileTouchMinHeightClass: 'min-h-[44px] sm:min-h-0 sm:h-9',
    autofillSafeIconClass: 'top-1/2 -translate-y-1/2 z-10',
    zeroRawEmoji: true,
    pureSlateOnly: true,
  },
};

export default keuanganTagihanPreset;

