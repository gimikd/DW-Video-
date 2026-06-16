import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DWHeader from '../../components/DWHeader';
import StatsCard from '../../components/StatsCard';
import { Colors } from '../../constants/Colors';

interface HistoryItem {
  time: string;
  count: number;
  status: string;
}

const MOCK_HISTORY: HistoryItem[] = [
  { time: '14:32:01', count: 3, status: 'Multiple faces detected' },
  { time: '14:31:47', count: 1, status: 'Single subject tracking' },
  { time: '14:30:12', count: 2, status: 'Dual subject detection' },
  { time: '14:28:55', count: 0, status: 'Area clear' },
  { time: '14:27:30', count: 1, status: 'Subject identified' },
  { time: '14:25:10', count: 4, status: 'Multiple subjects' },
  { time: '14:22:45', count: 1, status: 'Single subject tracking' },
  { time: '14:20:00', count: 0, status: 'Area clear' },
];

export default function AnalyticsScreen() {
  const [sessionDuration] = useState('00:42:15');

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DWHeader title="FACE ANALYTICS" />

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Session Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>SESSION OVERVIEW</Text>
          <View style={styles.statsGrid}>
            <StatsCard label="FACES TODAY" value={24} accent />
            <StatsCard label="MAX SIMULTANEOUS" value={4} />
          </View>
          <View style={styles.statsGrid}>
            <StatsCard label="SESSION DURATION" value={sessionDuration} />
            <StatsCard label="DETECTIONS/MIN" value="0.57" />
          </View>
        </View>

        {/* Activity Chart placeholder */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>ACTIVITY — LAST HOUR</Text>
          <View style={styles.chartContainer}>
            {[3, 1, 4, 2, 0, 3, 1, 2, 4, 1, 3, 2, 0, 1, 3, 4, 2, 1, 3, 0, 2, 4, 1, 3].map((v, i) => (
              <View key={i} style={styles.barCol}>
                <View
                  style={[
                    styles.bar,
                    {
                      height: v === 0 ? 2 : v * 16,
                      backgroundColor: v === 0 ? Colors.border : v >= 3 ? Colors.orange : Colors.orangeDark,
                      opacity: v === 0 ? 0.3 : 1,
                    },
                  ]}
                />
              </View>
            ))}
          </View>
          <View style={styles.chartLegend}>
            <Text style={styles.legendText}>60 min ago</Text>
            <Text style={styles.legendText}>Now</Text>
          </View>
        </View>

        {/* Detection Log */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>DETECTION LOG</Text>
          {MOCK_HISTORY.map((item, index) => (
            <View key={index} style={styles.logRow}>
              <View style={styles.logLeft}>
                <Text style={styles.logTime}>{item.time}</Text>
                <Text style={styles.logStatus}>{item.status}</Text>
              </View>
              <View style={[
                styles.logBadge,
                { borderColor: item.count > 0 ? Colors.orange : Colors.border }
              ]}>
                <Text style={[
                  styles.logCount,
                  { color: item.count > 0 ? Colors.orange : Colors.textMuted }
                ]}>
                  {item.count}
                </Text>
              </View>
            </View>
          ))}
        </View>

        {/* Clear button */}
        <View style={styles.section}>
          <TouchableOpacity style={styles.clearBtn}>
            <Ionicons name="trash-outline" size={16} color={Colors.error} />
            <Text style={styles.clearBtnText}>CLEAR SESSION DATA</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  section: {
    padding: 16,
    gap: 10,
  },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.5,
    marginBottom: 4,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 8,
  },
  chartContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 68,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 12,
    paddingBottom: 8,
    gap: 4,
  },
  barCol: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  bar: {
    width: '80%',
    borderRadius: 1,
    minHeight: 2,
  },
  chartLegend: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  legendText: {
    color: Colors.textMuted,
    fontSize: 9,
    letterSpacing: 1,
  },
  logRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  logLeft: {
    flex: 1,
    gap: 2,
  },
  logTime: {
    color: Colors.textMuted,
    fontSize: 10,
    fontFamily: 'monospace',
    letterSpacing: 1,
  },
  logStatus: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
  logBadge: {
    width: 32,
    height: 32,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logCount: {
    fontSize: 16,
    fontWeight: '700',
  },
  clearBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: Colors.error,
  },
  clearBtnText: {
    color: Colors.error,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
});
