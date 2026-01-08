import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const PatientDashboard = () => {
  // --- STATE DECLARATIONS ---
  const [userProgress, setUserProgress] = useState(6); // 0, 3, 6, or 9
  const [isScanning, setIsScanning] = useState(false);
  const [reading, setReading] = useState(0);
  const [ppgData, setPpgData] = useState(new Array(20).fill(0));

  // --- PPG SIGNAL SIMULATION LOGIC ---
  // --- UPDATED RHYTHMIC PULSE LOGIC (Paste this inside PatientDashboard) ---
  useEffect(() => {
    let interval;
    if (isScanning) {
      interval = setInterval(() => {
        setPpgData(prev => {
          // Create a time-based rhythm for the vascular surge
          const time = Date.now() / 150; 
          
          // This creates a "double-beat" pulse pattern (lub-dub)
          const pulse = Math.pow(Math.sin(time), 10) * 40 + Math.pow(Math.sin(time + 0.5), 10) * 20;
          const randomNoise = Math.random() * 10;
          const newBarHeight = Math.max(5, pulse + randomNoise + 10);

          // Moves the wave from right to left
          return [...prev.slice(1), newBarHeight];
        });

        setReading(prev => {
          if (prev >= 100) {
            setIsScanning(false);
            return 100;
          }
          return prev + 1;
        });
      }, 80); // Refresh rate set to 80ms for smooth vascular motion
    } else {
      setPpgData(new Array(20).fill(5)); 
    }
    return () => clearInterval(interval);
  }, [isScanning]);

  const PILLARS = [
  { id: '1', name: 'Vagal Reset', icon: 'leaf-outline', color: '#4CAF50' },
  { id: '2', name: 'Fascial Flow', icon: 'water-outline', color: '#03A9F4' },
  { id: '3', name: 'Kinetic Stability', icon: 'shield-checkmark-outline', color: '#FF9800' },
  { id: '4', name: 'Chain Integration', icon: 'link-outline', color: '#E91E63' },
  { id: '5', name: 'Yoga Nidra', icon: 'moon-outline', color: '#9C27B0' },
  { id: '6', name: 'Vow Mastery', icon: 'trophy-outline', color: '#F44336' },
];

  const renderModuleCard = (modNumber, title) => {
    const isAchieved = userProgress >= modNumber;
    return (
      <View key={modNumber} style={[styles.modCard, { borderColor: isAchieved ? '#FFD700' : '#333' }]}>
        <View style={[styles.modStatus, { backgroundColor: isAchieved ? '#FFD700' : '#222' }]}>
          <Text style={[styles.modStatusText, { color: isAchieved ? '#000' : '#888' }]}>
            {isAchieved ? 'ACHIEVED' : 'LOCKED'}
          </Text>
        </View>
        <Text style={styles.modNumber}>{modNumber}</Text>
        <Text style={styles.modTitle}>{title}</Text>
        {isAchieved && <Ionicons name="trophy" size={16} color="#FFD700" style={styles.trophyIcon} />}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.welcomeText}>Welcome to the Lab,</Text>
        <Text style={styles.brandText}>MERKABA RECOVERY</Text>
      </View>

      {/* 3-6-9 Achievement Module */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Shatkona Protocol Progress</Text>
        <View style={styles.modGrid}>
          {renderModuleCard(3, "Baseline Reset")}
          {renderModuleCard(6, "Fascial Release")}
          {renderModuleCard(9, "Total Mastery")}
        </View>
      </View>

      {/* PPG LIVE SCANNER AREA */}
      {isScanning && (
        <View style={styles.scanMonitor}>
          <Text style={styles.monitorText}>LIVE VASCULAR SIGNAL: {reading}%</Text>
          <View style={styles.waveContainer}>
            {ppgData.map((val, idx) => (
              <View 
                key={idx} 
                style={[styles.waveBar, { height: val, opacity: (idx + 1) / 20 }]} 
              />
            ))}
          </View>
        </View>
      )}

      {/* GOLDEN STAMP - Shows only after 100% completion */}
      {!isScanning && reading === 100 && (
        <View style={styles.goldenStamp}>
          <View style={styles.stampRibbon}>
            <Text style={styles.stampRibbonText}>VERIFIED BIOMETRIC LOG</Text>
          </View>
          <View style={styles.stampRow}>
            <View style={styles.stampMetric}>
              <Text style={styles.stampValue}>118</Text>
              <Text style={styles.stampLabel}>S-INDEX</Text>
            </View>
            <MaterialCommunityIcons name="seal-variant" size={40} color="#FFD700" />
            <View style={styles.stampMetric}>
              <Text style={styles.stampValue}>98%</Text>
              <Text style={styles.stampLabel}>VITALITY</Text>
            </View>
          </View>
        </View>
      )}

     {/* 6-Pillar Ecosystem Grid - PHASE AWARE VERSION */}
<View style={styles.section}>
  <Text style={styles.sectionTitle}>The 6 Pillars (Guided Sessions)</Text>
  <View style={styles.pillarGrid}>
    
    {/* --- START OF THE BLOCK TO REPLACE --- */}
    {PILLARS.map((pillar, index) => {
      // Determines which pillars glow based on your 3-6-9 roadmap
      const isCurrentPhase = 
        (userProgress <= 3 && index < 2) || 
        (userProgress > 3 && userProgress <= 6 && index >= 2 && index < 4) ||
        (userProgress > 6 && index >= 4);

      return (
        <TouchableOpacity 
          key={pillar.id} 
          style={[
            styles.pillarItem, 
            isCurrentPhase && { borderColor: pillar.color, borderWidth: 2, shadowColor: pillar.color, elevation: 5 }
          ]}
        >
          <View style={[styles.iconCircle, { backgroundColor: isCurrentPhase ? pillar.color : '#111' }]}>
            <Ionicons name={pillar.icon} size={28} color={isCurrentPhase ? '#000' : '#444'} />
          </View>
          <Text style={[styles.pillarName, { color: isCurrentPhase ? '#FFF' : '#444' }]}>{pillar.name}</Text>
          {isCurrentPhase && (
            <Text style={{fontSize: 8, color: pillar.color, fontWeight: '900', marginTop: 5}}>
              ACTIVE PHASE
            </Text>
          )}
        </TouchableOpacity>
      );
    })}
    {/* --- END OF THE BLOCK TO REPLACE --- */}

  </View>
</View>

      {/* Quick Action Button */}
      <TouchableOpacity 
        style={[styles.scanButton, isScanning && { backgroundColor: '#FF3B30' }]}
        onPress={() => {
          setReading(0);
          setIsScanning(!isScanning);
        }}
      >
        <Ionicons name={isScanning ? "stop-circle" : "scan-circle"} size={32} color="#FFF" />
        <Text style={styles.scanButtonText}>
          {isScanning ? "ABORT SYSTEM SCAN" : "START BIOMETRIC SCAN"}
        </Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { marginTop: 40, marginBottom: 20 },
  welcomeText: { color: '#888', fontSize: 14 },
  brandText: { color: '#FFF', fontSize: 24, fontWeight: '900', letterSpacing: 1 },
  
  section: { marginBottom: 25 },
  sectionTitle: { color: '#FFF', fontSize: 16, fontWeight: '700', marginBottom: 12 },
  
  modGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  modCard: { 
    width: (width - 60) / 3.2, height: 120, 
    borderWidth: 1.5, borderRadius: 12, 
    backgroundColor: '#0a0a0a', alignItems: 'center', justifyContent: 'center' 
  },
  modStatus: { position: 'absolute', top: 0, width: '100%', borderTopLeftRadius: 10, borderTopRightRadius: 10, paddingVertical: 3 },
  modStatusText: { textAlign: 'center', fontSize: 7, fontWeight: '900' },
  modNumber: { color: '#FFF', fontSize: 28, fontWeight: '800' },
  modTitle: { color: '#666', fontSize: 9, textAlign: 'center', marginTop: 2 },
  trophyIcon: { marginTop: 4 },

  scanMonitor: { backgroundColor: '#111', padding: 15, borderRadius: 15, marginBottom: 20, borderWidth: 1, borderColor: '#333' },
  monitorText: { color: '#FFD700', fontSize: 10, fontWeight: '800', marginBottom: 10 },
  waveContainer: { flexDirection: 'row', alignItems: 'flex-end', height: 60, gap: 2 },
  waveBar: { flex: 1, backgroundColor: '#FFD700', borderRadius: 2 },

  goldenStamp: {
    backgroundColor: 'rgba(212, 175, 55, 0.1)', borderRadius: 15, padding: 20,
    borderWidth: 1, borderColor: '#FFD700', marginBottom: 25, alignItems: 'center'
  },
  stampRibbon: { position: 'absolute', top: -10, backgroundColor: '#FFD700', paddingHorizontal: 10, borderRadius: 5 },
  stampRibbonText: { color: '#000', fontSize: 9, fontWeight: '900' },
  stampRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around', width: '100%' },
  stampMetric: { alignItems: 'center' },
  stampValue: { color: '#FFD700', fontSize: 22, fontWeight: '900' },
  stampLabel: { color: '#D4AF37', fontSize: 8, fontWeight: 'bold' },

  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pillarItem: { width: '48%', backgroundColor: '#0a0a0a', padding: 15, borderRadius: 15, marginBottom: 12, alignItems: 'center', borderWidth: 1, borderColor: '#1a1a1a' },
  iconCircle: { width: 50, height: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center', marginBottom: 8 },
  pillarName: { color: '#EEE', fontSize: 13, fontWeight: '600' },

  scanButton: { 
    backgroundColor: '#007AFF', flexDirection: 'row', 
    padding: 16, borderRadius: 15, justifyContent: 'center', alignItems: 'center',
    elevation: 5
  },
  scanButtonText: { color: '#FFF', fontWeight: '800', marginLeft: 10, fontSize: 15 }
});

export default PatientDashboard;