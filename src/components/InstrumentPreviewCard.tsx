import React, { useState } from 'react';
import { COMPONENT_STYLES } from '../Theme.ts';
import {
  FileText,
  Layers,
  CheckCircle,
  HelpCircle,
  PackageCheck,
  Building2,
  Share2,
} from 'lucide-react';

export const InstrumentPreviewCard: React.FC = () => {
  const [selectedSpan, setSelectedSpan] = useState<'10bar' | '50bar' | '250bar'>('50bar');
  const [selectedConnection, setSelectedConnection] = useState<'npt' | 'flange' | 'triclamp'>('npt');
  const [calibrationTier, setCalibrationTier] = useState<'standard' | 'nist5pt'>('nist5pt');
  const [quantity, setQuantity] = useState(1);
  const [plantTag, setPlantTag] = useState('PT-402-A');
  const [addedNotification, setAddedNotification] = useState<string | null>(null);

  // Configuration state without fixed prices (B2B Price on Request)
  const basePrice = 0;
  const connectionPrice = 0;
  const calibrationPrice = 0;
  const unitPrice = 0;
  const totalPrice = 0;

  // SKU code
  const compiledSKU = `PTX-8200-${selectedSpan === '10bar' ? '010B' : selectedSpan === '50bar' ? '050B' : '250B'}-${selectedConnection === 'npt' ? 'N12' : selectedConnection === 'flange' ? 'F15' : 'TC2'}-${calibrationTier === 'nist5pt' ? 'NIST' : 'STD'}`;

  const handleAddToCart = () => {
    setAddedNotification(`Added ${quantity}x [${compiledSKU}] tagged as "${plantTag}" to Procurement Bag!`);
    setTimeout(() => setAddedNotification(null), 3500);
  };

  const handleRequestRFQ = () => {
    setAddedNotification(`Instrument [${compiledSKU}] sent to Project RFQ Tender Builder!`);
    setTimeout(() => setAddedNotification(null), 3500);
  };

  return (
    <div className="space-y-8">
      {addedNotification && (
        <div className="bg-emerald-900 border border-emerald-700 text-white text-xs font-mono px-4 py-3 rounded-md shadow-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{addedNotification}</span>
          </div>
          <span className="text-[10px] text-emerald-300">DISPATCH READY</span>
        </div>
      )}

      {/* Main PDP Split Module */}
      <div className="bg-white border border-slate-200 rounded-lg shadow-2xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-slate-200">
          {/* Left Column: Visual, Technical Badges, Documents (5 cols) */}
          <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-slate-50/50">
            <div>
              {/* Breadcrumb & Series */}
              <div className="flex items-center gap-2 text-xs text-slate-500 mb-3">
                <span>Instrumentation</span>
                <span aria-hidden="true">/</span>
                <span>Pressure Transmitters</span>
                <span aria-hidden="true">/</span>
                <span className="text-slate-900 font-semibold">PX-8200 Series</span>
              </div>

              {/* Instrument Graphic Canvas */}
              <div className="w-full aspect-4/3 bg-white border border-slate-200 rounded-lg flex flex-col items-center justify-center p-6 relative shadow-2xs">
                {/* Regulatory Tags overlay */}
                <div className="absolute top-3 left-3 flex flex-wrap gap-1">
                  <span className={COMPONENT_STYLES.badges.cert}>ATEX ZONE 0</span>
                  <span className={COMPONENT_STYLES.badges.cert}>SIL 2 / SIL 3</span>
                </div>

                <div className="absolute top-3 right-3">
                  <span className="text-[11px] font-mono text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-[3px] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600"></span>
                    IN STOCK (24 Units)
                  </span>
                </div>

                {/* Industrial Instrument Graphic */}
                <div className="text-center space-y-2">
                  <div className="w-28 h-28 mx-auto rounded-full bg-slate-100 border-4 border-slate-300 flex flex-col items-center justify-center shadow-inner relative">
                    <div className="text-xs font-mono font-bold text-slate-900">4-20 mA</div>
                    <div className="text-[9px] font-mono text-slate-500">HART 7.0</div>
                    <div className="w-12 h-0.5 bg-amber-500 mt-1"></div>
                    <div className="text-[10px] font-mono text-slate-700 mt-1">0.05% SPAN</div>
                  </div>
                  <div className="text-xs font-mono text-slate-700 font-semibold">
                    Dual-Chamber Cast Aluminum Housing
                  </div>
                  <div className="text-[11px] text-slate-500">
                    NEMA 4X / IP66 / IP68 Continuous Submersible
                  </div>
                </div>

                <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-100 pt-2">
                  <span>M20 x 1.5 Cable Gland</span>
                  <span>316L SS Process Flange</span>
                </div>
              </div>

              {/* Engineering Document Shortcuts */}
              <div className="mt-6 space-y-2">
                <span className="text-xs font-mono font-semibold uppercase text-slate-500 block">
                  Technical Documentation Downloads:
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setAddedNotification('Downloading PX-8200 Engineering Datasheet (PDF)...')}
                    className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-[4px] text-left text-xs text-slate-800 transition-colors cursor-pointer"
                  >
                    <FileText className="w-4 h-4 text-rose-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-[11px]">Datasheet (PDF)</div>
                      <div className="text-[10px] text-slate-500">1.8 MB · Rev 5.1</div>
                    </div>
                  </button>

                  <button
                    onClick={() => setAddedNotification('Downloading STEP 3D CAD Assembly File...')}
                    className="flex items-center gap-2 p-2.5 bg-white border border-slate-200 hover:border-slate-300 rounded-[4px] text-left text-xs text-slate-800 transition-colors cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-sky-600 shrink-0" />
                    <div>
                      <div className="font-semibold text-[11px]">3D CAD Model</div>
                      <div className="text-[10px] text-slate-500">STEP / IGES 3.2MB</div>
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Footer */}
            <div className="mt-6 pt-4 border-t border-slate-200 text-xs text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1 font-mono">
                <Building2 className="w-3.5 h-3.5 text-slate-400" />
                ISO 9001:2015 Accredited Factory
              </span>
              <button
                onClick={() => setAddedNotification('Configuration link copied to clipboard')}
                className="hover:text-slate-900 cursor-pointer flex items-center gap-1 text-[11px]"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>Share Spec</span>
              </button>
            </div>
          </div>

          {/* Right Column: Contiguous Purchase & Configurator Module (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-8 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
                <span>MODEL FAMILY: PX-8200</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-700 font-semibold">FACTORY CALIBRATED</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-slate-900">
                PX-8200 Smart Pressure Transmitter (HART 7.0)
              </h1>

              <div className="mt-2 flex items-center gap-2 text-xs text-slate-600">
                <span className="font-semibold text-slate-900">Piezoresistive Sensor</span>
                <span aria-hidden="true">·</span>
                <span>±0.05% Calibrated Span</span>
                <span aria-hidden="true">·</span>
                <span>Turn-down 100:1</span>
              </div>
            </div>

            {/* Dynamic SKU Display */}
            <div className="p-3 bg-slate-900 text-slate-100 rounded-md font-mono text-xs flex items-center justify-between">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Configured Model Code:</span>
                <span className="text-amber-400 font-bold text-sm">{compiledSKU}</span>
              </div>
              <span className="text-[11px] text-slate-400 bg-slate-800 px-2 py-1 rounded-[3px]">
                Active Build
              </span>
            </div>

            {/* Step 1: Range Selector */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>1. Calibrated Pressure Span</span>
                <span className="font-mono text-slate-500 font-normal">URL: Upper Range Limit</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: '10bar', label: '0 to 10 bar', psi: '0 to 145 PSI' },
                  { id: '50bar', label: '0 to 50 bar', psi: '0 to 725 PSI' },
                  { id: '250bar', label: '0 to 250 bar', psi: '0 to 3,625 PSI' },
                ].map((item) => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedSpan(item.id as any)}
                    className={`p-3 text-left rounded-md transition-colors cursor-pointer border ${
                      selectedSpan === item.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-mono font-semibold text-xs">{item.label}</div>
                    <div className="text-[10px] opacity-70">{item.psi}</div>
                    <div className="font-mono text-[10px] font-medium mt-1 text-amber-500">
                      Standard Span
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Process Connection */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>2. Process Isolation & Connection</span>
                <span className="font-mono text-slate-500 font-normal">316L SS Wetted</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'npt', label: '1/2" NPT Male', spec: 'Standard Thread' },
                  { id: 'flange', label: '2" ANSI 150# Flange', spec: 'ANSI B16.5 RF' },
                  { id: 'triclamp', label: '1.5" Tri-Clamp', spec: 'Sanitary 3-A' },
                ].map((conn) => (
                  <button
                    key={conn.id}
                    onClick={() => setSelectedConnection(conn.id as any)}
                    className={`p-3 text-left rounded-md transition-colors cursor-pointer border ${
                      selectedConnection === conn.id
                        ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                        : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="font-semibold text-xs">{conn.label}</div>
                    <div className="text-[10px] opacity-70">{conn.spec}</div>
                    <div className="font-mono text-[10px] font-medium mt-1 text-amber-500">
                      Wetted 316L SS
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Step 3: NIST Traceable Calibration Tier */}
            <div className="space-y-2">
              <label className="flex items-center justify-between text-xs font-semibold text-slate-900">
                <span>3. Factory Calibration Protocol</span>
                <span className="text-sky-700 font-mono text-[11px] font-medium">ISO 17025 ACCREDITED</span>
              </label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setCalibrationTier('standard')}
                  className={`p-3 text-left rounded-md transition-colors cursor-pointer border ${
                    calibrationTier === 'standard'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-xs">Standard Factory Certificate</div>
                  <div className="text-[10px] opacity-70">Pass/Fail baseline tolerance verification</div>
                  <div className="font-mono text-[11px] font-bold mt-1 text-amber-400">Included (Free)</div>
                </button>

                <button
                  onClick={() => setCalibrationTier('nist5pt')}
                  className={`p-3 text-left rounded-md transition-colors cursor-pointer border ${
                    calibrationTier === 'nist5pt'
                      ? 'bg-slate-900 text-white border-slate-900 shadow-xs'
                      : 'bg-white text-slate-800 border-slate-200 hover:border-slate-300'
                  }`}
                >
                  <div className="font-semibold text-xs flex items-center justify-between">
                    <span>5-Point NIST Traceable</span>
                    <span className="text-[10px] bg-amber-500 text-slate-950 font-bold px-1.5 py-0.2 rounded">RECOMMENDED</span>
                  </div>
                  <div className="text-[10px] opacity-70">Full hysteresis curve, serial data & PDF seal</div>
                  <div className="font-mono text-[10px] font-medium mt-1 text-emerald-400">NABL Accredited Lab</div>
                </button>
              </div>
            </div>

            {/* Plant Tagging & Quantity Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3 border-t border-slate-200">
              <div>
                <label className={COMPONENT_STYLES.forms.label}>
                  PLANT INSTRUMENT TAG (ENGRAVED ON 316L PLATE)
                </label>
                <input
                  type="text"
                  value={plantTag}
                  onChange={(e) => setPlantTag(e.target.value)}
                  placeholder="e.g. PT-104-B"
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>
                  PROCUREMENT QUANTITY
                </label>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-9 h-9 border border-slate-300 rounded-md bg-white text-slate-800 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-16 h-9 text-center font-mono text-sm border border-slate-300 rounded-md"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-9 h-9 border border-slate-300 rounded-md bg-white text-slate-800 font-bold hover:bg-slate-100 cursor-pointer"
                  >
                    +
                  </button>
                  <span className="text-xs text-slate-500 font-mono">
                    {quantity >= 5 ? 'Bulk discount applied (-10%)' : 'Standard Tier'}
                  </span>
                </div>
              </div>
            </div>

            {/* Contiguous Pricing & Buy Module */}
            <div className="pt-4 border-t border-slate-200 bg-slate-50 -mx-6 -mb-6 p-6 sm:-mx-8 sm:-mb-8 sm:p-8 rounded-b-lg">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                <div>
                  <span className="text-xs font-mono text-slate-500 uppercase block">Commercial Terms</span>
                  <div className="flex items-baseline gap-2 mt-0.5">
                    <span className="font-mono text-xl sm:text-2xl font-bold text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1 rounded">
                      Price on Request (RFQ)
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 font-mono mt-1 block">
                    B2B project quotation & GST invoice generated upon request
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs font-mono text-emerald-800">
                  <PackageCheck className="w-4 h-4 text-emerald-600" />
                  <span>Ships in 2-3 Business Days</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  onClick={handleAddToCart}
                  className={COMPONENT_STYLES.buttons.primary}
                >
                  <span>Add to Procurement Cart</span>
                </button>

                <button
                  onClick={handleRequestRFQ}
                  className={COMPONENT_STYLES.buttons.safety}
                >
                  <span>Add to Project RFQ Tender</span>
                </button>
              </div>

              <div className="mt-3 flex items-center justify-between text-[11px] text-slate-500 font-mono">
                <span>Net 30 Invoicing available for verified EPC accounts</span>
                <span className="flex items-center gap-1">
                  <HelpCircle className="w-3.5 h-3.5" />
                  Engineering support: 1-800-555-INST
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
