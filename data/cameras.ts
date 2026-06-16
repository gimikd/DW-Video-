export interface DWCamera {
  model: string;
  name: string;
  series: string;
  megapixels: number;
  hRes: number;
  vRes: number;
  hFovMax: number;
  hFovMin?: number;
  lens: string;
  type: 'dome' | 'bullet' | 'turret' | 'fisheye' | 'ptz' | 'multisensor';
  indoor: boolean;
  outdoor: boolean;
  note?: string;
}

export const DW_CAMERAS: DWCamera[] = [

  // ── 2MP / 1080p ──────────────────────────────────────────────────────────
  {
    model: 'DWC-MD72Di28T',
    name: 'MEGApix 2MP Indoor Dome',
    series: 'MEGApix',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 109, lens: '2.8mm Fixed',
    type: 'dome', indoor: true, outdoor: false,
  },
  {
    model: 'DWC-MV72Wi28TW',
    name: 'MEGApix 2MP Vandal Dome Star-Light Plus',
    series: 'MEGApix',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 109, lens: '2.8mm Fixed',
    type: 'dome', indoor: true, outdoor: true,
  },
  {
    model: 'DWC-MV82WiATW',
    name: 'MEGApix 2MP Vandal Dome IVA Varifocal',
    series: 'MEGApix IVA',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 95, hFovMin: 30, lens: '2.8-12mm Varifocal AF',
    type: 'dome', indoor: true, outdoor: true,
  },
  {
    model: 'DWC-MF21M4TIR',
    name: 'MEGApix 2MP Flat Dome',
    series: 'MEGApix',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 86, lens: '4mm Fixed',
    type: 'dome', indoor: true, outdoor: true,
  },
  {
    model: 'DWC-MF2Wi4TW',
    name: 'MEGApix 2MP Vandal Flat Dome',
    series: 'MEGApix',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 86, lens: '4mm Fixed',
    type: 'dome', indoor: true, outdoor: true,
  },
  {
    model: 'DWC-MB62DiVTW',
    name: 'MEGApix 2MP Bullet Varifocal',
    series: 'MEGApix',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 89.6, hFovMin: 27, lens: '2.7-13.5mm Varifocal',
    type: 'bullet', indoor: false, outdoor: true,
  },

  // ── 2MP PTZ ───────────────────────────────────────────────────────────────
  {
    model: 'DWC-MPTZ230XTW',
    name: 'MEGApix 2MP PTZ 30× Zoom',
    series: 'MEGApix PTZ',
    megapixels: 2.1, hRes: 1920, vRes: 1080,
    hFovMax: 62.4, hFovMin: 2.3, lens: '4.3-129mm 30× Optical Zoom',
    type: 'ptz', indoor: false, outdoor: true,
    note: 'PTZ — use narrowest FOV for best FR distance',
  },

  // ── 4MP V-Class ───────────────────────────────────────────────────────────
  {
    model: 'DWC-VSTB04Bi',
    name: 'MEGApix V-Class 4MP Turret',
    series: 'MEGApix V-Class',
    megapixels: 4, hRes: 2560, vRes: 1440,
    hFovMax: 94, lens: '2.8mm Fixed',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-VSDG04Bi',
    name: 'MEGApix V-Class 4MP Vandal Dome',
    series: 'MEGApix V-Class',
    megapixels: 4, hRes: 2560, vRes: 1440,
    hFovMax: 94, lens: '2.8mm Fixed',
    type: 'dome', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-VSBD04MI',
    name: 'MEGApix V-Class 4MP Bullet Varifocal',
    series: 'MEGApix V-Class',
    megapixels: 4, hRes: 2560, vRes: 1440,
    hFovMax: 92, hFovMin: 31, lens: '2.8-12mm Varifocal',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MTT4WIA',
    name: 'MEGApix 4MP Turret Varifocal AF',
    series: 'MEGApix',
    megapixels: 4, hRes: 2592, vRes: 1520,
    hFovMax: 80, hFovMin: 38, lens: '3.3-12mm Varifocal AF',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MTT4Wi28',
    name: 'MEGApix 4MP Turret 2.8mm',
    series: 'MEGApix',
    megapixels: 4, hRes: 2592, vRes: 1520,
    hFovMax: 96, lens: '2.8mm Fixed',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MV84WIA',
    name: 'MEGApix 4MP Vandal Dome Varifocal',
    series: 'MEGApix',
    megapixels: 4, hRes: 2592, vRes: 1520,
    hFovMax: 100, hFovMin: 28, lens: '2.8-12mm Varifocal',
    type: 'dome', indoor: true, outdoor: true,
  },

  // ── 5MP Mx95 — Turret ─────────────────────────────────────────────────────
  {
    model: 'DWC-MT95Wi28TW',
    name: 'MEGApix Mx95 5MP Turret 2.8mm',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 98.5, lens: '2.8mm Fixed',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MT95Wi36TW',
    name: 'MEGApix Mx95 5MP Turret 3.6mm',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 73, lens: '3.6mm Fixed',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MT95WiATW',
    name: 'MEGApix Mx95 5MP Turret Varifocal AF',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 95.1, hFovMin: 30, lens: '2.8-12mm Varifocal AF',
    type: 'turret', indoor: false, outdoor: true,
  },

  // ── 5MP Mx95 — Vandal Dome ────────────────────────────────────────────────
  {
    model: 'DWC-MV95Wi28TW',
    name: 'MEGApix Mx95 5MP Vandal Dome 2.8mm',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 98.5, lens: '2.8mm Fixed',
    type: 'dome', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MV95Wi36TW',
    name: 'MEGApix Mx95 5MP Vandal Dome 3.6mm',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 73, lens: '3.6mm Fixed',
    type: 'dome', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MV95WiATW',
    name: 'MEGApix Mx95 5MP Vandal Dome Varifocal AF',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 95.1, hFovMin: 30, lens: '2.8-12mm Varifocal AF',
    type: 'dome', indoor: false, outdoor: true,
  },

  // ── 5MP Mx95 — Bullet ─────────────────────────────────────────────────────
  {
    model: 'DWC-MB95Wi28TW',
    name: 'MEGApix Mx95 5MP Bullet 2.8mm White',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 98.5, lens: '2.8mm Fixed',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MB95Wi36TW',
    name: 'MEGApix Mx95 5MP Bullet 3.6mm White',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 73, lens: '3.6mm Fixed',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MB95Wi28T',
    name: 'MEGApix Mx95 5MP Bullet 2.8mm Gray',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 98.5, lens: '2.8mm Fixed',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MB95Wi36T',
    name: 'MEGApix Mx95 5MP Bullet 3.6mm Gray',
    series: 'MEGApix Mx95',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 73, lens: '3.6mm Fixed',
    type: 'bullet', indoor: false, outdoor: true,
  },

  // ── 5MP IVA / IVA+ ────────────────────────────────────────────────────────
  {
    model: 'DWC-MV85WiATW',
    name: 'MEGApix IVA+ 5MP Vandal Dome Varifocal',
    series: 'MEGApix IVA+',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 95, hFovMin: 30, lens: '2.8-12mm Varifocal',
    type: 'dome', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MB75Wi4TW',
    name: 'MEGApix 5MP Bullet Star-Light Plus 4mm',
    series: 'MEGApix',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 82.3, lens: '4mm Fixed',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MB45WiATW',
    name: 'MEGApix 5MP Bullet Varifocal',
    series: 'MEGApix',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 95.1, hFovMin: 30, lens: '2.8-12mm Varifocal',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MF5WI4TWDMP',
    name: 'MEGApix 5MP Ultra Low-Profile Dome',
    series: 'MEGApix',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 82.3, lens: '4mm Fixed',
    type: 'dome', indoor: true, outdoor: true,
  },

  // ── 4K / 8MP MEGApix ──────────────────────────────────────────────────────
  {
    model: 'DWC-MPVD8Wi28TW',
    name: 'MEGApix 4K Turret 2.8mm',
    series: 'MEGApix 4K',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 105.5, lens: '2.8mm Fixed',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MPVD8WiATW',
    name: 'MEGApix 4K Dome Varifocal',
    series: 'MEGApix 4K',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 90.3, hFovMin: 33.1, lens: '2.8-12mm Varifocal',
    type: 'dome', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MPV45WiATW',
    name: 'MEGApix 4K Turret Varifocal',
    series: 'MEGApix 4K',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 96, hFovMin: 31, lens: '2.8-12mm Varifocal',
    type: 'turret', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-MPBW8Wi2TW',
    name: 'MEGApix IVA+ 4K Ultra-Wide Bullet',
    series: 'MEGApix IVA+',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 175, lens: '2.3mm Ultra-Wide Fixed',
    type: 'bullet', indoor: false, outdoor: true,
    note: 'Ultra-wide — low PPF. Best for area coverage, not FR.',
  },

  // ── MEGApix Ai 4K ─────────────────────────────────────────────────────────
  {
    model: 'DWC-XSBJ08Mi',
    name: 'MEGApix Ai 4K Bullet Varifocal',
    series: 'MEGApix Ai',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 90.3, hFovMin: 33.1, lens: '2.7-13.5mm Varifocal AF',
    type: 'bullet', indoor: false, outdoor: true,
  },
  {
    model: 'DWC-XSBC08Bi',
    name: 'MEGApix Ai 4K Ultra-Wide Bullet',
    series: 'MEGApix Ai',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 175, lens: '2.3mm Ultra-Wide Fixed',
    type: 'bullet', indoor: false, outdoor: true,
    note: 'Ultra-wide — low PPF. Best for area coverage, not FR.',
  },
  {
    model: 'DWC-XSDJ08Mi',
    name: 'MEGApix Ai 4K Vandal Dome Varifocal',
    series: 'MEGApix Ai',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 90.3, hFovMin: 33.1, lens: '2.7-13.5mm Varifocal AF',
    type: 'dome', indoor: false, outdoor: true,
  },

  // ── 4K PTZ AI ─────────────────────────────────────────────────────────────
  {
    model: 'DWC-XPZA08MI',
    name: 'MEGApix Ai 4K PTZ 40× Zoom',
    series: 'MEGApix Ai',
    megapixels: 8, hRes: 3840, vRes: 2160,
    hFovMax: 63.5, hFovMin: 1.7, lens: '40× Optical Zoom',
    type: 'ptz', indoor: false, outdoor: true,
    note: 'PTZ — use narrowest FOV for best FR distance',
  },

  // ── Fisheye ───────────────────────────────────────────────────────────────
  {
    model: 'DWC-PVF5M1TIR',
    name: 'MEGApix Pano 5MP Fisheye',
    series: 'MEGApix Pano',
    megapixels: 5, hRes: 2592, vRes: 1944,
    hFovMax: 180, lens: '1.55mm Fisheye',
    type: 'fisheye', indoor: false, outdoor: true,
    note: 'Fisheye — PPF very low. Use for mapping, not FR.',
  },
  {
    model: 'DWC-PVF9Di2TW',
    name: 'MEGApix IVA 9MP Outdoor Fisheye',
    series: 'MEGApix Pano',
    megapixels: 9, hRes: 3000, vRes: 3000,
    hFovMax: 185, lens: '2.1mm Fisheye',
    type: 'fisheye', indoor: false, outdoor: true,
    note: 'Fisheye — PPF very low. Use for mapping, not FR.',
  },

  // ── Multi-Sensor / Panoramic ──────────────────────────────────────────────
  {
    model: 'DWC-PDS10Wi28A',
    name: 'MEGApix Ai 10MP Dual-Sensor Dome',
    series: 'MEGApix Ai',
    megapixels: 10, hRes: 2592, vRes: 1944,
    hFovMax: 102.4, lens: '2×2.8mm Fixed',
    type: 'multisensor', indoor: false, outdoor: true,
    note: 'Dual sensor — specs shown per sensor (5MP each)',
  },
  {
    model: 'DWC-PVX20WATX',
    name: 'MEGApix Flex 20MP Quad-Sensor Dome',
    series: 'MEGApix Flex',
    megapixels: 20, hRes: 2592, vRes: 1944,
    hFovMax: 93, hFovMin: 51, lens: '4×2.8-8mm Varifocal',
    type: 'multisensor', indoor: false, outdoor: true,
    note: 'Quad sensor — specs shown per sensor (5MP each)',
  },
  {
    model: 'DWC-PZ21M69TW',
    name: 'MEGApix Pano 21MP 180° Panoramic',
    series: 'MEGApix Pano',
    megapixels: 21, hRes: 3072, vRes: 1728,
    hFovMax: 45, lens: '4×8mm Fixed (180° combined)',
    type: 'multisensor', indoor: false, outdoor: true,
    note: '4-sensor panoramic — specs shown per sensor (~6.4MP each, ~45° HFOV each)',
  },
];
