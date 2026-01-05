import { MaterialCommunityIcons } from '@expo/vector-icons';
import { CameraView } from 'expo-camera';
import React from 'react';
import {
  Animated,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Ensure these paths match your folder structure
import { PILLARS } from '../constants/pillars';
import { styles } from '../constants/styles';

export default function PatientScreen({ 
  isScanning, 
  reading, 
  scanMode, 
  cameraRef, 
  translateY, 
  blinkAnim, 
  rotation, 
  startScan, 
  showReport, 
  setShowReport, 
  setReading, 
  setEcoMenuVisible, 
  ecoMenuVisible 
}: any) {

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER SECTION */}
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
            : "FASCIAMAX™ LIVE SCAN"}
        </Text>

        {/* CAMERA SECTION */}
        {isScanning && (
  <View style={styles.cameraFrame}>
    <CameraView ref={cameraRef} style={styles.camera} facing={scanMode === 'face' ? "front" : "back"}>
      {/* Target Corners */}
      <View style={styles.targetCornerTopLeft} />
      <View style={styles.targetCornerTopRight} />
      <View style={styles.targetCornerBottomLeft} />
      <View style={styles.targetCornerBottomRight} />

      <View style={styles.overlay}>
        <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
        
        {/* Live Data Streams - Updated for FasciaMax */}
<View style={styles.dataStreamLeft}>
  <Text style={styles.dataText}>S-INDEX: {Math.floor(110 + Math.random() * 20)}</Text>
  <Text style={styles.dataText}>TENSION: {Math.floor(70 + Math.random() * 15)}</Text>
</View>

<View style={styles.dataStreamRight}>
  <Text style={styles.dataText}>VITALITY: 98%</Text> 
  <Text style={styles.dataText}>ELASTICITY: 1.2ms</Text>
</View>
      </View>
    </CameraView>
  </View>
)}

        {/* PILLARS GRID */}
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
            <MaterialCommunityIcons name="check-decagram" size={60} color="#D4AF37" />
            <Text style={styles.reportTitle}>BIO-METRIC ANALYSIS COMPLETE</Text>
            <Text style={styles.sIndexResult}>S-INDEX: {showReport?.hrv}%</Text>
            <Text style={styles.hrvText}>HRV: {showReport?.hrv}ms | STRESS: {showReport?.stress}</Text>
            <Text style={styles.timestampText}>SCAN TIME: {showReport?.timestamp}</Text>
            <View style={styles.dividerGold} />
            <TouchableOpacity 
              style={styles.closeButton} 
              onPress={() => {
                setShowReport(null);
                setReading(0);
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