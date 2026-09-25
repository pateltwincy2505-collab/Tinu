/**
 * PrecisionMetrics Industrial Design System & Theme Constants
 * Defines colors, typography, spacing, and component styling tokens.
 * Complies with the Frontend Design Constitution (Anti-Slop, Zero-Pill, Tabular Numbers).
 */

export const THEME_COLORS = {
  // 60% Dominant Canvas & Grounds
  canvas: {
    base: '#F8FAFC', // Slate 50 - clean plant/engineering daylight canvas
    subtle: '#F1F5F9', // Slate 100 - neutral surface & hover fill
    card: '#FFFFFF', // Technical white - crisp surface for spec sheets & cards
    dark: '#0B132B', // Deep industrial midnight slate
  },

  // 30% Structural Surfaces & Metal Hairlines
  slate: {
    50: '#F8FAFC',
    100: '#F1F5F9',
    200: '#E2E8F0', // Hairline 1px border light
    300: '#CBD5E1', // Structural border / technical divider
    400: '#94A3B8', // Muted annotations & unit labels
    500: '#64748B', // Secondary engineering text
    600: '#475569', // Body text secondary
    700: '#334155', // Heavy technical subheaders
    800: '#1E293B', // Structural dark cards & headers
    900: '#0F172A', // Primary industrial brand slate & dark header
    950: '#020617', // Chassis black
  },

  // 10% High-Intent Accents
  // Safety Orange / Precision Amber - Primary Industrial High-Visibility Accent
  safetyOrange: {
    50: '#FFFBEB',
    100: '#FEF3C7',
    200: '#FDE68A',
    300: '#FCD34D',
    400: '#FBBF24',
    500: '#F59E0B',
    600: '#D97706', // Primary Action & High-Vis Orange
    700: '#B45309', // Hover state
    800: '#92400E',
    900: '#78350F',
  },

  // Tech Blue / Instrument Cyan - HART Protocol, Digital Output & CAD Signals
  techBlue: {
    50: '#F0F9FF',
    100: '#E0F2FE',
    200: '#BAE6FD',
    300: '#7DD3FC',
    400: '#38BDF8',
    500: '#0EA5E9',
    600: '#0284C7', // Instrument Digital Accent
    700: '#0369A1',
    800: '#075985',
    900: '#0C4A6E',
  },

  // Semantic Industrial Statuses (Always paired with text / icon)
  status: {
    inStock: {
      text: '#047857', // Emerald 700
      bg: '#ECFDF5', // Emerald 50
      border: '#A7F3D0',
    },
    calibrationVerified: {
      text: '#0369A1', // Sky 700
      bg: '#F0F9FF', // Sky 50
      border: '#BAE6FD',
    },
    buildToOrder: {
      text: '#B45309', // Amber 700
      bg: '#FFFBEB', // Amber 50
      border: '#FDE68A',
    },
    hazardousRated: {
      text: '#BE123C', // Rose 700
      bg: '#FFF1F2', // Rose 50
      border: '#FECDD3',
    },
    discontinued: {
      text: '#64748B', // Slate 500
      bg: '#F1F5F9', // Slate 100
      border: '#E2E8F0',
    },
  },
} as const;

export const THEME_TYPOGRAPHY = {
  fontSans: '"Plus Jakarta Sans", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: '"JetBrains Mono", "IBM Plex Mono", "SF Mono", Menlo, Consolas, monospace',
  
  // Strict hierarchical scale
  display: 'text-3xl lg:text-4xl font-bold tracking-tight text-slate-900',
  h1: 'text-2xl lg:text-3xl font-bold tracking-tight text-slate-900',
  h2: 'text-xl lg:text-2xl font-semibold tracking-tight text-slate-900',
  h3: 'text-base lg:text-lg font-semibold tracking-tight text-slate-900',
  body: 'text-sm text-slate-700 leading-relaxed',
  bodyMuted: 'text-sm text-slate-500 leading-normal',
  kicker: 'text-xs font-semibold uppercase tracking-wider text-slate-500',
  dataMono: 'font-mono text-xs text-slate-800 tracking-tight tabular-nums',
  tableHeader: 'font-mono text-xs font-semibold uppercase tracking-wider text-slate-600',
} as const;

