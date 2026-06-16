import { useState, useCallback, useRef } from 'react';
import { SessionStats, DetectionEvent } from '../types';

export function useSessionStats() {
  const [stats, setStats] = useState<SessionStats>({
    totalDetections: 0,
    maxSimultaneous: 0,
    sessionStart: new Date(),
    detectionHistory: [],
  });

  const lastCountRef = useRef(0);

  const recordDetection = useCallback((faceCount: number) => {
    if (faceCount === lastCountRef.current) return;
    lastCountRef.current = faceCount;

    setStats(prev => {
      const event: DetectionEvent = { timestamp: new Date(), faceCount };
      const history = [...prev.detectionHistory, event].slice(-100);
      return {
        ...prev,
        totalDetections: faceCount > 0 ? prev.totalDetections + faceCount : prev.totalDetections,
        maxSimultaneous: Math.max(prev.maxSimultaneous, faceCount),
        detectionHistory: history,
      };
    });
  }, []);

  const resetStats = useCallback(() => {
    setStats({
      totalDetections: 0,
      maxSimultaneous: 0,
      sessionStart: new Date(),
      detectionHistory: [],
    });
    lastCountRef.current = 0;
  }, []);

  return { stats, recordDetection, resetStats };
}
