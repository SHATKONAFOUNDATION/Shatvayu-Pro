import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import { LinearGradient } from 'expo-linear-gradient';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Linking,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Svg, { Circle, Line, Text as SvgText } from 'react-native-svg';
import { PILLARS } from '../constants/pillars';
import { styles } from '../constants/styles';

const { width, height } = Dimensions.get('window');

// 1. DATA STRUCTURE DEFINED OUTSIDE COMPONENT
const ECOSYSTEM_STRUCTURE = [
  {
    title: "FASCIAMAX SHATVAYU PVT LTD",
    color: "#D4AF37",
    items: [
      { label: "Fasciamax Wellness Hubs", url: "https://shatvayu.com/clinics" },
      { label: "Corporate Mastery Program", url: "https://shatvayu.com/corporate" },
      { label: "AI Scanner (SaaS)", url: "https://shatvayu.com/app" }
    ]
  },
  {
    title: "SHATKONA FOUNDATION (NGO)",
    color: "#FFFFFF",
    items: [
      { label: "CPRIMA (Research)", url: "https://shatvayu.org/cprima" },
      { label: "Nagaon Geoglyph", url: "https://shatvayu.org/geoglyph" },
      { label: "Global Mission", url: "https://shatvayu.org/mission" }
    ]
  }
];

