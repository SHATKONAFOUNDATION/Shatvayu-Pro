import { MaterialCommunityIcons } from '@expo/vector-icons';
import { ResizeMode, Video } from 'expo-av';
import { CameraView } from 'expo-camera';
import React, { useState } from 'react';
import {
  Animated,
  Dimensions,
  Image,
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

import { PILLARS } from '../constants/pillars';
import { styles } from '../constants/styles';

const { width } = Dimensions.get('window');

export default function PatientScreen({ 
  isScanning, reading, scanMode, cameraRef, translateY, 
  blinkAnim, rotation, startScan, showReport, setShowReport, 
  setReading, setEcoMenuVisible, ecoMenuVisible 
}: any) {

  const [showAd, setShowAd] = useState(false);
  const [activePillar, setActivePillar] = useState('');
  
  // DEMO MODE: Change this to 9 to see the Certificate appear instantly
  const [userProgress] = useState(9); 

  const handlePillarPress = (name: string) => {
    setActivePillar(name);
    setShowAd(true);
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* HEADER */}
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

        {/* 3-6-9 ACHIEVEMENT MODULE */}
        {!isScanning && (
          <View style={{ paddingHorizontal: 20, marginBottom: 25 }}>
            <Text style={[styles.statusText, { textAlign: 'left', paddingHorizontal: 0, marginBottom: 10 }]}>
              SHATKONA PROGRESSION
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              {[3, 6, 9].map((mod) => (
                <View key={mod} style={[styles.modCard, { borderColor: userProgress >= mod ? '#FFD700' : '#333' }]}>
                  <Text style={[styles.modNumber, { color: userProgress >= mod ? '#FFD700' : '#444' }]}>{mod}</Text>
                  <Text style={styles.modLabel}>MONTHS</Text>
                  {userProgress >= mod && <MaterialCommunityIcons name="check-circle" size={12} color="#FFD700" style={{position: 'absolute', top: 5, right: 5}} />}
                </View>
              ))}
            </View>
          </View>
        )}

        {/* CERTIFICATE SECTION (Dynamic Based on Module 9) */}
        {!isScanning && userProgress >= 9 && (
          <View style={{ paddingHorizontal: 20, marginBottom: 20 }}>
            <TouchableOpacity style={localStyles.certificateBtn}>
              <MaterialCommunityIcons name="certificate" size={24} color="#000" />
              <View style={{ marginLeft: 10 }}>
                <Text style={localStyles.certTextBold}>DOWNLOAD SHATKONA CERTIFICATE</Text>
                <Text style={localStyles.certSubText}>Module 9 Mastery Achieved</Text>
              </View>
              <MaterialCommunityIcons name="download" size={20} color="#000" style={{ marginLeft: 'auto' }} />
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.statusText}>
          {isScanning 
            ? (scanMode === 'face' ? "ANALYZING BIOMETRIC FIELD..." : "PLACE FINGER OVER REAR LENS & FLASH") 
            : "FASCIAMAX™ BIOMETRIC SCAN"}
        </Text>

        {/* CAMERA SECTION */}
        {isScanning && (
          <View style={styles.cameraFrame}>
            <CameraView ref={cameraRef} style={styles.camera} facing={scanMode === 'face' ? "front" : "back"}>
              <View style={styles.overlay}>
                <Animated.View style={[styles.scannerLine, { transform: [{ translateY }] }]} />
                <View style={styles.dataStreamLeft}>
                  <Text style={styles.dataText}>S-INDEX: {Math.floor(110 + Math.random() * 20)}</Text>
                </View>
                <View style={styles.dataStreamRight}>
                  <Text style={styles.dataText}>VITALITY: 98%</Text> 
                </View>
              </View>
            </CameraView>
          </View>
        )}

        {/* PILLARS GRID */}
        {!isScanning && (
          <>
            <View style={styles.grid}>
               {PILLARS.map((pillar: any) => (
                 <TouchableOpacity 
                   key={pillar.name} 
                   style={[styles.tile, { borderColor: pillar.color + '33' }]}
                   onPress={() => handlePillarPress(pillar.name)}
                 >
                    <MaterialCommunityIcons name={pillar.icon as any} size={35} color={pillar.color} />
                    <Text style={styles.tileText}>{pillar.name}</Text>
                 </TouchableOpacity>
               ))}
            </View>

            {/* LIVE SEMINAR BUTTON */}
            <Animated.View style={{ opacity: blinkAnim, alignSelf: 'center', marginVertical: 30 }}>
              <TouchableOpacity style={[styles.seminarButton, { width: width * 0.85, height: 55, justifyContent: 'center' }]}>
                <Text style={[styles.seminarText, { fontSize: 14 }]}>JOIN LIVE PROTOCOL SEMINAR 🔴</Text>
              </TouchableOpacity>
            </Animated.View>

            {/* TRUST BAR */}
            <View style={[styles.trustBar, { marginBottom: 40 }]}>
              <Text style={styles.trustText}>SHATKONA FOUNDATION PARTNERS</Text>
              <Text style={styles.logoRow}>G20 • INVEST INDIA • AYUSH • CPRIMA</Text>
            </View>
          </>
        )}
      </ScrollView>

      {/* FOOTER */}
      <TouchableOpacity style={styles.ecoBar} onPress={() => setEcoMenuVisible(true)}>
        <Text style={styles.ecoText}>SHATKONA ECOSYSTEM ⋮</Text>
      </TouchableOpacity>

      {/* ADVERT MODAL */}
      <Modal visible={showAd} animationType="slide">
        <View style={styles.adOverlayView}>
          <TouchableOpacity style={styles.adClose} onPress={() => setShowAd(false)}>
            <MaterialCommunityIcons name="close-circle" size={45} color="#FFD700" />
          </TouchableOpacity>
          <Video
            source={{ uri: 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4' }}
            style={styles.adVideo}
            resizeMode={ResizeMode.COVER}
            shouldPlay
            isLooping
          />
          <View style={styles.adCTA}>
            <Text style={styles.adTitle}>{activePillar} MASTERY</Text>
            <TouchableOpacity style={styles.subBtn}>
              <Text style={styles.subBtnText}>SUBSCRIBE NOW</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MENU MODAL */}
      <Modal visible={ecoMenuVisible} transparent animationType="slide">
        <TouchableOpacity style={styles.modalOverlay} onPress={() => setEcoMenuVisible(false)}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>SHATKONA FOUNDATION ACCESS</Text>
            {['ASSAM GEOGLYPH MAP', 'SHATVAYU CLINIC LOG', 'CPRIMA PORTAL', 'CORPORATE WELLNESS'].map((item) => (
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

const localStyles = StyleSheet.create({
  certificateBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFD700',
    padding: 15,
    borderRadius: 15,
    elevation: 5,
    shadowColor: '#FFD700',
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  certTextBold: { color: '#000', fontWeight: '900', fontSize: 12 },
  certSubText: { color: '#000', fontSize: 10, opacity: 0.7 },
});