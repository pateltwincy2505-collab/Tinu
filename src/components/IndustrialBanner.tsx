import React from 'react';
import { Phone, MapPin, CheckCircle, ShieldCheck, Award, MessageSquare, ExternalLink } from 'lucide-react';
import calVernierCaliper from '../assets/images/cal_vernier_caliper_1790234177954.jpg';
import calDigitalMicrometer from '../assets/images/cal_digital_micrometer_1790234214280.jpg';
import calMultimeterTrms from '../assets/images/cal_multimeter_trms_1790234252682.jpg';
import calClampMeter from '../assets/images/cal_clamp_meter_1790234264868.jpg';
import calThermalImager from '../assets/images/cal_thermal_imager_1790234289236.jpg';
import imgOscilloscope from '../assets/images/oscilloscope_bench_1790236042799.jpg';
import imgIrThermometer from '../assets/images/ir_thermometer_laser_1790236004376.jpg';
import imgAnemometer from '../assets/images/anemometer_vane_meter_1790236018319.jpg';

interface IndustrialBannerProps {
  onSelectInstrumentName?: (name: string) => void;
  onOpenRFQ?: () => void;
}

export const IndustrialBanner: React.FC<IndustrialBannerProps> = ({
  onSelectInstrumentName,
  onOpenRFQ,
}) => {
  const bannerInstruments = [
    { id: 'vernier-caliper', name: 'Vernier Caliper', image: calVernierCaliper },
    { id: 'digital-micrometer', name: 'Digital Micrometer', image: calDigitalMicrometer },
    { id: 'digital-multimeter', name: 'Digital Multimeter', image: calMultimeterTrms },
    { id: 'digital-clamp-meter', name: 'Clamp Meter', image: calClampMeter },
    { id: 'ir-thermal-imager', name: 'Thermal Imager', image: calThermalImager },
    { id: 'oscilloscope', name: 'Oscilloscope', image: imgOscilloscope },
    { id: 'ir-thermometer', name: 'IR Thermometer', image: imgIrThermometer },
    { id: 'anemometer', name: 'Anemometer', image: imgAnemometer },
  ];

  return (
    <div className="relative overflow-hidden rounded-xl bg-[#0e1117] text-white border border-slate-800 shadow-2xl mb-8">
      {/* Background Decorative Tech Dots */}
      <div 
        className="absolute inset-0 opacity-10 pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(#f59e0b 1px, transparent 1px)`,
          backgroundSize: '18px 18px',
        }}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 relative z-10">
        {/* Left Side: Brand Identity, Highlights, Address & Contact Hotline */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-slate-800 bg-gradient-to-br from-[#0c0d12] via-[#11141d] to-[#161a26]">
          <div className="space-y-4">
            {/* Header Brand Title & Subtitle */}
            <div className="space-y-1">
              <div className="inline-block text-amber-400 text-[11px] font-mono uppercase tracking-widest font-bold">
                Certified Metrology & Industrial Equipment
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-none">
                <span className="text-amber-400">INDUSTRIAL </span>
                <span className="text-white">INSTRUMENTS</span>
              </h2>
              <div className="flex items-center gap-2 pt-1">
                <div className="h-0.5 w-6 bg-amber-400 rounded-full"></div>
                <span className="text-amber-400 italic font-serif text-sm tracking-wide font-medium">
                  The Measurement Zone
                </span>
                <div className="h-0.5 w-6 bg-amber-400 rounded-full"></div>
              </div>
            </div>

            {/* Core Value Propositions */}
            <div className="space-y-2.5 pt-2">
              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <CheckCircle className="w-3.5 h-3.5" />
                </div>
                <span>High Quality Products</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <ShieldCheck className="w-3.5 h-3.5" />
                </div>
                <span>Reliable & Accurate</span>
              </div>

              <div className="flex items-center gap-3 text-xs sm:text-sm font-medium text-slate-200">
                <div className="w-6 h-6 rounded bg-amber-500/20 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/30">
                  <Award className="w-3.5 h-3.5" />
                </div>
                <span>Trusted by Industries</span>
              </div>
            </div>

            {/* Address Information */}
            <div className="pt-2 border-t border-slate-800/80">
              <div className="flex items-start gap-2.5 text-xs text-slate-300">
                <div className="w-6 h-6 rounded bg-slate-800 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 border border-slate-700">
                  <MapPin className="w-3.5 h-3.5" />
                </div>
                <p className="leading-snug">
                  <strong className="text-white block font-semibold">Registered Office & Sales:</strong>
                  125, Om Nagar, Near HDFC Bank, Tarsali, Vadodara, Gujarat – 390009.
                </p>
              </div>
            </div>
          </div>

          {/* Quick Action Contact Row with Required Phone Number */}
          <div className="pt-5 mt-4 border-t border-slate-800 flex flex-wrap items-center gap-3">
            <a
              href="tel:+919429726631"
              className="inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-md font-bold text-xs sm:text-sm transition-colors shadow-md"
            >
              <Phone className="w-4 h-4 fill-slate-950" />
              <span>+91 94297 26631</span>
            </a>

            <a
              href="https://wa.me/919429726631?text=Hello%20Industrial%20Instruments,%20I%20would%20like%20to%20inquire%20about%20instrument%20pricing%20and%20catalogs."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-2 rounded-md font-semibold text-xs transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span>WhatsApp RFQ</span>
            </a>

            {onOpenRFQ && (
              <button
                onClick={onOpenRFQ}
                className="text-xs text-slate-300 hover:text-white border border-slate-700 hover:border-slate-500 px-3 py-2 rounded-md font-medium transition-colors cursor-pointer"
              >
                Tender Inquiries
              </button>
            )}
          </div>
        </div>

        {/* Right Side: 8 Flagship Industrial Instruments Grid Matching Banner */}
        <div className="lg:col-span-7 p-4 sm:p-6 bg-[#090b10] flex flex-col justify-center">
          <div className="flex items-center justify-between mb-3 px-1">
            <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
              Flagship Measurement Showcase
            </span>
            <span className="text-[10px] font-mono text-amber-400 bg-amber-500/10 border border-amber-500/20 px-2 py-0.5 rounded">
              ISO/IEC 17025 Certified
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {bannerInstruments.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectInstrumentName && onSelectInstrumentName(item.name)}
                className="bg-white rounded-lg p-2.5 flex flex-col items-center justify-between text-center group cursor-pointer hover:ring-2 hover:ring-amber-500 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
              >
                <div className="w-full aspect-square bg-slate-50 rounded overflow-hidden mb-2 flex items-center justify-center p-1">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <span className="text-xs font-bold text-slate-900 group-hover:text-amber-600 transition-colors leading-tight">
                  {item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
