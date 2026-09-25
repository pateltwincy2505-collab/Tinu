import React, { useState, useMemo } from 'react';
import {
  Search,
  SlidersHorizontal,
  LayoutGrid,
  List,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  ShoppingBag,
  ExternalLink,
  ChevronRight,
  ShieldCheck,
  RotateCcw,
  Sparkles,
  Layers,
  ArrowUpDown,
  Compass,
  Check,
  X,
  Gauge,
  Zap,
  Droplets,
  Scale,
} from 'lucide-react';
import {
  REAL_CATALOG_PRODUCTS,
  CATALOG_CATEGORIES,
  RealCatalogProduct,
} from '../data/realCatalog.ts';
import { IndustrialBanner } from './IndustrialBanner.tsx';
import { COMPONENT_STYLES } from '../Theme.ts';

interface CatalogPageProps {
  onSelectProduct: (product: RealCatalogProduct) => void;
  onAddToCart: (product: RealCatalogProduct, qty?: number) => void;
  onOpenRFQ: (product?: RealCatalogProduct) => void;
}

export const CatalogPage: React.FC<CatalogPageProps> = ({
  onSelectProduct,
  onAddToCart,
  onOpenRFQ,
}) => {
  // Filter & Search states
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('all');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [selectedCert, setSelectedCert] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'name'>('recommended');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Comparison tray state
  const [compareList, setCompareList] = useState<RealCatalogProduct[]>([]);
  const [isCompareOpen, setIsCompareOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 2500);
  };

  // Subcategories based on selected category
  const subCategories = useMemo(() => {
    const subs = new Set<string>();
    REAL_CATALOG_PRODUCTS.forEach((p) => {
      if (selectedCategory === 'all' || p.category === selectedCategory) {
        subs.add(p.subCategory);
      }
    });
    return Array.from(subs);
  }, [selectedCategory]);

  // Certifications list
  const availableCerts = useMemo(() => {
    const certs = new Set<string>();
    REAL_CATALOG_PRODUCTS.forEach((p) => {
      p.certifications.forEach((c) => certs.add(c.split(' ')[0]));
    });
    return Array.from(certs).slice(0, 8);
  }, []);

  // Filtered and sorted products
  const filteredProducts = useMemo(() => {
    return REAL_CATALOG_PRODUCTS.filter((item) => {
      // Category filter
      if (selectedCategory !== 'all' && item.category !== selectedCategory) return false;
      // Subcategory filter
      if (selectedSubCategory !== 'all' && item.subCategory !== selectedSubCategory) return false;
      // In-stock filter
      if (inStockOnly && !item.inStock) return false;
      // Certification filter
      if (selectedCert !== 'all' && !item.certifications.some((c) => c.includes(selectedCert))) return false;

      // Text search
      const q = searchQuery.toLowerCase().trim();
      if (!q) return true;
      return (
        item.name.toLowerCase().includes(q) ||
        item.sku.toLowerCase().includes(q) ||
        item.model.toLowerCase().includes(q) ||
        item.subCategory.toLowerCase().includes(q) ||
        item.range.toLowerCase().includes(q) ||
        item.certifications.some((c) => c.toLowerCase().includes(q))
      );
    }).sort((a, b) => {
      if (sortBy === 'name') return a.name.localeCompare(b.name);
      return 0; // recommended default
    });
  }, [selectedCategory, selectedSubCategory, inStockOnly, selectedCert, searchQuery, sortBy]);

  const toggleCompare = (product: RealCatalogProduct) => {
    const exists = compareList.some((p) => p.id === product.id);
    if (exists) {
      setCompareList(compareList.filter((p) => p.id !== product.id));
    } else {
      if (compareList.length >= 4) {
        showToast('Maximum 4 instruments can be compared simultaneously.');
        return;
      }
      setCompareList([...compareList, product]);
      showToast(`Added ${product.sku} to Comparison Matrix`);
    }
  };

  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'precision-measuring':
        return <Scale className="w-5 h-5 text-amber-500" />;
      case 'electrical-solar':
        return <Zap className="w-5 h-5 text-sky-500" />;
      case 'environmental-water':
        return <Droplets className="w-5 h-5 text-emerald-500" />;
      default:
        return <Gauge className="w-5 h-5 text-slate-400" />;
    }
  };

  return (
    <div className="space-y-8 pb-16">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 border border-slate-700 text-white text-xs font-mono px-4 py-2.5 rounded-md shadow-xl flex items-center gap-2 animate-fade-in">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 1. Page Header & Navigation Breadcrumb with Industrial Banner */}
      <div className="space-y-6 border-b border-slate-200 pb-6">
        {/* Banner from INDUSTRIAL INSTRUMENTS - The Measurement Zone */}
        <IndustrialBanner
          onSelectInstrumentName={(name) => {
            const found = REAL_CATALOG_PRODUCTS.find((p) =>
              p.name.toLowerCase().includes(name.toLowerCase()) ||
              name.toLowerCase().includes(p.name.toLowerCase())
            );
            if (found) {
              onSelectProduct(found);
            }
          }}
          onOpenRFQ={onOpenRFQ}
        />

        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-slate-500 mb-1">
              <span>INDUSTRIAL INSTRUMENTS</span>
              <span>/</span>
              <span className="text-slate-900 font-semibold uppercase">
                {selectedCategory === 'all'
                  ? 'The Measurement Zone Catalog'
                  : selectedCategory.replace('-', ' ')}
              </span>
              <span>·</span>
              <span className="text-amber-700 font-bold">{filteredProducts.length} Instruments Available</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
              Product Catalog & Instrument Explorer
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 mt-1 max-w-3xl leading-relaxed">
              Explore our master inventory of precision dimensional measuring tools, electrical & solar test equipment, 
              and environmental & water quality analysis instruments with direct ISO/IEC 17025 calibration certificates.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => onOpenRFQ()}
              className={`${COMPONENT_STYLES.buttons.safety} text-xs py-2 px-3 sm:px-4`}
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Tender RFQ for Multiple Items</span>
            </button>
          </div>
        </div>
      </div>

      {/* 2. Category Hubs Navigation Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {CATALOG_CATEGORIES.filter((c) => c.id !== 'all').map((cat) => {
          const isSelected = selectedCategory === cat.id;
          return (
            <div
              key={cat.id}
              onClick={() => {
                setSelectedCategory(isSelected ? 'all' : cat.id);
                setSelectedSubCategory('all');
              }}
              className={`border rounded-lg p-4 cursor-pointer transition-all flex flex-col justify-between ${
                isSelected
                  ? 'bg-slate-900 text-white border-slate-900 shadow-md ring-2 ring-amber-500'
                  : 'bg-white text-slate-900 border-slate-200 hover:border-slate-400 shadow-2xs'
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div
                    className={`w-9 h-9 rounded flex items-center justify-center ${
                      isSelected ? 'bg-slate-800' : 'bg-slate-100'
                    }`}
                  >
                    {getCategoryIcon(cat.id)}
                  </div>
                  <span
                    className={`text-xs font-mono font-bold px-2 py-0.5 rounded-[3px] ${
                      isSelected
                        ? 'bg-amber-500 text-slate-950'
                        : 'bg-slate-100 text-slate-700 border border-slate-200'
                    }`}
                  >
                    {cat.count} SKUs
                  </span>
                </div>

                <h3 className="text-sm font-bold leading-tight">{cat.label}</h3>
                <p
                  className={`text-xs mt-1 leading-normal ${
                    isSelected ? 'text-slate-300' : 'text-slate-500'
                  }`}
                >
                  {cat.tagline}
                </p>
              </div>

              <div
                className={`mt-3 pt-2 border-t text-[11px] font-mono flex items-center justify-between ${
                  isSelected
                    ? 'border-slate-800 text-amber-400'
                    : 'border-slate-100 text-slate-500'
                }`}
              >
                <span>{cat.standards}</span>
                <span className="font-semibold">{isSelected ? 'Active Filter' : 'Filter Division'}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. Parametric Filter Bar & Controls */}
      <div className="bg-white border border-slate-200 rounded-lg p-4 space-y-3 shadow-2xs">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3 items-center">
          {/* Search Input */}
          <div className="md:col-span-5 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search model, SKU, parameter (e.g. Micrometer, TRMS, pH, MPPT)..."
              className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 text-slate-900 placeholder:text-slate-400 border border-slate-300 rounded-md focus:outline-none focus:border-amber-500 font-mono transition-colors"
            />
          </div>

          {/* Sort By Dropdown */}
          <div className="md:col-span-3">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full py-1.5 px-2.5 text-xs bg-slate-50 border border-slate-300 rounded-md text-slate-800 font-mono focus:outline-none focus:border-amber-500 cursor-pointer"
            >
              <option value="recommended">Sort: Industry Recommended</option>
              <option value="name">Name: Alphabetical (A-Z)</option>
            </select>
          </div>

          {/* Quick Checkboxes & Mode Switcher */}
          <div className="md:col-span-4 flex items-center justify-between gap-3">
            <label className="flex items-center gap-2 text-xs font-mono text-slate-700 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={inStockOnly}
                onChange={(e) => setInStockOnly(e.target.checked)}
                className="w-3.5 h-3.5 accent-amber-600 rounded"
              />
              <span>In-Stock Only</span>
            </label>

            <div className="flex items-center gap-1 border border-slate-200 rounded-md p-0.5 bg-slate-50">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'grid'
                    ? 'bg-white shadow-2xs text-slate-900'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Grid View"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                onClick={() => setViewMode('table')}
                className={`p-1.5 rounded transition-colors cursor-pointer ${
                  viewMode === 'table'
                    ? 'bg-white shadow-2xs text-slate-900'
                    : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Dense Spec Sheet Table View"
              >
                <List className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Subcategory & Certification Filter Chips */}
        <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2">
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="font-mono text-slate-400 text-[11px] mr-1">Subcategory:</span>
            <button
              onClick={() => setSelectedSubCategory('all')}
              className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                selectedSubCategory === 'all'
                  ? 'bg-slate-900 text-white font-semibold'
                  : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
              }`}
            >
              All Types
            </button>
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => setSelectedSubCategory(sub === selectedSubCategory ? 'all' : sub)}
                className={`px-2 py-0.5 rounded text-[11px] font-medium transition-colors cursor-pointer ${
                  selectedSubCategory === sub
                    ? 'bg-slate-900 text-white font-semibold'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                }`}
              >
                {sub}
              </button>
            ))}
          </div>

          {(selectedCategory !== 'all' || selectedSubCategory !== 'all' || searchQuery || inStockOnly) && (
            <button
              onClick={() => {
                setSelectedCategory('all');
                setSelectedSubCategory('all');
                setSearchQuery('');
                setInStockOnly(false);
                setSelectedCert('all');
              }}
              className="text-[11px] font-mono text-amber-700 hover:text-amber-800 flex items-center gap-1 cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>
      </div>

      {/* 4. Active Comparison Tray Floater (if items selected) */}
      {compareList.length > 0 && (
        <div className="bg-slate-900 border border-slate-800 text-white rounded-lg p-3 sm:p-4 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4 animate-fade-in">
          <div className="flex items-center gap-3">
            <Compass className="w-5 h-5 text-amber-400 shrink-0" />
            <div>
              <span className="text-xs font-bold font-mono">
                Comparison Matrix ({compareList.length} of 4 selected)
              </span>
              <div className="flex flex-wrap gap-2 mt-1">
                {compareList.map((p) => (
                  <span
                    key={p.id}
                    className="inline-flex items-center gap-1 text-[11px] font-mono bg-slate-800 text-slate-200 px-2 py-0.5 rounded border border-slate-700"
                  >
                    <span>{p.sku}</span>
                    <button
                      onClick={() => toggleCompare(p)}
                      className="hover:text-rose-400 cursor-pointer"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setCompareList([])}
              className="text-xs text-slate-400 hover:text-white font-mono px-2 py-1"
            >
              Clear
            </button>
            <button
              onClick={() => setIsCompareOpen(true)}
              className={`${COMPONENT_STYLES.buttons.safety} py-1.5 px-3 text-xs`}
            >
              <span>View Side-by-Side Matrix</span>
            </button>
          </div>
        </div>
      )}

      {/* 5. Products Display View (Grid or Dense Table) */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-lg p-16 text-center space-y-4">
          <SlidersHorizontal className="w-12 h-12 text-slate-300 mx-auto" />
          <h3 className="text-base font-bold text-slate-900">No instruments match your filter criteria</h3>
          <p className="text-xs text-slate-500 max-w-sm mx-auto">
            Try broadening your search term, switching categories, or clearing subcategory selections.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('all');
              setSelectedSubCategory('all');
              setSearchQuery('');
              setInStockOnly(false);
            }}
            className={COMPONENT_STYLES.buttons.primary}
          >
            Clear All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filteredProducts.map((p) => {
            const isCompared = compareList.some((item) => item.id === p.id);
            return (
              <div
                key={p.id}
                className="bg-white border border-slate-200 rounded-lg overflow-hidden flex flex-col justify-between hover:border-slate-400 hover:shadow-xl hover:-translate-y-1.5 transition-all duration-200 ease-out group cursor-pointer"
              >
                <div>
                  {/* 4K Aesthetic Studio Photography Canvas */}
                  <div
                    onClick={() => onSelectProduct(p)}
                    className="w-full aspect-4/3 bg-slate-50 relative overflow-hidden cursor-pointer border-b border-slate-100 flex items-center justify-center p-2"
                  >
                    <img
                      src={p.image}
                      alt={p.name}
                      title={p.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300 select-none"
                    />
                    <div className="absolute top-2 left-2">
                      <span className="text-[10px] font-mono text-slate-800 bg-white/95 px-2 py-0.5 rounded-[3px] border border-slate-200 font-semibold shadow-2xs">
                        {p.subCategory}
                      </span>
                    </div>
                    <div className="absolute top-2 right-2">
                      <span className="text-[10px] font-mono text-emerald-800 bg-white/95 px-2 py-0.5 rounded-[3px] border border-emerald-200 font-semibold shadow-2xs">
                        {p.leadTime.split('·')[0]}
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <div className="p-4 space-y-2">
                    <div className="text-[11px] font-mono text-slate-500">
                      SKU: <span className="font-bold text-slate-800">{p.sku}</span>
                    </div>

                    <h3
                      onClick={() => onSelectProduct(p)}
                      className="text-sm font-bold text-slate-900 hover:text-amber-600 transition-colors cursor-pointer line-clamp-2 leading-snug"
                    >
                      {p.name}
                    </h3>

                    {/* Unboxed Metadata (Zero-Pill Discipline) */}
                    <div className="text-xs text-slate-600 space-y-1 pt-1 font-mono">
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">Range:</span>
                        <span className="font-medium text-right truncate max-w-[170px]">{p.range}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">Resolution:</span>
                        <span className="font-medium text-right">{p.resolution}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400 text-[11px]">Accuracy:</span>
                        <span className="font-medium text-right text-slate-900">{p.accuracy}</span>
                      </div>
                    </div>

                    {/* Regulatory Stamps */}
                    <div className="flex flex-wrap gap-1 pt-2">
                      {p.certifications.slice(0, 2).map((cert) => (
                        <span key={cert} className={COMPONENT_STYLES.badges.cert}>
                          {cert.split(' ')[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Card Footer Actions */}
                <div className="p-4 pt-3 border-t border-slate-100 bg-slate-50/60 space-y-2">
                  <div className="flex items-baseline justify-between">
                    <div>
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-mono font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                        Price on Request (RFQ)
                      </span>
                    </div>
                    <button
                      onClick={() => toggleCompare(p)}
                      className={`text-[11px] font-mono transition-colors cursor-pointer flex items-center gap-1 ${
                        isCompared ? 'text-amber-600 font-bold' : 'text-slate-500 hover:text-slate-800'
                      }`}
                    >
                      {isCompared ? <Check className="w-3 h-3 text-amber-600" /> : '+'}
                      <span>Compare</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => onSelectProduct(p)}
                      className={`${COMPONENT_STYLES.buttons.secondary} py-1.5 px-2 text-xs w-full`}
                    >
                      <span>Datasheet</span>
                    </button>
                    <button
                      onClick={() => {
                        onAddToCart(p, 1);
                        showToast(`Added ${p.sku} to Procurement Bag`);
                      }}
                      className={`${COMPONENT_STYLES.buttons.primary} py-1.5 px-2 text-xs w-full`}
                    >
                      <span>Add to Bag</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* Dense Technical Table View (Engineering Procurement Standard) */
        <div className="bg-white border border-slate-200 rounded-lg overflow-x-auto shadow-2xs">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900 text-white font-mono text-[11px] border-b border-slate-800">
                <th className="py-2.5 px-4 font-semibold">SKU / Model</th>
                <th className="py-2.5 px-4 font-semibold">Instrument Name</th>
                <th className="py-2.5 px-4 font-semibold">Category</th>
                <th className="py-2.5 px-4 font-semibold">Measurement Range</th>
                <th className="py-2.5 px-4 font-semibold">Resolution</th>
                <th className="py-2.5 px-4 font-semibold">Accuracy</th>
                <th className="py-2.5 px-4 font-semibold text-right">Commercials</th>
                <th className="py-2.5 px-4 font-semibold text-center">Dispatch</th>
                <th className="py-2.5 px-4 font-semibold text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredProducts.map((p) => (
                <tr key={p.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-2.5 px-4 font-mono font-bold text-slate-900 whitespace-nowrap">
                    {p.sku}
                  </td>
                  <td className="py-2.5 px-4 font-medium text-slate-900">
                    <div className="flex items-center gap-2.5">
                      <img
                        src={p.image}
                        alt={p.name}
                        referrerPolicy="no-referrer"
                        className="w-8 h-8 rounded-[3px] object-cover border border-slate-200 bg-slate-100 shrink-0"
                      />
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="hover:text-amber-600 transition-colors text-left cursor-pointer font-medium"
                      >
                        {p.name}
                      </button>
                    </div>
                  </td>
                  <td className="py-2.5 px-4 text-slate-500 whitespace-nowrap">
                    {p.subCategory}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                    {p.range}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-700 whitespace-nowrap">
                    {p.resolution}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-slate-900 font-semibold whitespace-nowrap">
                    {p.accuracy}
                  </td>
                  <td className="py-2.5 px-4 font-mono text-right whitespace-nowrap">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-[10px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                      Quote on Request
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center whitespace-nowrap">
                    <span className="font-mono text-[10px] text-emerald-800 bg-emerald-50 border border-emerald-200 px-1.5 py-0.5 rounded-[3px]">
                      {p.leadTime.split('·')[0]}
                    </span>
                  </td>
                  <td className="py-2.5 px-4 text-center whitespace-nowrap">
                    <div className="flex items-center justify-center gap-1.5">
                      <button
                        onClick={() => onSelectProduct(p)}
                        className="p-1 text-slate-600 hover:text-slate-900 border border-slate-200 rounded hover:bg-slate-100 cursor-pointer text-[11px]"
                        title="View Full Spec Sheet"
                      >
                        Specs
                      </button>
                      <button
                        onClick={() => {
                          onAddToCart(p, 1);
                          showToast(`Added ${p.sku} to Bag`);
                        }}
                        className="py-1 px-2 text-white bg-slate-900 hover:bg-slate-800 rounded font-semibold text-[11px] cursor-pointer"
                        title="Add to Procurement Bag"
                      >
                        + Bag
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* 6. Side-by-Side Comparison Matrix Modal */}
      {isCompareOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-950/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
          <div className="bg-white border border-slate-300 rounded-lg max-w-5xl w-full shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
            <div className="bg-slate-900 text-white px-6 py-4 flex items-center justify-between border-b border-slate-800">
              <div className="flex items-center gap-2">
                <Compass className="w-5 h-5 text-amber-400" />
                <h3 className="text-base font-bold">Side-by-Side Parametric Comparison Matrix</h3>
              </div>
              <button
                onClick={() => setIsCompareOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 overflow-x-auto p-6">
              <table className="w-full text-xs text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-200">
                    <th className="py-3 px-4 font-mono uppercase text-slate-400 w-48 bg-slate-50">
                      Parameter
                    </th>
                    {compareList.map((c) => (
                      <th key={c.id} className="py-3 px-4 min-w-[200px]">
                        <img
                          src={c.image}
                          alt={c.name}
                          referrerPolicy="no-referrer"
                          className="w-full h-24 object-cover rounded-[4px] border border-slate-200 mb-2 bg-slate-50"
                        />
                        <div className="font-mono text-xs text-amber-600 font-bold">{c.sku}</div>
                        <div className="font-bold text-slate-900 text-sm leading-snug">{c.name}</div>
                        <div className="inline-block font-mono text-xs font-semibold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5 rounded mt-1">
                          Price on Request
                        </div>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-mono">
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Category</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4 text-slate-800">{c.categoryLabel} ({c.subCategory})</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Measuring Range</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4 text-slate-900 font-bold">{c.range}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Resolution</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4 text-slate-800">{c.resolution}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Calibrated Accuracy</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4 text-emerald-700 font-bold">{c.accuracy}</td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Certifications</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4">
                        <div className="flex flex-wrap gap-1">
                          {c.certifications.map((cert) => (
                            <span key={cert} className={COMPONENT_STYLES.badges.cert}>
                              {cert}
                            </span>
                          ))}
                        </div>
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-2.5 px-4 font-semibold text-slate-600 bg-slate-50">Lead Time</td>
                    {compareList.map((c) => (
                      <td key={c.id} className="py-2.5 px-4 text-slate-700">{c.leadTime}</td>
                    ))}
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-slate-50 border-t border-slate-200 px-6 py-3 flex items-center justify-between">
              <span className="text-xs font-mono text-slate-500">
                All parameters NIST traceable to national standards.
              </span>
              <button
                onClick={() => setIsCompareOpen(false)}
                className={COMPONENT_STYLES.buttons.primary}
              >
                Close Comparison
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
