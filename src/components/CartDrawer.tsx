import React, { useState } from 'react';
import { X, Trash2, CheckCircle2, ShieldCheck, ArrowRight, FileText } from 'lucide-react';
import { COMPONENT_STYLES } from '../Theme.ts';
import { InstrumentItem } from '../data/instruments.ts';

export interface CartItem {
  id: string;
  name: string;
  sku: string;
  categoryLabel?: string;
  image?: string;
  quantity: number;
  plantTag: string;
  calibrationTier: 'standard' | 'nist5pt';
  unitPrice: number;
}

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, qty: number) => void;
  onRemoveItem: (id: string) => void;
  onOpenRFQ: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onOpenRFQ,
}) => {
  const [checkoutStep, setCheckoutStep] = useState<'cart' | 'po-form' | 'confirmed'>('cart');
  const [poNumber, setPoNumber] = useState('PO-2026-8841');
  const [epcAccount, setEpcAccount] = useState('Reliance Industries Jamnagar Complex - Account #NET30-IND94');

  if (!isOpen) return null;

  const totalItemsCount = items.reduce((acc, item) => acc + item.quantity, 0);

  const handlePoSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('confirmed');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/60 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full shadow-2xl flex flex-col border-l border-slate-300">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2">
            <h2 className="text-base font-bold">Procurement Bag & PO Desk</h2>
            <span className="font-mono text-xs text-amber-400 bg-slate-800 px-2 py-0.5 rounded-[3px]">
              {items.length} Line {items.length === 1 ? 'Item' : 'Items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {checkoutStep === 'confirmed' ? (
            <div className="p-8 text-center space-y-4">
              <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              </div>
              <h3 className="text-xl font-bold text-slate-900">Purchase Order Transmitted</h3>
              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                Order <span className="font-mono font-bold text-slate-900">ORD-2026-0941</span> has been approved under Net 30 terms for <span className="font-semibold">{epcAccount}</span>.
              </p>
              <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs font-mono text-left space-y-1">
                <div className="text-slate-500">PO Number: <span className="text-slate-900 font-bold">{poNumber}</span></div>
                <div className="text-slate-500">Factory Dispatch: <span className="text-emerald-700 font-bold">2-3 Business Days</span></div>
                <div className="text-slate-500">NIST Serial Vault: <span className="text-sky-700">Auto-generating certificates</span></div>
              </div>
              <button
                onClick={() => {
                  setCheckoutStep('cart');
                  onClose();
                }}
                className={COMPONENT_STYLES.buttons.primary}
              >
                Return to Instrument Catalog
              </button>
            </div>
          ) : checkoutStep === 'po-form' ? (
            <form onSubmit={handlePoSubmit} className="space-y-4">
              <div className="border-b border-slate-200 pb-3">
                <h3 className="text-sm font-bold text-slate-900">B2B Purchase Order (PO) & Net 30 Invoicing</h3>
                <p className="text-xs text-slate-500">Authorized corporate procurement billing.</p>
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>AUTHORIZED CORPORATE ACCOUNT</label>
                <input
                  type="text"
                  required
                  value={epcAccount}
                  onChange={(e) => setEpcAccount(e.target.value)}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>INTERNAL PURCHASE ORDER (PO) NUMBER</label>
                <input
                  type="text"
                  required
                  value={poNumber}
                  onChange={(e) => setPoNumber(e.target.value)}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>FREIGHT CARRIER ACCOUNT (OPTIONAL - COLLECT)</label>
                <input
                  type="text"
                  placeholder="e.g. FedEx Freight #8492019 / UPS Supply Chain"
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div className="bg-slate-50 p-3 rounded border border-slate-200 text-xs font-mono text-slate-700 space-y-1">
                <div className="flex justify-between">
                  <span>Procurement Type:</span>
                  <span className="font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">Custom B2B Quotation (PO)</span>
                </div>
                <div className="text-slate-500 text-[11px]">Payment Due: Net 30 days from bill of lading upon invoice approval</div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCheckoutStep('cart')}
                  className={COMPONENT_STYLES.buttons.secondary}
                >
                  Back to Bag
                </button>
                <button
                  type="submit"
                  className={`${COMPONENT_STYLES.buttons.safety} flex-1`}
                >
                  Confirm & Dispatch PO
                </button>
              </div>
            </form>
          ) : items.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mx-auto text-slate-400">
                <FileText className="w-6 h-6" />
              </div>
              <h3 className="text-base font-semibold text-slate-900">Procurement Bag is Empty</h3>
              <p className="text-xs text-slate-500 max-w-sm mx-auto">
                Explore our certified instruments and add calibrated transmitters to your bill of materials.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-2xs hover:border-slate-300 transition-colors"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex gap-3">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          referrerPolicy="no-referrer"
                          className="w-16 h-16 object-cover rounded-[4px] border border-slate-200 bg-slate-50 shrink-0"
                        />
                      ) : (
                        <div className="w-16 h-16 rounded-[4px] border border-slate-200 bg-slate-100 flex flex-col items-center justify-center text-slate-500 font-mono text-[10px] shrink-0 font-bold">
                          <span>PM</span>
                          <span className="text-[9px] text-slate-400 font-normal">HD-SPEC</span>
                        </div>
                      )}
                      <div>
                        <div className="text-[11px] font-mono text-slate-500">{item.sku}</div>
                        <h4 className="text-xs font-bold text-slate-900 leading-snug">{item.name}</h4>
                        <div className="flex items-center gap-1.5 text-[11px] text-slate-600 mt-1">
                          <span className="font-mono font-semibold bg-slate-100 px-1.5 py-0.5 rounded-[3px] border border-slate-200">
                            Tag: {item.plantTag}
                          </span>
                          <span aria-hidden="true">·</span>
                          <span className="text-sky-700 font-mono">
                            {item.calibrationTier === 'nist5pt' ? 'NIST 5-Point Cal' : 'Factory Cal'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-slate-400 hover:text-rose-600 p-1 cursor-pointer transition-colors"
                      title="Remove line item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Quantity & Unit Price */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                    <div className="flex items-center gap-2">
                      <span className="text-slate-500 font-mono">Qty:</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                        className="w-6 h-6 rounded border border-slate-300 text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        -
                      </button>
                      <span className="font-mono font-bold w-6 text-center">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 rounded border border-slate-300 text-slate-800 font-bold bg-slate-50 hover:bg-slate-100 cursor-pointer"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right font-mono">
                      <span className="inline-block text-[11px] font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded">
                        Quote on Request
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Summary */}
        {items.length > 0 && checkoutStep === 'cart' && (
          <div className="bg-slate-50 border-t border-slate-200 p-6 space-y-4">
            <div className="bg-amber-50/80 border border-amber-200 rounded-md p-3 text-xs font-mono space-y-1.5 text-slate-700">
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Total Items in Bag:</span>
                <span className="text-slate-900 font-bold">{totalItemsCount} Units</span>
              </div>
              <div className="flex justify-between font-semibold text-slate-900">
                <span>Commercial Pricing:</span>
                <span className="text-amber-800 font-bold">Price on Request</span>
              </div>
              <p className="text-[11px] text-slate-600 leading-normal pt-1 border-t border-amber-200/60">
                Official quotation including GST (18%), calibration test certificates, and insured dispatch will be issued upon RFQ submission.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                onClick={() => {
                  onClose();
                  onOpenRFQ();
                }}
                className={COMPONENT_STYLES.buttons.secondary}
              >
                <span>Convert to RFQ</span>
              </button>
              <button
                onClick={() => setCheckoutStep('po-form')}
                className={COMPONENT_STYLES.buttons.safety}
              >
                <span>Checkout via PO</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[11px] font-mono text-slate-500">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Net 30 Invoicing · ISO 9001:2015 Warranty</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
