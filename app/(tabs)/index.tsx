import React, { useEffect, useRef, useState } from 'react';
// Added Dimensions here
import { CameraView, useCameraPermissions } from 'expo-camera';
import { Animated, Dimensions, Easing, Vibration } from 'react-native';

// 1. IMPORT THE SCREEN
import PatientScreen from '../../src/screens/PatientScreen';

// This line is needed if you use 'height' or 'width' in your logic
const { width, height } = Dimensions.get('window');

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
    }
  }, [isScanning]);

  const finishScan = () => {
    Vibration.vibrate([0, 100, 50, 100]);
    const calculatedHRV = Math.floor(40 + Math.random() * 40);
    const sIndex = calculatedHRV > 60 ? 'Low' : 'High';
    const timeNow = new Date().toLocaleTimeString();
    const reportData = { hrv: calculatedHRV, stress: sIndex, timestamp: timeNow };
    
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

  // FINAL RETURN: Passing all logic to the Screen
  return (
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
  );
}