export const THEME_SPACING = {
  container: 'max-w-7xl mx-auto px-4 sm:px-6 lg:px-8',
  sectionPadding: 'py-10 sm:py-14',
  cardPadding: 'p-5 sm:p-6',
  specGridGap: 'gap-4 sm:gap-6',
  
  // Radius math (Zero-Pill strictly enforced)
  radius: {
    badge: 'rounded-[3px]', // 3px technical stamp
    input: 'rounded-md', // 6px
    button: 'rounded-md', // 6px
    card: 'rounded-lg', // 8px
  },
} as const;

/**
 * Standard Pre-Configured Component Classes
 * Single source of truth for UI building across catalog, PDP, RFQ, and checkout.
 */
export const COMPONENT_STYLES = {
  // Buttons (Single line, no pill enclosures, strict paddings)
  buttons: {
    primary:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 active:bg-slate-950 rounded-md shadow-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-900 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    
    safety:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-950 bg-amber-500 hover:bg-amber-400 active:bg-amber-600 rounded-md shadow-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    
    tech:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-white bg-sky-600 hover:bg-sky-500 active:bg-sky-700 rounded-md shadow-sm transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-600 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    
    secondary:
      'inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-slate-800 bg-white hover:bg-slate-50 active:bg-slate-100 border border-slate-300 rounded-md shadow-2xs transition-colors duration-150 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-400 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed',
    
    ghost:
      'inline-flex items-center justify-center gap-2 px-3 py-2 text-sm font-medium text-slate-700 hover:text-slate-950 hover:bg-slate-100 rounded-md transition-colors duration-150 whitespace-nowrap cursor-pointer',
    
    technicalSmall:
      'inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 font-mono text-xs font-medium text-slate-700 bg-slate-50 hover:bg-slate-100 border border-slate-200 hover:border-slate-300 rounded-[3px] transition-colors whitespace-nowrap cursor-pointer',
  },

  // Industrial Cards (1-elevation rule, hairline borders, no nested card bloat)
  cards: {
    standard:
      'bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-slate-300 transition-all duration-200',
    
    interactive:
      'bg-white border border-slate-200 rounded-lg shadow-2xs hover:border-slate-400 hover:shadow-xs transition-all duration-150 cursor-pointer',
    
    technicalDense:
      'bg-white border border-slate-300 rounded-lg p-4 sm:p-5',
    
    specPanel:
      'bg-slate-50 border border-slate-200 rounded-lg p-5',
    
    darkChassis:
      'bg-slate-900 border border-slate-800 rounded-lg text-slate-100 p-6',
  },

  // Regulatory & Status Badges (Strict Zero-Pill Compliance: 3px Rectangular Tags with text/dots)
  badges: {
    // Certification Tag (ATEX, IECEx, SIL, NIST, CE)
    cert:
      'inline-flex items-center gap-1 px-1.5 py-0.5 font-mono text-[11px] font-semibold uppercase tracking-wider text-slate-800 bg-slate-100 border border-slate-300 rounded-[3px] whitespace-nowrap',
    
    // In Stock status tag
    inStock:
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-[3px] whitespace-nowrap',
    
    // NIST Traceable tag
    nistCalibrated:
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-sky-800 bg-sky-50 border border-sky-200 rounded-[3px] whitespace-nowrap',
    
    // Build to Order tag
    buildToOrder:
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-amber-800 bg-amber-50 border border-amber-200 rounded-[3px] whitespace-nowrap',
    
    // Hazardous zone alert
    hazardous:
      'inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-medium text-rose-800 bg-rose-50 border border-rose-200 rounded-[3px] whitespace-nowrap',
  },

  // Inputs & Parameter Selectors
  forms: {
    input:
      'w-full px-3.5 py-2 text-sm text-slate-900 placeholder:text-slate-400 bg-white border border-slate-300 rounded-md focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-colors',
    
    select:
      'w-full px-3.5 py-2 text-sm text-slate-900 bg-white border border-slate-300 rounded-md focus:border-sky-600 focus:ring-1 focus:ring-sky-600 focus:outline-none transition-colors cursor-pointer',
    
    label:
      'block text-xs font-medium text-slate-700 mb-1.5 tracking-wide',
  },

  // Segmented Radio / Matrix Buttons for Configurator
  matrixButton: {
    active:
      'border-2 border-slate-900 bg-slate-900 text-white font-medium text-xs px-3 py-2 rounded-md shadow-xs cursor-pointer',
    inactive:
      'border border-slate-200 bg-white hover:border-slate-300 text-slate-700 font-medium text-xs px-3 py-2 rounded-md cursor-pointer transition-colors',
  },
} as const;
