import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"; // Add this
import { getFirestore } from "firebase/firestore"; // Add this

const firebaseConfig = {
  apiKey: "AIzaSyB7ieukW-yuMAIAQBFCdGg6Q4xrp0goe1w",
  authDomain: "shatkona-2025.firebaseapp.com",
  projectId: "shatkona-2025",
  storageBucket: "shatkona-2025.firebasestorage.app",
  messagingSenderId: "1035098286280",
  appId: "1:1035098286280:web:7053a528ef90c38856ddfd",
  measurementId: "G-NNRP70KSS7"
};

const app = initializeApp(firebaseConfig);

// EXPORT these so dataService.ts can see them!
export const auth = getAuth(app); 
export const db = getFirestore(app);

export default app;