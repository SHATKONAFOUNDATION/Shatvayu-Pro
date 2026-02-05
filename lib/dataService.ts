import {
  arrayUnion,
  doc,
  increment,
  setDoc,
  updateDoc
} from 'firebase/firestore';
import { auth, db } from './firebase';

/**
 * Tracks the completion of a Protocol Pillar (1-6)
 * Updates the user's progress and stats in Firestore
 */
export const completePillar = async (pillarId: string) => {
  if (!auth.currentUser) return;

  const userRef = doc(db, "users", auth.currentUser.uid);
  const timestamp = new Date().toISOString();

  try {
    // Attempt to update existing progress
    await updateDoc(userRef, {
      "progress.currentDay": increment(1),
      "progress.completedPillars": arrayUnion(pillarId),
      "progress.lastSession": timestamp,
      "stats.totalRituals": increment(1)
    });
    console.log(`Pillar ${pillarId} Secured in Cloud.`);
  } catch (error) {
    // Fallback: If the user document doesn't exist, create it
    console.log("Initial profile creation for practitioner...");
    await setDoc(userRef, {
      progress: { 
        currentDay: 1, 
        completedPillars: [pillarId], 
        lastSession: timestamp 
      },
      stats: { 
        totalRituals: 1 
      }
    }, { merge: true });
  }
};