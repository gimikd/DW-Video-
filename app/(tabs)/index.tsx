import React, { useState, useCallback } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { CameraView, CameraType, useCameraPermissions } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import FaceOverlay from '../../components/FaceOverlay';
import ScanAnimation from '../../components/ScanAnimation';
import DWHeader from '../../components/DWHeader';
import FaceMetricsPanel from '../../components/FaceMetricsPanel';
import { Colors } from '../../constants/Colors';
import { DetectedFace } from '../../types';

const { width: SW, height: SH } = Dimensions.get('window');

export default function CameraScreen() {
  const [permission, requestPermission] = useCameraPermissions();
  const [facing, setFacing] = useState<CameraType>('front');
  const [faces, setFaces] = useState<DetectedFace[]>([]);
  const [scanning, setScanning] = useState(true);
  const [layout, setLayout] = useState({ width: SW, height: SH });
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const handleFacesDetected = useCallback(({ faces }: any) => {
    setFaces(faces ?? []);
  }, []);

  if (!permission) {
    return <View style={styles.container} />;
  }

  if (!permission.granted) {
    return (
      <SafeAreaView style={styles.permissionContainer}>
        <DWHeader />
        <View style={styles.permissionBody}>
          <View style={styles.cameraIconWrap}>
            <Ionicons name="camera-outline" size={56} color={Colors.orange} />
          </View>
          <Text style={styles.permTitle}>Camera Access Required</Text>
          <Text style={styles.permText}>
            DW Facial Recognition needs camera access to detect and analyze faces in real-time.
          </Text>
          <TouchableOpacity style={styles.permBtn} onPress={requestPermission}>
            <Text style={styles.permBtnText}>GRANT ACCESS</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={styles.cameraWrap}
        onLayout={(e) => setLayout(e.nativeEvent.layout)}
      >
        <CameraView
          style={StyleSheet.absoluteFill}
          facing={facing}
          onFacesDetected={handleFacesDetected}
          faceDetectorSettings={{
            mode: FaceDetector.FaceDetectorMode.fast,
            detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
            runClassifications: FaceDetector.FaceDetectorClassifications.all,
            minDetectionInterval: 100,
            tracking: true,
          }}
        />

        {scanning && <ScanAnimation />}

        <FaceOverlay
          faces={faces}
          cameraLayout={layout}
          onFaceSelect={setSelectedId}
          selectedFaceId={selectedId}
        />

        <LinearGradient
          colors={['rgba(0,0,0,0.85)', 'transparent']}
          style={styles.topGrad}
        />

        <View style={styles.headerOverlay}>
          <DWHeader compact faceCount={faces.length} />
        </View>

        <LinearGradient
          colors={['transparent', 'rgba(0,0,0,0.9)']}
          style={styles.bottomGrad}
        />

        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.ctrlBtn}
            onPress={() => setFacing(f => (f === 'front' ? 'back' : 'front'))}
          >
            <Ionicons name="camera-reverse-outline" size={26} color={Colors.white} />
          </TouchableOpacity>

          <View style={styles.faceCounter}>
            <Text style={styles.faceCountNum}>{faces.length}</Text>
            <Text style={styles.faceCountLabel}>FACES</Text>
          </View>

          <TouchableOpacity
            style={[styles.ctrlBtn, scanning && styles.ctrlBtnActive]}
            onPress={() => setScanning(s => !s)}
          >
            <Ionicons
              name={scanning ? 'pause-circle' : 'play-circle'}
              size={26}
              color={scanning ? Colors.orange : Colors.white}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FaceMetricsPanel
        face={faces.find(f => f.faceID === selectedId)}
        onClose={() => setSelectedId(null)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  cameraWrap: {
    flex: 1,
    backgroundColor: Colors.darkBg,
  },
  topGrad: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 100,
  },
  bottomGrad: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 120,
  },
  headerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  controls: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 32,
  },
  ctrlBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderWidth: 1,
    borderColor: Colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  ctrlBtnActive: {
    borderColor: Colors.orange,
    backgroundColor: Colors.orangeGlow,
  },
  faceCounter: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
    borderWidth: 2,
    borderColor: Colors.orange,
    paddingHorizontal: 20,
    paddingVertical: 8,
    minWidth: 80,
  },
  faceCountNum: {
    color: Colors.orange,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
  },
  faceCountLabel: {
    color: Colors.textSecondary,
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 2,
  },
  permissionContainer: {
    flex: 1,
    backgroundColor: Colors.black,
  },
  permissionBody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 32,
    gap: 16,
  },
  cameraIconWrap: {
    width: 96,
    height: 96,
    borderWidth: 2,
    borderColor: Colors.orange,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  permTitle: {
    color: Colors.white,
    fontSize: 20,
    fontWeight: '700',
    letterSpacing: 1,
    textAlign: 'center',
  },
  permText: {
    color: Colors.textSecondary,
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 22,
  },
  permBtn: {
    marginTop: 8,
    backgroundColor: Colors.orange,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  permBtnText: {
    color: Colors.white,
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 3,
  },
});
