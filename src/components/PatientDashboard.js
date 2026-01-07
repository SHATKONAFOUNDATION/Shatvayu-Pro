import { Ionicons } from '@expo/vector-icons'; // Ensure you have expo-icons
import { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

const PatientDashboard = () => {
  // progress state: 0, 3, 6, or 9
  const [userProgress, setUserProgress] = useState(3); 

  const PILLARS = [
    { id: 1, name: 'Vagal Reset', icon: 'leaf-outline', color: '#4CD964' },
    { id: 2, name: 'Fascial Flow', icon: 'body-outline', color: '#FF9500' },
    { id: 3, name: 'Core/Pelvic', icon: 'fitness-outline', color: '#007AFF' },
    { id: 4, name: 'Shield', icon: 'shield-checkmark-outline', color: '#5856D6' },
    { id: 5, name: 'Yoga Nidra', icon: 'moon-outline', color: '#AF52DE' },
    { id: 6, name: 'Vow Mastery', icon: 'ribbon-outline', color: '#FF3B30' },
  ];

  const renderModuleCard = (modNumber, title) => {
    const isAchieved = userProgress >= modNumber;
    return (
      <View style={[styles.modCard, { borderColor: isAchieved ? '#FFD700' : '#333' }]}>
        <View style={[styles.modStatus, { backgroundColor: isAchieved ? '#FFD700' : '#222' }]}>
          <Text style={[styles.modStatusText, { color: isAchieved ? '#000' : '#888' }]}>
            {isAchieved ? 'ACHIEVED' : 'LOCKED'}
          </Text>
        </View>
        <Text style={styles.modNumber}>{modNumber}</Text>
        <Text style={styles.modTitle}>{title}</Text>
        {isAchieved && <Ionicons name="trophy" size={20} color="#FFD700" style={styles.trophyIcon} />}
      </View>
    );
  };

  return (
    <ScrollView style={styles.container}>
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

      {/* 6-Pillar Ecosystem Grid */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>The 6 Pillars (Guided Sessions)</Text>
        <View style={styles.pillarGrid}>
          {PILLARS.map((pillar) => (
            <TouchableOpacity key={pillar.id} style={styles.pillarItem}>
              <View style={[styles.iconCircle, { backgroundColor: pillar.color + '20' }]}>
                <Ionicons name={pillar.icon} size={28} color={pillar.color} />
              </View>
              <Text style={styles.pillarName}>{pillar.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {/* Quick Action: The Scanner */}
      <TouchableOpacity style={styles.scanButton}>
        <Ionicons name="scan-circle" size={32} color="#FFF" />
        <Text style={styles.scanButtonText}>START BIOMETRIC SCAN</Text>
      </TouchableOpacity>

      <View style={{ height: 100 }} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000', padding: 20 },
  header: { marginTop: 40, marginBottom: 30 },
  welcomeText: { color: '#888', fontSize: 16 },
  brandText: { color: '#FFF', fontSize: 28, fontWeight: '900', letterSpacing: 1 },
  
  section: { marginBottom: 30 },
  sectionTitle: { color: '#FFF', fontSize: 18, fontWeight: '700', marginBottom: 15 },
  
  modGrid: { flexDirection: 'row', justifyContent: 'space-between' },
  modCard: { 
    width: (width - 60) / 3.2, height: 140, 
    borderWidth: 2, borderRadius: 15, 
    backgroundColor: '#111', alignItems: 'center', justifyContent: 'center' 
  },
  modStatus: { position: 'absolute', top: 0, width: '100%', borderTopLeftRadius: 12, borderTopRightRadius: 12, paddingVertical: 4 },
  modStatusText: { textAlign: 'center', fontSize: 8, fontWeight: '900' },
  modNumber: { color: '#FFF', fontSize: 32, fontWeight: '800' },
  modTitle: { color: '#888', fontSize: 10, textAlign: 'center', marginTop: 5 },
  trophyIcon: { marginTop: 8 },

  pillarGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  pillarItem: { width: '48%', backgroundColor: '#111', padding: 20, borderRadius: 20, marginBottom: 15, alignItems: 'center' },
  iconCircle: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 10 },
  pillarName: { color: '#FFF', fontSize: 14, fontWeight: '600' },

  scanButton: { 
    backgroundColor: '#007AFF', flexDirection: 'row', 
    padding: 18, borderRadius: 20, justifyContent: 'center', alignItems: 'center',
    shadowColor: '#007AFF', shadowOpacity: 0.5, shadowRadius: 10, elevation: 5
  },
  scanButtonText: { color: '#FFF', fontWeight: '800', marginLeft: 10, fontSize: 16 }
});

export default PatientDashboard;
