export interface DWCamera {
  model: string;
  name: string;
  megapixels: number;
  hRes: number;
  vRes: number;
  hFovMax: number;
  hFovMin?: number;
  lens: string;
  type: 'dome' | 'bullet' | 'turret' | 'fisheye' | 'ptz' | 'multisensor';
  indoor: boolean;
  outdoor: boolean;
}

export const DW_CAMERAS: DWCamera[] = [
  // 2MP / 1080p
  { model: 'DWC-MD72Di28T', name: 'MEGApix 2MP Indoor Dome', megapixels: 2.1, hRes: 1920, vRes: 1080, hFovMax: 109, lens: '2.8mm Fixed', type: 'dome', indoor: true, outdoor: false },
  { model: 'DWC-MF21M4TIR', name: 'MEGApix 2MP Outdoor Dome', megapixels: 2.1, hRes: 1920, vRes: 1080, hFovMax: 86, lens: '4mm Fixed', type: 'dome', indoor: true, outdoor: true },
  { model: 'DWC-MF2Wi4TW', name: 'MEGApix 2MP Vandal Dome', megapixels: 2.1, hRes: 1920, vRes: 1080, hFovMax: 86, lens: '4mm Fixed', type: 'dome', indoor: true, outdoor: true },
  { model: 'DWC-MB62DiVTW', name: 'MEGApix 2MP Outdoor Bullet', megapixels: 2.1, hRes: 1920, vRes: 1080, hFovMax: 89.6, hFovMin: 27, lens: '2.7-13.5mm Varifocal', type: 'bullet', indoor: false, outdoor: true },
  // 4MP
  { model: 'DWC-VSTB04Bi', name: 'MEGApix V-Class 4MP Turret', megapixels: 4, hRes: 2560, vRes: 1440, hFovMax: 94, lens: '2.8mm Fixed', type: 'turret', indoor: false, outdoor: true },
  { model: 'DWC-VSDG04Mi', name: 'MEGApix V-Class 4MP Dome', megapixels: 4, hRes: 2560, vRes: 1440, hFovMax: 92, hFovMin: 31, lens: '2.8-12mm Varifocal', type: 'dome', indoor: false, outdoor: true },
  { model: 'DWC-MTT4WIA', name: 'MEGApix 4MP Turret AF', megapixels: 4, hRes: 2592, vRes: 1520, hFovMax: 80, hFovMin: 38, lens: '3.3-12mm Varifocal AF', type: 'turret', indoor: false, outdoor: true },
  { model: 'DWC-MTT4Wi28', name: 'MEGApix 4MP Turret 2.8mm', megapixels: 4, hRes: 2592, vRes: 1520, hFovMax: 96, lens: '2.8mm Fixed', type: 'turret', indoor: false, outdoor: true },
  { model: 'DWC-MV84WIA', name: 'MEGApix 4MP Vandal Dome Varifocal', megapixels: 4, hRes: 2592, vRes: 1520, hFovMax: 100, hFovMin: 28, lens: '2.8-12mm Varifocal', type: 'dome', indoor: true, outdoor: true },
  // 5MP
  { model: 'DWC-MF5WI4TWDMP', name: 'MEGApix 5MP Ultra Low-Profile', megapixels: 5, hRes: 2592, vRes: 1944, hFovMax: 96, lens: '4mm Fixed', type: 'dome', indoor: true, outdoor: true },
  { model: 'DWC-MT95WW28TW', name: 'MEGApix 5MP Turret', megapixels: 5, hRes: 2592, vRes: 1944, hFovMax: 94.8, lens: '2.8mm Fixed', type: 'turret', indoor: false, outdoor: true },
  // 8MP / 4K
  { model: 'DWC-MPBW8Wi2TW', name: 'MEGApix IVA+ 8MP Bullet', megapixels: 8, hRes: 3840, vRes: 2160, hFovMax: 102, lens: '2.3mm Ultra-Wide Fixed', type: 'bullet', indoor: false, outdoor: true },
  { model: 'DWC-MPVD8WiATW', name: 'MEGApix 4K Dome Varifocal', megapixels: 8, hRes: 3840, vRes: 2160, hFovMax: 90.3, hFovMin: 33.1, lens: '2.8-12mm Varifocal', type: 'dome', indoor: false, outdoor: true },
  { model: 'DWC-MPV45WiATW', name: 'MEGApix 4K Turret Varifocal', megapixels: 8, hRes: 3840, vRes: 2160, hFovMax: 96, hFovMin: 31, lens: '2.8-12mm Varifocal', type: 'turret', indoor: false, outdoor: true },
  // 10MP
  { model: 'DWC-PDS10Wi28A', name: 'MEGApix AI 10MP Dual-Sensor Dome', megapixels: 10, hRes: 2592, vRes: 1944, hFovMax: 102.4, lens: '2×2.8mm Fixed', type: 'multisensor', indoor: false, outdoor: true },
  // 20MP
  { model: 'DWC-PVX20WATX', name: 'MEGApix Flex 20MP Quad-Sensor', megapixels: 20, hRes: 2592, vRes: 1944, hFovMax: 93, hFovMin: 51, lens: '4×2.8-8mm Varifocal', type: 'multisensor', indoor: false, outdoor: true },
  // PTZ
  { model: 'DWC-XPZA08MI', name: 'MEGApix PTZ 4K AI 40× Zoom', megapixels: 8, hRes: 3840, vRes: 2160, hFovMax: 63.5, hFovMin: 1.7, lens: '40× Optical Zoom', type: 'ptz', indoor: false, outdoor: true },
  // Panoramic
  { model: 'DWC-PV2M4T', name: 'MEGApix 180° Panoramic', megapixels: 6.3, hRes: 5760, vRes: 1080, hFovMax: 180, lens: '3× Fixed Panoramic', type: 'multisensor', indoor: false, outdoor: true },
];
