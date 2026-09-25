import React, { useState } from 'react';
import { X, CheckCircle, FileText, Layers, ShieldCheck, ShoppingBag, Send, Award } from 'lucide-react';
import { RealCatalogProduct } from '../data/realCatalog.ts';
import { COMPONENT_STYLES } from '../Theme.ts';

interface RealProductDetailModalProps {
  product: RealCatalogProduct | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: RealCatalogProduct, qty: number, tag?: string) => void;
  onOpenRFQ: (product: RealCatalogProduct) => void;
}

export const RealProductDetailModal: React.FC<RealProductDetailModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  onOpenRFQ,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [plantTag, setPlantTag] = useState('QC-INSPECT-01');
  const [activeTab, setActiveTab] = useState<'specs' | 'calibration'>('specs');
  const [notification, setNotification] = useState<string | null>(null);

  if (!isOpen || !product) return null;


  const handleAdd = () => {
    onAddToCart(product, quantity, plantTag);
    setNotification(`Added ${quantity}x [${product.sku}] to procurement bag!`);
    setTimeout(() => {
      setNotification(null);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-slate-300 rounded-lg max-w-3xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-3">
            <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded-[3px]">
              {product.sku}
            </span>
            <h2 className="text-base font-bold text-slate-100">{product.name}</h2>
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
            {/* Left Col: Overview & Badges */}
            <div className="md:col-span-5 space-y-4">
              {/* 4K Product Studio Photo */}
              <div className="w-full aspect-4/3 rounded-lg overflow-hidden border border-slate-200 bg-slate-100 shadow-2xs relative">
                <img
                  src={product.image}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute bottom-2 left-2">
                  <span className="text-[10px] font-mono bg-slate-900/80 backdrop-blur-xs text-white px-2 py-0.5 rounded-[3px] border border-slate-700">
                    4K Studio Metrology Photo
                  </span>
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 space-y-3">
                <div className="flex items-center gap-2 text-xs font-mono text-slate-500">
                  <span className="font-semibold text-slate-900">{product.categoryLabel}</span>
                  <span>·</span>
                  <span>{product.subCategory}</span>
                </div>

                <div className="text-sm font-semibold font-mono text-amber-700 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded inline-block">
                  Pricing: Price on Request (RFQ)
                </div>

                <div className="text-xs font-mono text-emerald-700 flex items-center gap-1.5 font-semibold">
                  <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                  <span>{product.leadTime}</span>
                </div>

                <div className="pt-2 border-t border-slate-200">
                  <span className="text-[11px] font-mono font-semibold uppercase text-slate-500 block mb-1.5">
                    Traceable Standards:
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {product.certifications.map((c) => (
                      <span key={c} className={COMPONENT_STYLES.badges.cert}>
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* PDF Datasheet Download */}
              <button
                onClick={() => {
                  setNotification(`Preparing certified technical datasheet for [${product.sku}]... Complete.`);
                  setTimeout(() => setNotification(null), 3000);
                }}
                className="w-full flex items-center justify-center gap-2 p-2.5 bg-white border border-slate-300 rounded-md hover:bg-slate-50 text-slate-800 font-mono text-xs cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-rose-600" />
                <span>Download Certified Datasheet (PDF)</span>
              </button>
            </div>

            {/* Right Col: Specifications & Tabs */}
            <div className="md:col-span-7 space-y-4">
              <div>
                <h3 className="text-base font-bold text-slate-900">{product.name}</h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{product.description}</p>
              </div>

              <div className="flex border-b border-slate-200 text-xs font-medium gap-4">
                <button
                  onClick={() => setActiveTab('specs')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'specs'
                      ? 'border-b-2 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  Technical Parameters
                </button>
                <button
                  onClick={() => setActiveTab('calibration')}
                  className={`pb-2 transition-colors cursor-pointer ${
                    activeTab === 'calibration'
                      ? 'border-b-2 border-amber-500 font-bold text-slate-900'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  ISO 17025 Standards
                </button>
              </div>

              {activeTab === 'specs' ? (
                <div className="border border-slate-200 rounded-md overflow-hidden text-xs">
                  <table className="w-full">
                    <tbody className="divide-y divide-slate-100 font-mono">
                      <tr className="bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-600 w-1/3">Measuring Range</td>
                        <td className="py-2 px-3 text-slate-900 font-bold">{product.range}</td>
                      </tr>
                      <tr>
                        <td className="py-2 px-3 font-semibold text-slate-600">Resolution</td>
                        <td className="py-2 px-3 text-slate-900">{product.resolution}</td>
                      </tr>
                      <tr className="bg-slate-50/50">
                        <td className="py-2 px-3 font-semibold text-slate-600">Calibrated Accuracy</td>
                        <td className="py-2 px-3 text-emerald-700 font-bold">{product.accuracy}</td>
                      </tr>
                      {product.specs.map((s, idx) => (
                        <tr key={idx}>
                          <td className="py-2 px-3 font-semibold text-slate-600">{s.label}</td>
                          <td className="py-2 px-3 text-slate-800">{s.value}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="bg-slate-50 p-4 rounded-md border border-slate-200 text-xs space-y-3">
                  <div className="flex items-center gap-2 font-bold text-slate-900">
                    <Award className="w-4 h-4 text-amber-500" />
                    <span>NIST & National Metrology Traceability</span>
                  </div>
                  <p className="text-slate-600 leading-relaxed text-[11px]">
                    Every {product.name} instrument is individually serialized and verified against master standards 
                    calibrated under ISO/IEC 17025:2017 accreditation. Includes physical printed calibration certificate 
                    with test ambient conditions, standards used, and error matrix.
                  </p>
                </div>
              )}

              {/* Plant Tag & Qty */}
              <div className="pt-2 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className={COMPONENT_STYLES.forms.label}>
                    PLANT / ASSET TAG (OPTIONAL)
                  </label>
                  <input
                    type="text"
                    value={plantTag}
                    onChange={(e) => setPlantTag(e.target.value)}
                    placeholder="e.g. QC-INSPECT-01"
                    className={COMPONENT_STYLES.forms.input}
                  />
                </div>

                <div className="flex items-end justify-between">
                  <div>
                    <label className={COMPONENT_STYLES.forms.label}>QUANTITY</label>
                    <div className="flex items-center gap-2">
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
                  </div>

                  <div className="text-right">
                    <span className="text-[10px] text-slate-400 font-mono block">Commercial Terms</span>
                    <span className="font-mono text-xs font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                      Official Quote on RFQ
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
            <span>Factory Calibration Included · 1-Year Warranty</span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                onOpenRFQ(product);
                onClose();
              }}
              className={`${COMPONENT_STYLES.buttons.secondary} flex-1 sm:flex-initial`}
            >
              <Send className="w-3.5 h-3.5" />
              <span>Request RFQ</span>
            </button>
            <button
              onClick={handleAdd}
              className={`${COMPONENT_STYLES.buttons.safety} flex-1 sm:flex-initial`}
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add to Procurement Bag</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
