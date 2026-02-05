import { useRouter } from 'expo-router';
import React from 'react';
import { Linking, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function ClinicsScreen() {
  const router = useRouter();

  const locations = [
    {
      id: 'ghy',
      name: 'GUWAHATI CENTER',
      address: '#43, Rudrapur Bylane, Bhetapara, Ghy-28',
      type: 'ACTIVE CLINIC',
      color: '#fbbf24'
    },
    {
      id: 'nagaon',
      name: 'NAGAON GEOGLYPH',
      address: 'International Healing Center (Visible from Space)',
      type: 'PROJECTED 2027',
      color: '#475569'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>FRANCHISE NETWORK</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        <Text style={styles.missionText}>Part of the Global Pain Free Living Mission (GPFLM)</Text>
        
    {locations.map((loc) => (
  <View key={loc.id} style={styles.clinicCard}>
    <View style={[styles.statusIndicator, { backgroundColor: loc.color }]} />
    <View style={{ padding: 20, flex: 1 }}>
      <Text style={styles.typeTag}>{loc.type}</Text>
      <Text style={styles.locationName}>{loc.name}</Text>
      <Text style={styles.address}>{loc.address}</Text>
      
      {/* Properly formatted conditional button */}
      {loc.id === 'ghy' && (
        <TouchableOpacity 
          style={styles.bookBtn}
          onPress={() => Linking.openURL('tel:+9143Rudrapur')} // Replace with your Bhetapara number
        >
          <Text style={styles.bookText}>SECURE APPOINTMENT</Text>
        </TouchableOpacity>
      )}
    </View>
  </View>
))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505' },
  header: { paddingTop: 60, paddingHorizontal: 25, flexDirection: 'row', alignItems: 'center', marginBottom: 20 },
  backLink: { color: '#475569', fontSize: 12, fontWeight: '900' },
  headerTitle: { color: '#fff', fontSize: 18, fontWeight: '900', marginLeft: 20, letterSpacing: 2 },
  list: { padding: 25 },
  missionText: { color: '#64748b', fontSize: 12, marginBottom: 30, textAlign: 'center', fontWeight: 'bold' },
  clinicCard: { backgroundColor: '#0a0a0a', borderRadius: 20, marginBottom: 20, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: '#1a1a1a' },
  statusIndicator: { width: 6 },
  typeTag: { color: '#475569', fontSize: 8, fontWeight: '900', letterSpacing: 1, marginBottom: 5 },
  locationName: { color: '#fff', fontSize: 20, fontWeight: '900' },
  address: { color: '#94a3b8', fontSize: 12, marginTop: 5, lineHeight: 18 },
  bookBtn: { marginTop: 15, backgroundColor: '#1e293b', padding: 12, borderRadius: 8, alignItems: 'center', borderWidth: 1, borderColor: '#fbbf24' },
  bookText: { color: '#fbbf24', fontSize: 10, fontWeight: '900' }
});