import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { ActivityIndicator, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth } from '../lib/firebase'; // Adjust path if needed (../../lib/firebase)

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleAuth = async (type: 'login' | 'signup') => {
    if (!email || !password) return alert("Please fill in all fields");
    setLoading(true);
    try {
      if (type === 'signup') {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      router.replace('/(tabs)');
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SHATVAYU ACCESS</Text>
      
      <TextInput 
        placeholder="Email" 
        placeholderTextColor="#475569"
        style={styles.input}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput 
        placeholder="Password" 
        placeholderTextColor="#475569"
        style={styles.input}
        secureTextEntry
        onChangeText={setPassword}
      />

      {loading ? <ActivityIndicator color="#fbbf24" /> : (
        <>
          <TouchableOpacity style={styles.btnMain} onPress={() => handleAuth('login')}>
            <Text style={styles.btnText}>INITIATE RITUAL (LOGIN)</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={{ marginTop: 20 }} onPress={() => handleAuth('signup')}>
            <Text style={{ color: '#94a3b8', fontSize: 12 }}>NEW PRACTITIONER? SIGN UP</Text>
          </TouchableOpacity>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#050505', justifyContent: 'center', padding: 40 },
  title: { color: '#fbbf24', fontSize: 24, fontWeight: '900', textAlign: 'center', marginBottom: 40, letterSpacing: 4 },
  input: { backgroundColor: '#0a0a0a', borderWidth: 1, borderColor: '#1a1a1a', padding: 15, borderRadius: 10, color: '#fff', marginBottom: 15 },
  btnMain: { backgroundColor: '#fbbf24', padding: 18, borderRadius: 12, alignItems: 'center' },
  btnText: { color: '#000', fontWeight: '900', letterSpacing: 1 }
});