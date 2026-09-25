import React from 'react';
import { ShieldCheck, FileSpreadsheet } from 'lucide-react';
import { COMPONENT_STYLES } from '../Theme.ts';

interface HeaderProps {
  activeTab: 'tokens' | 'components' | 'instrument-sample';
  onSelectTab: (tab: 'tokens' | 'components' | 'instrument-sample') => void;
  onRequestQuoteClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, onSelectTab, onRequestQuoteClick }) => {
  return (
    <header className="sticky top-0 z-40 bg-slate-900 border-b border-slate-800 text-slate-100">
      {/* Top Bar 3-Zone Contract: [Brand wordmark] - [Nav links] - [Primary actions] */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Zone 1: Single text wordmark in display face */}
        <div className="flex items-center gap-3">
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              onSelectTab('tokens');
            }}
            className="flex items-center gap-2 text-lg font-bold tracking-tight text-white hover:text-slate-200 transition-colors cursor-pointer"
          >
            <div className="w-8 h-8 rounded-[3px] bg-amber-500 text-slate-950 font-mono font-black text-sm flex items-center justify-center shadow-xs">
              PM
            </div>
            <span>PrecisionMetrics</span>
          </a>
          <span className="hidden sm:inline-block text-xs font-mono text-slate-400 pl-2 border-l border-slate-700">
            DS-ENG-v1.0
          </span>
        </div>

        {/* Zone 2: Clean text navigation links (anti-pill, text with subtle hover) */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-300">
          <button
            onClick={() => onSelectTab('tokens')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'tokens'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Design Tokens
          </button>
          <button
            onClick={() => onSelectTab('components')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'components'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Core UI Components
          </button>
          <button
            onClick={() => onSelectTab('instrument-sample')}
            className={`transition-colors cursor-pointer pb-0.5 ${
              activeTab === 'instrument-sample'
                ? 'text-amber-400 border-b-2 border-amber-400 font-semibold'
                : 'hover:text-white'
            }`}
          >
            Live Instrument Specimen
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-xs font-mono text-emerald-400 bg-slate-800/80 px-2.5 py-1 rounded-[3px] border border-slate-700">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>ISO 9001:2015 LOCKED</span>
          </div>
          <button
            onClick={onRequestQuoteClick}
            className={COMPONENT_STYLES.buttons.safety}
          >
            <FileSpreadsheet className="w-4 h-4 text-slate-950" />
            <span>RFQ Tender Builder</span>
          </button>
        </div>
      </div>

      {/* Mobile nav row */}
      <div className="md:hidden flex items-center justify-around border-t border-slate-800 bg-slate-950/90 px-3 py-2 text-xs font-medium">
        <button
          onClick={() => onSelectTab('tokens')}
          className={`px-2 py-1 rounded cursor-pointer ${
            activeTab === 'tokens' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
          }`}
        >
          Tokens
        </button>
        <button
          onClick={() => onSelectTab('components')}
          className={`px-2 py-1 rounded cursor-pointer ${
            activeTab === 'components' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
          }`}
        >
          UI Components
        </button>
        <button
          onClick={() => onSelectTab('instrument-sample')}
          className={`px-2 py-1 rounded cursor-pointer ${
            activeTab === 'instrument-sample' ? 'bg-slate-800 text-amber-400' : 'text-slate-400'
          }`}
        >
          Live Specimen
        </button>
      </div>
    </header>
  );
};
