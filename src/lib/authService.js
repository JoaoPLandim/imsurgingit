import { auth, db } from "./firebase";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, 
  signOut, 
  sendPasswordResetEmail,
  onAuthStateChanged 
} from "firebase/auth";
import { doc, setDoc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

export async function signUp(email, password, name, surname) {
  try {
    // Create user with Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // Save additional user info to Firestore
    const userData = {
      email: user.email,
      name: `${name} ${surname}`,
      firebaseUid: user.uid,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await setDoc(doc(db, "users", user.uid), userData);

    return { userCredential, userData };
  } catch (error) {
    console.error("Signup error:", error);
    throw error;
  }
}

export function signIn(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function logOut() {
  return signOut(auth);
}

export function resetPassword(email) {
  return sendPasswordResetEmail(auth, email);
}

export function onAuthChange(callback) {
  return onAuthStateChanged(auth, callback);
}

export async function getUserData(firebaseUid) {
  try {
    const userDoc = await getDoc(doc(db, "users", firebaseUid));
    
    if (userDoc.exists()) {
      return userDoc.data();
    }
    return null;
  } catch (error) {
    console.error("Error fetching user data:", error);
    return null;
  }
}

// Additional helper functions for Firestore operations
export async function saveTranscript(userId, transcriptData) {
  try {
    const transcriptRef = doc(collection(db, "transcripts"));
    await setDoc(transcriptRef, {
      ...transcriptData,
      userId,
      uploadedAt: new Date().toISOString(),
    });
    return transcriptRef.id;
  } catch (error) {
    console.error("Error saving transcript:", error);
    throw error;
  }
}

export async function getUserTranscripts(userId) {
  try {
    const transcriptsQuery = query(
      collection(db, "transcripts"),
      where("userId", "==", userId)
    );
    const snapshot = await getDocs(transcriptsQuery);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching transcripts:", error);
    return [];
  }
}