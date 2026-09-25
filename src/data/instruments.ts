/**
 * PrecisionMetrics Industrial Instruments Data Model & Mock Inventory
 * Strongly typed specifications, regulatory standards, and parametric data.
 */

export interface InstrumentItem {
  id: string;
  sku: string;
  series: string;
  category: 'pressure' | 'flow' | 'level' | 'temperature' | 'analytical' | 'calibration';
  name: string;
  tagline: string;
  description: string;
  image: string;
  basePrice: number;
  leadTime: string;
  inStock: boolean;
  stockCount: number;
  outputSignal: string;
  accuracy: string;
  processConnection: string;
  wettedMaterial: string;
  certifications: string[];
  specs: {
    label: string;
    value: string;
  }[];
  applications: string[];
}

export interface CategoryInfo {
  id: InstrumentItem['category'];
  name: string;
  tagline: string;
  description: string;
  itemCount: number;
  primaryRange: string;
  protocol: string;
}

export const INSTRUMENT_CATEGORIES: CategoryInfo[] = [
  {
    id: 'pressure',
    name: 'Pressure & DP Transmitters',
    tagline: 'Gauge, Absolute & Differential Piezoresistive Cells',
    description: 'Hermetically sealed 316L and Hastelloy diaphragms for severe pulsating line pressures and vacuum control.',
    itemCount: 42,
    primaryRange: '-1 to 1000 bar (-14.5 to 14,500 PSI)',
    protocol: '4-20mA HART / Modbus RTU',
  },
  {
    id: 'flow',
    name: 'Electromagnetic & Coriolis Flow',
    tagline: 'Volumetric & Mass Flow for Conductive & Viscous Media',
    description: 'High turn-down ratio meters with unobstructed flow tubes, PTFE/PFA liners, and custody transfer accuracy.',
    itemCount: 28,
    primaryRange: 'DN15 to DN600 (1/2" to 24")',
    protocol: 'HART / Profibus PA / Foundation Fieldbus',
  },
  {
    id: 'level',
    name: 'Guided Wave & Radar Level',
    tagline: '80 GHz High-Frequency & TDR Guided Wave Transmitters',
    description: 'Continuous liquid and bulk solid level monitoring immune to vapors, foaming, agitation, and extreme dust.',
    itemCount: 31,
    primaryRange: 'Measuring distance up to 80 meters',
    protocol: '4-20mA HART 7.0 / IO-Link',
  },
  {
    id: 'temperature',
    name: 'RTD & Thermocouple Transmitters',
    tagline: 'Pt100 Class A Assemblies with Barstock Thermowells',
    description: 'Spring-loaded industrial sensors with flanged thermowells for high-velocity steam and cryogenic pipelines.',
    itemCount: 36,
    primaryRange: '-200°C to +1300°C (-328°F to 2372°F)',
    protocol: 'HART / Dual Pt100 / Modbus',
  },
  {
    id: 'analytical',
    name: 'Process Analytical Sensors',
    tagline: 'Toroidal Conductivity, Optical DO & pH/ORP Probes',
    description: 'Direct in-line analysis for chemical concentration, wastewater effluent, and sanitary fermentation vessels.',
    itemCount: 19,
    primaryRange: '0.00 to 14.00 pH · 0 to 2000 mS/cm',
    protocol: '4-20mA / Memosens Digital',
  },
  {
    id: 'calibration',
    name: 'Calibration Standards & Communicators',
    tagline: 'Handheld Field Communicators & Hydraulic Deadweight Testers',
    description: 'ISO 17025 accredited benchtop calibrators, dry block baths, and intrinsically safe field communicators.',
    itemCount: 15,
    primaryRange: 'Pressure generation to 700 bar · ±0.01% FS',
    protocol: 'Universal Fieldbus / WirelessHART',
  },
];

