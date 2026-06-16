import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  label: string;
  value: string | number;
  unit?: string;
  accent?: boolean;
}

export default function StatsCard({ label, value, unit, accent = false }: Props) {
  return (
    <View style={[styles.card, accent && styles.cardAccent]}>
      <Text style={[styles.value, accent && styles.valueAccent]}>{value}</Text>
      {unit && <Text style={styles.unit}>{unit}</Text>}
      <Text style={styles.label}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 14,
    alignItems: 'center',
    minWidth: 80,
  },
  cardAccent: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orangeGlow,
  },
  value: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '700',
    fontVariant: ['tabular-nums'],
  },
  valueAccent: {
    color: Colors.orange,
  },
  unit: {
    color: Colors.textMuted,
    fontSize: 10,
    marginTop: -2,
  },
  label: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '600',
    letterSpacing: 1.5,
    marginTop: 4,
    textTransform: 'uppercase',
  },
});
