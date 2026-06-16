import React, { useState, useMemo } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Modal,
  FlatList, TextInput, SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { DW_CAMERAS, DWCamera } from '../data/cameras';
import { Colors } from '../constants/Colors';

const TYPE_ICON: Record<string, keyof typeof Ionicons.glyphMap> = {
  dome: 'ellipse-outline',
  bullet: 'remove-outline',
  turret: 'location-outline',
  fisheye: 'eye-outline',
  ptz: 'sync-outline',
  multisensor: 'grid-outline',
};

interface Props {
  selected: DWCamera | null;
  onSelect: (camera: DWCamera) => void;
}

export default function CameraSelector({ selected, onSelect }: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState('');

  const filtered = useMemo(() => {
    if (!search.trim()) return DW_CAMERAS;
    const q = search.toLowerCase();
    return DW_CAMERAS.filter(
      c => c.model.toLowerCase().includes(q) || c.name.toLowerCase().includes(q)
    );
  }, [search]);

  return (
    <>
      <TouchableOpacity style={styles.trigger} onPress={() => setOpen(true)}>
        {selected ? (
          <View style={styles.selectedContent}>
            <Ionicons name={TYPE_ICON[selected.type] ?? 'camera-outline'} size={18} color={Colors.orange} />
            <View style={styles.selectedText}>
              <Text style={styles.selectedModel}>{selected.model}</Text>
              <Text style={styles.selectedName}>{selected.name}</Text>
            </View>
          </View>
        ) : (
          <View style={styles.placeholder}>
            <Ionicons name="search-outline" size={18} color={Colors.textMuted} />
            <Text style={styles.placeholderText}>Search or select a DW camera model…</Text>
          </View>
        )}
        <Ionicons name="chevron-down" size={16} color={Colors.textMuted} />
      </TouchableOpacity>

      <Modal visible={open} animationType="slide" onRequestClose={() => setOpen(false)}>
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>SELECT CAMERA MODEL</Text>
            <TouchableOpacity onPress={() => setOpen(false)}>
              <Ionicons name="close" size={22} color={Colors.white} />
            </TouchableOpacity>
          </View>

          <View style={styles.searchRow}>
            <Ionicons name="search-outline" size={16} color={Colors.textMuted} style={{ marginLeft: 12 }} />
            <TextInput
              style={styles.searchInput}
              value={search}
              onChangeText={setSearch}
              placeholder="Type model number or name…"
              placeholderTextColor={Colors.textMuted}
              autoFocus
              autoCapitalize="characters"
              returnKeyType="search"
            />
            {search.length > 0 && (
              <TouchableOpacity onPress={() => setSearch('')} style={{ paddingRight: 12 }}>
                <Ionicons name="close-circle" size={16} color={Colors.textMuted} />
              </TouchableOpacity>
            )}
          </View>

          <FlatList
            data={filtered}
            keyExtractor={c => c.model}
            ItemSeparatorComponent={() => <View style={styles.separator} />}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.cameraItem, selected?.model === item.model && styles.cameraItemSelected]}
                onPress={() => { onSelect(item); setOpen(false); setSearch(''); }}
              >
                <Ionicons
                  name={TYPE_ICON[item.type] ?? 'camera-outline'}
                  size={20}
                  color={selected?.model === item.model ? Colors.orange : Colors.textSecondary}
                />
                <View style={styles.cameraItemText}>
                  <Text style={[styles.cameraModel, selected?.model === item.model && styles.cameraModelSelected]}>
                    {item.model}
                  </Text>
                  <Text style={styles.cameraItemName}>{item.name}</Text>
                  <Text style={styles.cameraItemSpec}>
                    {item.megapixels}MP · {item.hRes}×{item.vRes} · {item.hFovMin ? `${item.hFovMin}–` : ''}{item.hFovMax}° HFOV
                  </Text>
                </View>
                {selected?.model === item.model && (
                  <Ionicons name="checkmark" size={18} color={Colors.orange} />
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderWidth: 1,
    borderColor: Colors.border,
    paddingHorizontal: 14,
    paddingVertical: 12,
    gap: 10,
  },
  selectedContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  selectedText: { flex: 1, gap: 2 },
  selectedModel: { color: Colors.white, fontSize: 14, fontWeight: '700', letterSpacing: 0.5 },
  selectedName: { color: Colors.textSecondary, fontSize: 11 },
  placeholder: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 10 },
  placeholderText: { color: Colors.textMuted, fontSize: 13 },
  modal: { flex: 1, backgroundColor: Colors.black },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
  },
  modalTitle: { color: Colors.white, fontSize: 12, fontWeight: '700', letterSpacing: 2 },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.cardBg,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    color: Colors.white,
    fontSize: 15,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  separator: { height: 1, backgroundColor: Colors.border },
  cameraItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    gap: 12,
  },
  cameraItemSelected: { backgroundColor: Colors.orangeGlow },
  cameraItemText: { flex: 1, gap: 2 },
  cameraModel: { color: Colors.textSecondary, fontSize: 13, fontWeight: '700', letterSpacing: 0.5 },
  cameraModelSelected: { color: Colors.orange },
  cameraItemName: { color: Colors.white, fontSize: 13 },
  cameraItemSpec: { color: Colors.textMuted, fontSize: 11 },
});