export const FEATURED_INSTRUMENTS: InstrumentItem[] = [
  {
    id: 'px-8400',
    sku: 'PX-8400-HART-A2',
    series: 'Series 8400',
    category: 'pressure',
    name: 'PX-8400 Smart Differential Pressure Transmitter',
    tagline: 'High-Precision Piezoresistive DP Cell with Multivariable Diagnostics',
    description: 'Engineered for critical custody transfer, level measurement on pressurized vessels, and orifice plate flow monitoring with internal line pressure logging.',
    image: '/src/assets/images/product_pressure_trans_1790233384666.jpg',
    basePrice: 148000,
    leadTime: 'In Stock · Ships Tomorrow',
    inStock: true,
    stockCount: 32,
    outputSignal: '4-20mA HART 7.0 / SIL 2 Capable',
    accuracy: '±0.040% of calibrated span',
    processConnection: '1/2" NPT Female / Coplanar Flange',
    wettedMaterial: 'Hastelloy C-276 / 316L SS',
    certifications: ['ATEX II 1G EX IA IIC T4', 'SIL 2 / SIL 3', 'NIST TRACEABLE', 'NACE MR0175'],
    specs: [
      { label: 'Calibrated Span', value: '-100 to 2500 mbar (-40 to 1000 inH2O)' },
      { label: 'Overpressure Limit', value: '160 bar (2320 PSI)' },
      { label: 'Ambient Temperature', value: '-40°C to +85°C (-40°F to 185°F)' },
      { label: 'Turn-Down Ratio', value: '100:1 Dynamic Turndown' },
      { label: 'Housing Rating', value: 'IP67 / NEMA 4X Dual-Chamber Cast Aluminum' },
      { label: 'Electrical Entry', value: 'M20 x 1.5 or 1/2" NPT Conduit' },
    ],
    applications: ['Oil & Gas Refineries', 'Steam Drum Level Control', 'Chemical Reactor DP', 'Natural Gas Pipelines'],
  },
  {
    id: 'fmg-520',
    sku: 'FMG-520-DN50-PTFE',
    series: 'Series 500',
    category: 'flow',
    name: 'FMG-520 Industrial Magnetic Flowmeter',
    tagline: 'Obstructionless Bore with High-Purity Virgin PTFE Liner',
    description: 'Bidi-directional electromagnetic flowmeter designed for corrosive slurries, chemical dosing, cooling loops, and conductive industrial wastewater.',
    image: '/src/assets/images/product_flow_meter_1790233396101.jpg',
    basePrice: 195000,
    leadTime: 'In Stock · Ships 48h',
    inStock: true,
    stockCount: 18,
    outputSignal: 'Pulse / 4-20mA / Modbus RS485',
    accuracy: '±0.2% of measured flow value',
    processConnection: 'DN50 (2") ANSI 150# Raised Face Flange',
    wettedMaterial: 'Hastelloy C Electrodes / PTFE Liner',
    certifications: ['ATEX EX D IIB T6', 'ISO 17025 5-POINT', 'CE PED EN 1092-1'],
    specs: [
      { label: 'Nominal Diameter', value: 'DN50 (2 Inch Bore)' },
      { label: 'Minimum Conductivity', value: '≥ 5 μS/cm' },
      { label: 'Fluid Temperature', value: '-20°C to +150°C (-4°F to 302°F)' },
      { label: 'Process Pressure', value: 'PN40 / ANSI Class 300' },
      { label: 'Converter Head', value: 'Remote or Compact IP68 Submersible' },
      { label: 'Power Supply', value: '85-265 VAC or 24 VDC Industrial' },
    ],
    applications: ['Chemical Dosing', 'Wastewater Treatment', 'Acid & Caustic Lines', 'Paper Pulp Slurry'],
  },
  {
    id: 'gwr-920',
    sku: 'GWR-920-80GHZ-S2',
    series: 'Series 900',
    category: 'level',
    name: 'GWR-920 Guided Wave Radar Level Transmitter',
    tagline: 'Time-Domain Reflectometry (TDR) for Liquids & Bulk Solids',
    description: 'High-frequency TDR radar sensor immune to heavy steam, surface turbulence, condensation, and shifting dielectric constants.',
    image: '/src/assets/images/product_radar_level_1790233408262.jpg',
    basePrice: 172000,
    leadTime: 'In Stock · Ships Tomorrow',
    inStock: true,
    stockCount: 22,
    outputSignal: '4-20mA HART 7.0 / Foundation Fieldbus',
    accuracy: '±2 mm over full probe length',
    processConnection: '1.5" NPT Thread / 2" ANSI 300# Flange',
    wettedMaterial: '316L SS Rod Probe / FFKM Seal',
    certifications: ['ATEX II 1/2G EX IA/D', 'SIL 2 COMPLIANT', 'NIST ACCREDITED'],
    specs: [
      { label: 'Measuring Range', value: '0.3 to 30.0 meters (1 to 98 ft)' },
      { label: 'Dielectric Constant (εr)', value: 'Minimum εr ≥ 1.4' },
      { label: 'Process Pressure', value: '-1 to 40 bar (-14.5 to 580 PSI)' },
      { label: 'Process Temperature', value: '-50°C to +250°C (-58°F to 482°F)' },
      { label: 'Probe Geometry', value: 'Single Coaxial or 8mm Rigid Rod' },
      { label: 'Echo Curve Display', value: 'Graphic Backlit Matrix on Sensor Head' },
    ],
    applications: ['Hydrocarbon Storage Tanks', 'Boiler Condensate Sumps', 'Silos & Plastic Pellets', 'Distillation Columns'],
  },
  {
    id: 'tt-310',
    sku: 'TT-310-PT100-WELD',
    series: 'Series 300',
    category: 'temperature',
    name: 'TT-310 Industrial RTD Temperature Assembly',
    tagline: 'Pt100 4-Wire Duplex with Drilled Barstock Flanged Thermowell',
    description: 'Spring-loaded RTD temperature assembly with integrated head-mounted HART transmitter, certified for extreme fluid velocity and vortex-induced vibrations.',
    image: '/src/assets/images/product_temp_sensor_1790233419819.jpg',
    basePrice: 78000,
    leadTime: 'In Stock · Ships Tomorrow',
    inStock: true,
    stockCount: 45,
    outputSignal: '4-20mA HART / Pt100 RTD Class A',
    accuracy: '±0.15°C at 0°C (IEC 60751)',
    processConnection: '1.5" ANSI 300# Raised Face Flange',
    wettedMaterial: 'Solid Barstock 316L SS (ASME PTC 19.3 TW)',
    certifications: ['ATEX EX D IIC T6', 'IECEx CERTIFIED', 'NIST 3-POINT CAL'],
    specs: [
      { label: 'Measurement Range', value: '-50°C to +450°C (-58°F to 842°F)' },
      { label: 'Sensor Element', value: 'Duplex Pt100 Class A 4-Wire RTD' },
      { label: 'Thermowell Immersion (U)', value: '250 mm (10") Tapered Shank' },
      { label: 'Barstock Material', value: 'ASTM A182 F316/316L' },
      { label: 'Response Time (t0.9)', value: '18 seconds in water at 0.4 m/s' },
      { label: 'Terminal Enclosure', value: 'Die-cast aluminum, dual M20 entries' },
    ],
    applications: ['High-Pressure Steam Lines', 'Chemical Reactors', 'Turbine Exhaust Monitoring', 'Food & Dairy CIP Lines'],
  },
];

