import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DetectedFace } from '../types';
import { Colors } from '../constants/Colors';

interface Props {
  face?: DetectedFace;
  onClose: () => void;
}

function MetricRow({ label, value, unit = '', color = Colors.orange }: {
  label: string;
  value: string | number;
  unit?: string;
  color?: string;
}) {
  return (
    <View style={styles.metricRow}>
      <Text style={styles.metricLabel}>{label}</Text>
      <View style={styles.metricValueRow}>
        <Text style={[styles.metricValue, { color }]}>{value}</Text>
        {unit ? <Text style={styles.metricUnit}>{unit}</Text> : null}
      </View>
    </View>
  );
}

function ProbabilityBar({ label, value }: { label: string; value?: number }) {
  const pct = value !== undefined ? Math.round(value * 100) : 0;
  return (
    <View style={styles.probRow}>
      <Text style={styles.probLabel}>{label}</Text>
      <View style={styles.probBarBg}>
        <View style={[styles.probBarFill, { width: `${pct}%` }]} />
      </View>
      <Text style={styles.probValue}>{pct}%</Text>
    </View>
  );
}

export default function FaceMetricsPanel({ face, onClose }: Props) {
  if (!face) return null;

  return (
    <View style={styles.panel}>
      <View style={styles.panelHeader}>
        <View style={styles.panelTitleRow}>
          <View style={styles.orangeDot} />
          <Text style={styles.panelTitle}>FACE ANALYSIS</Text>
          {face.faceID !== undefined && (
            <Text style={styles.faceIdBadge}>ID: {face.faceID + 1}</Text>
          )}
        </View>
        <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
          <Ionicons name="close" size={18} color={Colors.textSecondary} />
        </TouchableOpacity>
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>ORIENTATION</Text>
          <MetricRow
            label="Roll Angle"
            value={face.rollAngle !== undefined ? face.rollAngle.toFixed(1) : 'N/A'}
            unit="°"
          />
          <MetricRow
            label="Yaw Angle"
            value={face.yawAngle !== undefined ? face.yawAngle.toFixed(1) : 'N/A'}
            unit="°"
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>EXPRESSION ANALYSIS</Text>
          <ProbabilityBar label="Smiling" value={face.smilingProbability} />
          <ProbabilityBar label="Left Eye Open" value={face.leftEyeOpenProbability} />
          <ProbabilityBar label="Right Eye Open" value={face.rightEyeOpenProbability} />
        </View>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>BOUNDING BOX</Text>
          <MetricRow
            label="X Position"
            value={Math.round(face.bounds.origin.x)}
            unit="px"
            color={Colors.textPrimary}
          />
          <MetricRow
            label="Y Position"
            value={Math.round(face.bounds.origin.y)}
            unit="px"
            color={Colors.textPrimary}
          />
          <MetricRow
            label="Width"
            value={Math.round(face.bounds.size.width)}
            unit="px"
            color={Colors.textPrimary}
          />
          <MetricRow
            label="Height"
            value={Math.round(face.bounds.size.height)}
            unit="px"
            color={Colors.textPrimary}
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  panel: {
    backgroundColor: Colors.cardBg,
    borderTopWidth: 2,
    borderTopColor: Colors.orange,
    maxHeight: 300,
    paddingBottom: 16,
  },
  panelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  panelTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  orangeDot: {
    width: 8,
    height: 8,
    backgroundColor: Colors.orange,
  },
  panelTitle: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  faceIdBadge: {
    color: Colors.orange,
    fontSize: 10,
    fontWeight: '600',
    backgroundColor: Colors.orangeGlow,
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  closeBtn: {
    padding: 4,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 8,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
    marginBottom: 8,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.border,
    marginHorizontal: 16,
  },
  metricRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 4,
  },
  metricLabel: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  metricValueRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    gap: 3,
  },
  metricValue: {
    fontSize: 14,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  metricUnit: {
    color: Colors.textMuted,
    fontSize: 10,
  },
  probRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 4,
  },
  probLabel: {
    color: Colors.textSecondary,
    fontSize: 11,
    width: 110,
  },
  probBarBg: {
    flex: 1,
    height: 4,
    backgroundColor: Colors.border,
    borderRadius: 2,
    overflow: 'hidden',
  },
  probBarFill: {
    height: '100%',
    backgroundColor: Colors.orange,
    borderRadius: 2,
  },
  probValue: {
    color: Colors.orange,
    fontSize: 11,
    fontWeight: '600',
    width: 34,
    textAlign: 'right',
  },
});
