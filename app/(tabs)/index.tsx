import * as Linking from 'expo-linking';
import { useRouter } from 'expo-router';
import { signInWithCustomToken } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// Internal Imports
import { auth } from '../../lib/firebase';
import { useAuth } from '../context/AuthContext'; // Verify this path

const { width } = Dimensions.get('window');

export default function FasciamaxHome() {
  const router = useRouter();
  const { profile } = useAuth();
  const [viewMode, setViewMode] = useState<'RITUAL' | 'ACADEMY'>('RITUAL');

  // --- 6-DAY VOW LOGIC ---
  const masteryDays = [1, 2, 3, 4, 5, 6];

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

  // --- WEB-TO-APP HANDSHAKE ---
  useEffect(() => {
    const handleDeepLink = async (event: { url: string }) => {
      let data = Linking.parse(event.url);
      if (data.queryParams?.token) {
        try {
          await signInWithCustomToken(auth, data.queryParams.token as string);
        } catch (error) {
          console.error("Web-to-App Auth Failed", error);
        }
      }
    };
    const subscription = Linking.addEventListener('url', handleDeepLink);
    return () => subscription.remove();
  }, []);

  return (
    <View style={styles.mainContainer}>
      <StatusBar barStyle="light-content" />
      
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

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        {viewMode === 'RITUAL' ? (
          <View>
            {/* 💎 6-DAY VOW TRACKER */}
            <View style={styles.trackerContainer}>
              <Text style={styles.trackerTitle}>YOUR 6-DAY VOW OF MASTERY</Text>
              <View style={styles.daysRow}>
                {masteryDays.map((day) => {
                  const isCompleted = (profile?.progress?.currentDay || 0) >= day;
                  const isCurrent = (profile?.progress?.currentDay || 0) + 1 === day;
                  
                  return (
                    <View key={day} style={styles.dayHexagon}>
                      <View style={[
                        styles.hexInner, 
                        isCompleted && { backgroundColor: '#fbbf24' }, 
                        isCurrent && { borderColor: '#fbbf24', borderWidth: 2 } 
                      ]}>
                        <Text style={[styles.dayText, isCompleted && { color: '#000' }]}>{day}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
              <Text style={styles.statusSub}>
                {profile?.progress?.currentDay ? `Day ${profile.progress.currentDay} of 6 Completed` : "Initiate Day 1"}
              </Text>
            </View>

            <View style={styles.titleSection}>
              <Text style={styles.sectionTitle}>Sovereign Maintenance</Text>
              <Text style={styles.dateText}>{today.toUpperCase()} PROTOCOL</Text>
            </View>

            {/* MAIN RITUAL CARD */}
            <TouchableOpacity 
              style={[styles.ritualCard, { borderLeftColor: routine.color }]} 
              activeOpacity={0.9}
              onPress={() => router.push({ pathname: '/player' as any, params: { id: routine.id } })}
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
                  <Text style={styles.statValue}>{profile?.stats?.totalRituals || 0}</Text>
                  <Text style={styles.statLabel}>TOTAL RITUALS</Text>
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
            <Text style={styles.sectionDesc}>Masterclasses for the Snayu-Matrix.</Text>
            
            {[
              { id: 'p1', title: 'Prana Pulse', status: 'UNLOCKED' },
              { id: 'p2', title: 'Myofascial Liberation', status: 'LOCKED' },
              { id: 'p3', title: 'Yogic Stretching', status: 'LOCKED' },
            ].map((pillar) => (
              <TouchableOpacity 
                key={pillar.id} 
                style={styles.pillarCard}
                onPress={() => pillar.status === 'UNLOCKED' ? router.push({ pathname: '/player' as any, params: { id: pillar.id } }) : null}
              >
                <Text style={styles.pillarNum}>{pillar.id.replace('p', '0')}</Text>
                <View style={{ flex: 1, marginLeft: 15 }}>
                  <Text style={styles.pillarTitle}>{pillar.title}</Text>
                  <Text style={styles.pillarStatus}>{pillar.status}</Text>
                </View>
                <Text style={styles.lockIcon}>{pillar.status === 'LOCKED' ? '🔒' : '▶'}</Text>
              </TouchableOpacity>
            ))}

            <View style={{ marginTop: 10, marginBottom: 30 }}>
              <TouchableOpacity style={styles.clinicBtn} onPress={() => router.push('/clinics' as any)}>
                <Text style={styles.actionBtnText}>📍 FIND NEAREST CLINIC</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.storeBtn} onPress={() => router.push('/clinics' as any)}>
                <Text style={styles.actionBtnText}>🛍️ ORDER SCULPTOR TOOLS</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>

      <View style={styles.footer}>
        <Text style={styles.footerText}>© 2026 FASCIAMAX | SHATVAYU</Text>
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
  
  // Tracker Styles
  trackerContainer: { padding: 20, backgroundColor: '#0a0a0a', borderRadius: 20, marginBottom: 25, borderWidth: 1, borderColor: '#1a1a1a' },
  trackerTitle: { color: '#475569', fontSize: 10, fontWeight: '900', letterSpacing: 2, textAlign: 'center', marginBottom: 20 },
  daysRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 },
  dayHexagon: { width: 35, height: 35, justifyContent: 'center', alignItems: 'center' },
  hexInner: { width: 30, height: 30, borderRadius: 6, backgroundColor: '#1a1a1a', justifyContent: 'center', alignItems: 'center', transform: [{ rotate: '45deg' }] },
  dayText: { color: '#475569', fontSize: 12, fontWeight: 'bold', transform: [{ rotate: '-45deg' }] },
  statusSub: { color: '#fbbf24', fontSize: 12, textAlign: 'center', marginTop: 20, fontWeight: 'bold', letterSpacing: 1 },

  titleSection: { marginBottom: 25 },
  sectionTitle: { color: '#fff', fontSize: 24, fontWeight: 'bold' },
  dateText: { color: '#64748b', fontSize: 12, fontWeight: 'bold', marginTop: 4, letterSpacing: 1 },
  ritualCard: { backgroundColor: '#0f172a', padding: 25, borderRadius: 20, borderLeftWidth: 6, marginBottom: 25 },
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
  clinicBtn: { backgroundColor: '#1e293b', padding: 18, borderRadius: 12, alignItems: 'center', marginBottom: 12, borderWidth: 1, borderColor: '#334155' },
  storeBtn: { backgroundColor: '#0f172a', padding: 18, borderRadius: 12, alignItems: 'center', borderWidth: 1, borderColor: '#fbbf24' },
  actionBtnText: { color: '#fbbf24', fontWeight: '900', fontSize: 14, letterSpacing: 1 },
  footer: { position: 'absolute', bottom: 0, width: '100%', padding: 20, backgroundColor: '#050505', alignItems: 'center' },
  footerText: { color: '#1e293b', fontSize: 9, fontWeight: 'bold', letterSpacing: 1 }
});