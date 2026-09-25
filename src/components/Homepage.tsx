import React, { useState, useMemo } from 'react';
import {
  Search,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  FileSpreadsheet,
  Layers,
  SlidersHorizontal,
  ChevronRight,
  Factory,
  Sparkles,
  Gauge,
  Waves,
  Activity,
  Thermometer,
  TestTube2,
  Wrench,
  Download,
} from 'lucide-react';
import {
  FEATURED_INSTRUMENTS,
  INSTRUMENT_CATEGORIES,
  INDUSTRY_SOLUTIONS,
  InstrumentItem,
} from '../data/instruments.ts';
import { IndustrialBanner } from './IndustrialBanner.tsx';
import { COMPONENT_STYLES } from '../Theme.ts';

interface HomepageProps {
  onSelectInstrument: (item: InstrumentItem) => void;
  onAddToCart: (item: InstrumentItem, qty?: number, tag?: string, cal?: 'standard' | 'nist5pt') => void;
  onOpenRFQ: (item?: InstrumentItem) => void;
  onNavigateToCatalog?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Homepage: React.FC<HomepageProps> = ({
  onSelectInstrument,
  onAddToCart,
  onOpenRFQ,
  onNavigateToCatalog,
  searchQuery,
  onSearchChange,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeNotification, setActiveNotification] = useState<string | null>(null);

  const triggerToast = (msg: string) => {
    setActiveNotification(msg);
    setTimeout(() => setActiveNotification(null), 3000);
  };

  // Filter instruments based on search and selected category
  const filteredInstruments = useMemo(() => {
    return FEATURED_INSTRUMENTS.filter((item) => {
      const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.tagline.toLowerCase().includes(q) ||
        item.outputSignal.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.certifications.some((c) => c.toLowerCase().includes(q));
      return matchesCat && matchesSearch;
    });
  }, [selectedCategory, searchQuery]);

  // Category Icon Resolver
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'pressure':
        return <Gauge className="w-5 h-5 text-amber-500" />;
      case 'flow':
        return <Waves className="w-5 h-5 text-sky-500" />;
      case 'level':
        return <Activity className="w-5 h-5 text-emerald-500" />;
      case 'temperature':
        return <Thermometer className="w-5 h-5 text-rose-500" />;
      case 'analytical':
        return <TestTube2 className="w-5 h-5 text-indigo-500" />;
      case 'calibration':
        return <Wrench className="w-5 h-5 text-slate-400" />;
      default:
        return <Layers className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-12 sm:space-y-18">
      {/* Active Toast Notification */}
      {activeNotification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white text-xs font-mono px-4 py-2.5 rounded-md shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{activeNotification}</span>
        </div>
      )}

      {/* INDUSTRIAL INSTRUMENTS - The Measurement Zone Showcase Banner */}
      <IndustrialBanner
        onSelectInstrumentName={(name) => {
          if (onNavigateToCatalog) {
            onNavigateToCatalog();
          }
        }}
        onOpenRFQ={() => onOpenRFQ()}
      />

      {/* SECTION 1: STOREFRONT HERO & PARAMETRIC LOOKUP */}
      <section id="hero" className="relative pt-2 pb-6 sm:pb-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Hero Column: Engineering Value & Direct Parameter Search */}
          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-xs font-mono text-slate-600">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 font-semibold text-slate-800 bg-slate-100 border border-slate-300 rounded-[3px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                FACTORY DIRECT PROCUREMENT
              </span>
              <span aria-hidden="true">·</span>
              <span>ISO/IEC 17025 ACCREDITED</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 text-balance leading-tight">
              Mission-Critical Industrial Process Instrumentation
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl">
              Factory-calibrated pressure, flow, level, and temperature transmitters engineered 
              for extreme refinery and chemical environments. Direct NIST-traceable certificates, 
              custom 316L tag engraving, and immediate 48-hour factory dispatch.
            </p>

            {/* Direct Model & Parametric Lookup Console */}
            <div className="bg-white border border-slate-300 rounded-lg p-3 sm:p-4 shadow-xs space-y-3">
              <div className="text-xs font-mono font-semibold uppercase text-slate-600 flex items-center justify-between">
                <span>Model / SKU & Parameter Quick Lookup</span>
                <span className="text-slate-400">Direct Factory Inventory</span>
              </div>

