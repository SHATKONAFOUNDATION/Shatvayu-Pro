import { collection, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { auth, db } from './firebase';

export const getScanHistory = async () => {
  if (!auth.currentUser) return [];
  
  const q = query(
    collection(db, "scans"),
    where("userId", "==", auth.currentUser.uid),
    orderBy("timestamp", "desc"),
    limit(7)
  );

  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));
};