import React, { useState } from 'react';
import { THEME_COLORS } from '../Theme.ts';
import { Check, Copy } from 'lucide-react';

export const DesignTokensView: React.FC = () => {
  const [copiedHex, setCopiedHex] = useState<string | null>(null);

  const handleCopy = (hex: string) => {
    navigator.clipboard?.writeText(hex);
    setCopiedHex(hex);
    setTimeout(() => setCopiedHex(null), 1800);
  };

  return (
    <div className="space-y-12">
      {/* Introduction banner */}
      <div className="bg-white border border-slate-200 rounded-lg p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-200 pb-6 mb-6">
          <div>
            <div className="text-xs font-mono font-semibold uppercase tracking-wider text-slate-500 mb-1">
              PrecisionMetrics Specification · Doc ID: PM-DS-01
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900">
              Industrial Design System Specification
            </h1>
            <p className="text-sm text-slate-600 mt-1 max-w-2xl">
              Strict engineering guidelines for mission-critical process control, sensor configuration, 
              and technical procurement. Strictly adheres to zero-pill metadata discipline and tabular data alignment.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 font-mono text-xs font-semibold text-emerald-800 bg-emerald-50 border border-emerald-300 rounded-[3px]">
              <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              STATUS: LOCKED & ACTIVE
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-xs text-slate-600">
          <div className="border-l-2 border-slate-900 pl-3">
            <span className="font-semibold text-slate-900 block mb-0.5">Domain Philosophy</span>
            Rugged stainless steel, high-contrast readability under plant lighting, and ISO 17025 precision calibration.
          </div>
          <div className="border-l-2 border-amber-500 pl-3">
            <span className="font-semibold text-slate-900 block mb-0.5">60-30-10 Discipline</span>
            60% clean daylight canvas, 30% structural metal slates & hairline borders, 10% safety orange & tech blue accents.
          </div>
          <div className="border-l-2 border-sky-600 pl-3">
            <span className="font-semibold text-slate-900 block mb-0.5">Tabular Precision</span>
            All sensor limits, SKUs, tolerances, and calibration certificates utilize strict monospaced tabular numerals.
          </div>
        </div>
      </div>

      {/* 1. Color Palette Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">1. Color Architecture & Roles</h2>
            <p className="text-xs text-slate-500">Strict 60-30-10 allocation ensuring WCAG AA legibility on factory displays</p>
          </div>
          <span className="font-mono text-xs text-slate-400">THEME_COLORS</span>
        </div>

        {/* 60% Canvas & 30% Structural */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Dominant Canvas (60%) */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="text-xs font-mono font-semibold uppercase text-slate-500 mb-3 flex items-center justify-between">
              <span>60% Dominant Canvas</span>
              <span className="text-slate-400">Grounds</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Industrial Canvas', hex: THEME_COLORS.canvas.base, desc: 'Daylight ambient field (Slate 50)', border: true },
                { name: 'Technical White', hex: THEME_COLORS.canvas.card, desc: 'Spec sheets & card surfaces', border: true },
                { name: 'Surface Subtle', hex: THEME_COLORS.canvas.subtle, desc: 'Table heads & hover fills (Slate 100)', border: true },
                { name: 'Midnight Slate', hex: THEME_COLORS.canvas.dark, desc: 'Header chassis & dark consoles', border: false, textLight: true },
              ].map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="flex items-center justify-between p-2.5 rounded-md border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-7 h-7 rounded-[3px] shadow-2xs ${c.border ? 'border border-slate-300' : ''}`}
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-slate-600 group-hover:text-slate-900">
                    <span>{c.hex}</span>
                    {copiedHex === c.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Structural Slate & Metals (30%) */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="text-xs font-mono font-semibold uppercase text-slate-500 mb-3 flex items-center justify-between">
              <span>30% Structural Surfaces</span>
              <span className="text-slate-400">Metal & Grids</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Primary Slate 900', hex: THEME_COLORS.slate[900], desc: 'Brand headers & heavy typography' },
                { name: 'Chassis Slate 800', hex: THEME_COLORS.slate[800], desc: 'Secondary dark structural panels' },
                { name: 'Structural Gray 500', hex: THEME_COLORS.slate[500], desc: 'Secondary metadata & icons' },
                { name: 'Stainless Hairline 200', hex: THEME_COLORS.slate[200], desc: '1px clean non-intrusive border' },
              ].map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="flex items-center justify-between p-2.5 rounded-md border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-[3px] border border-slate-300 shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-slate-600 group-hover:text-slate-900">
                    <span>{c.hex}</span>
                    {copiedHex === c.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* High-Intent Accents (10%) */}
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <div className="text-xs font-mono font-semibold uppercase text-slate-500 mb-3 flex items-center justify-between">
              <span>10% Precision Accents</span>
              <span className="text-slate-400">High-Intent</span>
            </div>
            <div className="space-y-3">
              {[
                { name: 'Safety Orange 600', hex: THEME_COLORS.safetyOrange[600], desc: 'Primary CTAs & RFQ Actions' },
                { name: 'Safety Amber 500', hex: THEME_COLORS.safetyOrange[500], desc: 'Interactive highlights & focus' },
                { name: 'Tech Blue 600', hex: THEME_COLORS.techBlue[600], desc: 'HART Protocol, CAD, wiring' },
                { name: 'NIST Green 700', hex: THEME_COLORS.status.inStock.text, desc: 'Calibration certified & In stock' },
                { name: 'Hazard Rose 700', hex: THEME_COLORS.status.hazardousRated.text, desc: 'ATEX Zone explosion limits' },
              ].map((c) => (
                <div
                  key={c.hex}
                  onClick={() => handleCopy(c.hex)}
                  className="flex items-center justify-between p-2.5 rounded-md border border-slate-200 hover:border-slate-400 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-[3px] shadow-2xs"
                      style={{ backgroundColor: c.hex }}
                    />
                    <div>
                      <div className="text-xs font-semibold text-slate-900">{c.name}</div>
                      <div className="text-[11px] text-slate-500">{c.desc}</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-xs text-slate-600 group-hover:text-slate-900">
                    <span>{c.hex}</span>
                    {copiedHex === c.hex ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5 opacity-40 group-hover:opacity-100" />}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Typography & Tabular Numerals Section */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">2. Typography & Tabular Alignment</h2>
            <p className="text-xs text-slate-500">
              Clean Sans-Serif (Plus Jakarta Sans) paired with strict engineering Monospace (JetBrains Mono)
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">THEME_TYPOGRAPHY</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Prose & Display Specimen */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="text-xs font-mono font-semibold uppercase text-slate-500">
              Clean Sans-Serif · Plus Jakarta Sans
            </div>
            
            <div className="space-y-3">
              <div>
                <span className="text-[11px] font-mono text-slate-400">Display 32px · Bold (Balanced headline)</span>
                <h3 className="text-2xl font-bold tracking-tight text-slate-900 text-balance">
                  Differential Pressure Transmitters for Extreme Hydrocarbon Applications
                </h3>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400">Section H2 20px · SemiBold</span>
                <h4 className="text-lg font-semibold tracking-tight text-slate-900">
                  Hermetically Sealed Piezoresistive Diaphragms
                </h4>
              </div>

              <div>
                <span className="text-[11px] font-mono text-slate-400">Body Prose 14px · 1.6 Line Height</span>
                <p className="text-sm text-slate-700 leading-relaxed">
                  PrecisionMetrics process sensors are engineered to withstand severe pulsating line pressures, 
                  sour gas (NACE MR0175 compliant), and cryogenic media down to -196°C with continuous internal diagnostics.
                </p>
              </div>

              <div className="pt-2">
                <span className="text-[11px] font-mono text-slate-400">Clean Unboxed Metadata (Zero-Pill Discipline)</span>
                <div className="flex items-center gap-2 text-xs text-slate-600 mt-1">
                  <span className="font-semibold text-slate-900">Pressure Division</span>
                  <span aria-hidden="true">·</span>
                  <span>Rev 4.2 Datasheet</span>
                  <span aria-hidden="true">·</span>
                  <span>Updated Sept 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>ISO 17025 Traceable</span>
                </div>
              </div>
            </div>
          </div>

          {/* Monospace & Tabular Numerals */}
          <div className="bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="text-xs font-mono font-semibold uppercase text-slate-500">
              Data & Numerical Specimen · JetBrains Mono (Tabular Nums)
            </div>

            <p className="text-xs text-slate-600">
              Monospace columns ensure sensor ranges, accuracy tolerances, and pricing always line up vertically across tables and bills of materials:
            </p>

            <div className="overflow-x-auto border border-slate-200 rounded-md">
              <table className="w-full text-left font-mono text-xs">
                <thead className="bg-slate-100 text-slate-700 border-b border-slate-200">
                  <tr>
                    <th className="py-2 px-3 font-semibold">SKU Code</th>
                    <th className="py-2 px-3 font-semibold">Calibrated Span</th>
                    <th className="py-2 px-3 font-semibold">Accuracy</th>
                    <th className="py-2 px-3 font-semibold text-right">Pricing Tier</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 tabular-nums">
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-900">PTX-750-A01</td>
                    <td className="py-2 px-3 text-slate-600">0.0 to 10.0 bar</td>
                    <td className="py-2 px-3 text-slate-800">±0.050% span</td>
                    <td className="py-2 px-3 text-right text-xs font-semibold text-amber-700">Price on Request</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-900">PTX-750-B02</td>
                    <td className="py-2 px-3 text-slate-600">0.0 to 50.0 bar</td>
                    <td className="py-2 px-3 text-slate-800">±0.050% span</td>
                    <td className="py-2 px-3 text-right text-xs font-semibold text-amber-700">Price on Request</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-900">PTX-750-C05</td>
                    <td className="py-2 px-3 text-slate-600">0.0 to 250.0 bar</td>
                    <td className="py-2 px-3 text-slate-800">±0.075% span</td>
                    <td className="py-2 px-3 text-right text-xs font-semibold text-amber-700">Price on Request</td>
                  </tr>
                  <tr className="hover:bg-slate-50">
                    <td className="py-2 px-3 font-semibold text-slate-900">PTX-750-D10</td>
                    <td className="py-2 px-3 text-slate-600">0.0 to 600.0 bar</td>
                    <td className="py-2 px-3 text-slate-800">±0.100% span</td>
                    <td className="py-2 px-3 text-right text-xs font-semibold text-amber-700">Price on Request</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="text-[11px] text-slate-500 font-mono">
              Aligned with <code className="text-slate-800 font-bold">font-variant-numeric: tabular-nums</code>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Spacing & Spatial Math */}
      <section className="space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 pb-3">
          <div>
            <h2 className="text-lg font-bold text-slate-900">3. Spatial Math & Zero-Pill Geometry</h2>
            <p className="text-xs text-slate-500">
              Strict mathematical nesting: r_inner = r_outer - padding. No rounded pill bubbles for static metadata.
            </p>
          </div>
          <span className="font-mono text-xs text-slate-400">THEME_SPACING</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
              Micro Badge Radius: 3px
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Precision stamp geometry. Used for regulatory tags (ATEX, SIL, NIST).
            </p>
            <div className="flex flex-wrap gap-2 items-center p-3 bg-slate-50 rounded-md border border-slate-200">
              <span className="px-2 py-0.5 font-mono text-[11px] font-semibold uppercase bg-slate-200 border border-slate-300 rounded-[3px] text-slate-800">
                ATEX ZONE 1
              </span>
              <span className="px-2 py-0.5 font-mono text-[11px] font-semibold uppercase bg-sky-100 border border-sky-300 rounded-[3px] text-sky-900">
                HART 7.0
              </span>
              <span className="px-2 py-0.5 font-mono text-[11px] font-semibold uppercase bg-emerald-100 border border-emerald-300 rounded-[3px] text-emerald-900">
                SIL 3 RATED
              </span>
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
              Control Radius: 6px
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Form inputs, buttons, segmented selector tabs (rounded-md).
            </p>
            <div className="space-y-2 p-3 bg-slate-50 rounded-md border border-slate-200">
              <button className="w-full py-1.5 px-3 text-xs font-semibold bg-slate-900 text-white rounded-md">
                Button Target (6px)
              </button>
              <input
                type="text"
                readOnly
                value="NPT 1/2&quot; Male Process Seal"
                className="w-full py-1.5 px-2.5 text-xs bg-white border border-slate-300 rounded-md text-slate-700"
              />
            </div>
          </div>

          <div className="bg-white border border-slate-200 rounded-lg p-5">
            <h3 className="text-xs font-mono font-semibold uppercase text-slate-700 mb-2">
              Card Radius: 8px
            </h3>
            <p className="text-xs text-slate-600 mb-3">
              Single-elevation containers, modal viewports, spec sheet drawers.
            </p>
            <div className="p-3 bg-white border border-slate-300 rounded-lg shadow-2xs">
              <div className="text-xs font-semibold text-slate-900">Instrumentation Spec Sheet</div>
              <div className="text-[11px] text-slate-500 mt-0.5">Outer r = 8px · Inner padding = 12px</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
