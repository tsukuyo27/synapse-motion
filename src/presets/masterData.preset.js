/**
 * Verified Page Preset #03: Master Data CRUD Hub, Layered Portals & Mobile Sub-Ribbon
 * Source audit: FleetLink V2 `MasterData.jsx`, `ResponsiveLayout.jsx`, & `pages/components/master/*` (ADR-036)
 *
 * Exportable timing, stacking, and mobile ~360px invariants for multi-tab CRUD modules.
 */
export const masterDataPreset = {
  id: '03-master-data',
  title: 'Master Data CRUD Hub & Layered Modals',
  sourceRef: 'docs/synapse-motion/pages/03-master-data.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['TableSkeleton', 'useBodyScrollLock'],
    motionPrimitives: ['SynapseModal', 'SynapseStagger', 'Disclosure', 'DisclosureContent', 'SynapseDissolve', 'motion.span'],
  },

  // Sub-Ribbon Baris-2 navigation pill choreography
  subRibbon: {
    desktopLayoutId: 'subribbon-desktop-pill',
    mobileLayoutId: 'subribbon-mobile-pill',
    spring: { type: 'spring', stiffness: 420, damping: 34 },
    mobileStickyContainerTrapFix: 'Keep sticky on outer shell, place relative + right fade mask on inner wrapper',
  },

  // Internal modal tab bar choreography
  modalTabs: {
    layoutId: 'master-modal-tab',
    spring: { type: 'spring', stiffness: 400, damping: 32 },
  },

  // Mobile Card Stream & Table Skeletons
  tableAndCards: {
    desktopSkeletonClass: 'hidden md:block p-6',
    mobileSkeletonClass: 'block md:hidden p-4',
    mobileCardStagger: {
      delayStepMs: 30,
      maxIndex: 9,
      blurFreeRows: true,
    },
  },

  // Stacked modal tier z-index & Escape layering
  modalStacking: {
    tiers: {
      primary: 100,
      nested: 150,
      lightbox: 200,
    },
    refCountedScrollLock: true,
    parentEscapeIgnoreSelectors: [
      '[data-synapse-tier="nested"]',
      '[data-synapse-tier="lightbox"]',
      '.swal2-container',
    ],
  },

  // Mobile ~360px touch & clipping constraints
  mobileInvariants: {
    minTouchHeightClass: 'min-h-[44px]',
    collapsibleFilterDefaultOpenBelowMd: false,
    ocrMobilePreviewMaxHeightClass: 'h-[34vh] md:h-auto',
    lightboxCloseButtonClass: 'fixed top-4 right-4 z-[210]',
    dateGridClass: 'grid-cols-1 sm:grid-cols-2',
  },
};

export default masterDataPreset;

