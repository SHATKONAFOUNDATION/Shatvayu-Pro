import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { CameraView } from 'expo-camera'; // For your Face/Finger scans
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
// Import your custom constants
import { PILLARS } from '../constants/pillars';
import { styles } from '../constants/styles';

// CONSOLIDATED DIMENSIONS (Fixes the duplicate error)
const { width, height } = Dimensions.get('window');

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
  const [userProgress] = useState(9); // Mastery level for demo

  // --- NEW ROADMAP STATES ---
  const [showRoadmap, setShowRoadmap] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState(3);
  
  // --- NEW CLINICAL REPORT STATE --- (Placed here to avoid hook errors)
  const [showClinicalReport, setShowClinicalReport] = useState(false);

  // --- CLINICAL ANALYSIS LOGIC --- (Refactored to avoid early returns)
  const getPhaseAnalysis = () => {
    let analysis = {
      status: "Optimal Tensegrity",
      advice: "Autonomous Maintenance & Bio-Hacking protocols active."
    };

    if (userProgress <= 3) {
      analysis = {
        status: "High Tissue Adhesion",
        advice: "Prioritize Decompression & Hydration of the ground substance."
      };
    } else if (userProgress <= 6) {
      analysis = {
        status: "Kinetic Misalignment",
        advice: "Focus on Spiral Line alignment and kinetic chain integration."
      };
    }
    return analysis;
  };

  const roadmapContent: any = {
    3: {
      title: "PHASE 1: FOUNDATION",
      focus: "Hydration & Decompression",
      details: "• Manual Fascial Release\n• Tissue Rehydration Protocols\n• Baseline Biometric Mapping\n• Mind-Fascia Connection"
    },
    6: {
      title: "PHASE 2: VITALITY",
      focus: "Structural Alignment",
      details: "• Kinetic Chain Optimization\n• Tensegrity System Training\n• Endurance\n• Pain Pattern Erasure"
    },
    9: {
      title: "PHASE 3: MASTERY",
      focus: "Autonomous Bio-Hacking",
      details: "• Geoglyph Energy Mapping\n• Executive Fascia Reset\n• Autonomous Maintenance\n• Protocol Graduation"
    }
  };

  const handlePillarPress = (name: string) => {
    setActivePillar(name);
    setShowAd(true);
  };

  const handleProgressPress = (month: number) => {
    setSelectedMonth(month);
    setShowRoadmap(true);
  };
const [isFinished, setIsFinished] = useState(false);
const [landmarks, setLandmarks] = useState<any>(null);

