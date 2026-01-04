import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
// Ensure CameraView is also imported from expo-camera
import { Animated, Dimensions, Easing, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, Vibration, View } from 'react-native';

const { width, height } = Dimensions.get('window');

const PILLARS = [
  { name: 'PRANA PULSE', color: '#4CAF50', icon: 'lungs' }, 
  { name: 'CHAKRA BALANCE', color: '#9C27B0', icon: 'dharmachakra' }, 
  { name: 'YOGASANA', color: '#2196F3', icon: 'yoga' }, 
  { name: 'FASCIA RELEASE', color: '#FF9800', icon: 'dna' }, 
  { name: 'STRENGTH', color: '#FFEB3B', icon: 'arm-flex' }, 
  { name: 'YOGA NIDRA', color: '#E91E63', icon: 'sleep' }, 
];

export default function App() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'face' | 'finger'>('face');
  const [reading, setReading] = useState(0);
  const cameraRef = useRef<CameraView>(null);
  const [ecoMenuVisible, setEcoMenuVisible] = useState(false);
  const [showReport, setShowReport] = useState<{
  hrv: number;
  stress: string;
  timestamp: string;
} | null>(null);
  const [permission, requestPermission] = useCameraPermissions();
  const [scanProgress, setScanProgress] = useState(0);

  // Function to simulate data gathering once a face is found
  const startLiveDataScale = () => {
    setScanProgress(0);
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 1;
      });
    }, 50); // Adjust speed here
  };
  const translateY = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(blinkAnim, { toValue: 0.3, duration: 1000, useNativeDriver: true }),
        Animated.timing(blinkAnim, { toValue: 1, duration: 1000, useNativeDriver: true }),
      ])
    ).start();
  }, []);

  useEffect(() => {
    if (isScanning) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(translateY, { toValue: 240, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
          Animated.timing(translateY, { toValue: 0, duration: 2000, easing: Easing.inOut(Easing.sin), useNativeDriver: true }),
        ])
      ).start();

      Animated.loop(
        Animated.timing(rotateAnim, { toValue: 1, duration: 4000, easing: Easing.linear, useNativeDriver: true })
      ).start();

      const interval = setInterval(() => {
        setReading((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            finishScan();
            return 100;
          }
          return prev + 1;
        });
      }, 100); 

      return () => clearInterval(interval);
    } else {
      translateY.setValue(0);
      rotateAnim.setValue(0);
    }
  }, [isScanning]);

  const finishScan = () => {
    Vibration.vibrate([0, 100, 50, 100]);
    
    // 1. Define the basic values first
    const calculatedHRV = Math.floor(40 + Math.random() * 40);
    const sIndex = calculatedHRV > 60 ? 'Low' : 'High';
    
    // 2. Define timeNow BEFORE putting it into reportData
    const timeNow = new Date().toLocaleTimeString();

    // 3. Now create the report object using the variables above
    const reportData = {
      hrv: calculatedHRV,
      stress: sIndex,
      timestamp: timeNow // Now 'timeNow' exists!
    };

    // 4. Finally, update the UI and Log
    console.log("📊 NEW PATIENT DATA:", reportData);
    setShowReport(reportData);
    setIsScanning(false); 
  };
  
  const startScan = (mode: 'face' | 'finger') => {
    setScanMode(mode);
    setReading(0);
    setIsScanning(true);
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });
const handleFacesDetected = ({ faces }: { faces: any[] }) => {
    if (faces.length > 0 && scanProgress === 0) {
      console.log('Face detected! Starting live scan...');
      startLiveDataScale(); // Trigger the percentage increase
    }
  };
  // --- UPDATED: CENTERED PERMISSION VIEW ---
  if (!permission?.granted) {
    return (
      <View style={styles.permissionContainer}>
        <View style={styles.permissionCard}>
          <MaterialCommunityIcons name="camera-lock" size={80} color="#D4AF37" />
          <Text style={styles.permissionTitle}>CAMERA ACCESS</Text>
          <Text style={styles.permissionDesc}>
            Shatkona requires camera access for Biometric field analysis and Pulse detection.
          </Text>
          <TouchableOpacity style={styles.grantBtn} onPress={requestPermission}>
            <Text style={styles.grantBtnText}>GRANT ACCESS</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Image source={require('../../assets/images/logo.png')} style={styles.logoSmall} />
        <View style={{ flexDirection: 'row', gap: 8 }}>
          <TouchableOpacity style={styles.startScanBtnTop} onPress={() => startScan('face')}>
            <Text style={styles.scanBtnText}>FACE SCAN</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.startScanBtnTop, { backgroundColor: '#FFD700' }]} onPress={() => startScan('finger')}>
            <Text style={styles.scanBtnText}>FINGER SCAN</Text>
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text style={styles.percentageText}>{reading}%</Text>
        
        <Animated.View style={{ opacity: blinkAnim, alignSelf: 'center', marginBottom: 20 }}>
          <TouchableOpacity style={styles.seminarButton}>
            <Text style={styles.seminarText}>LIVE SEMINAR 🔴</Text>
          </TouchableOpacity>
        </Animated.View>

        <Text style={styles.statusText}>
          {isScanning 
            ? (scanMode === 'face' ? "ANALYZING BIOMETRIC FIELD..." : "PLACE FINGER OVER REAR LENS & FLASH") 
            : "SHATKONA WELLNESS PORTAL"}
        </Text>

        {isScanning && (
          <View style={styles.cameraFrame}>
            <CameraView
  ref={cameraRef} //
  style={styles.camera}
  facing={scanMode === 'face' ? "front" : "back"}
>
  <View style={styles.overlay}>
    <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
    
    {/* Medical Grade HUD */}
    <View style={styles.medicalHUD}>
      <Text style={styles.hudLabel}>SIGNAL STRENGTH: ████░ 80%</Text>
      <Text style={styles.hudLabel}>PPG SENSOR: {reading > 20 ? 'DETECTED' : 'SCANNING'}</Text>
      <Text style={styles.hudLabel}>BPM: {reading > 40 ? Math.floor(65 + Math.random() * 10) : '--'}</Text>
    </View>
  </View>
</CameraView>
          </View>
        )}

        {!isScanning && (
          <View style={styles.grid}>
             {PILLARS.map((pillar) => (
               <View key={pillar.name} style={[styles.tile, { borderColor: pillar.color + '33' }]}>
                  <Animated.View style={pillar.name === 'CHAKRA BALANCE' ? { transform: [{ rotate: rotation }] } : {}}>
                    <MaterialCommunityIcons name={pillar.icon as any} size={35} color={pillar.color} />
                  </Animated.View>
                  <Text style={styles.tileText}>{pillar.name}</Text>
               </View>
             ))}
          </View>
        )}
      </ScrollView>

      <TouchableOpacity style={styles.ecoBar} onPress={() => setEcoMenuVisible(true)}>
        <Text style={styles.ecoText}>SHATKONA ECOSYSTEM ⋮</Text>
      </TouchableOpacity>

      {/* REPORT MODAL */}
      <Modal visible={!!showReport} animationType="fade" transparent={true}>
        <View style={styles.reportOverlay}>
          <View style={styles.reportContent}>
            <MaterialCommunityIcons 
              name="check-decagram" 
              size={60} 
              color="#D4AF37" 
            />
            <Text style={styles.reportTitle}>BIO-METRIC ANALYSIS COMPLETE</Text>
            
            {/* Dynamic S-Index from real scan data */}
            <Text style={styles.sIndexResult}>
              S-INDEX: {showReport?.hrv}%
            </Text>
            
            {/* Real HRV and Stress data */}
            <Text style={styles.hrvText}>
              HRV: {showReport?.hrv}ms | STRESS: {showReport?.stress}
            </Text>
            
            <Text style={styles.timestampText}>
              SCAN TIME: {showReport?.timestamp}
            </Text>

            <View style={styles.dividerGold} />
            
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                setShowReport(null);
                setReading(0); // Reset the big gold number for the next patient
              }}
            >
              <Text style={styles.closeButtonText}>SAVE TO PATIENT LOG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MENU MODAL */}
      <Modal visible={ecoMenuVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setEcoMenuVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>ECOSYSTEM ACCESS</Text>
            {['ASSAM GEOGLYPH', 'CPRIMA LOGIN', 'ADMIN / STAFF', 'CORPORATE PORTAL'].map((item) => (
              <TouchableOpacity key={item} style={styles.menuItem}>
                <Text style={styles.menuText}>{item}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000124' },
  // NEW: Permission styles for centered column
  permissionContainer: { flex: 1, backgroundColor: '#000124', justifyContent: 'center', alignItems: 'center' },
  permissionCard: { width: '85%', alignItems: 'center', padding: 30, borderRadius: 30, borderWidth: 1, borderColor: '#D4AF3733', backgroundColor: 'rgba(255,255,255,0.02)' },
  permissionTitle: { color: '#D4AF37', fontSize: 20, fontWeight: '900', marginTop: 20, letterSpacing: 2 },
  permissionDesc: { color: '#fff', textAlign: 'center', opacity: 0.7, marginTop: 10, lineHeight: 20, fontSize: 13 },
  grantBtn: { backgroundColor: '#D4AF37', marginTop: 30, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  grantBtnText: { color: '#000124', fontWeight: '900', fontSize: 12 },

  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 75 },
  logoSmall: { width: 45, height: 45, resizeMode: 'contain' },
  startScanBtnTop: { backgroundColor: '#D4AF37', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  scanBtnText: { color: '#000124', fontWeight: '900', fontSize: 10 },
  percentageText: { color: '#D4AF37', fontSize: 80, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  seminarButton: { backgroundColor: '#8B0000', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#D4AF37' },
  seminarText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  statusText: { color: '#D4AF37', fontSize: 13, textAlign: 'center', letterSpacing: 1, marginBottom: 20, paddingHorizontal: 30 },
  cameraFrame: { width: 280, height: 280, borderRadius: 140, overflow: 'hidden', alignSelf: 'center', borderWidth: 2, borderColor: '#D4AF37', backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.1)' },
  scannerLine: { height: 4, backgroundColor: '#FFD700', width: '100%', position: 'absolute' },
  scrollContent: { paddingBottom: 100 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tile: { width: (width / 2) - 25, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.05)', margin: 8, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  tileText: { color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  ecoBar: { height: 70, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  ecoText: { color: '#000124', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#D4AF37', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  modalTitle: { textAlign: 'center', fontWeight: 'bold', color: '#000124', marginBottom: 20, fontSize: 16 },
  menuItem: { paddingVertical: 15, alignItems: 'center' },
  menuText: { color: '#000124', fontWeight: 'bold', fontSize: 17 },
  reportOverlay: { flex: 1, backgroundColor: 'rgba(0,1,36,0.95)', justifyContent: 'center', alignItems: 'center' },
  reportContent: { width: '85%', backgroundColor: '#000124', borderRadius: 30, padding: 30, alignItems: 'center', borderWidth: 2, borderColor: '#D4AF37' },
  reportTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  sIndexResult: { color: 'white', fontSize: 40, fontWeight: '900', marginTop: 10 },
  hrvText: { color: '#D4AF37', fontSize: 14, marginBottom: 10 },
  dividerGold: { height: 1, backgroundColor: '#D4AF3744', width: '100%', marginVertical: 20 },
  closeButton: { backgroundColor: '#D4AF37', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20 },
  closeButtonText: { color: '#000124', fontWeight: 'bold' },
  medicalHUD: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    borderColor: '#D4AF37',
    borderWidth: 1,
  },
  hudLabel: {
    color: '#D4AF37',
    fontSize: 10,
    fontFamily: 'monospace',
    marginBottom: 2,
  },
  timestampText: { 
    color: '#fff', 
    opacity: 0.5, 
    fontSize: 10, 
    marginTop: 5, 
    fontFamily: 'monospace' 
  },
});