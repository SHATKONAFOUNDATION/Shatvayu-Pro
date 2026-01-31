import { CameraView, useCameraPermissions } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import {
  Animated,
  Dimensions,
  Easing,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  Vibration,
  View
} from 'react-native';

// Assuming your visuals are in this component
import PatientScreen from '../../src/screens/PatientScreen';

const { width, height } = Dimensions.get('window');

export default function App() {
  // --- NAVIGATION STATE ---
  const [viewMode, setViewMode] = useState<'clinic' | 'vision'>('clinic');

  // --- SCANNER LOGIC STATE ---
  const [isScanning, setIsScanning] = useState(false);
  const [scanMode, setScanMode] = useState<'face' | 'finger'>('face');
  const [reading, setReading] = useState(0);
  const [ecoMenuVisible, setEcoMenuVisible] = useState(false);
  const [showReport, setShowReport] = useState<{
    hrv: number;
    stress: string;
    timestamp: string;
  } | null>(null);

  // --- PERMISSIONS & REFS ---
  const [permission, requestPermission] = useCameraPermissions();
  const cameraRef = useRef<CameraView>(null);

  // --- ANIMATION VALUES ---
  const translateY = useRef(new Animated.Value(0)).current;
  const blinkAnim = useRef(new Animated.Value(1)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;

  // --- ANIMATION LOOPS ---
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
    }
  }, [isScanning]);

  // --- SCAN HANDLERS ---
  const startScan = (mode: 'face' | 'finger') => {
    setScanMode(mode);
    setReading(0);
    setIsScanning(true);
  };

  const finishScan = () => {
    Vibration.vibrate([0, 100, 50, 100]);
    const calculatedHRV = Math.floor(40 + Math.random() * 40);
    const sIndex = calculatedHRV > 60 ? 'Low' : 'High';
    const timeNow = new Date().toLocaleTimeString();
    const reportData = { hrv: calculatedHRV, stress: sIndex, timestamp: timeNow };
    
    setShowReport(reportData);
    setIsScanning(false); 
  };

  const rotation = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  // --- MAIN RENDER ---
  return (
    <View style={styles.mainContainer}>
      
      {/* UNIVERSAL HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>FASCIAMAX</Text>
          <Text style={styles.subLogo}>BY SHATVAYU</Text>
        </View>
        <TouchableOpacity 
          style={styles.toggleBtn}
          onPress={() => setViewMode(viewMode === 'clinic' ? 'vision' : 'clinic')}
        >
          <Text style={styles.toggleText}>
            {viewMode === 'clinic' ? "🌐 FOUNDATION" : "🧬 CLINIC"}
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === 'clinic' ? (
        /* MODE 1: CLINICAL SCANNER & PATIENT INTERFACE */
        <PatientScreen 
          isScanning={isScanning}
          reading={reading}
          scanMode={scanMode}
          cameraRef={cameraRef}
          translateY={translateY}
          blinkAnim={blinkAnim}
          rotation={rotation}
          startScan={startScan}
          showReport={showReport}
          setShowReport={setShowReport}
          setReading={setReading}
          setEcoMenuVisible={setEcoMenuVisible}
          ecoMenuVisible={ecoMenuVisible}
          permission={permission}
          requestPermission={requestPermission}
        />
      ) : (
        /* MODE 2: VISIONARY FOUNDATION HUB */
        <ScrollView contentContainerStyle={styles.visionScroll}>
          <Text style={styles.visionTitle}>Shatvayu Global Foundation</Text>
          <Text style={styles.visionSubtitle}>Mission: Global Pain-Free Living</Text>

          <TouchableOpacity style={styles.visionCard}>
            <Text style={styles.cardTitle}>3KM Nagaon Geoglyph</Text>
            <Text style={styles.cardDesc}>The world's largest hexagonal healing geoglyph project.</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.visionCard}>
            <Text style={styles.cardTitle}>CPRI & GPFLM</Text>
            <Text style={styles.cardDesc}>Clinical Physiology Research & Global Pain Free Mission.</Text>
          </TouchableOpacity>
        </ScrollView>
      )}

      {/* UNIVERSAL FOOTER */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 FASCIAMAX | SHATVAYU</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#000' },
  header: { 
    paddingTop: 60, 
    paddingBottom: 20, 
    paddingHorizontal: 25, 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center',
    backgroundColor: '#0a0a0a',
    borderBottomWidth: 1,
    borderBottomColor: '#1a1a1a'
  },
  logoText: { color: '#38bdf8', fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  subLogo: { color: '#64748b', fontSize: 8, fontWeight: 'bold', letterSpacing: 1 },
  toggleBtn: { backgroundColor: '#1e293b', paddingVertical: 8, paddingHorizontal: 12, borderRadius: 6, borderWidth: 1, borderColor: '#334155' },
  toggleText: { color: '#38bdf8', fontSize: 10, fontWeight: 'bold' },
  
  visionScroll: { padding: 25, paddingBottom: 100 },
  visionTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold', marginBottom: 5 },
  visionSubtitle: { color: '#38bdf8', fontSize: 14, marginBottom: 30, fontWeight: '500' },
  visionCard: { 
    backgroundColor: '#111', 
    padding: 25, 
    borderRadius: 15, 
    marginBottom: 20, 
    borderWidth: 1, 
    borderColor: '#222' 
  },
  cardTitle: { color: '#fff', fontSize: 18, fontWeight: 'bold', marginBottom: 8 },
  cardDesc: { color: '#94a3b8', fontSize: 13, lineHeight: 20 },

  footer: { 
    position: 'absolute', 
    bottom: 0, 
    width: '100%', 
    padding: 15, 
    backgroundColor: '#0a0a0a', 
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#1a1a1a'
  },
  footerText: { color: '#475569', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 }
});