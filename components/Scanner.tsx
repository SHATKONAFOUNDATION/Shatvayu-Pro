import { addDoc, collection, getDocs, limit, orderBy, query, serverTimestamp } from 'firebase/firestore';
import React, { useEffect, useRef, useState } from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Webcam from "react-webcam";
import { db } from '../lib/firebase';

export default function ShatkonaScanner() {
  const webcamRef = useRef<any>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [history, setHistory] = useState<any[]>([]);

  // 1. Fetch History from Mumbai Node
  const fetchHistory = async () => {
    const q = query(collection(db, "scans"), orderBy("timestamp", "desc"), limit(5));
    const querySnapshot = await getDocs(q);
    const docs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setHistory(docs);
  };

  useEffect(() => { fetchHistory(); }, []);

  // 2. The Biometric Scan Logic
  const startScan = async () => {
    setIsScanning(true);
    setProgress(0);

    // Simulate 5-second High-Precision Scan
    for (let i = 0; i <= 100; i += 20) {
      await new Promise(r => setTimeout(r, 1000));
      setProgress(i);
    }

    const mockSDNN = Math.floor(Math.random() * (80 - 20) + 20);
    const status = mockSDNN > 50 ? "FLOW" : "STRESS (Redlining)";

    // 3. Push to Firebase Mumbai
    await addDoc(collection(db, "scans"), {
      sdnn: mockSDNN,
      status: status,
      timestamp: serverTimestamp(),
    });

    setIsScanning(false);
    fetchHistory(); // Refresh the list automatically
  };

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#000', padding: 20 }}>
      <Text style={{ color: '#C5A059', fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 }}>
        SHATKONA S1 SCANNER
      </Text>

      {/* Camera Viewfinder */}
      <View style={{ height: 300, backgroundColor: '#111', borderRadius: 20, overflow: 'hidden', marginBottom: 20 }}>
        <Webcam ref={webcamRef} audio={false} width="100%" height="100%" />
      </View>

      {/* Action Button */}
      <TouchableOpacity 
        onPress={startScan} 
        disabled={isScanning}
        style={{ backgroundColor: isScanning ? '#333' : '#C5A059', padding: 15, borderRadius: 10, alignItems: 'center' }}
      >
        <Text style={{ color: '#fff', fontWeight: 'bold' }}>
          {isScanning ? `SCANNING BIOMETRICS... ${progress}%` : 'INITIATE S-INDEX SCAN'}
        </Text>
      </TouchableOpacity>

      {/* Recent Biometrics List */}
      <View style={{ marginTop: 40 }}>
        <Text style={{ color: '#C5A059', marginBottom: 10, letterSpacing: 2 }}>RECENT TRENDS</Text>
        {history.map((scan) => (
          <View key={scan.id} style={{ padding: 15, backgroundColor: '#111', borderRadius: 10, marginBottom: 10, borderLeftWidth: 4, borderLeftColor: scan.sdnn > 50 ? '#4CAF50' : '#F44336' }}>
            <Text style={{ color: '#fff' }}>Result: {scan.status}</Text>
            <Text style={{ color: '#666', fontSize: 12 }}>SDNN: {scan.sdnn}ms</Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}