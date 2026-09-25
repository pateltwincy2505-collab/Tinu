/**
 * PrecisionMetrics - Industrial Instrumentation & Process Control Platform
 * Application Router & Orchestration:
 * - Homepage (Storefront Portal & Parametric Lookup)
 * - Product Catalog / Instrument Explorer (/catalog) with Category Hubs
 * - Design Tokens & Component Architecture Workbench
 */

import { useState, useEffect } from 'react';
import { TopBar } from './components/TopBar.tsx';
import { Homepage } from './components/Homepage.tsx';
import { CatalogPage } from './components/CatalogPage.tsx';
import { InstrumentDetailModal } from './components/InstrumentDetailModal.tsx';
import { RealProductDetailModal } from './components/RealProductDetailModal.tsx';
import { CartDrawer, CartItem } from './components/CartDrawer.tsx';
import { RFQModal } from './components/RFQModal.tsx';
import { DesignTokensView } from './components/DesignTokensView.tsx';
import { ComponentsView } from './components/ComponentsView.tsx';
import { FEATURED_INSTRUMENTS, InstrumentItem } from './data/instruments.ts';
import { RealCatalogProduct } from './data/realCatalog.ts';
import { GeminiChatModal } from './components/GeminiChatModal.tsx';
import { ShieldCheck, Layers, FileSpreadsheet, Phone, Mail, MapPin, Bot, Sparkles } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState<'homepage' | 'catalog' | 'design-system'>('catalog');
  const [selectedInstrument, setSelectedInstrument] = useState<InstrumentItem | null>(null);
  const [selectedRealProduct, setSelectedRealProduct] = useState<RealCatalogProduct | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [isRealDetailOpen, setIsRealDetailOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isRfqOpen, setIsRfqOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [chatInitialPrompt, setChatInitialPrompt] = useState<string | undefined>(undefined);
  const [rfqPreselected, setRfqPreselected] = useState<{ sku: string; name: string } | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Sync with URL hash for #catalog or #home or /catalog navigation
  useEffect(() => {
    const handleHash = () => {
      const hash = window.location.hash;
      if (hash === '#catalog' || hash === '#/catalog') {
        setCurrentView('catalog');
      } else if (hash === '#tokens') {
        setCurrentView('design-system');
      } else if (hash === '#home') {
        setCurrentView('homepage');
      }
    };
    handleHash();
    window.addEventListener('hashchange', handleHash);
    return () => window.removeEventListener('hashchange', handleHash);
  }, []);

  // Pre-seed cart with 1 authentic line item for EPC realism
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 'cart-1',
      name: FEATURED_INSTRUMENTS[0].name,
      sku: FEATURED_INSTRUMENTS[0].sku,
      image: FEATURED_INSTRUMENTS[0].image,
      quantity: 4,
      plantTag: 'PT-104-A/D',
      calibrationTier: 'nist5pt',
      unitPrice: 0,
    },
  ]);

  // Handler for adding featured process instrument from homepage
  const handleAddToCart = (
    instrument: InstrumentItem,
    qty = 1,
    tag = `PT-${Math.floor(100 + Math.random() * 900)}`,
    cal: 'standard' | 'nist5pt' = 'nist5pt'
  ) => {
    const existingIndex = cartItems.findIndex(
      (item) => item.sku === instrument.sku && item.calibrationTier === cal
    );
    const unitPrice = 0;

    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        name: instrument.name,
        sku: instrument.sku,
        image: instrument.image,
        quantity: qty,
        plantTag: tag,
        calibrationTier: cal,
        unitPrice,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  // Handler for adding real catalog product
  const handleAddRealProductToCart = (
    product: RealCatalogProduct,
    qty = 1,
    tag = `QC-${Math.floor(10 + Math.random() * 90)}`
  ) => {
    const existingIndex = cartItems.findIndex((item) => item.sku === product.sku);
    if (existingIndex > -1) {
      const updated = [...cartItems];
      updated[existingIndex].quantity += qty;
      setCartItems(updated);
    } else {
      const newItem: CartItem = {
        id: `cart-${Date.now()}`,
        name: product.name,
        sku: product.sku,
        image: product.image,
        quantity: qty,
        plantTag: tag,
        calibrationTier: 'standard',
        unitPrice: 0,
      };
      setCartItems([...cartItems, newItem]);
    }
  };

  const handleUpdateQuantity = (id: string, qty: number) => {
    setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: qty } : item)));
  };

  const handleRemoveItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  const handleOpenRFQ = (item?: { sku: string; name: string }) => {
    setRfqPreselected(item || null);
    setIsRfqOpen(true);
  };

  const handleNavigateView = (view: 'homepage' | 'catalog' | 'design-system', sectionId?: string) => {
    setCurrentView(view);
    if (view === 'catalog') {
      window.location.hash = '#catalog';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (view === 'homepage') {
      window.location.hash = '#home';
      if (sectionId) {
        setTimeout(() => {
          const elem = document.getElementById(sectionId);
          elem?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      window.location.hash = '#tokens';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col font-sans antialiased selection:bg-amber-200 selection:text-slate-950">
      {/* 1. Header (Conforming strictly to Top Bar Contract: 3 zones, single wordmark) */}
      <TopBar
        cartCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        currentView={currentView}
        onNavigateView={handleNavigateView}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenRFQ={() => handleOpenRFQ()}
        onOpenChat={() => setIsChatOpen(true)}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* 2. Route & Stage Indicator Strip */}
      <div className="bg-slate-900 border-b border-slate-800 text-slate-300 py-2 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            <span className="text-white font-semibold uppercase">
              {currentView === 'catalog'
                ? 'PRODUCT CATALOG (/catalog) · REAL INDUSTRIAL DATA'
                : currentView === 'homepage'
                ? 'HOMEPAGE PORTAL'
                : 'DESIGN SYSTEM & TOKENS'}
            </span>
            <span className="text-slate-500">|</span>
            <span className="text-slate-400 hidden md:inline">
              {currentView === 'catalog'
                ? '75+ Certified Instruments from HD Industrial Catalogue (Pages 1-22)'
                : 'Precision Process Instrumentation & Parametric Search'}
            </span>
          </div>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto">
            <button
              onClick={() => handleNavigateView('catalog')}
              className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                currentView === 'catalog'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                  : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              Product Catalog (/catalog)
            </button>
            <button
              onClick={() => handleNavigateView('homepage')}
              className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                currentView === 'homepage'
                  ? 'bg-amber-500 text-slate-950 font-bold shadow-2xs'
                  : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              Homepage
            </button>
            <button
              onClick={() => setIsChatOpen(true)}
              className="px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer bg-amber-500/20 text-amber-300 hover:bg-amber-500/30 border border-amber-500/40 font-bold flex items-center gap-1 shadow-2xs"
            >
              <Bot className="w-3.5 h-3.5" />
              <span>Ask Gemini AI</span>
            </button>
            <button
              onClick={() => handleNavigateView('design-system')}
              className={`px-2.5 py-1 rounded-[3px] transition-colors cursor-pointer ${
                currentView === 'design-system'
                  ? 'bg-slate-700 text-white font-bold border border-slate-600'
                  : 'text-slate-400 hover:text-white bg-slate-800'
              }`}
            >
              Design Tokens
            </button>
          </div>
        </div>
      </div>

      {/* 3. Main Viewport Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        {currentView === 'catalog' ? (
          <CatalogPage
            onSelectProduct={(prod) => {
              setSelectedRealProduct(prod);
              setIsRealDetailOpen(true);
            }}
            onAddToCart={handleAddRealProductToCart}
            onOpenRFQ={(prod) => handleOpenRFQ(prod)}
          />
        ) : currentView === 'homepage' ? (
          <Homepage
            onSelectInstrument={(inst) => {
              setSelectedInstrument(inst);
              setIsDetailOpen(true);
            }}
            onAddToCart={handleAddToCart}
            onOpenRFQ={handleOpenRFQ}
            onNavigateToCatalog={() => handleNavigateView('catalog')}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
          />
        ) : (
          <div className="space-y-12">
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <h2 className="text-xl font-bold text-slate-900 mb-1">Design System & Token Architecture Reference</h2>
              <p className="text-xs text-slate-500 mb-6">Verified colors, typography scale, component radii, and regulatory badge specifications.</p>
              <DesignTokensView />
            </div>
            <div className="bg-white border border-slate-200 rounded-lg p-6">
              <ComponentsView />
            </div>
          </div>
        )}
      </main>

      {/* 4. Modals & Drawers */}
      {/* Real Product Detail Modal */}
      <RealProductDetailModal
        product={selectedRealProduct}
        isOpen={isRealDetailOpen}
        onClose={() => {
          setIsRealDetailOpen(false);
          setSelectedRealProduct(null);
        }}
        onAddToCart={handleAddRealProductToCart}
        onOpenRFQ={(p) => handleOpenRFQ(p)}
      />

      {/* Featured Process Instrument Detail Modal */}
      <InstrumentDetailModal
        instrument={selectedInstrument}
        isOpen={isDetailOpen}
        onClose={() => {
          setIsDetailOpen(false);
          setSelectedInstrument(null);
        }}
        onAddToCart={handleAddToCart}
        onAddToRFQ={handleOpenRFQ}
      />

      {/* Procurement Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onOpenRFQ={() => {
          setIsCartOpen(false);
          handleOpenRFQ();
        }}
      />

      {/* RFQ Tender Desk Modal */}
      <RFQModal
        isOpen={isRfqOpen}
        onClose={() => {
          setIsRfqOpen(false);
          setRfqPreselected(null);
        }}
        preselectedInstrument={rfqPreselected}
      />

      {/* Gemini Metrology & Process AI Chatbot Modal */}
      <GeminiChatModal
        isOpen={isChatOpen}
        onClose={() => {
          setIsChatOpen(false);
          setChatInitialPrompt(undefined);
        }}
        initialPrompt={chatInitialPrompt}
      />

      {/* Floating Gemini Chatbot Widget Trigger */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-2">
        <button
          onClick={() => setIsChatOpen(true)}
          className="group relative flex items-center gap-2 px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs rounded-full shadow-2xl border-2 border-amber-300 cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95"
          title="Open Gemini Metrology & Technical Chatbot"
        >
          <div className="relative">
            <Bot className="w-5 h-5 text-slate-950" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white animate-ping"></span>
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-500 rounded-full ring-2 ring-white"></span>
          </div>
          <div className="flex flex-col text-left">
            <span className="font-extrabold leading-tight">Ask Gemini AI</span>
            <span className="text-[10px] text-slate-800 font-mono font-medium">
              Specs · Maps · Standards
            </span>
          </div>
        </button>
      </div>

      {/* 5. Production Industrial Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 text-slate-400 py-12 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {/* Col 1: Brand & Identity */}
            <div className="lg:col-span-2 space-y-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-[4px] bg-amber-500 text-slate-950 font-mono font-black text-xs flex items-center justify-center">
                  II
                </div>
                <div>
                  <span className="font-extrabold text-base text-white tracking-tight font-sans block">
                    <span className="text-amber-400">INDUSTRIAL </span>INSTRUMENTS
                  </span>
                  <span className="text-[11px] text-amber-300 font-serif italic">
                    The Measurement Zone
                  </span>
                </div>
              </div>
              <p className="text-slate-400 text-xs leading-relaxed max-w-sm">
                High quality industrial instruments, reliable & accurate metrology standards, electrical & solar test gear, 
                and environmental analysis tools trusted by industries across India and globally.
              </p>
              <div className="space-y-1.5 text-[11px] font-mono text-slate-300 pt-1">
                <div className="flex items-start gap-2">
                  <MapPin className="w-3.5 h-3.5 text-amber-400 shrink-0 mt-0.5" />
                  <span>125, Om Nagar, Near HDFC Bank, Tarsali, Vadodara, Gujarat – 390009.</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                  <a href="tel:+919429726631" className="text-amber-400 hover:text-amber-300 font-bold transition-colors">
                    +91 94297 26631 (Call / Orders)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span>sales@industrialinstruments.in</span>
                </div>
              </div>
            </div>

            {/* Col 2: Real Catalog Divisions */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Product Divisions</h3>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li>
                  <button
                    onClick={() => handleNavigateView('catalog')}
                    className="hover:text-white cursor-pointer"
                  >
                    Precision Measuring (30 SKUs)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateView('catalog')}
                    className="hover:text-white cursor-pointer"
                  >
                    Electrical & Solar Testing (23 SKUs)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateView('catalog')}
                    className="hover:text-white cursor-pointer"
                  >
                    Environmental & Water (22 SKUs)
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handleNavigateView('homepage', 'featured')}
                    className="hover:text-white cursor-pointer"
                  >
                    Process DP & Flow Transmitters
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: Quality Accreditations */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Quality & Standards</h3>
              <ul className="space-y-2 text-slate-400 font-mono text-[11px]">
                <li>ISO/IEC 17025:2017 #CAL-4921</li>
                <li>DIN 862 / DIN 863 Dimensional</li>
                <li>EN 61010-1 CAT IV Safety</li>
                <li>EN 62446 Solar PV Standard</li>
                <li>ISO 7027 Turbidity Standard</li>
                <li>ASTM A956 Leeb Hardness</li>
              </ul>
            </div>

            {/* Col 4: Procurement & Support */}
            <div>
              <h3 className="font-semibold text-white text-xs uppercase tracking-wider mb-3">Procurement & Orders</h3>
              <ul className="space-y-2 text-slate-400 text-xs">
                <li><button onClick={() => handleOpenRFQ()} className="hover:text-white cursor-pointer">EPC Tender Portal</button></li>
                <li><button onClick={() => setIsCartOpen(true)} className="hover:text-white cursor-pointer">Purchase Order (PO) Desk</button></li>
                <li><button onClick={() => handleNavigateView('catalog')} className="hover:text-white cursor-pointer">Download Datasheets</button></li>
                <li><span className="text-slate-500">Net 30/60 Invoicing</span></li>
                <li><span className="text-slate-500">Same-Day Dispatch Available</span></li>
              </ul>
            </div>
          </div>

          <div className="pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 font-mono text-[11px]">
            <div>
              © 2026 INDUSTRIAL INSTRUMENTS · The Measurement Zone. Vadodara, Gujarat – 390009.
            </div>
            <div className="flex items-center gap-4">
              <span>High Quality Products</span>
              <span>·</span>
              <span>Reliable & Accurate</span>
              <span>·</span>
              <span>Trusted by Industries</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
