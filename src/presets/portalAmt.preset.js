/**
 * Verified Page Preset #08: Portal Driver AMT (Awak Mobil Tangki)
 * Source audit: FleetLink V2 `AmtDashboard.jsx`, `AmtProfile.jsx`, `AmtTransaksi.jsx`,
 * & `ResponsiveLayout.jsx` (AMT Navigation Bar / Bottom Thumb Zone).
 *
 * Exportable mobile-first driver portal motion, 2x2 Bento KPI ~360px,
 * interactive Disclosure EWS, Lightbox SynapseModal z-[200], & Service Layer tokens.
 */
export const portalAmtPreset = {
  id: '08-portal-amt',
  title: 'Portal Driver AMT: Dashboard Performa, Input Surat Jalan, & Profil Dokumen Personal/Armada',
  sourceRef: 'docs/synapse-motion/pages/08-portal-amt.md',

  components: {
    shadcnSynapse: ['KpiSkeleton', 'ChartSkeleton', 'ProfileSkeleton', 'TableSkeleton'],
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

  loadingContinuity: {
    splitInitialVsRefreshing: ['showInitialSkeletons', 'isRefreshing'],
    refreshingDimClass: 'opacity-65 pointer-events-none transition-opacity duration-200',
    renderSkeletonOutsideTable: true,
    tableSkeletonDesktopRows: 4,
    tableSkeletonMobileRows: 3,
    profileMobileSkeletonRows: 4,
  },

  navigationAndTabs: {
    desktopNavLayoutId: 'amt-desktop-nav-pill',
    mobileNavLayoutId: 'amt-mobile-nav-pill',
    profileDocTabLayoutId: 'amt-profile-doc-tab-pill',
    springTransition: { type: 'spring', stiffness: 420, damping: 34 },
  },

  dataViewsAndCharts: {
    kpiGridClass: 'grid-cols-2 gap-2.5 sm:gap-4',
    desktopRowTransition: { as: 'tr', delayStep: 40, maxIndex: 8, omitFilterBlur: true },
    cardTransition: { delayStep: 40, maxIndex: 8, direction: 'up' },
    ewsInteractiveDisclosure: true,
    chartProductColorSsot: 'utils/productColors.getProdColor',
    chartXAxisInterval: 'preserveStartEnd',
    adaptiveChartYAxis: {
      query: '(max-width: 639px)',
      mobileWidth: 32,
      desktopWidth: 42,
    },
    chartLegendFadeMask: true,
    emptyChartGuard: true,
    chartTooltipContainment: {
      allowEscapeViewBox: { x: false, y: true },
      mobileMaxWidth: '210px',
      desktopMaxWidth: '280px',
      wrapperTopMarginClass: 'mt-0 md:-mt-4',
    },
    timezoneInvariant: 'Asia/Jakarta',
  },

  topbarUtilities: {
    touchTargetClass: 'min-h-[44px] min-w-[44px]',
    mobilePopoverClass: 'fixed inset-x-3 top-[4.25rem] sm:inset-x-auto sm:top-auto sm:absolute sm:right-0 sm:mt-3 sm:w-96',
    popoverTransition: { duration: 0.18, ease: [0.22, 1, 0.36, 1] },
    roleAwareNotificationRoute: { amt: '/amt/profile', default: '/admin' },
  },

  modalsAndLightbox: {
    formTier: 'primary',
    formMobileSheet: true,
    lightboxTier: 'lightbox',
    lightboxMobileSheet: false,
    deferredPostExitResetMs: 260,
    safeAreaFooterClass: 'pb-[max(1rem,env(safe-area-inset-bottom))]',
    validationDisclosure: true,
    swalButtonsStyling: false,
    loadingIndicator: 'Loader2',
  },

  mobileAndSecurityConstraints: {
    touchTargetMinHeightClass: 'min-h-[44px]',
    infoTriggerTouchClass: 'min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]',
    autofillSafeIconClass: 'z-10',
    iosNoZoomInputFontClass: 'text-base sm:text-xs',
    zeroRawEmoji: true,
    pureSlateOnly: true,
    serviceLayerOnly: ['amtService', 'mtService', 'adminService'],
  },
};

export default portalAmtPreset;

