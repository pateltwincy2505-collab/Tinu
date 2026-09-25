import React, { useState } from 'react';
import { X, CheckCircle, FileText, Layers, ShieldCheck, ShoppingBag, Send } from 'lucide-react';
import { InstrumentItem } from '../data/instruments.ts';
import { COMPONENT_STYLES } from '../Theme.ts';

interface InstrumentDetailModalProps {
  instrument: InstrumentItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (instrument: InstrumentItem, qty: number, tag: string, cal: 'standard' | 'nist5pt') => void;
  onAddToRFQ: (instrument: InstrumentItem) => void;
}

export const InstrumentDetailModal: React.FC<InstrumentDetailModalProps> = ({
  instrument,
  isOpen,
  onClose,
  onAddToCart,
  onAddToRFQ,
}) => {
  const [calTier, setCalTier] = useState<'standard' | 'nist5pt'>('nist5pt');
  const [plantTag, setPlantTag] = useState('PT-104-A');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'specs' | 'wiring' | 'certifications'>('specs');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen || !instrument) return null;


  const handleAdd = () => {
    onAddToCart(instrument, quantity, plantTag, calTier);
    setNotification(`Added ${quantity}x [${instrument.sku}] tagged as "${plantTag}" to procurement cart!`);
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1400);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-slate-300 rounded-lg max-w-4xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded-[3px]">
              {instrument.series}
            </span>
            <h2 className="text-base font-bold text-slate-100">{instrument.name}</h2>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {notification && (
          <div className="bg-emerald-800 text-white text-xs font-mono px-6 py-2.5 flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            <span>{notification}</span>
          </div>
        )}

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
            {/* Left Col: Photo & Certs */}
            <div className="md:col-span-5 space-y-4">
              <div className="aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 relative">
                <img
                  src={instrument.image}
                  alt={instrument.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 left-2 flex flex-wrap gap-1">
                  {instrument.certifications.slice(0, 2).map((c) => (
                    <span key={c} className={COMPONENT_STYLES.badges.cert}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Regulatory Stamps */}
              <div>
                <span className="text-xs font-mono font-semibold uppercase text-slate-500 block mb-1.5">
                  Accreditations & Safe Zones:
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {instrument.certifications.map((c) => (
                    <span key={c} className={COMPONENT_STYLES.badges.cert}>
                      {c}
                    </span>
                  ))}
                </div>
              </div>

              {/* Downloads */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-2 gap-2 text-xs">
                <button
                  onClick={() => {
                    setNotification(`Generating certified PDF datasheet for ${instrument.sku}...`);
                    setTimeout(() => setNotification(null), 2500);
                  }}
                  className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-[3px] hover:border-slate-300 text-slate-700 font-mono text-[11px] cursor-pointer"
                >
                  <FileText className="w-3.5 h-3.5 text-rose-600 shrink-0" />
                  <span>Datasheet.pdf</span>
                </button>
                <button
                  onClick={() => {
                    setNotification(`Preparing 3D CAD STEP file package for ${instrument.sku}...`);
                    setTimeout(() => setNotification(null), 2500);
                  }}
                  className="flex items-center gap-1.5 p-2 bg-slate-50 border border-slate-200 rounded-[3px] hover:border-slate-300 text-slate-700 font-mono text-[11px] cursor-pointer"
                >
                  <Layers className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>Model3D.step</span>
                </button>
              </div>
            </div>

            {/* Right Col: Configuration & Engineering Specs */}
            <div className="md:col-span-7 space-y-5">
              <div>
                <div className="text-xs font-mono text-slate-500">
                  SKU: <span className="font-bold text-slate-800">{instrument.sku}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mt-1">{instrument.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{instrument.description}</p>
              </div>

              {/* Navigation Tabs */}
              <div className="flex border-b border-slate-200 text-xs font-medium gap-4">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Technical Specifications
                </button>
                <button
                  onClick={() => setActiveTab('wiring')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'wiring'
                      ? 'border-b-2 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Terminal & Wiring
                </button>
                <button
                  onClick={() => setActiveTab('certifications')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'certifications'
                      ? 'border-b-2 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Plant Applications
                </button>
              </div>

              {/* Tab: Specs Table */}
              {activeTab === 'specs' && (
                <div className="overflow-x-auto border border-slate-200 rounded-md">
                  <table className="w-full text-xs">
                    <tbody className="divide-y divide-slate-100">
                      {instrument.specs.map((s, idx) => (
                        <tr key={idx} className="hover:bg-slate-50">
                          <td className="py-1.5 px-3 font-semibold text-slate-600 w-1/3 bg-slate-50/50">
                            {s.label}
                          </td>
                          <td className="py-1.5 px-3 font-mono text-slate-900 tabular-nums">
                            {s.value}
                          </td>
                        </tr>
                      ))}
                      <tr className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-semibold text-slate-600 bg-slate-50/50">Wetted Material</td>
                        <td className="py-1.5 px-3 text-slate-900">{instrument.wettedMaterial}</td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="py-1.5 px-3 font-semibold text-slate-600 bg-slate-50/50">Output Protocol</td>
                        <td className="py-1.5 px-3 font-mono text-slate-900">{instrument.outputSignal}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}

              {/* Tab: Wiring */}
              {activeTab === 'wiring' && (
                <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs space-y-3 font-mono">
                  <div className="font-semibold text-slate-800 text-[11px] uppercase">
                    Two-Wire 4-20mA HART Current Loop Schematic
                  </div>
                  <div className="bg-white p-3 rounded border border-slate-200 text-slate-700 text-[11px] leading-relaxed">
                    [Terminal 1 (+)] ─── Power (+) 12-42 VDC (Ex ia Barrier for Zone 0)<br />
                    [Terminal 2 (-)] ─── Signal Return / 250Ω HART Load Resistor<br />
                    [Terminal 3 (G)] ─── Protective Earth Chassis Ground &lt; 1Ω<br />
                    [Test Points] ──── 4-20mA direct milliammeter test terminals
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Dual cable gland entries: M20 x 1.5 standard (1/2" NPT adapter included).
                  </div>
                </div>
              )}

              {/* Tab: Applications */}
              {activeTab === 'certifications' && (
                <div className="space-y-2 text-xs">
                  <div className="text-slate-600">Target Process Environments & Industries:</div>
                  <div className="grid grid-cols-2 gap-2">
                    {instrument.applications.map((app, idx) => (
                      <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded-[3px] text-slate-800 flex items-center gap-2">
                        <span className="w-1.5 h-1.5 bg-amber-500 rounded-full"></span>
                        <span className="font-medium">{app}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Interactive Configuration Options */}
              <div className="pt-2 border-t border-slate-200 space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className={COMPONENT_STYLES.forms.label}>
                      NIST CALIBRATION TIER
                    </label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setCalTier('standard')}
                        className={`flex-1 py-1.5 px-2 text-xs rounded border transition-colors cursor-pointer ${
                          calTier === 'standard'
                            ? 'bg-slate-900 text-white font-semibold'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        Standard
                      </button>
                      <button
                        onClick={() => setCalTier('nist5pt')}
                        className={`flex-1 py-1.5 px-2 text-xs rounded border transition-colors cursor-pointer ${
                          calTier === 'nist5pt'
                            ? 'bg-slate-900 text-white font-semibold'
                            : 'bg-white text-slate-700 border-slate-300'
                        }`}
                      >
                        NIST / NABL 5-Point Calibration
                      </button>
                    </div>
                  </div>

                  <div>
                    <label className={COMPONENT_STYLES.forms.label}>
                      ENGRAVED INSTRUMENT TAG
                    </label>
                    <input
                      type="text"
                      value={plantTag}
                      onChange={(e) => setPlantTag(e.target.value)}
                      placeholder="e.g. PT-104-A"
                      className={COMPONENT_STYLES.forms.input}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">Qty:</span>
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs"
                    >
                      -
                    </button>
                    <span className="font-mono text-xs font-bold w-6 text-center">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-7 h-7 rounded border border-slate-300 bg-white font-bold text-xs"
                    >
                      +
                    </button>
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 block font-mono">Commercial Terms</span>
                    <span className="inline-block text-xs font-bold font-mono text-amber-700 bg-amber-50 border border-amber-200 px-2.5 py-1 rounded">
                      Price on Request (RFQ)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-600" />
            <span>ISO 17025 Certified Calibration Standard</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onAddToRFQ(instrument);
                onClose();
              }}
              className={`${COMPONENT_STYLES.buttons.secondary} flex-1 sm:flex-initial`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Tender RFQ</span>
            </button>
            <button
              onClick={handleAdd}
              className={`${COMPONENT_STYLES.buttons.safety} flex-1 sm:flex-initial`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Procurement Cart</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
