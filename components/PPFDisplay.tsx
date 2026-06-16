import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { RECOGNITION_LEVELS, getRecognitionLevel } from '../utils/ppf';

interface Props {
  ppf: number;
  distanceFt: number;
}

export default function PPFDisplay({ ppf, distanceFt }: Props) {
  const level = getRecognitionLevel(ppf);
  const color = level?.color ?? Colors.textMuted;
  const displayPPF = isFinite(ppf) ? ppf.toFixed(1) : '—';

  const maxPPF = RECOGNITION_LEVELS[RECOGNITION_LEVELS.length - 1].minPPF * 3;
  const fillPct = Math.min((ppf / maxPPF) * 100, 100);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>PIXELS PER FOOT @ {distanceFt} FT</Text>

      <View style={styles.valueRow}>
        <Text style={[styles.ppfValue, { color }]}>{displayPPF}</Text>
        <Text style={styles.ppfUnit}>PPF</Text>
      </View>

      <View style={styles.levelRow}>
        <View style={[styles.levelDot, { backgroundColor: color }]} />
        <Text style={[styles.levelLabel, { color }]}>
          {level ? level.label.toUpperCase() : 'BELOW DETECTION'}
        </Text>
      </View>

      {level && (
        <Text style={styles.levelDesc}>{level.description}</Text>
      )}

      {/* Progress bar across all levels */}
      <View style={styles.barTrack}>
        <View style={[styles.barFill, { width: `${fillPct}%` as any, backgroundColor: color }]} />
        {RECOGNITION_LEVELS.map(l => (
          <View
            key={l.id}
            style={[styles.barMarker, { left: `${Math.min((l.minPPF / maxPPF) * 100, 100)}%` as any }]}
          />
        ))}
      </View>

      <View style={styles.levelTicks}>
        {RECOGNITION_LEVELS.map(l => (
          <Text key={l.id} style={[styles.tickLabel, { color: l.color }]}>{l.minPPF}</Text>
        ))}
      </View>
      <View style={styles.levelNames}>
        {RECOGNITION_LEVELS.map(l => (
          <Text key={l.id} style={styles.tickName} numberOfLines={1}>{l.label.split(' ')[0]}</Text>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 8,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  valueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 8,
  },
  ppfValue: {
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 56,
    fontVariant: ['tabular-nums'],
  },
  ppfUnit: {
    color: Colors.textMuted,
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 2,
  },
  levelRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  levelDot: {
    width: 10,
    height: 10,
  },
  levelLabel: {
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 2,
  },
  levelDesc: {
    color: Colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
  },
  barTrack: {
    height: 8,
    backgroundColor: Colors.surface,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 2,
  },
  barMarker: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: 1,
    backgroundColor: Colors.border,
  },
  levelTicks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 2,
  },
  tickLabel: {
    fontSize: 9,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  levelNames: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  tickName: {
    color: Colors.textMuted,
    fontSize: 8,
    letterSpacing: 0.5,
  },
});
