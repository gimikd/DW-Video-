import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import DWHeader from '../../components/DWHeader';
import { Colors } from '../../constants/Colors';

function SettingRow({
  icon,
  label,
  subtitle,
  value,
  onToggle,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  subtitle?: string;
  value: boolean;
  onToggle: (v: boolean) => void;
}) {
  return (
    <View style={styles.settingRow}>
      <View style={styles.settingIcon}>
        <Ionicons name={icon} size={18} color={Colors.orange} />
      </View>
      <View style={styles.settingText}>
        <Text style={styles.settingLabel}>{label}</Text>
        {subtitle && <Text style={styles.settingSubtitle}>{subtitle}</Text>}
      </View>
      <Switch
        value={value}
        onValueChange={onToggle}
        trackColor={{ false: Colors.border, true: Colors.orangeDark }}
        thumbColor={value ? Colors.orange : Colors.textMuted}
        ios_backgroundColor={Colors.border}
      />
    </View>
  );
}

function SectionHeader({ title }: { title: string }) {
  return <Text style={styles.sectionHeader}>{title}</Text>;
}

export default function SettingsScreen() {
  const [showLandmarks, setShowLandmarks] = useState(false);
  const [showMetrics, setShowMetrics] = useState(true);
  const [fastMode, setFastMode] = useState(true);
  const [soundAlerts, setSoundAlerts] = useState(false);
  const [autoRecord, setAutoRecord] = useState(false);
  const [nightMode, setNightMode] = useState(false);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DWHeader title="SETTINGS" />

      <ScrollView showsVerticalScrollIndicator={false}>
        <SectionHeader title="DETECTION" />
        <SettingRow
          icon="flash-outline"
          label="Fast Detection Mode"
          subtitle="Lower accuracy, better performance"
          value={fastMode}
          onToggle={setFastMode}
        />
        <SettingRow
          icon="body-outline"
          label="Show Face Landmarks"
          subtitle="Eyes, nose, mouth positions"
          value={showLandmarks}
          onToggle={setShowLandmarks}
        />
        <SettingRow
          icon="bar-chart-outline"
          label="Show Live Metrics"
          subtitle="Angles, probabilities overlay"
          value={showMetrics}
          onToggle={setShowMetrics}
        />

        <SectionHeader title="CAMERA" />
        <SettingRow
          icon="moon-outline"
          label="Night Mode"
          subtitle="Enhanced low-light detection"
          value={nightMode}
          onToggle={setNightMode}
        />

        <SectionHeader title="ALERTS" />
        <SettingRow
          icon="volume-high-outline"
          label="Sound Alerts"
          subtitle="Beep when face detected"
          value={soundAlerts}
          onToggle={setSoundAlerts}
        />
        <SettingRow
          icon="recording-outline"
          label="Auto-Record on Detection"
          subtitle="Save clips when faces found"
          value={autoRecord}
          onToggle={setAutoRecord}
        />

        {/* About section */}
        <SectionHeader title="ABOUT" />
        <View style={styles.aboutCard}>
          <View style={styles.aboutLogo}>
            <View style={styles.dwBox}>
              <Text style={styles.dwText}>DW</Text>
            </View>
            <View>
              <Text style={styles.aboutBrand}>DIGITAL WATCHDOG</Text>
              <Text style={styles.aboutTagline}>Built For Users</Text>
            </View>
          </View>
          <View style={styles.aboutDivider} />
          <View style={styles.aboutRow}>
            <Text style={styles.aboutKey}>Application</Text>
            <Text style={styles.aboutVal}>DW Facial Recognition</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutKey}>Version</Text>
            <Text style={styles.aboutVal}>1.0.0</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutKey}>Platform</Text>
            <Text style={styles.aboutVal}>iOS / Android</Text>
          </View>
          <View style={styles.aboutRow}>
            <Text style={styles.aboutKey}>SDK</Text>
            <Text style={styles.aboutVal}>Expo 52 / React Native 0.76</Text>
          </View>
        </View>

        <View style={{ height: 32 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  sectionHeader: {
    color: Colors.textMuted,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2.5,
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 8,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: Colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 12,
  },
  settingIcon: {
    width: 32,
    height: 32,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingText: {
    flex: 1,
    gap: 2,
  },
  settingLabel: {
    color: Colors.textPrimary,
    fontSize: 14,
  },
  settingSubtitle: {
    color: Colors.textMuted,
    fontSize: 11,
  },
  aboutCard: {
    margin: 16,
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 16,
    gap: 10,
  },
  aboutLogo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  dwBox: {
    backgroundColor: Colors.orange,
    width: 44,
    height: 44,
    alignItems: 'center',
    justifyContent: 'center',
  },
  dwText: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: 1,
  },
  aboutBrand: {
    color: Colors.white,
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 2,
  },
  aboutTagline: {
    color: Colors.orange,
    fontSize: 10,
    letterSpacing: 1,
  },
  aboutDivider: {
    height: 1,
    backgroundColor: Colors.border,
  },
  aboutRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  aboutKey: {
    color: Colors.textMuted,
    fontSize: 12,
  },
  aboutVal: {
    color: Colors.textSecondary,
    fontSize: 12,
    fontWeight: '500',
  },
});
