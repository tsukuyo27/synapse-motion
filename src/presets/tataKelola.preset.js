/**
 * Verified Page Preset #07: Pilar Tata Kelola (SISTEM)
 * Source audit: FleetLink V2 `AdminHub.jsx`, `Users.jsx`, `KpiReliabilityTab.jsx`, `ActivityLogs.jsx`,
 * `LoginLogs.jsx`, `GeneratorNomor.jsx`, `EwsDashboard.jsx`, `MasterConfig.jsx`, `CronJobManager.jsx`,
 * `FeatureTogglesManager.jsx`, `FinanceConfigManager.jsx`, `OperationalConfigManager.jsx`,
 * `GeneralConfigManager.jsx`, `DocumentTemplateManager.jsx`, & `ResponsiveLayout.jsx`.
 *
 * Exportable multi-workspace motion, Dual TableSkeleton, Disclosure telemetry/timeline,
 * spring layoutId category pills, and RBAC Pure Slate hardening tokens.
 */
export const tataKelolaPreset = {
  id: '07-tata-kelola',
  title: 'Pilar Tata Kelola (SISTEM): AdminHub, SLA Reliability, Audit & Login Logs, Arsip Surat, EWS, & Master Config',
  sourceRef: 'docs/synapse-motion/pages/07-tata-kelola.md',

  components: {
    shadcnSynapse: ['KpiSkeleton', 'CardSkeleton', 'TableSkeleton', 'useBodyScrollLock'],
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
    tableSkeletonDesktopRows: 5,
    tableSkeletonMobileRows: 3,
    masterConfigCardSkeletonCount: 4,
  },

  navigationAndTabs: {
    subRibbonDesktopLayoutId: 'subribbon-desktop-pill',
    subRibbonMobileLayoutId: 'subribbon-mobile-pill',
    auditSubViewLayoutId: 'audit-logs-subview-pill',
    masterConfigCategoryLayoutId: 'master-config-category-pill',
    cronFilterLayoutId: 'cron-category-filter-pill',
    docTemplateProjectLayoutId: 'doc-template-project-pill',
    springTransition: { type: 'spring', stiffness: 420, damping: 32 },
    autoScrollTopOnTabSwitch: true,
    horizontalRibbonFadeMask: true,
    autoScrollActiveTabIntoView: true,
  },

  dataViewsAndTelemetry: {
    desktopRowTransition: { as: 'tr', delayStep: 35, maxIndex: 8, omitFilterBlur: true },
    cardTransition: { delayStep: 35, maxIndex: 8, direction: 'up' },
    disclosureTelemetryAndTimeline: ['KpiReliabilityTab', 'ActivityLogs', 'CronJobManager'],
    chartXAxisInterval: 'preserveStartEnd',
    adaptiveChartYAxis: {
      query: '(max-width: 640px)',
      mobile: { leftWidth: 38, rightWidth: 34, margin: { top: 10, right: 2, left: -6, bottom: 0 } },
      desktop: { leftWidth: 44, rightWidth: 40, margin: { top: 10, right: 8, left: -12, bottom: 0 } },
    },
    timezoneInvariant: 'Asia/Jakarta',
  },

  modalsAndFeedback: {
    tier: 'primary',
    mobileSheet: true,
    deferredPostExitResetMs: 260,
    escapeGuards: ['.swal2-container'],
    swalButtonsStyling: false,
    loadingIndicator: 'Loader2',
    reduceMotionCutoffForbidden: true,
  },

  mobileAndSecurityConstraints: {
    touchTargetMinHeightClass: 'min-h-[44px]',
    infoTriggerTouchClass: 'min-h-[44px] min-w-[44px] sm:min-h-[32px] sm:min-w-[32px]',
    financePresetGridClass: 'grid-cols-2 sm:grid-cols-4 gap-2',
    autofillSafeIconClass: 'z-10',
    iosNoZoomInputFontClass: 'text-base sm:text-xs',
    zeroRawEmoji: true,
    pureSlateOnly: true,
    zeroHardcodedSingleTenantIdentity: true,
    serviceLayerOnly: ['adminService', 'configService', 'kpiService', 'suratService'],
  },
};

export default tataKelolaPreset;

