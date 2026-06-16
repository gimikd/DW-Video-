import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

interface Props {
  value: number;
  onChange: (v: number) => void;
  unit?: 'ft' | 'm';
  onUnitToggle?: () => void;
}

const STEPS = [1, 5, 10, 25, 50];

export default function DistanceInput({ value, onChange, unit = 'ft', onUnitToggle }: Props) {
  const adjust = (delta: number) => {
    const next = Math.max(1, Math.min(500, value + delta));
    onChange(next);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>TARGET DISTANCE</Text>

      <View style={styles.mainRow}>
        <TouchableOpacity style={styles.bigBtn} onPress={() => adjust(-1)}>
          <Ionicons name="remove" size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.valueWrap}>
          <TextInput
            style={styles.valueInput}
            value={String(value)}
            onChangeText={t => {
              const n = parseInt(t, 10);
              if (!isNaN(n) && n >= 1 && n <= 500) onChange(n);
            }}
            keyboardType="number-pad"
            selectTextOnFocus
          />
          <TouchableOpacity onPress={onUnitToggle} style={styles.unitBtn}>
            <Text style={styles.unit}>{unit}</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.bigBtn} onPress={() => adjust(1)}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      <View style={styles.stepRow}>
        {STEPS.map(s => (
          <TouchableOpacity key={s} style={styles.stepBtn} onPress={() => adjust(s)}>
            <Text style={styles.stepText}>+{s}</Text>
          </TouchableOpacity>
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
    gap: 12,
  },
  label: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  bigBtn: {
    width: 48,
    height: 48,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  valueWrap: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.orange,
    paddingHorizontal: 12,
    height: 48,
  },
  valueInput: {
    color: Colors.white,
    fontSize: 28,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    fontVariant: ['tabular-nums'],
  },
  unitBtn: {
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: Colors.orange,
  },
  unit: {
    color: Colors.orange,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 6,
  },
  stepBtn: {
    flex: 1,
    paddingVertical: 6,
    backgroundColor: Colors.surface,
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
  },
  stepText: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '600',
  },
});