export const INDUSTRY_SOLUTIONS = [
  {
    id: 'oil-gas',
    title: 'Oil & Gas & Petrochemical',
    lead: 'Explosion-proof transmitters certified to ATEX/IECEx Zone 0 and NACE MR0175 sour service.',
    stat: '4,800+ Transmitters Installed',
    standards: ['ATEX Ex d/ia', 'SIL 3 Verified', 'NACE MR0175'],
    keyModels: ['PX-8400 DP Cell', 'GWR-920 Radar Level'],
  },
  {
    id: 'pharma-biotech',
    title: 'Pharmaceutical & Bio-Processing',
    lead: 'Sanitary Tri-Clamp sensors meeting 3-A, ASME BPE, and FDA 21 CFR Part 11 validation criteria.',
    stat: 'Ra < 0.38 μm Electropolished',
    standards: ['3-A Sanitary 74-06', 'USP Class VI Elastomers', 'CIP/SIP Cleanable'],
    keyModels: ['TT-310 Sanitary RTD', 'FMG-520 Magmeter'],
  },
  {
    id: 'chemical-specialty',
    title: 'Chemical & Specialty Refining',
    lead: 'Corrosion-resistant alloys (Hastelloy C-276, Tantalum, Monel) for aggressive halogenated acids.',
    stat: '100% Wetted Traceability',
    standards: ['DIN EN 10204 3.1', 'ASME B31.3 Piping', 'TUV Functional Safety'],
    keyModels: ['PX-8400 with Tantalum Seal', 'FMG-520 PFA Lined'],
  },
  {
    id: 'water-wastewater',
    title: 'Water, Wastewater & Utilities',
    lead: 'Rugged IP68 submersible flowmeters and radar level instruments for remote pumping stations.',
    stat: 'IP68 10-meter Continuous',
    standards: ['AWWA C701 Standard', 'NSF/ANSI 61 Drinking Water', 'Modbus RTU Telemetry'],
    keyModels: ['FMG-520 Magmeter', 'GWR-920 Radar Level'],
  },
];
