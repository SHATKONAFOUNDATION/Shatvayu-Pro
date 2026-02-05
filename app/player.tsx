import { ResizeMode, Video } from 'expo-av';
import { useLocalSearchParams, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { completePillar } from '../lib/dataService'; // Path to your data service

export default function PlayerScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [status, setStatus] = useState({});
  const [isFinishing, setIsFinishing] = useState(false);

  // Map IDs to your actual video URLs (replace with your Firebase Storage or Vimeo links)
  const videoMap: Record<string, string> = {
    'A': 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4', // Example URL
    'B': 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
    'p1': 'https://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4',
  };

  const handleComplete = async () => {
    setIsFinishing(true);
    try {
      // This updates the 6-Day Tracker in Firestore
      await completePillar(id as string);
      alert("Mastery Secured. Progress Saved to Cloud.");
      router.back();
    } catch (e) {
      console.error(e);
    } finally {
      setIsFinishing(false);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backBtn}>✕ CLOSE</Text>
        </TouchableOpacity>
        <Text style={styles.title}>SESSION: {id}</Text>
      </View>

      <Video
        style={styles.video}
        source={{ uri: videoMap[id as string] || videoMap['p1'] }}
        useNativeControls
        resizeMode={ResizeMode.CONTAIN}
        isLooping={false}
        onPlaybackStatusUpdate={status => setStatus(() => status)}
      />

      <View style={styles.controls}>
        <Text style={styles.instruction}>Complete the 30-minute ritual for vagal toning.</Text>
        
        <TouchableOpacity 
          style={styles.completeBtn} 
          onPress={handleComplete}
          disabled={isFinishing}
        >
          {isFinishing ? (
            <ActivityIndicator color="#000" />
          ) : (
            <Text style={styles.completeText}>MARK RITUAL AS COMPLETE</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  header: { paddingTop: 60, paddingHorizontal: 20, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  backBtn: { color: '#475569', fontWeight: 'bold' },
  title: { color: '#fbbf24', fontWeight: 'bold', letterSpacing: 1 },
  video: { width: '100%', height: 300, marginTop: 40 },
  controls: { padding: 30, alignItems: 'center' },
  instruction: { color: '#94a3b8', textAlign: 'center', marginBottom: 30, fontSize: 14 },
  completeBtn: { backgroundColor: '#fbbf24', padding: 20, borderRadius: 15, width: '100%', alignItems: 'center' },
  completeText: { color: '#000', fontWeight: '900', letterSpacing: 1 }
});