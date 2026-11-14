/**
 * Verified Page Preset #02: Dashboard KPI Bento & Mobile Anti-Clipping Guard
 * Source audit: FleetLink V2 `frontend/src/pages/Dashboard.jsx` & `ResponsiveLayout.jsx`
 *
 * Exportable timing & responsive layout invariants for analytics dashboards.
 */
export const dashboardKpiPreset = {
  id: '02-dashboard-kpi',
  title: 'Dashboard KPI Bento & Chart Choreography',
  sourceRef: 'docs/synapse-motion/pages/02-dashboard-kpi.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['KpiSkeleton', 'ChartSkeleton', 'TableSkeleton'],
    motionPrimitives: ['AnimatedNumber', 'SynapseDissolve', 'SynapseStagger', 'Disclosure', 'TextMorph'],
  },

  // Initial mount vs reactive filter refresh continuity
  loadingContinuity: {
    splitInitialVsRefreshing: true,
    refreshingDimClass: 'opacity-65 pointer-events-none transition-opacity duration-200',
    kpiSkeletonMinHeightClass: 'min-h-[136px] sm:min-h-[140px]',
  },

  // KPI number interpolation & typography scale
  kpi: {
    spring: { stiffness: 200, damping: 24, mass: 0.6 },
    mobileCurrencyScaleClass: 'text-base min-[390px]:text-lg sm:text-2xl',
    footerMobileStackClass: 'flex flex-col items-start gap-1 sm:flex-row sm:items-center sm:gap-1.5',
    pillBadgeNoWrapClass: 'whitespace-nowrap shrink-0',
    periodTextClass: 'truncate max-w-full',
  },

  // Area vs Bar chart switcher
  chart: {
    tabLayoutId: 'dashboardChartTab',
    tabSpring: { type: 'spring', stiffness: 380, damping: 32 },
    dissolveMinHeightClass: 'min-h-[280px]',
  },

  // EWS & Live Feed tables
  table: {
    rowComponent: 'tr',
    delayStepMs: 35,
    maxIndex: 8,
  },

  // Shell topbar anti-clipping invariants (~360px viewport)
  topbarMobileInvariants: {
    leftWrapperClass: 'min-w-0 flex-1 md:flex-initial',
    companyChipClass: 'min-w-0 flex-1 sm:flex-initial max-w-[140px] sm:max-w-[200px]',
    utilityIconMobileSizeClass: 'w-9 h-9',
    bellPopoverMobileOffsetClass: '-right-[88px] sm:right-0',
  },
};

export default dashboardKpiPreset;

