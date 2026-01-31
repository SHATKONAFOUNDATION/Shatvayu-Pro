import { Dimensions, StyleSheet } from 'react-native';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#c3c4e0' },
  
  // Layout & Header
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 20, height: 75 },
  logoSmall: { width: 45, height: 45, resizeMode: 'contain' },
  startScanBtnTop: { backgroundColor: '#D4AF37', paddingHorizontal: 12, paddingVertical: 8, borderRadius: 20 },
  scanBtnText: { color: '#000124', fontWeight: '900', fontSize: 10 },
  percentageText: { color: '#D4AF37', fontSize: 80, fontWeight: 'bold', textAlign: 'center', marginTop: 10 },
  
  // Status & Seminar
  seminarButton: { backgroundColor: '#8B0000', borderRadius: 15, borderWidth: 1, borderColor: '#D4AF37', alignItems: 'center', justifyContent: 'center' },
  seminarText: { color: 'white', fontWeight: 'bold' },
  statusText: { color: '#D4AF37', fontSize: 13, textAlign: 'center', letterSpacing: 1, marginBottom: 10 },

  // --- ECOSYSTEM CARDS ---
  modCard: {
    width: (width / 3) - 25,
    height: 70,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#333',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modNumber: { fontSize: 24, fontWeight: 'bold' },
  modLabel: { fontSize: 8, color: '#888', fontWeight: 'bold' },
  
  trustBar: { padding: 20, alignItems: 'center' },
  trustText: { color: '#D4AF37', fontSize: 10, letterSpacing: 1, marginBottom: 5 },
  logoRow: { color: '#fff', fontSize: 12, fontWeight: 'bold' },

  adOverlayView: { flex: 1, backgroundColor: '#000' },
  adVideo: { flex: 1 },
  adClose: { position: 'absolute', top: 50, right: 20, zIndex: 10 },
  adCTA: { 
    position: 'absolute', bottom: 50, width: '90%', alignSelf: 'center', 
    backgroundColor: 'rgba(0,1,36,0.95)', padding: 25, borderRadius: 25, 
    borderWidth: 1, borderColor: '#FFD700', alignItems: 'center' 
  },
  adTitle: { color: '#FFD700', fontSize: 22, fontWeight: '900' },
  adSub: { color: '#fff', fontSize: 12, marginVertical: 10, textAlign: 'center' },
  subBtn: { backgroundColor: '#FFD700', paddingHorizontal: 30, paddingVertical: 12, borderRadius: 20, marginTop: 10 },
  subBtnText: { color: '#000', fontWeight: 'bold' },

  // Camera HUD
  cameraFrame: { width: 280, height: 280, borderRadius: 140, overflow: 'hidden', alignSelf: 'center', borderWidth: 2, borderColor: '#D4AF37', backgroundColor: '#000' },
  camera: { flex: 1 },
  overlay: { flex: 1, backgroundColor: 'rgba(212, 175, 55, 0.1)' },
  scannerLine: { height: 4, backgroundColor: '#FFD700', width: '100%', position: 'absolute' },
  
  targetCornerTopLeft: { position: 'absolute', top: 20, left: 20, width: 30, height: 30, borderTopWidth: 3, borderLeftWidth: 3, borderColor: '#D4AF37' },
  targetCornerTopRight: { position: 'absolute', top: 20, right: 20, width: 30, height: 30, borderTopWidth: 3, borderRightWidth: 3, borderColor: '#D4AF37' },
  targetCornerBottomLeft: { position: 'absolute', bottom: 20, left: 20, width: 30, height: 30, borderBottomWidth: 3, borderLeftWidth: 3, borderColor: '#D4AF37' },
  targetCornerBottomRight: { position: 'absolute', bottom: 20, right: 20, width: 30, height: 30, borderBottomWidth: 3, borderRightWidth: 3, borderColor: '#D4AF37' },
  
  dataStreamLeft: { position: 'absolute', left: 10, top: '30%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 4 },
  dataStreamRight: { position: 'absolute', right: 10, top: '30%', backgroundColor: 'rgba(0,0,0,0.5)', padding: 5, borderRadius: 4 },
  dataText: { color: '#D4AF37', fontSize: 10, fontFamily: 'monospace', fontWeight: 'bold' },

  // Grid & Pillars
  scrollContent: { paddingBottom: 100 },
  grid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' },
  tile: { 
    width: (width / 2) - 25, 
    height: 120, 
    backgroundColor: 'rgba(255, 255, 255, 0.05)', 
    margin: 8, 
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#333', // Default border
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  tileText: { color: 'white', fontSize: 10, fontWeight: 'bold', textAlign: 'center', marginTop: 12 },
  
  // Footer
  ecoBar: { height: 70, backgroundColor: '#D4AF37', justifyContent: 'center', alignItems: 'center', borderTopLeftRadius: 30, borderTopRightRadius: 30 },
  ecoText: { color: '#000124', fontWeight: 'bold', fontSize: 14, letterSpacing: 1 },
  
  // --- Modals, Chain Selector & Reports ---
  modalOverlay: { 
    flex: 1, 
    backgroundColor: 'rgba(0,1,36,0.9)', // Deep Navy overlay
    justifyContent: 'center', 
    alignItems: 'center' 
  },
  
  // This fixes the 'modalContent' error
  modalContent: { 
    width: '85%',
    backgroundColor: '#000124', 
    borderRadius: 30, 
    padding: 25, 
    borderWidth: 2, 
    borderColor: '#D4AF37',
    shadowColor: '#D4AF37',
    shadowOpacity: 0.5,
    shadowRadius: 15,
    elevation: 10,
  },

  // This fixes 'modalTitle'
  modalTitle: { 
    textAlign: 'center', 
    fontWeight: 'bold', 
    color: '#D4AF37', 
    marginBottom: 20, 
    fontSize: 18,
    letterSpacing: 1
  },

  // This fixes 'menuItem'
  menuItem: { 
    paddingVertical: 15, 
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(212, 175, 55, 0.2)' 
  },

  // This fixes 'menuText'
  menuText: { 
    color: '#FFF', 
    fontWeight: 'bold', 
    fontSize: 17 
  },

  // Selector Specifics
  chainOption: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(212, 175, 55, 0.1)',
    padding: 18,
    borderRadius: 15,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#D4AF3733',
  },
  chainText: { color: '#FFF', fontSize: 15, fontWeight: 'bold', marginLeft: 15 },
  
  // Phase Labels
  activePhaseBadge: {
    fontSize: 8,
    fontWeight: '900',
    color: '#D4AF37',
    marginTop: 5,
    textTransform: 'uppercase'
  },
  
  reportContent: { width: '85%', backgroundColor: '#000124', borderRadius: 30, padding: 30, alignItems: 'center', borderWidth: 2, borderColor: '#D4AF37' },
  reportTitle: { color: '#D4AF37', fontSize: 20, fontWeight: 'bold', marginTop: 15 },
  sIndexResult: { color: 'white', fontSize: 40, fontWeight: '900', marginTop: 10 },
  dividerGold: { height: 1, backgroundColor: '#D4AF3744', width: '100%', marginVertical: 20 },
  closeButton: { backgroundColor: '#D4AF37', paddingVertical: 12, paddingHorizontal: 40, borderRadius: 20 },
});