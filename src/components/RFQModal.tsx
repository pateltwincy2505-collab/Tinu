import React, { useState } from 'react';
import { X, FileSpreadsheet, Upload, CheckCircle2, ShieldCheck } from 'lucide-react';
import { COMPONENT_STYLES } from '../Theme.ts';
import { InstrumentItem } from '../data/instruments.ts';

interface RFQModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedInstrument?: { sku: string; name: string } | null;
}

export const RFQModal: React.FC<RFQModalProps> = ({
  isOpen,
  onClose,
  preselectedInstrument,
}) => {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    company: 'Reliance Industries Limited (Jamnagar Complex)',
    contactPerson: 'Rajesh Patel, Lead Process Instrumentation Engineer',
    email: 'procurement.instrumentation@ril-jamnagar.com',
    phone: '+91 98250 88721',
    projectTitle: 'Crude Distillation Unit 4 Modernization (CDU-4)',
    targetDelivery: '2026-12-01',
    scheduleType: 'bom-schedule',
    uploadedFileName: '',
    itemsSummary: preselectedInstrument
      ? `Model ${preselectedInstrument.sku} (${preselectedInstrument.name}) - Estimated 12 units required with 316L SS tag plates and NABL/ATEX calibration certificates in INR billing.`
      : 'Requires formal quotation in INR (₹) for 16x Smart Differential Pressure Transmitters (Coplanar Flange, 4-20mA HART), 4x Coriolis Mass Flowmeters (DN25), and 8x Guided Wave Radar Level Transmitters with 5-point NABL calibration.',
  });

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setFormData({
        ...formData,
        uploadedFileName: file.name,
      });
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white border border-slate-300 rounded-lg max-w-2xl w-full shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <FileSpreadsheet className="w-5 h-5 text-amber-400" />
            <div>
              <h2 className="text-base font-bold">Request for Quote (RFQ) & Tender Desk</h2>
              <p className="text-xs text-slate-400">
                INDUSTRIAL INSTRUMENTS · Vadodara Desk: <a href="tel:+919429726631" className="text-amber-400 hover:underline font-bold">+91 94297 26631</a>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {submitted ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-14 h-14 bg-emerald-50 rounded-full flex items-center justify-center mx-auto border border-emerald-200">
              <CheckCircle2 className="w-8 h-8 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900">RFQ Tender Logged</h3>
            <div className="bg-slate-50 border border-slate-200 rounded-md p-4 text-xs font-mono text-left max-w-md mx-auto space-y-1">
              <div>Tender Reference: <span className="text-slate-900 font-bold">RFQ-2026-T9412</span></div>
              <div>Assigned Division: <span className="text-slate-700">Hydrocarbon & Pressure Applications</span></div>
              <div>Estimated Response: <span className="text-emerald-700 font-semibold">Today before 4:00 PM EST</span></div>
            </div>
            <p className="text-xs text-slate-600 max-w-sm mx-auto">
              A formal line-item commercial proposal with certified dimensional drawings has been dispatched to{' '}
              <span className="font-semibold text-slate-900">{formData.email}</span>.
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                onClose();
              }}
              className={COMPONENT_STYLES.buttons.primary}
            >
              Return to Platform
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={COMPONENT_STYLES.forms.label}>CLIENT / PLANT FACILITY</label>
                <input
                  type="text"
                  required
                  value={formData.company}
                  onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>PROJECT / UNIT NAME</label>
                <input
                  type="text"
                  required
                  value={formData.projectTitle}
                  onChange={(e) => setFormData({ ...formData, projectTitle: e.target.value })}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className={COMPONENT_STYLES.forms.label}>LEAD INSTRUMENTATION ENGINEER</label>
                <input
                  type="text"
                  required
                  value={formData.contactPerson}
                  onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>

              <div>
                <label className={COMPONENT_STYLES.forms.label}>OFFICIAL WORK EMAIL</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className={COMPONENT_STYLES.forms.input}
                />
              </div>
            </div>

            {/* Bill of Materials (BOM) Schedule Upload */}
            <div>
              <label className={COMPONENT_STYLES.forms.label}>
                ATTACH BILL OF MATERIALS / INSTRUMENT DATA SHEET (CSV, XLSX, PDF)
              </label>
              <div className="border-2 border-dashed border-slate-300 hover:border-slate-400 rounded-md p-3 text-center bg-slate-50 relative cursor-pointer">
                <input
                  type="file"
                  onChange={handleFileUpload}
                  accept=".csv,.xlsx,.xls,.pdf"
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
                <div className="text-slate-700 font-medium">
                  {formData.uploadedFileName ? (
                    <span className="text-emerald-700 font-mono font-semibold">
                      Attached: {formData.uploadedFileName}
                    </span>
                  ) : (
                    'Drag & drop Instrument Schedule or click to browse'
                  )}
                </div>
                <div className="text-[10px] text-slate-500 font-mono mt-0.5">
                  ISA-20 Spec Sheets, Excel Tag Schedules up to 25MB
                </div>
              </div>
            </div>

            {/* Instrument Schedule Details */}
            <div>
              <label className={COMPONENT_STYLES.forms.label}>
                LINE-ITEM SPECIFICATIONS & SCOPE DETAILS
              </label>
              <textarea
                rows={4}
                required
                value={formData.itemsSummary}
                onChange={(e) => setFormData({ ...formData, itemsSummary: e.target.value })}
                className={COMPONENT_STYLES.forms.input}
              />
            </div>

            <div className="bg-slate-50 p-3 rounded border border-slate-200 flex items-center justify-between text-[11px] font-mono text-slate-600">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Net 30/60 Invoicing Available Upon Credit Approval</span>
              </div>
              <span>Lead Times Guaranteed</span>
            </div>

            <div className="pt-2 flex items-center justify-end gap-3 border-t border-slate-200">
              <button
                type="button"
                onClick={onClose}
                className={COMPONENT_STYLES.buttons.secondary}
              >
                Cancel
              </button>
              <button
                type="submit"
                className={COMPONENT_STYLES.buttons.safety}
              >
                <span>Submit Tender for Engineering Review</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
