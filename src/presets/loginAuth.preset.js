/**
 * Verified Page Preset #01: Auth & Login Choreography (3-Panel Flow)
 * Source audit: FleetLink V2 `frontend/src/pages/Login.jsx` (ADR-035)
 *
 * Exportable configuration tokens & invariants so projects scaffolding Synapse Motion
 * can reference or spread the exact timings directly without guessing.
 */
export const loginAuthPreset = {
  id: '01-login-auth',
  title: 'Auth / Login 3-Panel Choreography',
  sourceRef: 'docs/synapse-motion/pages/01-login-auth.md',

  // Tiers & components used on this archetype
  components: {
    shadcnSynapse: ['useTimedNavigate'],
    motionPrimitives: ['TextScramble', 'TransitionPanel', 'AnimatedGroup', 'Disclosure', 'TextMorph', 'AnimatedNumber'],
  },

  // Panel 0: Boot / First-Load Scramble Loader
  boot: {
    sessionGuardFlag: 'hasLoginBootAnimated', // Module-level flag: only animates once per hard reload
    scrambleDurationSec: 1.0,
    scrambleSpeedSec: 0.04,
    dwellBufferMs: 350,
    progressBarDurationSec: 1.3,
  },

  // Panel 1: Main Form Stagger & Error Choreography
  form: {
    panelTransitionDurationSec: 0.45,
    panelTransitionEase: [0.22, 1, 0.36, 1],
    groupPreset: 'blur-slide',
    groupStaggerSec: 0.06,
    cardErrorShakeX: [0, -6, 5, -4, 3, -1, 0],
    cardErrorShakeDurationSec: 0.38,
    passwordRevealBlurMs: 180,
    passwordToggleTransitionSec: 0.18,
    toastTimerMs: 2000,
  },

  // Panel 2 & Route Exit
  welcomeAndExit: {
    welcomeHoldMs: 1210,
    exitDissolveMs: 400,
    exitBufferMs: 30,
  },

  // Security, Autofill & Mobile Containment Invariants
  invariants: {
    glassCardOverflow: 'overflow-hidden',
    inputIconZIndex: 'z-10',
    forbidIdleInputBlurZero: true,
    backdropBlobMobileWidth: 'w-64 sm:w-96',
    touchTargetMinHeightPx: 44,
    helpDialogPortalRequired: true,
    textMorphRequiresAriaLabel: true,
  },
};

export default loginAuthPreset;

