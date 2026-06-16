import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';
import { ftToM, mToFt } from '../utils/ppf';

export type DistanceUnit = 'ft' | 'm';

interface Props {
  valueFt: number;
  onChange: (ft: number) => void;
  unit: DistanceUnit;
  onUnitChange: (u: DistanceUnit) => void;
}

const FT_STEPS = [1, 5, 10, 25, 50];
const M_STEPS  = [1, 2, 5, 10, 25];

export default function DistanceInput({ valueFt, onChange, unit, onUnitChange }: Props) {
  const displayVal = unit === 'ft' ? valueFt : Math.round(ftToM(valueFt));
  const steps = unit === 'ft' ? FT_STEPS : M_STEPS;
  const maxVal = unit === 'ft' ? 500 : 150;

  const adjust = (delta: number) => {
    if (unit === 'ft') {
      onChange(Math.max(1, Math.min(500, valueFt + delta)));
    } else {
      const newM = Math.max(1, Math.min(150, Math.round(ftToM(valueFt)) + delta));
      onChange(Math.round(mToFt(newM)));
    }
  };

  const handleTextChange = (t: string) => {
    const n = parseInt(t, 10);
    if (isNaN(n) || n < 1) return;
    if (unit === 'ft' && n <= 500) onChange(n);
    if (unit === 'm' && n <= 150) onChange(Math.round(mToFt(n)));
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.label}>TARGET DISTANCE</Text>

        {/* Unit selector — imperial first */}
        <View style={styles.unitSelector}>
          <TouchableOpacity
            style={[styles.unitOption, unit === 'ft' && styles.unitOptionActive]}
            onPress={() => onUnitChange('ft')}
          >
            <Text style={[styles.unitOptionText, unit === 'ft' && styles.unitOptionTextActive]}>ft</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.unitOption, unit === 'm' && styles.unitOptionActive]}
            onPress={() => onUnitChange('m')}
          >
            <Text style={[styles.unitOptionText, unit === 'm' && styles.unitOptionTextActive]}>m</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.mainRow}>
        <TouchableOpacity style={styles.bigBtn} onPress={() => adjust(-steps[0])}>
          <Ionicons name="remove" size={24} color={Colors.white} />
        </TouchableOpacity>

        <View style={styles.valueWrap}>
          <TextInput
            style={styles.valueInput}
            value={String(displayVal)}
            onChangeText={handleTextChange}
            keyboardType="number-pad"
            selectTextOnFocus
          />
          <Text style={styles.unitLabel}>{unit}</Text>
        </View>

        <TouchableOpacity style={styles.bigBtn} onPress={() => adjust(steps[0])}>
          <Ionicons name="add" size={24} color={Colors.white} />
        </TouchableOpacity>
      </View>

      {/* Metric secondary display */}
      <Text style={styles.secondary}>
        {unit === 'ft'
          ? `≈ ${ftToM(valueFt).toFixed(1)} m`
          : `≈ ${valueFt} ft`}
      </Text>

      <View style={styles.stepRow}>
        {steps.map(s => (
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
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  unitSelector: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.border,
    overflow: 'hidden',
  },
  unitOption: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    backgroundColor: Colors.surface,
  },
  unitOptionActive: {
    backgroundColor: Colors.orange,
  },
  unitOptionText: {
    color: Colors.textMuted,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 1,
  },
  unitOptionTextActive: {
    color: Colors.white,
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
    height: 56,
  },
  valueInput: {
    color: Colors.white,
    fontSize: 34,
    fontWeight: '700',
    textAlign: 'center',
    flex: 1,
    fontVariant: ['tabular-nums'],
  },
  unitLabel: {
    color: Colors.orange,
    fontSize: 16,
    fontWeight: '700',
    letterSpacing: 1,
  },
  secondary: {
    color: Colors.textMuted,
    fontSize: 11,
    textAlign: 'center',
    marginTop: -6,
  },
  stepRow: {
    flexDirection: 'row',
    gap: 6,
  },
  stepBtn: {
    flex: 1,
    paddingVertical: 7,
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
