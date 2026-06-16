export interface RecognitionLevel {
  id: string;
  label: string;
  minPPF: number;
  color: string;
  description: string;
}

export const RECOGNITION_LEVELS: RecognitionLevel[] = [
  { id: 'detection',      label: 'Detection',       minPPF: 8,  color: '#4CAF50', description: 'Presence of a person can be detected' },
  { id: 'observation',    label: 'Observation',     minPPF: 19, color: '#2196F3', description: 'Actions and behavior can be observed' },
  { id: 'recognition',    label: 'Recognition',     minPPF: 40, color: '#FF9800', description: 'A known person can be recognized' },
  { id: 'identification', label: 'FR Identification', minPPF: 60, color: '#F47920', description: 'Face recognition system can identify the subject' },
];

export function calcPPF(hRes: number, hFovDeg: number, distanceFt: number): number {
  if (distanceFt <= 0) return Infinity;
  const hFovRad = (hFovDeg * Math.PI) / 180;
  const sceneWidth = 2 * distanceFt * Math.tan(hFovRad / 2);
  return hRes / sceneWidth;
}

export function maxDistanceForPPF(hRes: number, hFovDeg: number, minPPF: number): number {
  const hFovRad = (hFovDeg * Math.PI) / 180;
  return hRes / (2 * minPPF * Math.tan(hFovRad / 2));
}

export function getRecognitionLevel(ppf: number): RecognitionLevel | null {
  const sorted = [...RECOGNITION_LEVELS].reverse();
  return sorted.find(l => ppf >= l.minPPF) ?? null;
}

export function getPPFColor(ppf: number): string {
  const level = getRecognitionLevel(ppf);
  if (!level) return '#555555';
  return level.color;
}
