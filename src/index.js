// Tier 1: Shadcn-Synapse (0-KB CSS / Tailwind + Minimal React Hooks)
export { usePresence, default as usePresenceDefault } from './shadcn-synapse/hooks/usePresence.js';
export { useTimedNavigate, default as useTimedNavigateDefault } from './shadcn-synapse/hooks/useTimedNavigate.js';
export { useBodyScrollLock, default as useBodyScrollLockDefault } from './shadcn-synapse/hooks/useBodyScrollLock.js';
export { KpiSkeleton, default as KpiSkeletonDefault } from './shadcn-synapse/skeletons/KpiSkeleton.jsx';
export { ChartSkeleton, default as ChartSkeletonDefault } from './shadcn-synapse/skeletons/ChartSkeleton.jsx';
export { TableSkeleton, default as TableSkeletonDefault } from './shadcn-synapse/skeletons/TableSkeleton.jsx';
export { CardSkeleton, default as CardSkeletonDefault } from './shadcn-synapse/skeletons/CardSkeleton.jsx';
export { default as synapsePreset } from './shadcn-synapse/config/tailwind.synapse-preset.js';

// Tier 2: Motion Primitives (Framer Motion Physics, Modals & Choreography)
export { SynapseModal, default as SynapseModalDefault } from './motion-primitives/SynapseModal.jsx';
export { SynapseStagger, default as SynapseStaggerDefault } from './motion-primitives/SynapseStagger.jsx';
export { SynapseDissolve, default as SynapseDissolveDefault } from './motion-primitives/SynapseDissolve.jsx';
export { TextScramble, default as TextScrambleDefault } from './motion-primitives/TextScramble.jsx';
export { TransitionPanel, default as TransitionPanelDefault } from './motion-primitives/TransitionPanel.jsx';
export { AnimatedGroup, default as AnimatedGroupDefault } from './motion-primitives/AnimatedGroup.jsx';
export { Disclosure, DisclosureTrigger, DisclosureContent, default as DisclosureDefault } from './motion-primitives/Disclosure.jsx';
export { TextMorph, default as TextMorphDefault } from './motion-primitives/TextMorph.jsx';
export { AnimatedNumber, default as AnimatedNumberDefault } from './motion-primitives/AnimatedNumber.jsx';

// Tier 3: Verified Page Presets
export * from './presets/index.js';
