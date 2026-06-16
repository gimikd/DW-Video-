import React, { useState, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import DWHeader from '../../components/DWHeader';
import { DW_CAMERAS, DWCamera } from '../../data/cameras';
import { maxDistanceForPPF, RECOGNITION_LEVELS } from '../../utils/ppf';
import { Colors } from '../../constants/Colors';

const FILTER_OPTIONS = ['All', 'Dome', 'Bullet', 'Turret', 'PTZ', 'Multi'];

export default function CamerasScreen() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('All');

  const filtered = useMemo(() => {
    let list = DW_CAMERAS;
    if (filter !== 'All') {
      const f = filter.toLowerCase();
      list = list.filter(c => {
        if (f === 'multi') return c.type === 'multisensor';
        return c.type.startsWith(f);
      });
    }
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(c =>
        c.model.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
      );
    }
    return list;
  }, [search, filter]);

  const frDist = (cam: DWCamera) =>
    maxDistanceForPPF(cam.hRes, cam.hFovMax, RECOGNITION_LEVELS[3].minPPF).toFixed(0);
  const recDist = (cam: DWCamera) =>
    maxDistanceForPPF(cam.hRes, cam.hFovMax, RECOGNITION_LEVELS[2].minPPF).toFixed(0);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <DWHeader title="Camera Library" subtitle={`${DW_CAMERAS.length} DW MEGApix models`} />

      <View style={styles.searchRow}>
        <Ionicons name="search-outline" size={16} color={Colors.textMuted} />
        <TextInput
          style={styles.searchInput}
          value={search}
          onChangeText={setSearch}
          placeholder="Search models…"
          placeholderTextColor={Colors.textMuted}
          autoCapitalize="characters"
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
          </TouchableOpacity>
        )}
      </View>

      <View style={styles.filterRow}>
        {FILTER_OPTIONS.map(f => (
          <TouchableOpacity
            key={f}
            style={[styles.filterBtn, filter === f && styles.filterBtnActive]}
            onPress={() => setFilter(f)}
          >
            <Text style={[styles.filterText, filter === f && styles.filterTextActive]}>{f}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <FlatList
        data={filtered}
        keyExtractor={c => c.model}
        ItemSeparatorComponent={() => <View style={styles.sep} />}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={styles.cardTop}>
              <View>
                <Text style={styles.cardModel}>{item.model}</Text>
                <Text style={styles.cardName}>{item.name}</Text>
              </View>
              <View style={styles.mpBadge}>
                <Text style={styles.mpText}>{item.megapixels}MP</Text>
              </View>
            </View>

            <View style={styles.cardSpecs}>
              <Text style={styles.specChip}>{item.hRes}×{item.vRes}</Text>
              <Text style={styles.specChip}>{item.hFovMin ? `${item.hFovMin}–` : ''}{item.hFovMax}° HFOV</Text>
              <Text style={styles.specChip}>{item.lens}</Text>
            </View>

            <View style={styles.cardDistances}>
              <View style={styles.distItem}>
                <Text style={styles.distLabel}>Recognition</Text>
                <Text style={[styles.distVal, { color: RECOGNITION_LEVELS[2].color }]}>{recDist(item)} ft</Text>
              </View>
              <View style={styles.distDivider} />
              <View style={styles.distItem}>
                <Text style={styles.distLabel}>FR Identification</Text>
                <Text style={[styles.distVal, { color: RECOGNITION_LEVELS[3].color }]}>{frDist(item)} ft</Text>
              </View>
              <View style={styles.distDivider} />
              <View style={styles.distItem}>
                <Text style={styles.distLabel}>Location</Text>
                <Text style={styles.distValSmall}>
                  {[item.indoor && 'Indoor', item.outdoor && 'Outdoor'].filter(Boolean).join('/')}
                </Text>
              </View>
            </View>
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.black },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: Colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 10,
  },
  searchInput: { flex: 1, color: Colors.white, fontSize: 15, paddingVertical: 4 },
  filterRow: {
    flexDirection: 'row',
    paddingHorizontal: 12,
    paddingVertical: 8,
    gap: 6,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  filterBtn: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  filterBtnActive: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orangeGlow,
  },
  filterText: { color: Colors.textMuted, fontSize: 11, fontWeight: '600', letterSpacing: 1 },
  filterTextActive: { color: Colors.orange },
  sep: { height: 1, backgroundColor: Colors.border },
  card: {
    padding: 14,
    gap: 10,
    backgroundColor: Colors.darkBg,
  },
  cardTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  cardModel: { color: Colors.orange, fontSize: 13, fontWeight: '800', letterSpacing: 0.5 },
  cardName: { color: Colors.white, fontSize: 13, marginTop: 2 },
  mpBadge: {
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 8,
    paddingVertical: 3,
  },
  mpText: { color: Colors.textSecondary, fontSize: 11, fontWeight: '700' },
  cardSpecs: { flexDirection: 'row', flexWrap: 'wrap', gap: 6 },
  specChip: {
    backgroundColor: Colors.surface,
    color: Colors.textMuted,
    fontSize: 10,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 2,
  },
  cardDistances: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    padding: 10,
    gap: 0,
  },
  distItem: { flex: 1, alignItems: 'center', gap: 2 },
  distDivider: { width: 1, height: 32, backgroundColor: Colors.border },
  distLabel: { color: Colors.textMuted, fontSize: 9, letterSpacing: 1, textAlign: 'center' },
  distVal: { fontSize: 16, fontWeight: '700', fontVariant: ['tabular-nums'] },
  distValSmall: { color: Colors.textSecondary, fontSize: 11, textAlign: 'center' },
});
