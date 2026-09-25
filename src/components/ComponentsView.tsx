import React, { useState } from 'react';
import {
  COMPONENT_STYLES,
} from '../Theme.ts';
import {
  FileDown,
  Download,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  Sliders,
  Send,
  ExternalLink,
  Cpu,
  ShieldCheck,
} from 'lucide-react';

export const ComponentsView: React.FC = () => {
  const [selectedRange, setSelectedRange] = useState('0-100 bar');
  const [selectedMaterial, setSelectedMaterial] = useState('316L SS');
  const [selectedOutput, setSelectedOutput] = useState('4-20mA HART');
  const [activeButtonFeedback, setActiveButtonFeedback] = useState<string | null>(null);

  const triggerFeedback = (msg: string) => {
    setActiveButtonFeedback(msg);
    setTimeout(() => setActiveButtonFeedback(null), 2500);
  };

  return (
    <div className="space-y-12">
      {/* Toast Feedback */}
      {activeButtonFeedback && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white text-xs font-mono px-4 py-2.5 rounded-md shadow-lg border border-slate-700 flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{activeButtonFeedback}</span>
        </div>
      )}

      {/* 1. BUTTONS SUITE */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">Standard Buttons & Operational CTAs</h2>
          <p className="text-xs text-slate-500">
            Single-line, zero-pill discipline, high tactile visual response (150ms settling), clear hierarchy.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 items-start">
            {/* Primary Slate Button */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 block">Primary Industrial</span>
              <button
                onClick={() => triggerFeedback('Action: Configured unit added to bill of materials')}
                className={COMPONENT_STYLES.buttons.primary}
              >
                <Cpu className="w-4 h-4" />
                <span>Configure & Order</span>
              </button>
              <span className="text-[11px] text-slate-400 block">Main transaction trigger</span>
            </div>

            {/* Safety Orange CTA */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 block">Safety Orange CTA</span>
              <button
                onClick={() => triggerFeedback('Action: Request for Quote (RFQ) opened')}
                className={COMPONENT_STYLES.buttons.safety}
              >
                <Send className="w-4 h-4" />
                <span>Submit RFQ Tender</span>
              </button>
              <span className="text-[11px] text-slate-400 block">High-visibility project action</span>
            </div>

            {/* Tech Blue Instrument */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 block">Tech Instrument Blue</span>
              <button
                onClick={() => triggerFeedback('Action: Generating live 2D/3D CAD schematic')}
                className={COMPONENT_STYLES.buttons.tech}
              >
                <Layers className="w-4 h-4" />
                <span>View CAD 3D Model</span>
              </button>
              <span className="text-[11px] text-slate-400 block">Engineering tool actions</span>
            </div>

            {/* Secondary 1px Border Button */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-500 block">Secondary Hairline</span>
              <button
                onClick={() => triggerFeedback('Action: Technical datasheet PDF download started')}
                className={COMPONENT_STYLES.buttons.secondary}
              >
                <FileDown className="w-4 h-4 text-slate-600" />
                <span>Download Spec Sheet</span>
              </button>
              <span className="text-[11px] text-slate-400 block">Documentation & exports</span>
            </div>
          </div>

          {/* Micro Tool Buttons & Disabled States */}
          <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
            <span className="text-xs font-mono text-slate-500 mr-2">Technical Small Tools:</span>
            <button
              onClick={() => triggerFeedback('Action: NIST 5-Point Calibration Template loaded')}
              className={COMPONENT_STYLES.buttons.technicalSmall}
            >
              <Download className="w-3.5 h-3.5" />
              <span>NIST-CERT-SAMPLE.PDF</span>
            </button>
            <button
              onClick={() => triggerFeedback('Action: Modbus Register Map exported')}
              className={COMPONENT_STYLES.buttons.technicalSmall}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>MODBUS-REG-MAP.XLSX</span>
            </button>
            <button
              disabled
              className={`${COMPONENT_STYLES.buttons.secondary} opacity-50 cursor-not-allowed`}
            >
              <span>Disabled State (Out of Stock)</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. INDUSTRIAL CARDS */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">Industrial Cards & Technical Panels</h2>
          <p className="text-xs text-slate-500">
            Single-elevation depth, 1px crisp borders, no nested card bloat, tabular data baselines.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Card A: Product Catalog Card */}
          <div className="bg-white border border-slate-200 rounded-lg p-5 hover:border-slate-400 transition-all duration-150 flex flex-col justify-between shadow-2xs">
            <div>
              {/* Image / Schematic Area */}
              <div className="w-full h-44 bg-slate-100 border border-slate-200 rounded-md mb-4 flex flex-col items-center justify-center relative overflow-hidden group">
                <div className="absolute top-2 left-2 flex items-center gap-1">
                  <span className="px-1.5 py-0.5 font-mono text-[10px] font-semibold uppercase bg-slate-900 text-white rounded-[3px]">
                    SERIES 7000
                  </span>
                </div>
                <div className="text-center p-4">
                  <div className="w-14 h-14 mx-auto rounded-full bg-slate-200 border-2 border-slate-400 flex items-center justify-center text-slate-700 font-mono font-bold text-xs mb-1">
                    DP-CELL
                  </div>
                  <span className="text-xs font-mono text-slate-500">316L Stainless Enclosure · IP67</span>
                </div>
                <div className="absolute bottom-2 right-2">
                  <span className="text-[10px] font-mono text-slate-500 bg-white/90 px-1.5 py-0.5 rounded-[3px] border border-slate-200">
                    DIAG: OK
                  </span>
                </div>
              </div>

              {/* Quiet Kicker */}
              <div className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 mb-1">
                Differential Pressure Transmitter
              </div>

              {/* Title & SKU */}
              <h3 className="text-base font-bold text-slate-900 leading-snug">
                PrecisionFlow PX-8400 Multi-Variable
              </h3>
              <div className="font-mono text-xs text-slate-500 mt-0.5">
                SKU: <span className="text-slate-800 font-semibold">PX-8400-HART-A2</span>
              </div>

              {/* Unboxed Metadata (Strict Zero-Pill) */}
              <div className="flex items-center gap-2 text-xs text-slate-600 mt-3 pt-3 border-t border-slate-100">
                <span>4-20mA HART</span>
                <span aria-hidden="true">·</span>
                <span>±0.04% Span</span>
                <span aria-hidden="true">·</span>
                <span>SIL 2 / SIL 3</span>
              </div>
            </div>

            {/* Price & Action Row */}
            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between">
              <div>
                <span className="text-[11px] text-slate-500 block">Commercial Terms</span>
                <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                  Price on Request
                </span>
              </div>
              <button
                onClick={() => triggerFeedback('PX-8400 added to Technical Evaluation Cart')}
                className={COMPONENT_STYLES.buttons.primary}
              >
                <span>Add to Bag</span>
              </button>
            </div>
          </div>

          {/* Card B: Dense Technical Parameter Card */}
          <div className="bg-white border border-slate-300 rounded-lg p-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
                <span className="text-xs font-mono font-semibold uppercase text-slate-600">
                  Engineering Spec Sheet
                </span>
                <span className="px-1.5 py-0.5 font-mono text-[10px] font-semibold text-emerald-800 bg-emerald-50 border border-emerald-200 rounded-[3px]">
                  NIST VALIDATED
                </span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Calibrated Range</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">-100 to 2,500 mbar</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Reference Accuracy</span>
                  <span className="font-mono font-semibold text-slate-900">±0.065% URL</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Overpressure Limit</span>
                  <span className="font-mono font-semibold text-slate-900 tabular-nums">160 bar (2320 PSI)</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Wetted Isolating Diaphragm</span>
                  <span className="font-semibold text-slate-800">Hastelloy C-276 / Tantalum</span>
                </div>
                <div className="flex justify-between py-1 border-b border-slate-100">
                  <span className="text-slate-500">Ambient Operating Temp</span>
                  <span className="font-mono font-semibold text-slate-900">-40°C to +85°C (-40°F to 185°F)</span>
                </div>
                <div className="flex justify-between py-1">
                  <span className="text-slate-500">Hazardous Certification</span>
                  <span className="font-mono font-semibold text-rose-800">ATEX Ex ia IIC T4 Ga</span>
                </div>
              </div>
            </div>

            <div className="pt-4 mt-3 border-t border-slate-200 flex items-center justify-between">
              <span className="text-xs text-slate-500 font-mono">Lead Time: 3-5 Days</span>
              <button
                onClick={() => triggerFeedback('Opening Full 12-page Engineering Datasheet')}
                className="text-xs font-semibold text-sky-700 hover:text-sky-900 flex items-center gap-1 cursor-pointer"
              >
                <span>Full Datasheet</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Card C: Factory Calibration & Net 30 Terms */}
          <div className="bg-slate-900 border border-slate-800 rounded-lg p-5 text-slate-200 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 text-amber-400 font-mono text-xs font-semibold uppercase mb-2">
                <ShieldCheck className="w-4 h-4" />
                <span>Enterprise B2B Terms</span>
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                Procurement & Net 30 Accounts
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                Eligible corporate procurement teams, EPC contractors, and plant facilities can transact via 
                authorized Purchase Orders (PO) with automated invoicing.
              </p>

              <div className="space-y-2 text-xs font-mono bg-slate-950/60 p-3 rounded-md border border-slate-800">
                <div className="text-slate-400">Available Procurement Modes:</div>
                <div className="text-emerald-400">✓ Corporate Purchase Order (Net 30/60)</div>
                <div className="text-emerald-400">✓ ISO/IEC 17025 5-Point Calibration</div>
                <div className="text-emerald-400">✓ Freight Collect via Customer Account</div>
              </div>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-800">
              <button
                onClick={() => triggerFeedback('B2B Net 30 terms application modal opened')}
                className="w-full py-2 px-3 text-xs font-semibold bg-amber-500 text-slate-950 hover:bg-amber-400 rounded-md transition-colors cursor-pointer"
              >
                Apply for Enterprise Account Terms
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. STATUS BADGES & CERTIFICATION TAGS */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">Regulatory Certifications & Status Badges</h2>
          <p className="text-xs text-slate-500">
            Strict Zero-Pill Compliance: Clean 3px rectangular tags. States are paired with text labels and accessible markers.
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-6">
          {/* Regulatory Standards */}
          <div>
            <span className="text-xs font-mono font-semibold uppercase text-slate-500 block mb-2">
              Official Regulatory Compliance Tags (3px radius rectangular stamps)
            </span>
            <div className="flex flex-wrap gap-2.5">
              <span className={COMPONENT_STYLES.badges.cert}>
                ATEX II 1G EX IA IIC T4
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                IECEx CSA 14.0028X
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                SIL 2 / SIL 3 IEC 61508
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                NIST TRACEABLE ISO 17025
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                3-A SANITARY 74-06
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                NACE MR0175 / ISO 15156
              </span>
              <span className={COMPONENT_STYLES.badges.cert}>
                CE MARKED EN 61326-1
              </span>
            </div>
          </div>

          {/* Operational Status Badges */}
          <div className="pt-4 border-t border-slate-100">
            <span className="text-xs font-mono font-semibold uppercase text-slate-500 block mb-2">
              Operational Status Indicators (Color paired with explicit text)
            </span>
            <div className="flex flex-wrap gap-3 items-center">
              <span className={COMPONENT_STYLES.badges.inStock}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                In Stock (Ship Next Business Day)
              </span>

              <span className={COMPONENT_STYLES.badges.nistCalibrated}>
                <CheckCircle2 className="w-3.5 h-3.5 text-sky-600" />
                Factory Calibrated with NIST Certificate
              </span>

              <span className={COMPONENT_STYLES.badges.buildToOrder}>
                <Clock className="w-3.5 h-3.5 text-amber-600" />
                Build to Order (2-3 Weeks Lead Time)
              </span>

              <span className={COMPONENT_STYLES.badges.hazardous}>
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                Explosion-Proof Enclosure Required
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. INTERACTIVE MATRIX SELECTORS (CONFIGURATOR STEPPER) */}
      <section className="space-y-4">
        <div className="border-b border-slate-200 pb-3">
          <h2 className="text-lg font-bold text-slate-900">Configurator Segmented Matrix Selectors</h2>
          <p className="text-xs text-slate-500">
            Engineered button matrices for live parameter configuration on the Product Detail Page (PDP).
          </p>
        </div>

        <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-5">
          {/* Pressure Range Selector */}
          <div>
            <label className={COMPONENT_STYLES.forms.label}>
              1. SENSOR MEASUREMENT RANGE (BAR / PSI)
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {['0-10 bar (145 PSI)', '0-50 bar (725 PSI)', '0-100 bar (1,450 PSI)', '0-400 bar (5,800 PSI)'].map((range) => (
                <button
                  key={range}
                  onClick={() => setSelectedRange(range)}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer text-left ${
                    selectedRange === range
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-mono">{range.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-70">{range.split(' ').slice(1).join(' ')}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Diaphragm Material */}
          <div>
            <label className={COMPONENT_STYLES.forms.label}>
              2. WETTED DIAPHRAGM PROCESS MATERIAL
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['316L SS', 'Hastelloy C-276 (Sour Gas)', 'Tantalum (Severe Acid)'].map((mat) => (
                <button
                  key={mat}
                  onClick={() => setSelectedMaterial(mat)}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer text-left ${
                    selectedMaterial === mat
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div>{mat.split(' ')[0]}</div>
                  <div className="text-[10px] opacity-70 truncate">{mat.split(' ').slice(1).join(' ') || 'Standard Process'}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Protocol Output */}
          <div>
            <label className={COMPONENT_STYLES.forms.label}>
              3. TRANSMISSION PROTOCOL & ANALOG OUTPUT
            </label>
            <div className="grid grid-cols-3 gap-2">
              {['4-20mA HART', 'Modbus RTU RS485', 'Foundation Fieldbus'].map((out) => (
                <button
                  key={out}
                  onClick={() => setSelectedOutput(out)}
                  className={`py-2 px-3 text-xs font-medium rounded-md transition-colors cursor-pointer text-left ${
                    selectedOutput === out
                      ? 'bg-slate-900 text-white font-semibold shadow-xs'
                      : 'bg-slate-50 border border-slate-200 text-slate-700 hover:border-slate-300'
                  }`}
                >
                  <div className="font-mono font-semibold">{out}</div>
                  <div className="text-[10px] opacity-70">Digital Fieldbus</div>
                </button>
              ))}
            </div>
          </div>

          {/* Live Compiled Part Number Bar */}
          <div className="p-3.5 bg-slate-950 text-white rounded-md flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 font-mono text-xs">
            <div>
              <span className="text-slate-400 block text-[10px]">DYNAMIC SKU GENERATED:</span>
              <span className="text-amber-400 font-bold text-sm">
                PTX-750-{selectedRange.split('-')[1]?.split(' ')[0] || '100'}-{selectedMaterial.startsWith('316L') ? 'SS' : selectedMaterial.startsWith('Hastelloy') ? 'HC' : 'TA'}-{selectedOutput.includes('HART') ? 'HRT' : selectedOutput.includes('Modbus') ? 'MDB' : 'FF'}
              </span>
            </div>
            <button
              onClick={() => triggerFeedback(`Part Number copied: PTX-750 configured`)}
              className="py-1.5 px-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded transition-colors cursor-pointer whitespace-nowrap"
            >
              Copy Technical SKU
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
