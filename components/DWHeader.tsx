import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  compact?: boolean;
  faceCount?: number;
  title?: string;
}

export default function DWHeader({ compact = false, faceCount, title }: Props) {
  return (
    <View style={[styles.container, compact && styles.compact]}>
      <View style={styles.logoRow}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>DW</Text>
        </View>
        <View style={styles.titleGroup}>
          <Text style={styles.brandName}>DIGITAL WATCHDOG</Text>
          {!compact && <Text style={styles.tagline}>Built For Users</Text>}
          {title && <Text style={styles.screenTitle}>{title}</Text>}
        </View>
      </View>
      {faceCount !== undefined && (
        <View style={styles.badge}>
          <View style={[styles.dot, faceCount > 0 && styles.dotActive]} />
          <Text style={styles.badgeText}>{faceCount} DETECTED</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: 'rgba(0,0,0,0.85)',
  },
  compact: {
    paddingVertical: 8,
    backgroundColor: 'transparent',
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    backgroundColor: Colors.orange,
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: Colors.white,
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
  },
  titleGroup: {
    gap: 1,
  },
  brandName: {
    color: Colors.white,
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 2,
  },
  tagline: {
    color: Colors.orange,
    fontSize: 9,
    fontWeight: '500',
    letterSpacing: 1,
  },
  screenTitle: {
    color: Colors.textSecondary,
    fontSize: 9,
    letterSpacing: 1,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(244,121,32,0.15)',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 2,
    borderWidth: 1,
    borderColor: 'rgba(244,121,32,0.3)',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: Colors.textMuted,
  },
  dotActive: {
    backgroundColor: Colors.success,
  },
  badgeText: {
    color: Colors.orange,
    fontSize: 10,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
});
