import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import DWHeader from '../../components/DWHeader';
import { RECOGNITION_LEVELS } from '../../utils/ppf';
import { Colors } from '../../constants/Colors';

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <View style={styles.section}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.infoRow}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  );
}

export default function GuideScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DWHeader title="PPF Reference Guide" subtitle="Pixels Per Foot for Facial Recognition" />
      <ScrollView contentContainerStyle={styles.scroll}>

        <Section title="WHAT IS PPF?">
          <Text style={styles.body}>
            Pixels Per Foot (PPF) measures how many pixels cover one linear foot of the scene at a
            given distance from the camera. Higher PPF means more detail and greater ability to
            identify subjects.
          </Text>
          <View style={styles.formula}>
            <Text style={styles.formulaText}>
              PPF = Horizontal Resolution ÷ Scene Width (ft)
            </Text>
            <Text style={styles.formulaNote}>
              Scene Width = 2 × Distance × tan(HFOV ÷ 2)
            </Text>
          </View>
        </Section>

        <Section title="DORI STANDARD — OFFICIAL VALUES">
          {/* Table header */}
          <View style={styles.doriTable}>
            <View style={[styles.doriRow, styles.doriHeader]}>
              <Text style={[styles.doriCell, styles.doriHeaderText, { flex: 1.4 }]}>DORI LEVEL</Text>
              <Text style={[styles.doriCell, styles.doriHeaderText, { textAlign: 'center' }]}>PPM</Text>
              <Text style={[styles.doriCell, styles.doriHeaderText, { textAlign: 'center' }]}>PPF</Text>
            </View>
            {RECOGNITION_LEVELS.map(level => (
              <View key={level.id} style={styles.doriRow}>
                <View style={[styles.levelDot, { backgroundColor: level.color }]} />
                <Text style={[styles.doriCell, { color: level.color, fontWeight: '700', flex: 1.2 }]}>
                  {level.label}
                </Text>
                <Text style={[styles.doriCell, styles.doriNum]}>≥ {level.minPPM}</Text>
                <Text style={[styles.doriCell, styles.doriNum]}>≈ {level.minPPF}</Text>
              </View>
            ))}
          </View>
          {RECOGNITION_LEVELS.map(level => (
            <View key={level.id} style={styles.levelCard}>
              <View style={[styles.levelBar, { backgroundColor: level.color }]} />
              <View style={styles.levelContent}>
                <Text style={[styles.levelName, { color: level.color }]}>{level.label}</Text>
                <Text style={styles.levelDesc}>{level.description}</Text>
              </View>
            </View>
          ))}
        </Section>

        <Section title="FACIAL RECOGNITION SYSTEMS">
          <Text style={styles.body}>
            The DORI "Identify" level (≥ 76 PPF / 250 PPM) is the minimum threshold for automated
            facial recognition (FR) system enrollment and matching. High-confidence forensic-grade
            FR typically requires 100+ PPF.
          </Text>
          <View style={styles.table}>
            <InfoRow label="FR Enrollment / Match" value="≥ 76 PPF (250 PPM)" />
            <InfoRow label="FR High-confidence" value="100+ PPF (328+ PPM)" />
          </View>
        </Section>

        <Section title="DW PRODUCT LINES">
          <View style={styles.table}>
            <InfoRow label="MEGApix" value="AI IP cameras (2–20MP)" />
            <InfoRow label="Blackjack" value="NVR / DVR recorders" />
            <InfoRow label="DW Spectrum" value="Video Management Software" />
            <InfoRow label="DW Cloud" value="Cloud-based VMS" />
          </View>
        </Section>

        <Section title="TIPS FOR HIGHER PPF">
          <Text style={styles.tip}>• Use narrower FOV (telephoto/varifocal at tightest zoom)</Text>
          <Text style={styles.tip}>• Choose higher resolution cameras (4K = 2× the PPF of 1080p)</Text>
          <Text style={styles.tip}>• Reduce distance — PPF drops linearly with distance</Text>
          <Text style={styles.tip}>• Mount camera at face height to minimize vertical distortion</Text>
          <Text style={styles.tip}>• Avoid wide-angle lenses for facial recognition applications</Text>
        </Section>

        <View style={styles.footer}>
          <View style={styles.dwBox}><Text style={styles.dwText}>DW</Text></View>
          <View>
            <Text style={styles.footerBrand}>DIGITAL WATCHDOG</Text>
            <Text style={styles.footerTagline}>Built For Users · digital-watchdog.com</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  scroll: { padding: 16, gap: 16 },
  section: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 12,
  },
  sectionTitle: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.5,
  },
  body: {
    color: Colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  formula: {
    backgroundColor: Colors.surface,
    borderLeftWidth: 3,
    borderLeftColor: Colors.orange,
    padding: 12,
    gap: 6,
  },
  formulaText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '700',
    fontFamily: 'monospace',
  },
  formulaNote: {
    color: Colors.textSecondary,
    fontSize: 11,
    fontFamily: 'monospace',
  },
  levelCard: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  levelBar: { width: 4 },
  levelContent: { flex: 1, padding: 12, gap: 4 },
  levelHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  levelName: { fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  ppfBadge: {
    borderWidth: 1,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  ppfBadgeText: { fontSize: 10, fontWeight: '700' },
  levelDesc: { color: Colors.textSecondary, fontSize: 12, lineHeight: 18 },
  doriTable: {
    backgroundColor: Colors.surface,
    overflow: 'hidden',
  },
  doriHeader: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    backgroundColor: Colors.cardBg,
  },
  doriHeaderText: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  doriRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 6,
  },
  levelDot: {
    width: 8,
    height: 8,
    flexShrink: 0,
  },
  doriCell: {
    flex: 1,
    color: Colors.white,
    fontSize: 13,
  },
  doriNum: {
    color: Colors.white,
    fontWeight: '700',
    textAlign: 'center',
    fontVariant: ['tabular-nums'],
  },
  table: {
    backgroundColor: Colors.surface,
    overflow: 'hidden',
    gap: 0,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  infoLabel: { color: Colors.textSecondary, fontSize: 12 },
  infoValue: { color: Colors.white, fontSize: 12, fontWeight: '600' },
  tip: { color: Colors.textSecondary, fontSize: 13, lineHeight: 22 },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 8,
  },
  dwBox: {
    backgroundColor: Colors.orange,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dwText: { color: '#fff', fontSize: 16, fontWeight: '900', letterSpacing: 1 },
  footerBrand: { color: Colors.white, fontSize: 11, fontWeight: '700', letterSpacing: 2 },
  footerTagline: { color: Colors.textMuted, fontSize: 10, letterSpacing: 0.5 },
});
