import React, { memo } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { DetectedFace } from '../types';
import { Colors } from '../constants/Colors';

interface Props {
  faces: DetectedFace[];
  cameraLayout: { width: number; height: number };
  onFaceSelect?: (id: number | null) => void;
  selectedFaceId?: number | null;
}

// Camera image dimensions used by expo-face-detector in fast mode
const CAM_W = 480;
const CAM_H = 640;

const CORNER_SIZE = 16;
const CORNER_THICKNESS = 2;

function FaceBox({ face, scaleX, scaleY, selected, onPress }: {
  face: DetectedFace;
  scaleX: number;
  scaleY: number;
  selected: boolean;
  onPress: () => void;
}) {
  const x = face.bounds.origin.x * scaleX;
  const y = face.bounds.origin.y * scaleY;
  const w = face.bounds.size.width * scaleX;
  const h = face.bounds.size.height * scaleY;
  const color = selected ? Colors.orangeLight : Colors.faceBox;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={onPress}
      style={[styles.faceBox, { left: x, top: y, width: w, height: h }]}
    >
      {/* Top-left corner */}
      <View style={[styles.corner, styles.cornerTL]}>
        <View style={[styles.cornerH, { backgroundColor: color }]} />
        <View style={[styles.cornerV, { backgroundColor: color }]} />
      </View>
      {/* Top-right corner */}
      <View style={[styles.corner, styles.cornerTR]}>
        <View style={[styles.cornerH, { backgroundColor: color }]} />
        <View style={[styles.cornerV, { backgroundColor: color }]} />
      </View>
      {/* Bottom-left corner */}
      <View style={[styles.corner, styles.cornerBL]}>
        <View style={[styles.cornerH, { backgroundColor: color }]} />
        <View style={[styles.cornerV, { backgroundColor: color }]} />
      </View>
      {/* Bottom-right corner */}
      <View style={[styles.corner, styles.cornerBR]}>
        <View style={[styles.cornerH, { backgroundColor: color }]} />
        <View style={[styles.cornerV, { backgroundColor: color }]} />
      </View>

      {/* Face ID label */}
      <View style={[styles.faceLabel, { borderColor: color, backgroundColor: Colors.orangeGlow }]}>
        <Text style={[styles.faceLabelText, { color }]}>
          FACE {face.faceID !== undefined ? face.faceID + 1 : '?'}
        </Text>
      </View>

      {/* Confidence indicator */}
      {face.smilingProbability !== undefined && (
        <View style={styles.confidenceBadge}>
          <View style={[styles.confidenceBar, { width: `${Math.round(face.smilingProbability * 100)}%` as any, backgroundColor: color }]} />
        </View>
      )}
    </TouchableOpacity>
  );
}

function FaceOverlay({ faces, cameraLayout, onFaceSelect, selectedFaceId }: Props) {
  const scaleX = cameraLayout.width / CAM_W;
  const scaleY = cameraLayout.height / CAM_H;

  return (
    <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
      {faces.map((face, index) => (
        <FaceBox
          key={face.faceID ?? index}
          face={face}
          scaleX={scaleX}
          scaleY={scaleY}
          selected={selectedFaceId === face.faceID}
          onPress={() => onFaceSelect?.(selectedFaceId === face.faceID ? null : (face.faceID ?? null))}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  faceBox: {
    position: 'absolute',
  },
  corner: {
    position: 'absolute',
    width: CORNER_SIZE,
    height: CORNER_SIZE,
  },
  cornerTL: { top: 0, left: 0 },
  cornerTR: { top: 0, right: 0 },
  cornerBL: { bottom: 0, left: 0 },
  cornerBR: { bottom: 0, right: 0 },
  cornerH: {
    position: 'absolute',
    height: CORNER_THICKNESS,
    width: CORNER_SIZE,
    top: 0,
  },
  cornerV: {
    position: 'absolute',
    width: CORNER_THICKNESS,
    height: CORNER_SIZE,
    left: 0,
  },
  faceLabel: {
    position: 'absolute',
    top: -20,
    left: 0,
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderWidth: 1,
  },
  faceLabelText: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 1.5,
  },
  confidenceBadge: {
    position: 'absolute',
    bottom: -6,
    left: 0,
    right: 0,
    height: 3,
    backgroundColor: 'rgba(244,121,32,0.2)',
  },
  confidenceBar: {
    height: '100%',
  },
});

export default memo(FaceOverlay);
