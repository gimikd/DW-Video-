export interface DetectedFace {
  faceID?: number;
  bounds: {
    origin: { x: number; y: number };
    size: { width: number; height: number };
  };
  rollAngle?: number;
  yawAngle?: number;
  smilingProbability?: number;
  leftEyeOpenProbability?: number;
  rightEyeOpenProbability?: number;
  leftEarPosition?: { x: number; y: number };
  rightEarPosition?: { x: number; y: number };
  leftEyePosition?: { x: number; y: number };
  rightEyePosition?: { x: number; y: number };
  leftMouthPosition?: { x: number; y: number };
  rightMouthPosition?: { x: number; y: number };
  mouthPosition?: { x: number; y: number };
  noseBasePosition?: { x: number; y: number };
}

export interface SessionStats {
  totalDetections: number;
  maxSimultaneous: number;
  sessionStart: Date;
  detectionHistory: DetectionEvent[];
}

export interface DetectionEvent {
  timestamp: Date;
  faceCount: number;
}

export interface CameraSettings {
  facing: 'front' | 'back';
  detectionMode: 'fast' | 'accurate';
  showLandmarks: boolean;
  showMetrics: boolean;
  soundEnabled: boolean;
}
