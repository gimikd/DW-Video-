import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DWHeader from '../../components/DWHeader';
import CameraSelector from '../../components/CameraSelector';
import DistanceInput from '../../components/DistanceInput';
import PPFDisplay from '../../components/PPFDisplay';
import RecognitionDistances from '../../components/RecognitionDistances';
import { DWCamera } from '../../data/cameras';
import { calcPPF } from '../../utils/ppf';
import { DistanceUnit } from '../../components/DistanceInput';
import { Colors } from '../../constants/Colors';

export default function CalculatorScreen() {
  const [camera, setCamera] = useState<DWCamera | null>(null);
  const [distanceFt, setDistanceFt] = useState(25);
  const [unit, setUnit] = useState<DistanceUnit>('ft');

  const ppf = useMemo(() => {
    if (!camera) return 0;
    return calcPPF(camera.hRes, camera.hFovMax, distanceFt);
  }, [camera, distanceFt]);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DWHeader
        title="PPF Calculator"
        subtitle="Pixels Per Foot · Facial Recognition Range"
      />
      <ScrollView contentContainerStyle={styles.scroll} keyboardShouldPersistTaps="handled">

        {/* Camera selector */}
        <View style={styles.section}>
          <Text style={styles.sectionLabel}>CAMERA MODEL</Text>
          <CameraSelector selected={camera} onSelect={setCamera} />
        </View>

        {/* Camera spec summary */}
        {camera && (
          <View style={styles.specCard}>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Resolution</Text>
              <Text style={styles.specVal}>{camera.hRes} × {camera.vRes} ({camera.megapixels}MP)</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>HFOV</Text>
              <Text style={styles.specVal}>
                {camera.hFovMin ? `${camera.hFovMin}° – ` : ''}{camera.hFovMax}°
              </Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Lens</Text>
              <Text style={styles.specVal}>{camera.lens}</Text>
            </View>
            <View style={styles.specRow}>
              <Text style={styles.specKey}>Type</Text>
              <Text style={styles.specVal}>{camera.name}</Text>
            </View>
          </View>
        )}

        {/* Distance input */}
        <View style={styles.section}>
          <DistanceInput
            valueFt={distanceFt}
            onChange={setDistanceFt}
            unit={unit}
            onUnitChange={setUnit}
          />
        </View>

        {/* PPF result */}
        {camera ? (
          <>
            <View style={styles.section}>
              <PPFDisplay ppf={ppf} distanceFt={distanceFt} />
            </View>
            <View style={styles.section}>
              <RecognitionDistances
                hRes={camera.hRes}
                hFov={camera.hFovMax}
                currentDistanceFt={distanceFt}
              />
            </View>
            {camera.hFovMin && (
              <View style={styles.varifocalNote}>
                <Text style={styles.varifocalText}>
                  ⚠ Varifocal lens: above calculation uses widest FOV ({camera.hFovMax}°).
                  At narrowest FOV ({camera.hFovMin}°), recognition distances increase significantly.
                </Text>
              </View>
            )}
          </>
        ) : (
          <View style={styles.emptyState}>
            <Text style={styles.emptyIcon}>📷</Text>
            <Text style={styles.emptyTitle}>Select a Camera</Text>
            <Text style={styles.emptyText}>
              Choose a Digital Watchdog camera model above to calculate the Pixels Per Foot at your target distance.
            </Text>
          </View>
        )}

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  scroll: { padding: 16, gap: 12 },
  section: { gap: 6 },
  sectionLabel: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  specCard: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    borderLeftWidth: 3,
    borderLeftColor: Colors.orange,
    padding: 12,
    gap: 6,
  },
  specRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  specKey: { color: Colors.textMuted, fontSize: 12 },
  specVal: { color: Colors.white, fontSize: 12, fontWeight: '600', textAlign: 'right', flex: 1, paddingLeft: 16 },
  varifocalNote: {
    backgroundColor: 'rgba(255,152,0,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,152,0,0.3)',
    padding: 12,
    borderRadius: 2,
  },
  varifocalText: { color: '#FFB74D', fontSize: 11, lineHeight: 17 },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 48,
    gap: 12,
  },
  emptyIcon: { fontSize: 40 },
  emptyTitle: { color: Colors.white, fontSize: 18, fontWeight: '700' },
  emptyText: { color: Colors.textSecondary, fontSize: 13, textAlign: 'center', lineHeight: 20, paddingHorizontal: 16 },
});