              <div className="relative">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => onSearchChange(e.target.value)}
                  placeholder="Enter model (e.g. PX-8400, FMG-520), output (HART), or tag..."
                  className="w-full pl-10 pr-24 py-2.5 text-sm bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:border-amber-500 focus:bg-white font-mono transition-colors"
                />
                {searchQuery && (
                  <button
                    onClick={() => onSearchChange('')}
                    className="absolute right-3 top-2.5 text-xs text-slate-500 hover:text-slate-900 font-mono"
                  >
                    Clear
                  </button>
                )}
              </div>

              {/* Fast Parameter Filters */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[11px] font-mono text-slate-500 mr-1">Filter Family:</span>
                {[
                  { id: 'all', label: 'All Instruments' },
                  { id: 'pressure', label: 'Pressure' },
                  { id: 'flow', label: 'Flow' },
                  { id: 'level', label: 'Level' },
                  { id: 'temperature', label: 'Temperature' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-2.5 py-1 text-xs rounded transition-colors cursor-pointer font-medium ${
                      selectedCategory === cat.id
                        ? 'bg-slate-900 text-white font-semibold shadow-2xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Claim-to-Proof Adjacency Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2 border-t border-slate-200 text-left">
              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  24,500+
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Active Field Units</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900 tabular-nums">
                  ±0.04%
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Calibrated Accuracy</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-emerald-700 tabular-nums">
                  48-Hour
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Stock Dispatch</div>
              </div>

              <div>
                <div className="text-xl sm:text-2xl font-bold font-mono text-slate-900">
                  ISO 17025
                </div>
                <div className="text-[11px] text-slate-500 mt-0.5">Accredited Laboratory</div>
              </div>
            </div>
          </div>

          {/* Right Hero Column: High-Resolution Industrial Photography with Technical Overlay */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-lg overflow-hidden border border-slate-300 shadow-md aspect-16/10 lg:aspect-4/3 bg-slate-900">
              <img
                src="/src/assets/images/hero_industrial_instruments_1790233370484.jpg"
                alt="Precision Industrial Process Instrumentation in Refinery Control Unit"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover opacity-95"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/30 to-transparent"></div>

              {/* Technical Callout Badge Overlay */}
              <div className="absolute top-4 left-4 flex flex-wrap gap-1.5">
                <span className={COMPONENT_STYLES.badges.cert}>
                  ATEX EX D IIB+H2 T6
                </span>
                <span className={COMPONENT_STYLES.badges.cert}>
                  SIL 2 / SIL 3 CAPABLE
                </span>
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center justify-between border-b border-slate-700/80 pb-2 mb-2">
                  <div>
                    <span className="text-[10px] font-mono text-amber-400 block uppercase">
                      Featured Refinery Application
                    </span>
                    <h3 className="text-sm font-bold text-white leading-tight">
                      Hydrocracker Unit 4 High-Pressure DP Loop
                    </h3>
                  </div>
                  <span className="font-mono text-xs text-emerald-400 bg-slate-800/80 px-2 py-0.5 rounded-[3px] border border-slate-700">
                    NIST VERIFIED
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono text-slate-300">
                  <span>Tag: <strong className="text-white">PT-104-B</strong></span>
                  <span>Signal: <strong className="text-white">4-20mA HART 7.0</strong></span>
                  <span>Wetted: <strong className="text-white">Hastelloy C-276</strong></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: INSTRUMENT CATEGORY HUBS */}
      <section id="categories" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              Engineering Product Taxonomy
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Industrial Instrumentation Hubs
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            <span>6 Core Measurement Families · 170+ Configurable SKUs</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INSTRUMENT_CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                const elem = document.getElementById('featured');
                elem?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="bg-white border border-slate-200 hover:border-slate-400 rounded-lg p-5 shadow-2xs hover:shadow-xs transition-all duration-150 cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-10 h-10 rounded-md bg-slate-100 flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-colors">
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span className="font-mono text-xs text-slate-500 bg-slate-50 px-2 py-0.5 rounded-[3px] border border-slate-200">
                    {cat.itemCount} Models
                  </span>
                </div>

                <h3 className="text-base font-bold text-slate-900 group-hover:text-amber-600 transition-colors">
                  {cat.name}
                </h3>
                <p className="text-xs text-slate-500 mt-1 leading-normal">{cat.tagline}</p>

                <div className="mt-4 pt-3 border-t border-slate-100 space-y-1.5 text-xs font-mono">
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400 text-[11px]">Primary Range:</span>
                    <span className="font-medium truncate max-w-[170px]">{cat.primaryRange}</span>
                  </div>
                  <div className="flex justify-between text-slate-600">
                    <span className="text-slate-400 text-[11px]">Protocols:</span>
                    <span className="text-slate-800 font-medium truncate max-w-[170px]">{cat.protocol}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-slate-700 group-hover:text-slate-900">
                <span>Explore Models</span>
                <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          ))}
        </div>

        {/* Real Product Catalogue HD Banner */}
        {onNavigateToCatalog && (
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-white shadow-sm">
            <div className="flex items-center gap-3.5">
              <div className="w-10 h-10 rounded bg-amber-500 text-slate-950 flex items-center justify-center font-bold font-mono text-sm shrink-0">
                HD
              </div>
              <div>
                <div className="text-xs font-mono text-amber-400 font-semibold">
                  REAL INDUSTRIAL PRODUCT CATALOGUE
                </div>
                <h3 className="text-sm sm:text-base font-bold text-white">
                  Explore 75+ Precision Measuring, Electrical & Environmental Instruments
                </h3>
                <p className="text-xs text-slate-400">
                  Calipers, Micrometers, Solar MPPT, TRMS Clamps, Megohmmeters, Turbidity & Gas Analyzers.
                </p>
              </div>
            </div>

            <button
              onClick={onNavigateToCatalog}
              className={`${COMPONENT_STYLES.buttons.safety} shrink-0 py-2 px-4 text-xs`}
            >
              <span>Open Product Catalog (/catalog)</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </section>

      {/* SECTION 3: FEATURED CERTIFIED INSTRUMENTS GRID */}
      <section id="featured" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              Immediate Dispatch Available
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Certified Instruments & Transmitters
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Showing {filteredInstruments.length} calibrated models with 100% factory verification certificates.
            </p>
          </div>

          <div className="flex items-center gap-2">
            {selectedCategory !== 'all' && (
              <button
                onClick={() => setSelectedCategory('all')}
                className="text-xs font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-[3px] hover:bg-amber-100 cursor-pointer"
              >
                Reset Filter ({selectedCategory})
              </button>
            )}
          </div>
        </div>

        {filteredInstruments.length === 0 ? (
          <div className="bg-white border border-slate-200 rounded-lg p-12 text-center space-y-3">
            <SlidersHorizontal className="w-10 h-10 text-slate-400 mx-auto" />
            <h3 className="text-base font-bold text-slate-900">No matching instrument models found</h3>
            <p className="text-xs text-slate-500 max-w-sm mx-auto">
              No instruments match your filter criteria "{searchQuery}". Try clearing search or exploring all categories.
            </p>
            <button
              onClick={() => {
                onSearchChange('');
                setSelectedCategory('all');
              }}
              className={COMPONENT_STYLES.buttons.secondary}
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredInstruments.map((inst) => (
              <div
                key={inst.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-slate-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 ease-out group cursor-pointer"
              >
                <div>
                  {/* High-Resolution Product Photo Canvas */}
                  <div
                    onClick={() => onSelectInstrument(inst)}
                    className="w-full aspect-4/3 bg-slate-100 relative overflow-hidden cursor-pointer"
                  >
                    <img
                      src={inst.image}
                      alt={inst.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-300"
                    />

                    {/* Stock Status Tag */}
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-mono text-emerald-800 bg-white/95 px-2 py-0.5 rounded-[3px] border border-emerald-200 font-semibold shadow-2xs">
                        In Stock ({inst.stockCount})
                      </span>
                    </div>

                    {/* Series Kicker */}
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-mono text-white bg-slate-950/80 px-1.5 py-0.5 rounded-[3px]">
                        {inst.series}
                      </span>
                    </div>
                  </div>

                  {/* Product Details */}
                  <div className="p-4 space-y-2.5">
                    <div className="text-[11px] font-mono text-slate-500">
                      SKU: <span className="font-semibold text-slate-800">{inst.sku}</span>
                    </div>

                    <h3
                      onClick={() => onSelectInstrument(inst)}
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {inst.name}
                    </h3>

                    {/* Zero-Pill Unboxed Metadata */}
                    <div className="flex items-center gap-1.5 text-[11px] text-slate-600 pt-1">
                      <span>{inst.accuracy}</span>
                      <span aria-hidden="true">·</span>
                      <span className="truncate">{inst.outputSignal.split('/')[0]}</span>
                    </div>

                    {/* Regulatory Tags */}
                    <div className="flex flex-wrap gap-1 pt-1">
                      {inst.certifications.slice(0, 2).map((cert) => (
                        <span key={cert} className={COMPONENT_STYLES.badges.cert}>
                          {cert.split(' ')[0]}
                        </span>
                      ))}
                      {inst.certifications.length > 2 && (
                        <span className="text-[10px] font-mono text-slate-400 self-center">
                          +{inst.certifications.length - 2} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* RFQ & Actions Module */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/50 space-y-2.5">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Price on Request
                      </span>
                    </div>
                    <span className="text-[11px] font-mono text-slate-500">{inst.leadTime.split('·')[0]}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectInstrument(inst)}
                      className={`${COMPONENT_STYLES.buttons.secondary} py-1.5 px-2 text-xs w-full`}
                    >
                      <span>Configure / Specs</span>
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(inst, 1, `TAG-${inst.sku.slice(0, 4)}`, 'nist5pt');
                        triggerToast(`Added ${inst.sku} to Procurement Bag`);
                      }}
                      className={`${COMPONENT_STYLES.buttons.primary} py-1.5 px-2 text-xs w-full`}
                    >
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* SECTION 4: ENTERPRISE RFQ TENDER & BULK BOM DESK */}
      <section id="rfq-section" className="bg-slate-900 border border-slate-800 rounded-lg p-6 sm:p-10 text-slate-100 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center gap-2 text-xs font-mono text-amber-400">
              <FileSpreadsheet className="w-4 h-4" />
              <span>B2B PROCUREMENT & EPC TENDER DESK</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white">
              Bulk Plant Instrumentation Bids & Net 30 Invoicing
            </h2>

            <p className="text-sm text-slate-300 leading-relaxed max-w-xl">
              Equipping a grassroots refinery unit or plant expansion? Upload your ISA-20 instrument 
              data sheets or Excel Bill of Materials (BOM). Our Application Engineering Division provides 
              formal line-item tenders, stamped dimensional drawings, and volume discounts within 4 hours.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-300">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>ISA-20 Schedule Parsing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Net 30/60 Authorized Billing</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Batch NIST Calibration Vault</span>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5 bg-slate-800/80 border border-slate-700 rounded-lg p-5 space-y-4">
            <div className="text-xs font-mono font-semibold uppercase text-slate-300">
              Direct Tender Submission
            </div>

            <p className="text-xs text-slate-400">
              Select an option below to initiate an engineering review for your plant tender:
            </p>

            <div className="space-y-2.5">
              <button
                onClick={() => onOpenRFQ()}
                className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-md transition-colors flex items-center justify-between cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <FileSpreadsheet className="w-4 h-4" />
                  <span>Upload Bill of Materials (.xlsx / .csv)</span>
                </div>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={() => onOpenRFQ()}
                className="w-full py-2 px-4 bg-slate-700 hover:bg-slate-600 text-white font-medium text-xs rounded-md transition-colors flex items-center justify-between cursor-pointer border border-slate-600"
              >
                <span>Manual Tender Line-Item Builder</span>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>
            </div>

            <div className="pt-2 border-t border-slate-700/60 text-[11px] font-mono text-slate-400 flex items-center justify-between">
              <span>Avg Engineering Response: 3.8 hrs</span>
              <span className="text-emerald-400">ISO 9001 Audited</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: INDUSTRY SOLUTIONS & STANDARDS */}
      <section id="solutions" className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2 border-b border-slate-200 pb-4">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500">
              Targeted Industrial Packages
            </div>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900">
              Plant Solutions & Engineered Standards
            </h2>
          </div>
          <div className="text-xs text-slate-500 font-mono">
            <span>Compliant with API, NACE, 3-A & AWWA Specifications</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {INDUSTRY_SOLUTIONS.map((sol) => (
            <div
              key={sol.id}
              className="bg-white border border-slate-200 rounded-lg p-5 flex flex-col justify-between shadow-2xs hover:border-slate-300 transition-colors"
            >
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-amber-700 mb-2">
                  <Factory className="w-4 h-4" />
                  <span>{sol.stat}</span>
                </div>

                <h3 className="text-base font-bold text-slate-900 mb-2">{sol.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">{sol.lead}</p>

                <div className="space-y-1.5 border-t border-slate-100 pt-3 text-xs">
                  <div className="font-mono text-[11px] font-semibold text-slate-500">Required Codes:</div>
                  <div className="flex flex-wrap gap-1">
                    {sol.standards.map((st) => (
                      <span key={st} className={COMPONENT_STYLES.badges.cert}>
                        {st}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <span className="text-[11px] font-mono text-slate-500 block mb-1">Standard Instruments:</span>
                <div className="text-xs font-semibold text-slate-800">
                  {sol.keyModels.join(' · ')}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION 6: ISO 17025 ACCREDITATIONS & CALIBRATION VAULT */}
      <section id="accreditations" className="bg-slate-50 border border-slate-200 rounded-lg p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="space-y-2 max-w-2xl">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-800">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span className="font-semibold uppercase">Precision Calibration Guarantee</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              ISO/IEC 17025 Accredited Metrology Laboratory
            </h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Every instrument dispatched from PrecisionMetrics is verified against primary deadweight 
              testers and dry-block standards traceable directly to NIST and national metrology institutes. 
              Calibration certificates are digitally signed and accessible indefinitely via serial number lookup.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 shrink-0">
            <button
              onClick={() => triggerToast('Sample ISO 17025 5-Point Calibration Certificate (PDF) Downloaded')}
              className={COMPONENT_STYLES.buttons.secondary}
            >
              <Download className="w-4 h-4 text-slate-600" />
              <span>Sample Certificate</span>
            </button>
            <button
              onClick={() => onOpenRFQ()}
              className={COMPONENT_STYLES.buttons.primary}
            >
              <span>Book Plant Recalibration</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