const renderSkeletalOverlay = () => {
  if (scanMode !== 'skeletal' || !landmarks) return null;

  const ear = landmarks[7];      
  const shoulder = landmarks[11]; 
  
  const ex = ear.x * width;
  const ey = ear.y * height;
  const sx = shoulder.x * width;
  const sy = shoulder.y * height;

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
//
  return (
    <View style={{ flex: 1 }}>
      {/* BACKGROUND LAYER */}
      <View style={StyleSheet.absoluteFill}>
        <LinearGradient
          colors={['#000B29', '#07011b', '#000333']}
          style={{ flex: 1 }}
        />
      </View>

      <SafeAreaView style={[styles.container, { backgroundColor: 'transparent' }]}>
        <View style={styles.header}>
          <Image source={require('../../assets/images/logo.png')} style={styles.logoSmall} />
          <View style={{ flexDirection: 'row', gap: 8 }}>
            <TouchableOpacity style={styles.startScanBtnTop} onPress={() => startScan('face')}>
              <Text style={styles.scanBtnText}>FACE SCAN</Text>
            </TouchableOpacity>
            <TouchableOpacity 
  style={[styles.startScanBtnTop, { backgroundColor: '#D4AF37' }]} 
  onPress={() => startScan('skeletal')}
>
  <Text style={[styles.scanBtnText, { color: '#000' }]}>AI SCAN</Text>
</TouchableOpacity>
            <TouchableOpacity style={[styles.startScanBtnTop, { backgroundColor: '#FFD700' }]} onPress={() => startScan('finger')}>
              <Text style={styles.scanBtnText}>FINGER SCAN</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          
          {/* 1. PARTNERSHIP TRUST BAR */}
          {!isScanning && (
            <View style={styles.trustBar}>
              <Text style={styles.trustText}>OFFICIAL PARTNERS</Text>
              <View style={localStyles.logoRow}>
                {[
                  require('../../assets/images/nsdc.png'),
                  require('../../assets/images/ayush.png'),
                  require('../../assets/images/msme.png'),
                  require('../../assets/images/who.png'),
                  require('../../assets/images/g20.png')
                ].map((img, idx) => (
                  <View key={idx} style={localStyles.logoContainer}>
                    <Image source={img} style={localStyles.partnerLogo} />
                  </View>
                ))}
              </View>
            </View>
          )}

          {/* --- TOUCHABLE PERCENTAGE --- */}
          <TouchableOpacity onPress={() => setShowClinicalReport(true)} activeOpacity={0.7}>
            <Text style={styles.percentageText}>{reading}%</Text>
            <Text style={{ color: '#D4AF37', textAlign: 'center', fontSize: 10, marginTop: -10, marginBottom: 10 }}>

             {/* GOLDEN STAMP - ONLY SHOWS AFTER COMPLETION */}
{isFinished && !isScanning && (
  <View 
    style={{ 
      marginHorizontal: 20, 
      backgroundColor: 'rgba(212, 175, 55, 0.15)', 
      borderRadius: 20, 
      padding: 20, 
      borderWidth: 2, 
      borderColor: '#FFD700',
      marginBottom: 20,
      alignItems: 'center',
      marginTop: 10,
      // Add a slight shadow to make it "pop" off the home screen
      shadowColor: '#FFD700',
      shadowRadius: 10,
      shadowOpacity: 0.3,
      elevation: 5
    }}
  >
    <View style={{ position: 'absolute', top: -12, backgroundColor: '#FFD700', paddingHorizontal: 15, borderRadius: 10 }}>
      <Text style={{ color: '#000', fontSize: 10, fontWeight: '900' }}>BIOMETRIC SCAN VERIFIED</Text>
    </View>

    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%', marginTop: 5 }}>
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#FFD700', fontSize: 26, fontWeight: '900' }}>118</Text>
        <Text style={{ color: '#D4AF37', fontSize: 9, fontWeight: 'bold' }}>S-INDEX</Text>
      </View>
      
      <MaterialCommunityIcons name="seal-variant" size={45} color="#FFD700" />
      
      <View style={{ alignItems: 'center' }}>
        <Text style={{ color: '#FFD700', fontSize: 26, fontWeight: '900' }}>98%</Text>
        <Text style={{ color: '#D4AF37', fontSize: 9, fontWeight: 'bold' }}>VITALITY</Text>
      </View>
    </View>

    <TouchableOpacity 
      onPress={() => setIsFinished(false)} 
      style={{ marginTop: 10, padding: 5 }}
    >
      <Text style={{ color: 'rgba(255,255,255,0.5)', fontSize: 10 }}>CLOSE SEAL ✕</Text>
    </TouchableOpacity>
  </View>
)}
 
              TAP FOR CLINICAL ANALYSIS
            </Text>
          </TouchableOpacity>

          {/* 2. PROGRESS CARDS WITH LOCKING LOGIC */}
          {!isScanning && (
            <View style={{ paddingHorizontal: 20, marginBottom: 15 }}>
              <Text style={[styles.statusText, { textAlign: 'left' }]}>SHATKONA PROTOCOL PROGRESS</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
                {[3, 6, 9].map((mod) => {
                  const isLocked = userProgress < mod;
                  return (
                    <TouchableOpacity 
                      key={mod} 
                      onPress={() => handleProgressPress(mod)}
                      style={[
                        styles.modCard, 
                        { 
                          borderColor: isLocked ? '#333' : '#FFD700',
                          opacity: isLocked ? 0.6 : 1 
                        }
                      ]}
                    >
                      {isLocked && (
                        <MaterialCommunityIcons 
                          name="lock" 
                          size={14} 
                          color="#666" 
                          style={{ position: 'absolute', top: 5, right: 5 }} 
                        />
                      )}
                      <Text style={[styles.modNumber, { color: isLocked ? '#666' : '#FFD700' }]}>{mod}</Text>
                      <Text style={[styles.modLabel, { color: isLocked ? '#444' : '#D4AF37' }]}>MONTHS</Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </View>
          )}

          {/* 3. CERTIFICATE DOWNLOAD */}
          {!isScanning && userProgress >= 9 && (
            <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
              <TouchableOpacity style={localStyles.certificateBtn}>
                <MaterialCommunityIcons name="certificate" size={20} color="#000" />
                <Text style={[localStyles.certTextBold, { marginLeft: 8 }]}>DOWNLOAD PROTOCOL PROGRESS CERTIFICATE</Text>
                <MaterialCommunityIcons name="download" size={18} color="#000" style={{ marginLeft: 'auto' }} />
              </TouchableOpacity>
            </View>
          )}

          <Text style={styles.statusText}>
  {isScanning 
    ? (scanMode === 'face' 
        ? "ANALYZING BIOMETRIC FIELD..." 
        : scanMode === 'skeletal' 
          ? "AI FASCIAL MAPPING ACTIVE..." 
          : "SCANNING FINGER VASCULARITY...") 
    : "FASCIAMAX™ LIVE SYSTEM ACTIVE"}
</Text>

          {/* 4. CAMERA HUD */}
{isScanning && (
  <View style={styles.cameraFrame}>
    <CameraView ref={cameraRef} style={styles.camera} facing={scanMode === 'face' ? "front" : "back"}>
      <View style={styles.overlay}>
        {/* The Moving Scan Line */}
        <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
        
        {/* ADD THIS LINE HERE: This draws the Golden Skeletal Lines & Angles */}
        {renderSkeletalOverlay()}
        
      </View>
    </CameraView>
  </View>
)}

          {/* 5. PILLARS GRID */}
          {!isScanning && (
            <>
              <View style={styles.grid}>
                {PILLARS.map((p: any) => (
                  <TouchableOpacity key={p.name} style={styles.tile} onPress={() => handlePillarPress(p.name)}>
                    <MaterialCommunityIcons name={p.icon as any} size={30} color={p.color} />
                    <Text style={styles.tileText}>{p.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>

              <Animated.View style={{ opacity: blinkAnim, alignSelf: 'center', marginVertical: 20 }}>
                <TouchableOpacity style={[styles.seminarButton, { width: width * 0.85, height: 50, justifyContent: 'center' }]}>
                  <Text style={styles.seminarText}>JOIN LIVE PROTOCOL WEBINAR 🔴</Text>
                </TouchableOpacity>
              </Animated.View>
            </>
          )}
        </ScrollView>

        <TouchableOpacity style={styles.ecoBar} onPress={() => setEcoMenuVisible(true)}>
          <Text style={styles.ecoText}>SHATKONA ECOSYSTEM ⋮</Text>
        </TouchableOpacity>
      </SafeAreaView>

      {/* --- CLINICAL REPORT MODAL --- */}
      <Modal visible={showClinicalReport} transparent animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, { backgroundColor: '#000124', borderTopWidth: 3, borderColor: '#D4AF37' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text style={[styles.modalTitle, { color: '#D4AF37', textAlign: 'left', marginBottom: 0 }]}>
                FASCIAMAX™ CLINICAL REPORT
              </Text>
              <TouchableOpacity onPress={() => setShowClinicalReport(false)}>
                <MaterialCommunityIcons name="close-circle" size={28} color="#D4AF37" />
              </TouchableOpacity>
            </View>

            {/* Visual Bio-Map Figure */}
            <View style={{ alignItems: 'center', marginVertical: 20 }}>
               <MaterialCommunityIcons name="human" size={120} color="rgba(212, 175, 55, 0.2)" />
               <View style={{ 
                 position: 'absolute', top: 20, backgroundColor: 'red', width: 10, height: 10, borderRadius: 5, 
                 shadowColor: 'red', shadowRadius: 10, elevation: 10, shadowOpacity: 1, shadowOffset: {width:0, height:0}
               }} />
               <Text style={{ color: '#D4AF37', fontSize: 10, marginTop: 5 }}>BIO-FIELD TENSION: CERVICAL CHAIN</Text>
            </View>

            <View style={{ padding: 15, backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 15 }}>
              <Text style={{ color: '#FFF', fontSize: 16, fontWeight: 'bold' }}>S-INDEX: 118</Text>
              <Text style={{ color: '#D4AF37', fontSize: 12, marginTop: 5 }}>STATUS: {getPhaseAnalysis().status}</Text>
              <Text style={{ color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 10, fontStyle: 'italic' }}>
                "{getPhaseAnalysis().advice}"
              </Text>
            </View>

            <TouchableOpacity 
              style={[styles.subBtn, { width: '100%', marginTop: 20, backgroundColor: '#D4AF37' }]} 
              onPress={() => setShowClinicalReport(false)}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>SYNC TO CLINIC LOG</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* --- ROADMAP DETAIL MODAL --- */}
      <Modal visible={showRoadmap} transparent animationType="fade">
        <TouchableOpacity 
          style={styles.modalOverlay} 
          activeOpacity={1} 
          onPress={() => setShowRoadmap(false)}
        >
          <View style={[styles.modalContent, { backgroundColor: '#000B29', borderWidth: 2, borderColor: '#FFD700' }]}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={[styles.modalTitle, { color: '#FFD700', textAlign: 'left' }]}>
                {roadmapContent[selectedMonth]?.title}
              </Text>
              <TouchableOpacity onPress={() => setShowRoadmap(false)}>
                <MaterialCommunityIcons name="close" size={24} color="#FFD700" />
              </TouchableOpacity>
            </View>
            
            <Text style={{ color: '#FFF', fontWeight: 'bold', marginBottom: 10 }}>
              FOCUS: {roadmapContent[selectedMonth]?.focus}
            </Text>
            
            <Text style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 24, fontSize: 15 }}>
              {roadmapContent[selectedMonth]?.details}
            </Text>

            <TouchableOpacity 
              style={[styles.subBtn, { width: '100%', marginTop: 20, backgroundColor: '#FFD700' }]} 
              onPress={() => setShowRoadmap(false)}
            >
              <Text style={{ color: '#000', fontWeight: 'bold', textAlign: 'center' }}>UNDERSTOOD</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </Modal>

      {/* AD MODAL */}
      <Modal visible={showAd} animationType="slide">
        <View style={styles.adOverlayView}>
          <TouchableOpacity style={styles.adClose} onPress={() => setShowAd(false)}>
            <MaterialCommunityIcons name="close-circle" size={45} color="#FFD700" />
          </TouchableOpacity>
          <Video source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }} style={styles.adVideo} resizeMode={ResizeMode.COVER} shouldPlay isLooping />
          <View style={styles.adCTA}>
            <Text style={styles.adTitle}>{activePillar} MASTERY</Text>
            <TouchableOpacity style={styles.subBtn} onPress={() => setShowAd(false)}>
              <Text style={styles.subBtnText}>SUBSCRIBE NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ECOSYSTEM MENU */}
<Modal visible={ecoMenuVisible} transparent animationType="slide">
  <TouchableOpacity style={styles.modalOverlay} onPress={() => setEcoMenuVisible(false)}>
    <View style={styles.modalContent}>
      <Text style={styles.modalTitle}>SHATVAYU GLOBAL FOUNDATION</Text>
      
      {['FASCIAMAX™ CLINIC LOG', 'ASSAM GEOGLYPH MAP', 'CPRIMA PORTAL', 'CORPORATE MASTERY'].map((item) => (
        <TouchableOpacity 
          key={item} 
          style={styles.menuItem} 
          onPress={() => {
            setEcoMenuVisible(false);
            if (item === 'CPRIMA PORTAL') {
              // This links your research wing to the .org foundation site
              Linking.openURL('https://shatvayu.org');
            } else if (item === 'FASCIAMAX™ CLINIC LOG') {
              // This links your commercial side to the .com site
              Linking.openURL('https://shatvayu.com');
            }
          }}
        >
          <Text style={styles.menuText}>{item}</Text>
        </TouchableOpacity>
      ))}
    </View>
  </TouchableOpacity>
</Modal>
    </View>
  );
}

const localStyles = StyleSheet.create({
  logoRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '100%', marginTop: 8, paddingHorizontal: 5 },
  logoContainer: { 
    backgroundColor: '#FFFFFF', 
    padding: 4, 
    borderRadius: 6, 
    width: width / 6.5, 
    height: 35, 
    justifyContent: 'center', 
    alignItems: 'center',
    elevation: 2,
  },
  partnerLogo: { width: '100%', height: '100%', resizeMode: 'contain' },
  certificateBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: '#FFD700', padding: 12, borderRadius: 15 },
  certTextBold: { color: '#000', fontWeight: '900', fontSize: 11 }
});