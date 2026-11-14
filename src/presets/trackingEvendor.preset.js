/**
 * Verified Page Preset #06: Pilar Tracking & Rekonsiliasi E-Vendor / Bank MCM
 * Source audit: FleetLink V2 `Tracking.jsx`, `TrackingHudSection.jsx`, `TrackingDetailModal.jsx`, `evendorService.js`, & `ResponsiveLayout.jsx`
 *
 * Exportable motion, KPI refresh continuity, Disclosure HUD, and dual-view SynapseModal tokens.
 */
export const trackingEvendorPreset = {
  id: '06-tracking-evendor',
  title: 'Pilar Tracking: Status Tiket MySAP, PO Burn-Down HUD, & Bukti Kliring Bank MCM',
  sourceRef: 'docs/synapse-motion/pages/06-tracking-evendor.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['KpiSkeleton', 'TableSkeleton', 'useBodyScrollLock'],
    motionPrimitives: [
      'AnimatedNumber',
      'Disclosure',
      'DisclosureTrigger',
      'DisclosureContent',
      'SynapseDissolve',
      'SynapseStagger',
      'SynapseModal',
      'motion.span',
    ],
  },

  // Initial load vs reactive scope/search refresh continuity
  loadingContinuity: {
    splitInitialVsRefreshing: ['showInitialSkeletons', 'isRefreshing'],
    refreshingDimClass: 'opacity-65 pointer-events-none transition-opacity duration-200',
    kpiSkeletonCount: 4,
    tableSkeletonDesktopRows: 5,
    tableSkeletonMobileRows: 3,
    renderSkeletonOutsideTable: true,
  },

  // 4 Bento KPI Cards & Scope Filter Bar (~360px anti-clipping)
  bentoAndFilters: {
    kpiGridClass: 'grid grid-cols-2 lg:grid-cols-4 gap-2.5 sm:gap-4',
    kpiValueScaleClass: 'text-xl min-[390px]:text-2xl font-extrabold tracking-tight',
    kpiFooterStackClass: 'flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-1.5',
    pillNoWrapClass: 'whitespace-nowrap shrink-0',
    mobileFilterGridClass: 'grid grid-cols-2 sm:flex sm:flex-wrap items-center gap-2',
    autofillSafeIconClass: 'top-1/2 -translate-y-1/2 z-10',
    mobileTouchMinHeightClass: 'min-h-[44px] sm:min-h-0 sm:h-9',
  },

  // PO Register Burn-Down HUD & Dual-Axis ComposedChart
  poHudAndCharts: {
    singlePersistentHeaderDisclosure: true,
    mobileCompactSummaryStrip: true,
    poPillRightFadeMask: true,
    poPillTouchClass: 'min-h-[40px] sm:min-h-0 sm:h-7',
    chartSwitcherClass: 'grid grid-cols-2 w-full sm:w-auto sm:inline-flex',
    hudFourPillarGridClass: 'grid grid-cols-1 min-[440px]:grid-cols-2 gap-2.5 sm:gap-3',
    chartTabLayoutId: 'trackingHudChartTab',
    chartTabSpring: { type: 'spring', stiffness: 380, damping: 32 },
    xAxisInterval: 'preserveStartEnd',
    leftYAxisWidthPx: 46,
    rightYAxisWidthPx: 42,
    mobileLeftYAxisWidthPx: 38,
    mobileRightYAxisWidthPx: 34,
    tooltipWrapperStyle: { zIndex: 30, maxWidth: 'calc(100vw - 48px)' },
    emptyStateGuard: true,
  },

  // Desktop table & Mobile card stream
  dataViews: {
    desktopRowTransition: { as: 'tr', delayStep: 35, maxIndex: 8, omitFilterBlur: true },
    mobileCardTransition: { delayStep: 30, maxIndex: 9, direction: 'up' },
    mobileActionMinHeightClass: 'min-h-[44px]',
  },

  // Dual-View SynapseModal (E-Vendor MySAP <-> Bank MCM Mandiri)
  detailModal: {
    tier: 'primary',
    mobileSheet: true,
    maxWidth: 'max-w-2xl',
    deferredPostExitResetMs: 260,
    tabIndicatorLayoutId: 'tracking-detail-tab-indicator',
    tabIndicatorSpring: { type: 'spring', stiffness: 420, damping: 34 },
    forensicEmailDisclosure: true,
    closeButtonMinTouchClass: 'min-h-[44px] min-w-[44px] sm:min-h-[40px] sm:min-w-[40px]',
    bottomSheetSafeAreaClass: 'pb-[max(0.875rem,env(safe-area-inset-bottom))] sm:pb-4',
    rawJsonScrollContainerClass: 'max-h-[44vh] sm:max-h-[50vh] overflow-y-auto',
    escapeGuards: ['.swal2-container'],
    reduceMotionCutoffForbidden: true,
    zeroRawEmoji: true,
    pureSlateOnly: true,
  },
};

export default trackingEvendorPreset;

