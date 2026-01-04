import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000124' },
  
  // Permission styles
  permissionContainer: { flex: 1, backgroundColor: '#000124', justifyContent: 'center', alignItems: 'center' },
  permissionCard: { width: '85%', alignItems: 'center', padding: 30, borderRadius: 30, borderWidth: 1, borderColor: '#D4AF3733', backgroundColor: 'rgba(255,255,255,0.02)' },
  permissionTitle: { color: '#D4AF37', fontSize: 20, fontWeight: '900', marginTop: 20, letterSpacing: 2 },
  permissionDesc: { color: '#fff', textAlign: 'center', opacity: 0.7, marginTop: 10, lineHeight: 20, fontSize: 13 },
  grantBtn: { backgroundColor: '#D4AF37', marginTop: 30, paddingVertical: 15, paddingHorizontal: 40, borderRadius: 30 },
  grantBtnText: { color: '#000124', fontWeight: '900', fontSize: 12 },

  // Layout & Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 75 },
  logoSmall: { width: 45, height: 45, resizeMode: 'contain' },
  startScanBtnTop: { backgroundColor: '#D4AF37', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  scanBtnText: { color: '#000124', fontWeight: '900', fontSize: 10 },
  percentageText: { color: '#D4AF37', fontSize: 80, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  
  // Status & Buttons
  seminarButton: { backgroundColor: '#8B0000', paddingHorizontal: 15, paddingVertical: 6, borderRadius: 15, borderWidth: 1, borderColor: '#D4AF37' },
  seminarText: { color: 'white', fontSize: 10, fontWeight: 'bold' },
  statusText: { color: '#D4AF37', fontSize: 13, textAlign: 'center', letterSpacing: 1, marginBottom: 20, paddingHorizontal: 30 },
  
  // Camera HUD
  cameraFrame: { width: 280, height: 280, borderRadius: 140, overflow: 'hidden', alignSelf: 'center', borderWidth: 2, borderColor: '#D4AF37', backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.1)' },
  scannerLine: { height: 4, backgroundColor: '#FFD700', width: '100%', position: 'absolute' },
  medicalHUD: {
    position: 'absolute',
    top: 40,
    right: 20,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    padding: 10,
    borderRadius: 8,
    borderColor: '#D4AF37',
    borderWidth: 1,
  },
  hudLabel: { color: '#D4AF37', fontSize: 10, fontFamily: 'monospace', marginBottom: 2 },

  // Grid & Pillars
  scrollContent: { paddingBottom: 100 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tile: { width: (width / 2) - 25, height: 120, backgroundColor: 'rgba(255, 255, 255, 0.05)', margin: 8, borderRadius: 20, borderWidth: 1, justifyContent: 'center', alignItems: 'center' },
  tileText: { color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  
  // Footer & Ecosystem
  ecoBar: { height: 70, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  ecoText: { color: '#000124', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  
  // Modals & Reports
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.85)', justifyContent: 'flex-end' },
  modalContent: { backgroundColor: '#D4AF37', borderTopLeftRadius: 30, borderTopRightRadius: 30, padding: 25, paddingBottom: 40 },
  modalTitle: { textAlign: 'center', fontWeight: 'bold', color: '#000124', marginBottom: 20, fontSize: 16 },
  menuItem: { paddingVertical: 15, alignItems: 'center' },
  menuText: { color: '#000124', fontWeight: 'bold', fontSize: 17 },
  
  reportOverlay: { flex: 1, backgroundColor: 'rgba(0,1,36,0.95)', justifyContent: 'center', alignItems: 'center' },
  reportContent: { width: '85%', backgroundColor: '#000124', borderRadius: 30, padding: 30, alignItems: 'center', borderWidth: 2, borderColor: '#D4AF37' },
  reportTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  sIndexResult: { color: 'white', fontSize: 40, fontWeight: '900', marginTop: 10 },
  hrvText: { color: '#D4AF37', fontSize: 14, marginBottom: 10 },
  dividerGold: { height: 1, backgroundColor: '#D4AF3744', width: '100%', marginVertical: 20 },
  closeButton: { backgroundColor: '#D4AF37', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20 },
  closeButtonText: { color: '#000124', fontWeight: 'bold' },
  timestampText: { color: '#fff', opacity: 0.5, fontSize: 10, marginTop: 5, fontFamily: 'monospace' },
});