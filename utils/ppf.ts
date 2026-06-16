export interface RecognitionLevel {
  id: string;
  label: string;
  minPPF: number;
  minPPM: number;
  color: string;
  description: string;
}

// Official DORI standard values
export const RECOGNITION_LEVELS: RecognitionLevel[] = [
  {
    id: 'detect',
    label: 'Detect',
    minPPF: 8,
    minPPM: 25,
    color: '#4CAF50',
    description: 'Presence of a person can be detected',
  },
  {
    id: 'observe',
    label: 'Observe',
    minPPF: 19,
    minPPM: 63,
    color: '#2196F3',
    description: 'Actions and behavior can be observed',
  },
  {
    id: 'recognize',
    label: 'Recognize',
    minPPF: 38,
    minPPM: 125,
    color: '#FF9800',
    description: 'A known person can be recognized',
  },
  {
    id: 'identify',
    label: 'Identify',
    minPPF: 76,
    minPPM: 250,
    color: '#F47920',
    description: 'Subject can be identified for facial recognition',
  },
];

// PPF at a given distance in feet
export function calcPPF(hRes: number, hFovDeg: number, distanceFt: number): number {
  if (distanceFt <= 0) return Infinity;
  const hFovRad = (hFovDeg * Math.PI) / 180;
  const sceneWidthFt = 2 * distanceFt * Math.tan(hFovRad / 2);
  return hRes / sceneWidthFt;
}

// PPM at a given distance in feet
export function calcPPM(hRes: number, hFovDeg: number, distanceFt: number): number {
  return calcPPF(hRes, hFovDeg, distanceFt) * 3.28084;
}

// Max distance (feet) for a given minimum PPF
export function maxDistanceForPPF(hRes: number, hFovDeg: number, minPPF: number): number {
  const hFovRad = (hFovDeg * Math.PI) / 180;
  return hRes / (2 * minPPF * Math.tan(hFovRad / 2));
}

// Max distance (meters) for a given minimum PPF
export function maxDistanceForPPFMeters(hRes: number, hFovDeg: number, minPPF: number): number {
  return maxDistanceForPPF(hRes, hFovDeg, minPPF) * 0.3048;
}

export function getRecognitionLevel(ppf: number): RecognitionLevel | null {
  const sorted = [...RECOGNITION_LEVELS].reverse();
  return sorted.find(l => ppf >= l.minPPF) ?? null;
}

export function getPPFColor(ppf: number): string {
  return getRecognitionLevel(ppf)?.color ?? '#505050';
}

export function ftToM(ft: number): number {
  return ft * 0.3048;
}

export function mToFt(m: number): number {
  return m / 0.3048;
}