export default function PatientScreen({ 
  isScanning, 
  reading, 
  scanMode, 
  cameraRef, 
  translateY, 
  blinkAnim, 
  startScan, 
  setEcoMenuVisible, 
  ecoMenuVisible 
}: any) {

  const [showAd, setShowAd] = useState(false);
  const [activePillar, setActivePillar] = useState('');
  const [userProgress] = useState(9); 
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(3);
  const [showClinicalReport, setShowClinicalReport] = useState(false);
  const [isFinished, setIsFinished] = useState(false);
  const [landmarks, setLandmarks] = useState<any>(null);

  const getPhaseAnalysis = () => {
    let analysis = { status: "Optimal Tensegrity", advice: "Autonomous Maintenance protocols active." };
    if (userProgress <= 3) analysis = { status: "High Tissue Adhesion", advice: "Prioritize Decompression." };
    else if (userProgress <= 6) analysis = { status: "Kinetic Misalignment", advice: "Focus on Spiral Line alignment." };
    return analysis;
  };

  const roadmapContent: any = {
    3: { title: "PHASE 1: FOUNDATION", focus: "Hydration", details: "• Manual Release\n• Rehydration" },
    6: { title: "PHASE 2: VITALITY", focus: "Alignment", details: "• Kinetic Chain\n• Structural Logic" },
    9: { title: "PHASE 3: MASTERY", focus: "Bio-Hacking", details: "• Geoglyph Mapping\n• Protocol Graduation" }
  };

  const renderSkeletalOverlay = () => {
    if (scanMode !== 'skeletal' || !landmarks) return null;
    const ear = landmarks[7]; const shoulder = landmarks[11]; 
    const ex = ear.x * width; const ey = ear.y * height;
    const sx = shoulder.x * width; const sy = shoulder.y * height;
    const angle = Math.atan2(sy - ey, sx - ex) * (180 / Math.PI);

    return (
      <Svg style={StyleSheet.absoluteFill}>
        <Line x1={ex} y1={ey} x2={sx} y2={sy} stroke="#D4AF37" strokeWidth="3" />
        <Circle cx={ex} cy={ey} r="6" fill="#FFD700" />
        <Circle cx={sx} cy={sy} r="6" fill="#FFD700" />
        <SvgText x={sx + 10} y={sy} fill="#FFD700" fontSize="16" fontWeight="bold">
          {`${Math.round(angle)}° Deviation`}
        </SvgText>
      </Svg>
    );
  };

  return (
    <View style={{ flex: 1 }}>
      <LinearGradient colors={['#000B29', '#07011b', '#000333']} style={StyleSheet.absoluteFill} />

      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logoSmall} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.startScanBtnTop} onPress={() => startScan('face')}><Text style={styles.scanBtnText}>FACE</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.startScanBtnTop, { backgroundColor: '#D4AF37' }]} onPress={() => startScan('skeletal')}><Text style={[styles.scanBtnText, { color: '#000' }]}>AI SCAN</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.startScanBtnTop, { backgroundColor: '#FFD700' }]} onPress={() => startScan('finger')}><Text style={styles.scanBtnText}>FINGER</Text></TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent}>
          {/* 1. PARTNERSHIP BAR */}
          {!isScanning && (
            <View style={styles.trustBar}>
              <Text style={styles.trustText}>OFFICIAL PARTNERS</Text>
              <View style={localStyles.logoRow}>
                {[require('../../assets/images/nsdc.png'), require('../../assets/images/ayush.png'), require('../../assets/images/msme.png')].map((img, idx) => (
                  <View key={idx} style={localStyles.logoContainer}><Image source={img} style={localStyles.partnerLogo} /></View>
                ))}
              </View>
            </View>
          )}

          <TouchableOpacity onPress={() => setShowClinicalReport(true)}>
            <Text style={styles.percentageText}>{reading}%</Text>
          </TouchableOpacity>

          {/* 4. CAMERA HUD */}
          {isScanning && (
            <View style={styles.cameraFrame}>
              <CameraView ref={cameraRef} style={styles.camera} facing={scanMode === 'face' ? "front" : "back"}>
                <View style={styles.overlay}>
                  <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
                  {renderSkeletalOverlay()}
                </View>
              </CameraView>
            </View>
          )}

          {/* 5. PILLARS GRID */}
          {!isScanning && (
            <View style={styles.grid}>
              {PILLARS.map((p: any) => (
                <TouchableOpacity key={p.name} style={styles.tile} onPress={() => {setActivePillar(p.name); setShowAd(true);}}>
                  <MaterialCommunityIcons name={p.icon as any} size={30} color={p.color} />
                  <Text style={styles.tileText}>{p.name}</Text>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.ecoBar} onPress={() => setEcoMenuVisible(true)}>
          <Text style={styles.ecoText}>SHATKONA ECOSYSTEM ⋮</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* ECOSYSTEM MENU MODAL - FIXED PLACEMENT */}
      <Modal visible={ecoMenuVisible} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: '#000124', borderTopWidth: 2, borderColor: '#D4AF37' }]}>
            <TouchableOpacity onPress={() => setEcoMenuVisible(false)} style={{ alignSelf: 'flex-end', marginBottom: 15 }}>
              <MaterialCommunityIcons name="close-circle" size={32} color="#D4AF37" />
            </TouchableOpacity>

            <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
              {ECOSYSTEM_STRUCTURE.map((pillar) => (
                <View key={pillar.title} style={{ marginBottom: 25 }}>
                  <Text style={{ color: pillar.color, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }}>{pillar.title}</Text>
                  <View style={{ height: 1, backgroundColor: 'rgba(212,175,55,0.3)', marginBottom: 15 }} />
                  {pillar.items.map((item) => (
                    <TouchableOpacity key={item.label} style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 12 }} onPress={() => Linking.openURL(item.url)}>
                      <MaterialCommunityIcons name="chevron-right" size={20} color="#D4AF37" />
                      <Text style={{ color: '#FFF', fontSize: 14, marginLeft: 10 }}>{item.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </View>
  );
}

// 3. STYLES DEFINED OUTSIDE FUNCTION
const localStyles = StyleSheet.create({
  logoRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginTop: 8 },
  logoContainer: { backgroundColor: '#FFFFFF', padding: 4, borderRadius: 6, width: width / 6.5, height: 35, justifyContent: 'center', alignItems: 'center' },
  partnerLogo: { width: '100%', height: '100%', resizeMode: 'contain' },
  certificateBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFD700', padding: 12, borderRadius: 15 },
  certTextBold: { color: '#000', fontWeight: '900', fontSize: 11 }
});