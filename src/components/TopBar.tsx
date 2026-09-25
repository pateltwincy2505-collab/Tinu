import React from 'react';
import { ShoppingBag, FileSpreadsheet, Search, Bot } from 'lucide-react';
import { COMPONENT_STYLES } from '../Theme.ts';

interface TopBarProps {
  cartCount: number;
  currentView: 'homepage' | 'catalog' | 'design-system';
  onNavigateView: (view: 'homepage' | 'catalog' | 'design-system', sectionId?: string) => void;
  onOpenCart: () => void;
  onOpenRFQ: () => void;
  onOpenChat?: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const TopBar: React.FC<TopBarProps> = ({
  cartCount,
  currentView,
  onNavigateView,
  onOpenCart,
  onOpenRFQ,
  onOpenChat,
  searchQuery,
  onSearchChange,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100 shadow-md">
      {/* Main Top Bar: [Brand title] — [Nav links] — [Actions] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zone 1: Brand title & Tagline */}
        <div className="flex items-center gap-4 shrink-0">
          <button
            onClick={() => onNavigateView('homepage', 'hero')}
            className="flex items-center gap-2.5 text-left group transition-colors cursor-pointer"
          >
            <div className="w-9 h-9 rounded-[4px] bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shadow-xs group-hover:bg-amber-400 transition-colors">
              II
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-white leading-tight">
                <span className="text-amber-400">INDUSTRIAL </span>
                <span>INSTRUMENTS</span>
              </div>
              <div className="text-[10px] text-amber-300/80 font-serif italic tracking-wide">
                The Measurement Zone
              </div>
            </div>
          </button>
        </div>

        {/* Zone 2: 4-6 clean text navigation links (Anti-pill text with hover) */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300 shrink-0">
          <button
            onClick={() => onNavigateView('homepage')}
            className={`transition-colors cursor-pointer ${
              currentView === 'homepage' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            Home
          </button>
          <button
            onClick={() => onNavigateView('catalog')}
            className={`transition-colors cursor-pointer flex items-center gap-1 ${
              currentView === 'catalog' ? 'text-amber-400 font-semibold' : 'hover:text-white'
            }`}
          >
            <span>Product Catalog</span>
            <span className="text-[10px] font-mono bg-amber-500/20 text-amber-300 px-1.5 py-0.2 rounded">HD</span>
          </button>
          <button
            onClick={() => onNavigateView('catalog')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Category Hubs
          </button>
          <button
            onClick={() => onNavigateView('homepage', 'rfq-section')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Tender RFQ Desk
          </button>
          <button
            onClick={() => onNavigateView('homepage', 'solutions')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Plant Solutions
          </button>
          <button
            onClick={() => onNavigateView('homepage', 'accreditations')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            ISO 17025 Standards
          </button>
        </nav>

        {/* Global Quick Search Field in Header for quick lookup */}
        <div className="hidden md:flex items-center flex-1 max-w-xs relative mx-2">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Model / Tag / Spec lookup..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-800/90 text-white placeholder:text-slate-400 border border-slate-700 rounded-md focus:outline-none focus:border-amber-500 transition-colors font-mono"
          />
        </div>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3 shrink-0">
          {/* Gemini AI Metrology Assistant Action */}
          {onOpenChat && (
            <button
              onClick={onOpenChat}
              className="relative flex items-center gap-1.5 px-2.5 sm:px-3 py-2 text-xs font-semibold text-amber-300 bg-amber-950/60 hover:bg-amber-900/80 border border-amber-600/60 rounded-md transition-colors cursor-pointer shadow-xs"
              title="Gemini Process & Metrology AI Assistant"
            >
              <Bot className="w-4 h-4 text-amber-400" />
              <span className="hidden sm:inline">Ask Gemini</span>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            </button>
          )}

          {/* RFQ Tender Action */}
          <button
            onClick={onOpenRFQ}
            className={`${COMPONENT_STYLES.buttons.safety} py-2 px-3 sm:px-4 text-xs`}
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-slate-950" />
            <span className="hidden sm:inline">Request RFQ</span>
            <span className="sm:hidden">RFQ</span>
          </button>

          {/* Procurement Cart Action */}
          <button
            onClick={onOpenCart}
            className="relative flex items-center gap-2 px-3 py-2 text-xs font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-md transition-colors cursor-pointer"
          >
            <ShoppingBag className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline font-mono">Bag</span>
            <span className="font-mono text-amber-400 font-bold tabular-nums">
              ({cartCount})
            </span>
          </button>
        </div>
      </div>

      {/* Mobile search bar */}
      <div className="md:hidden px-4 pb-2.5 pt-1 bg-slate-900 border-t border-slate-800">
        <div className="relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search SKU (e.g. PX-8400, FMG-520)..."
            className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-800 text-white placeholder:text-slate-400 border border-slate-700 rounded-md focus:outline-none focus:border-amber-500 font-mono"
          />
        </div>
      </div>
    </header>
  );
};
