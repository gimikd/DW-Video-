import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors } from '../constants/Colors';

interface Props {
  title?: string;
  subtitle?: string;
}

export default function DWHeader({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <View style={styles.logoRow}>
        <View style={styles.logoBox}>
          <Text style={styles.logoText}>DW</Text>
        </View>
        <View>
          <Text style={styles.brandName}>DIGITAL WATCHDOG</Text>
          <Text style={styles.tagline}>Built For Users</Text>
        </View>
      </View>
      {title && (
        <View style={styles.titleBlock}>
          <Text style={styles.title}>{title}</Text>
          {subtitle && <Text style={styles.subtitle}>{subtitle}</Text>}
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darkBg,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  logoBox: {
    backgroundColor: Colors.orange,
    width: 34,
    height: 34,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '900',
    letterSpacing: 1,
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
    letterSpacing: 1,
  },
  titleBlock: {
    gap: 2,
  },
  title: {
    color: Colors.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  subtitle: {
    color: Colors.textSecondary,
    fontSize: 12,
  },
});
