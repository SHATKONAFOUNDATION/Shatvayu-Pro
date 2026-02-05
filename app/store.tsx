import { useRouter } from 'expo-router';
import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function SovereignStore() {
  const router = useRouter();

  const products = [
    {
      id: 'bithika',
      name: 'BITHIKA FASCIA LOTION',
      sub: 'Bio-Active Snayu Support',
      price: '₹1,299',
      desc: 'Infused with Bhedai Lota & Magnesium for deep tissue release.',
      color: '#fbbf24'
    },
    {
      id: 'sculptor',
      name: 'FASCIA SCULPTOR v1',
      sub: 'Precision Release Tool',
      price: '₹3,499',
      desc: 'Ergonomic tool designed for the Shatkona Protocol strokes.',
      color: '#38bdf8'
    },
    {
      id: 'book',
      name: 'THE SNAYU MATRIX',
      sub: 'Core Philosophy Book',
      price: '₹899',
      desc: 'Dr. MP Das’s lifetime work on the Global Pain Free Living Mission.',
      color: '#4ade80'
    }
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backLink}>← BACK</Text>
        </TouchableOpacity>
        <Text style={styles.headerTitle}>EQUIPMENT</Text>
      </View>

      <ScrollView contentContainerStyle={styles.list}>
        {products.map((item) => (
          <View key={item.id} style={styles.productCard}>
            <View style={[styles.colorBar, { backgroundColor: item.color }]} />
            <View style={styles.productInfo}>
              <Text style={styles.productTag}>OFFICIAL SHATVAYU GEAR</Text>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productDesc}>{item.desc}</Text>
              
              <View style={styles.priceRow}>
                <Text style={styles.price}>{item.price}</Text>
                <TouchableOpacity style={styles.buyBtn}>
                  <Text style={styles.buyText}>ADD TO PROTOCOL</Text>
                </TouchableOpacity>
              </View>
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
  productCard: { backgroundColor: '#0a0a0a', borderRadius: 20, marginBottom: 20, flexDirection: 'row', overflow: 'hidden', borderWidth: 1, borderColor: '#1a1a1a' },
  colorBar: { width: 6 },
  productInfo: { flex: 1, padding: 20 },
  productTag: { color: '#475569', fontSize: 8, fontWeight: '900', letterSpacing: 1, marginBottom: 8 },
  productName: { color: '#fbbf24', fontSize: 20, fontWeight: '900', marginBottom: 5 },
  productDesc: { color: '#94a3b8', fontSize: 12, lineHeight: 18, marginBottom: 15 },
  priceRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  price: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  buyBtn: { backgroundColor: '#1e293b', paddingVertical: 10, paddingHorizontal: 15, borderRadius: 8, borderWidth: 1, borderColor: '#fbbf24' },
  buyText: { color: '#fbbf24', fontSize: 10, fontWeight: '900' }
});