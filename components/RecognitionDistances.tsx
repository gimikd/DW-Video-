import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';
import { RECOGNITION_LEVELS, maxDistanceForPPF } from '../utils/ppf';

interface Props {
  hRes: number;
  hFov: number;
  currentDistanceFt: number;
}

export default function RecognitionDistances({ hRes, hFov, currentDistanceFt }: Props) {
  const maxPossibleDist = maxDistanceForPPF(hRes, hFov, RECOGNITION_LEVELS[0].minPPF);

  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>MAX DISTANCES BY RECOGNITION LEVEL</Text>
      {RECOGNITION_LEVELS.map(level => {
        const dist = maxDistanceForPPF(hRes, hFov, level.minPPF);
        const withinRange = currentDistanceFt <= dist;
        const fillPct = Math.min((dist / maxPossibleDist) * 100, 100);

        return (
          <View key={level.id} style={styles.row}>
            <View style={styles.rowLeft}>
              <View style={[styles.dot, { backgroundColor: withinRange ? level.color : Colors.textMuted }]} />
              <Text style={[styles.rowLabel, { color: withinRange ? Colors.white : Colors.textMuted }]}>
                {level.label}
              </Text>
            </View>
            <View style={styles.rowRight}>
              <View style={styles.barTrack}>
                <View
                  style={[
                    styles.barFill,
                    {
                      width: `${fillPct}%` as any,
                      backgroundColor: withinRange ? level.color : Colors.surface,
                    },
                  ]}
                />
                {/* current distance marker */}
                <View
                  style={[
                    styles.marker,
                    {
                      left: `${Math.min((currentDistanceFt / maxPossibleDist) * 100, 100)}%` as any,
                      backgroundColor: Colors.white,
                    },
                  ]}
                />
              </View>
              <Text style={[styles.distValue, { color: withinRange ? level.color : Colors.textMuted }]}>
                {dist.toFixed(0)} ft
              </Text>
            </View>
          </View>
        );
      })}
      <Text style={styles.note}>
        White marker shows current target distance ({currentDistanceFt} ft)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 12,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 2,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  rowLeft: {
    width: 120,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
  },
  rowLabel: {
    fontSize: 12,
    fontWeight: '600',
  },
  rowRight: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  barTrack: {
    flex: 1,
    height: 6,
    backgroundColor: Colors.surface,
    borderRadius: 1,
    overflow: 'visible',
    position: 'relative',
  },
  barFill: {
    height: '100%',
    borderRadius: 1,
  },
  marker: {
    position: 'absolute',
    top: -2,
    width: 2,
    height: 10,
    borderRadius: 1,
  },
  distValue: {
    width: 46,
    fontSize: 13,
    fontWeight: '700',
    textAlign: 'right',
    fontVariant: ['tabular-nums'],
  },
  note: {
    color: Colors.textMuted,
    fontSize: 10,
    fontStyle: 'italic',
    marginTop: 4,
  },
});
