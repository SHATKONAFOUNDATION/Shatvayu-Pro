import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const { width } = Dimensions.get('window');

export default function App() {
  const router = useRouter();
  const [viewMode, setViewMode] = useState<'RITUAL' | 'ACADEMY'>('RITUAL');

  // --- SOVEREIGN CALENDAR LOGIC ---
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const today = days[new Date().getDay()];

  const getRoutine = () => {
    if (today === 'Monday' || today === 'Thursday') return { id: 'A', name: 'UPPER COMMAND', sub: 'Digital Reset', color: '#38bdf8' };
    if (today === 'Tuesday' || today === 'Friday') return { id: 'B', name: 'CORE ENGINE', sub: 'Stability & Root', color: '#fbbf24' };
    if (today === 'Wednesday' || today === 'Saturday') return { id: 'C', name: 'SPIRAL FOUNDATION', sub: 'Agility & Flow', color: '#4ade80' };
    return { id: 'Nidra', name: 'YOGA NIDRA', sub: 'Deep Recovery', color: '#a855f7' };
  };

  const routine = getRoutine();

  return (
    <View style={styles.mainContainer}>
      
      {/* 🏛️ ARCHITECT HEADER */}
      <View style={styles.header}>
        <View>
          <Text style={styles.logoText}>FASCIAMAX</Text>
          <Text style={styles.subLogo}>BY SHATVAYU</Text>
        </View>
        <TouchableOpacity 
          style={styles.navBtn}
          onPress={() => setViewMode(viewMode === 'RITUAL' ? 'ACADEMY' : 'RITUAL')}
        >
          <Text style={styles.navText}>
            {viewMode === 'RITUAL' ? "🎓 ACCESS VAULT" : "🧘 DAILY RITUAL"}
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {viewMode === 'RITUAL' ? (
          <View>
            <View style={styles.titleSection}>
              <Text style={styles.sectionTitle}>Sovereign Maintenance</Text>
              <Text style={styles.dateText}>{today.toUpperCase()} PROTOCOL</Text>
            </View>

            <TouchableOpacity 
              style={[styles.ritualCard, { borderLeftColor: routine.color }]} 
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/player', params: { id: routine.id } })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.ritualTag}>30-MINUTE RESET</Text>
                <View style={[styles.statusDot, { backgroundColor: routine.color }]} />
              </View>
              
              <Text style={styles.ritualName}>{routine.name}</Text>
              <Text style={styles.ritualSubText}>{routine.sub}</Text>
              
              <View style={styles.playButton}>
                <Text style={styles.playText}>INITIATE FLOW</Text>
              </View>
            </TouchableOpacity>

            <View style={styles.statsContainer}>
               <View style={styles.statBox}>
                  <Text style={styles.statValue}>12</Text>
                  <Text style={styles.statLabel}>DAY STREAK</Text>
               </View>
               <View style={styles.statBox}>
                  <Text style={styles.statValue}>88%</Text>
                  <Text style={styles.statLabel}>VAGAL TONE</Text>
               </View>
            </View>
          </View>
        ) : (
          <View>
            <Text style={styles.sectionTitle}>The Pillar Vault</Text>
            <Text style={styles.sectionDesc}>Forensic Masterclasses for the Snayu-Matrix.</Text>
            
            {[
              { id: '1', title: 'Prana Pulse', status: 'UNLOCKED' },
              { id: '2', title: 'Myofascial Liberation', status: 'LOCKED' },
              { id: '3', title: 'Yogic Stretching', status: 'LOCKED' },
            ].map((pillar) => (
              <TouchableOpacity key={pillar.id} style={styles.pillarCard}>
                <Text style={styles.pillarNum}>0{pillar.id}</Text>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.pillarTitle}>{pillar.title}</Text>
                  <Text style={styles.pillarStatus}>{pillar.status}</Text>
                </View>
                <Text style={styles.lockIcon}>{pillar.status === 'LOCKED' ? '🔒' : '▶'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 SOVEREIGN ARCHITECTURE | SHATVAYU</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1, backgroundColor: '#050505' },
  header: { 
    paddingTop: 60, paddingBottom: 20, paddingHorizontal: 25, 
    flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    backgroundColor: '#0a0a0a', borderBottomWidth: 1, borderBottomColor: '#1a1a1a'
  },
  logoText: { color: '#fbbf24', fontSize: 20, fontWeight: '900', letterSpacing: 2 },
  subLogo: { color: '#475569', fontSize: 8, fontWeight: 'bold', letterSpacing: 1 },
  navBtn: { backgroundColor: '#1e293b', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#334155' },
  navText: { color: '#fbbf24', fontSize: 10, fontWeight: '900' },
  
  scrollContent: { padding: 25, paddingBottom: 120 },
  titleSection: { marginBottom: 25 },
  sectionTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  dateText: { color: '#64748b', fontSize: 12, fontWeight: 'bold', marginTop: 4, letterSpacing: 1 },
  
  ritualCard: { 
    backgroundColor: '#0f172a', padding: 25, borderRadius: 20, 
    borderLeftWidth: 6, marginBottom: 25,
    shadowColor: '#000', shadowOffset: { width: 0, height: 10 }, shadowOpacity: 0.5, shadowRadius: 20
  },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  ritualTag: { color: '#94a3b8', fontSize: 10, fontWeight: 'bold', letterSpacing: 2 },
  statusDot: { width: 8, height: 8, borderRadius: 4 },
  ritualName: { color: '#fff', fontSize: 32, fontWeight: '900' },
  ritualSubText: { color: '#94a3b8', fontSize: 16, marginTop: 5, fontWeight: '500' },
  playButton: { backgroundColor: '#fbbf24', marginTop: 25, padding: 18, borderRadius: 12, alignItems: 'center' },
  playText: { color: '#000', fontWeight: '900', fontSize: 14, letterSpacing: 1 },

  statsContainer: { flexDirection: 'row', justifyContent: 'space-between' },
  statBox: { backgroundColor: '#0a0a0a', width: '47%', padding: 20, borderRadius: 15, borderWidth: 1, borderColor: '#1a1a1a', alignItems: 'center' },
  statValue: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  statLabel: { color: '#475569', fontSize: 9, fontWeight: '900', marginTop: 5 },

  sectionDesc: { color: '#64748b', fontSize: 14, marginBottom: 25 },
  pillarCard: { backgroundColor: '#0a0a0a', padding: 20, borderRadius: 15, marginBottom: 15, flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: '#1a1a1a' },
  pillarNum: { color: '#fbbf24', fontSize: 18, fontWeight: '900' },
  pillarTitle: { color: '#fff', fontSize: 16, fontWeight: 'bold' },
  pillarStatus: { color: '#475569', fontSize: 10, fontWeight: 'bold', marginTop: 2 },
  lockIcon: { color: '#334155', fontSize: 18 },

  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#050505', alignItems: 'center' },
  footerText: { color: '#1e293b', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 }
});